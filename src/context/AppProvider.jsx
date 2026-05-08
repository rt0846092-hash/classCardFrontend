import { useState, useEffect, useCallback } from 'react';
import { AppContext } from './AppContext';
import { STORAGE_KEYS, load, save } from './storage';
import { warmUp } from './speech';

const DEFAULT_USER = { name: 'Student', role: 'student', id: 'default' };

export const AppProvider = ({ children }) => {
  const [user] = useState(DEFAULT_USER);

  const [progress, setProgress] = useState(() =>
    load(STORAGE_KEYS.PROGRESS, {})
  );

  const [pins, setPins] = useState(() =>
    new Set(load(STORAGE_KEYS.PINS, []))
  );

  useEffect(() => { save(STORAGE_KEYS.PROGRESS, progress); }, [progress]);
  useEffect(() => { save(STORAGE_KEYS.PINS, [...pins]); },    [pins]);

  // Warm up TTS on first user gesture — required by iOS Safari & WebViews
  useEffect(() => {
    const handler = () => {
      warmUp();
      window.removeEventListener('touchstart', handler);
      window.removeEventListener('click',      handler);
    };
    window.addEventListener('touchstart', handler, { once: true });
    window.addEventListener('click',      handler, { once: true });
    return () => {
      window.removeEventListener('touchstart', handler);
      window.removeEventListener('click',      handler);
    };
  }, []);

  const recordAnswer = useCallback((wordId, correct) => {
    setProgress(prev => {
      const entry = prev[wordId] || { correct: 0, wrong: 0, lastSeen: null };
      return {
        ...prev,
        [wordId]: {
          correct:  entry.correct + (correct ? 1 : 0),
          wrong:    entry.wrong   + (correct ? 0 : 1),
          lastSeen: Date.now(),
        },
      };
    });
  }, []);

  const getProgress = useCallback(
    (wordId) => progress[wordId] || { correct: 0, wrong: 0, lastSeen: null },
    [progress]
  );

  const getReviewWords = useCallback((allWords) => {
    const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;
    return allWords.filter(w => {
      const p = progress[w.id];
      if (!p) return false;
      return p.wrong > p.correct || (p.lastSeen && Date.now() - p.lastSeen > THREE_DAYS);
    });
  }, [progress]);

  const getStats = useCallback(() => {
    const entries = Object.values(progress);
    if (!entries.length) return { totalAttempts: 0, correct: 0, accuracy: 0, wordsStudied: 0 };
    const correct = entries.reduce((s, e) => s + e.correct, 0);
    const total   = entries.reduce((s, e) => s + e.correct + e.wrong, 0);
    return { totalAttempts: total, correct, accuracy: total ? Math.round((correct / total) * 100) : 0, wordsStudied: entries.length };
  }, [progress]);

  const togglePin = useCallback((wordId) => {
    setPins(prev => {
      const next = new Set(prev);
      next.has(wordId) ? next.delete(wordId) : next.add(wordId);
      return next;
    });
  }, []);

  const isPinned = useCallback((wordId) => pins.has(wordId), [pins]);

  return (
    <AppContext.Provider value={{ user, progress, recordAnswer, getProgress, getReviewWords, getStats, pins, togglePin, isPinned }}>
      {children}
    </AppContext.Provider>
  );
};
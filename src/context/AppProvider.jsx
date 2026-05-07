import { useState, useEffect, useCallback } from 'react';
import { AppContext } from './AppContext';
import { STORAGE_KEYS, load, save } from './storage';

const DEFAULT_USER = {
  name: 'Student',
  role: 'student',
  id: 'default',
};

export const AppProvider = ({ children }) => {
  const [user] = useState(DEFAULT_USER);

  const [progress, setProgress] = useState(() =>
    load(STORAGE_KEYS.PROGRESS, {})
  );

  const [pins, setPins] = useState(() =>
    new Set(load(STORAGE_KEYS.PINS, []))
  );

  // Save progress to localStorage
  useEffect(() => {
    save(STORAGE_KEYS.PROGRESS, progress);
  }, [progress]);

  // Save pins to localStorage
  useEffect(() => {
    save(STORAGE_KEYS.PINS, [...pins]);
  }, [pins]);

  // Warm up speechSynthesis for Kakao/Messenger browsers
  useEffect(() => {
    const unlock = () => {
      try {
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance('');
          utterance.volume = 0;
          window.speechSynthesis.speak(utterance);
        }
      } catch (err) {
        console.warn('Speech synthesis warmup failed:', err);
      }

      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('click', unlock);
    };

    window.addEventListener('touchstart', unlock, { once: true });
    window.addEventListener('click', unlock, { once: true });

    return () => {
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('click', unlock);
    };
  }, []);

  // Record quiz/study answer
  const recordAnswer = useCallback((wordId, correct) => {
    setProgress(prev => {
      const current = prev[wordId] || {
        correct: 0,
        wrong: 0,
        lastSeen: null,
      };

      return {
        ...prev,
        [wordId]: {
          correct: current.correct + (correct ? 1 : 0),
          wrong: current.wrong + (correct ? 0 : 1),
          lastSeen: Date.now(),
        },
      };
    });
  }, []);

  // Get progress for a word
  const getProgress = useCallback(
    (wordId) =>
      progress[wordId] || {
        correct: 0,
        wrong: 0,
        lastSeen: null,
      },
    [progress]
  );

  // Review words logic
  const getReviewWords = useCallback(
    (allWords) => {
      const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;

      return allWords.filter(word => {
        const p = progress[word.id];

        if (!p) return false;

        const overdue =
          p.lastSeen && Date.now() - p.lastSeen > THREE_DAYS;

        const struggling = p.wrong > p.correct;

        return overdue || struggling;
      });
    },
    [progress]
  );

  // Statistics
  const getStats = useCallback(() => {
    const entries = Object.values(progress);

    if (!entries.length) {
      return {
        totalAttempts: 0,
        correct: 0,
        accuracy: 0,
        wordsStudied: 0,
      };
    }

    const correct = entries.reduce(
      (sum, item) => sum + item.correct,
      0
    );

    const total = entries.reduce(
      (sum, item) => sum + item.correct + item.wrong,
      0
    );

    return {
      totalAttempts: total,
      correct,
      accuracy: total
        ? Math.round((correct / total) * 100)
        : 0,
      wordsStudied: entries.length,
    };
  }, [progress]);

  // Pin / unpin words
  const togglePin = useCallback((wordId) => {
    setPins(prev => {
      const next = new Set(prev);

      if (next.has(wordId)) {
        next.delete(wordId);
      } else {
        next.add(wordId);
      }

      return next;
    });
  }, []);

  // Check if pinned
  const isPinned = useCallback(
    (wordId) => pins.has(wordId),
    [pins]
  );

  return (
    <AppContext.Provider
      value={{
        user,
        progress,
        pins,

        recordAnswer,
        getProgress,
        getReviewWords,
        getStats,

        togglePin,
        isPinned,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
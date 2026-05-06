import { useState, useMemo, useCallback } from 'react';
import { useApp } from '../context/useApp';
import { SECTIONS } from '../data/vocabulary';
import QuizCard from '../components/QuizCard';

const shuffle = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const buildOptions = (allWords, currentWord) => {
  const pool = shuffle(allWords.filter(w => w.id !== currentWord.id)).slice(0, 3);
  return shuffle([currentWord.word, ...pool.map(w => w.word)]);
};

const PinnedQuiz = ({ navigate }) => {
  const { pins, recordAnswer } = useApp();

  const allWords    = useMemo(() => SECTIONS.flatMap(s => s.words), []);
  const pinnedWords = useMemo(() => allWords.filter(w => pins.has(w.id)), [allWords, pins]);

  const [index,     setIndex]     = useState(0);
  const [wrong,     setWrong]     = useState(0);
  const [finished,  setFinished]  = useState(false);
  const [startTime]               = useState(() => Date.now());
  const [endTime,   setEndTime]   = useState(null);

  const options = useMemo(() => {
    if (!pinnedWords.length || !pinnedWords[index]) return [];
    return buildOptions(allWords, pinnedWords[index]);
  }, [index, pinnedWords, allWords]);

  const handleAnswer = useCallback((isCorrect) => {
    const word = pinnedWords[index];
    if (!word) return;
    recordAnswer(word.id, isCorrect);
    if (!isCorrect) setWrong(p => p + 1);
  }, [index, pinnedWords, recordAnswer]);

  const handleNext = useCallback(() => {
    if (index < pinnedWords.length - 1) {
      setIndex(i => i + 1);
    } else {
      setFinished(true);
      setEndTime(Date.now());
    }
  }, [index, pinnedWords.length]);

  if (!pinnedWords.length) {
    return (
      <div className="text-center py-12 fade-up">
        <div style={{ fontSize: 48 }}>📌</div>
        <h2 className="text-2xl font-bold mb-2">No Pinned Words</h2>
        <p className="text-gray-400 mb-6">Pin words while studying to review them here.</p>
        <button className="btn btn-warning" onClick={() => navigate('dashboard')}>
          ← Dashboard
        </button>
      </div>
    );
  }

  if (finished) {
    const correct = pinnedWords.length - wrong;
    const time    = endTime ? Math.floor((endTime - startTime) / 1000) : 0;

    return (
      <div className="text-center fade-up">
        <div style={{ fontSize: 48 }}>🎉</div>
        <h1 className="text-2xl font-bold mb-4">Pinned Quiz Complete!</h1>
        <p className="text-gray-300 mb-2">Score: {correct} / {pinnedWords.length}</p>
        <p className="text-gray-300 mb-2">Accuracy: {Math.round((correct / pinnedWords.length) * 100)}%</p>
        <p className="text-gray-400 mb-6">Time: {time}s</p>
        <div className="flex gap-3 justify-center">
          <button
            className="btn btn-warning"
            onClick={() => {
              setIndex(0);
              setWrong(0);
              setFinished(false);
              setEndTime(null);
            }}
          >
            🔄 Retry
          </button>
          <button className="btn" onClick={() => navigate('dashboard')}>🏠 Dashboard</button>
        </div>
      </div>
    );
  }

  const pct = Math.round(((index + 1) / pinnedWords.length) * 100);

  return (
    <div style={{ maxWidth: 540, margin: 'auto' }} className="fade-up">
      <div className="flex items-center justify-between mb-4">
        <button className="btn btn-ghost" onClick={() => navigate('dashboard')}>← Back</button>
        <h1 className="text-xl font-bold">📌 Pinned Quiz</h1>
        <span className="text-sm text-gray-400">{index + 1} / {pinnedWords.length}</span>
      </div>

      <div className="progress-bar-track mb-6">
        <div className="progress-bar-fill" style={{ width: `${pct}%`, background: '#f59e0b' }} />
      </div>

      <QuizCard
        word={pinnedWords[index]}
        options={options}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />
    </div>
  );
};

export default PinnedQuiz;
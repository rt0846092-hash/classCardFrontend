import { useState, useMemo, useCallback } from 'react';
import { useApp } from '../context/useApp';
import { SECTIONS } from '../data/vocabulary';
import FlipCard from '../components/FlipCard';
import QuizCard from '../components/QuizCard';

/* ───────────────── Utilities ───────────────── */
const shuffle = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const buildOptions = (allWords, currentWord) => {
  const distractors = shuffle(
    allWords.filter(w => w.id !== currentWord.id)
  ).slice(0, 3);

  return shuffle([currentWord.word, ...distractors.map(w => w.word)]);
};

/* ───────────────── UI Components ───────────────── */
const ModeToggle = ({ mode, onChange }) => (
  <div className="mode-toggle">
    <button
      className={`mode-toggle-btn ${mode === 'study' ? 'active' : ''}`}
      onClick={() => onChange('study')}
    >
      📖 Study
    </button>
    <button
      className={`mode-toggle-btn ${mode === 'quiz' ? 'active' : ''}`}
      onClick={() => onChange('quiz')}
    >
      🧠 Quiz
    </button>
  </div>
);

/* ───────────────── Main Component ───────────────── */
const PinnedWords = ({ navigate }) => {
  const { pins, togglePin, isPinned, recordAnswer } = useApp();

  /* ── Derived Data ── */
  const allWords = useMemo(() => SECTIONS.flatMap(s => s.words), []);
  const words = useMemo(
    () => allWords.filter(w => pins.has(w.id)),
    [allWords, pins]
  );

  /* ── State ── */
  const [mode, setMode] = useState('study');
  const [index, setIndex] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [finished, setFinished] = useState(false);

  /* ── Memoized Values ── */
  const currentWord = words[index];

  const options = useMemo(() => {
    if (!currentWord) return [];
    return buildOptions(allWords, currentWord);
  }, [allWords, currentWord]);

  const progress = words.length
    ? Math.round(((index + 1) / words.length) * 100)
    : 0;

  /* ── Actions ── */
  const reset = useCallback((nextMode) => {
    setMode(nextMode);
    setIndex(0);
    setWrong(0);
    setFinished(false);
  }, []);

  const goNext = useCallback(() => {
    setIndex(prev => {
      if (prev < words.length - 1) return prev + 1;
      setFinished(true);
      return prev;
    });
  }, [words.length]);

  const handleStudyNext = useCallback(() => {
    if (!currentWord) return;
    recordAnswer(currentWord.id, true);
    goNext();
  }, [currentWord, recordAnswer, goNext]);

  const handleAnswer = useCallback((isCorrect) => {
    if (!currentWord) return;

    recordAnswer(currentWord.id, isCorrect);
    if (!isCorrect) {
      setWrong(prev => prev + 1);
    }
  }, [currentWord, recordAnswer]);

  /* ── Early Return: Empty ── */
  if (!words.length) {
    return (
      <div className="text-center py-12 fade-up">
        <div style={{ fontSize: 48, marginBottom: 16 }}>📌</div>
        <h2 className="text-2xl font-bold mb-2">No Pinned Words</h2>
        <p className="text-gray-400 mb-6">
          Pin words while studying and they'll appear here.
        </p>
        <button
          onClick={() => navigate('dashboard')}
          className="btn btn-warning"
        >
          ← Dashboard
        </button>
      </div>
    );
  }

  /* ── Early Return: Finished ── */
  if (finished) {
    const correct = words.length - wrong;
    const accuracy = Math.round((correct / words.length) * 100);
    const isStudy = mode === 'study';

    return (
      <div className="text-center fade-up">
        <div style={{ fontSize: 48, marginBottom: 8 }}>
          {isStudy ? '📌' : '🎉'}
        </div>

        <h1 className="text-2xl font-bold mb-4">
          {isStudy ? 'Study Complete!' : 'Pinned Quiz Complete!'}
        </h1>

        {isStudy ? (
          <p className="text-gray-300">
            Reviewed {words.length} word{words.length !== 1 && 's'}
          </p>
        ) : (
          <>
            <p className="text-gray-300">Score: {correct} / {words.length}</p>
            <p className="text-gray-300">Accuracy: {accuracy}%</p>
          </>
        )}

        <div className="flex gap-3 justify-center mt-6">
          <button className="btn btn-warning" onClick={() => reset(mode)}>
            🔄 {isStudy ? 'Study Again' : 'Retry'}
          </button>

          {isStudy ? (
            <button className="btn btn-primary" onClick={() => reset('quiz')}>
              🧠 Take Quiz
            </button>
          ) : (
            <button className="btn btn-ghost" onClick={() => reset('study')}>
              📖 Study Again
            </button>
          )}

          <button
            className="btn"
            onClick={() => navigate('dashboard')}
          >
            🏠 Dashboard
          </button>
        </div>
      </div>
    );
  }

  /* ── Main UI ── */
  return (
    <div className="fade-up" style={{ maxWidth: 540, margin: 'auto' }}>

      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <button
            onClick={() => navigate('dashboard')}
            className="btn btn-ghost btn-back-sm"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold">📌 Pinned</h1>
        </div>

        <div className="page-header-right">
          <ModeToggle mode={mode} onChange={reset} />
          <span className="text-sm text-gray-400">
            {index + 1} / {words.length}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="progress-bar-track mb-8">
        <div
          className="progress-bar-fill"
          style={{
            width: `${progress}%`,
            background: mode === 'study'
              ? '#f59e0b'
              : 'var(--grad-blue)',
          }}
        />
      </div>

      {/* Mode Content */}
      {mode === 'study' ? (
        <FlipCard
          key={`study-${index}`}
          word={currentWord}
          onNext={handleStudyNext}
          onPin={togglePin}
          isPinned={isPinned(currentWord?.id)}
        />
      ) : (
        <QuizCard
          key={`quiz-${index}`}
          word={currentWord}
          options={options}
          onAnswer={handleAnswer}
          onNext={goNext}
        />
      )}
    </div>
  );
};

export default PinnedWords;
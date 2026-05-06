import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { useApp } from '../context/useApp';
import { SECTIONS } from '../data/vocabulary';
import QuizCard from '../components/QuizCard';
import FlipCard from '../components/FlipCard';

const ALL_WORDS = SECTIONS.flatMap(s => s.subBlocks.flatMap(b => b.words));

const buildOptions = (words, idx) => {
  const current = words[idx];
  const others  = words
    .filter((_, i) => i !== idx)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  return [current.word, ...others.map(w => w.word)].sort(() => Math.random() - 0.5);
};

/* ── Mode Toggle ── */
const ModeToggle = ({ mode, onChange }) => (
  <div className="mode-toggle">
    <button
      className={`mode-toggle-btn${mode === 'study' ? ' active' : ''}`}
      onClick={() => onChange('study')}
    >
      📖 Study
    </button>
    <button
      className={`mode-toggle-btn${mode === 'quiz' ? ' active' : ''}`}
      onClick={() => onChange('quiz')}
    >
      🧠 Quiz
    </button>
  </div>
);

const ReviewMode = ({ navigate }) => {
  const { getReviewWords, recordAnswer, togglePin, isPinned } = useApp();

  const words = useMemo(() => getReviewWords(ALL_WORDS), [getReviewWords]);

  const [mode,        setMode]        = useState('study'); // 'study' | 'quiz'
  const [index,       setIndex]       = useState(0);
  const [options,     setOptions]     = useState(() => words.length ? buildOptions(words, 0) : []);
  const [wrong,       setWrong]       = useState(0);
  const [finished,    setFinished]    = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTime = useRef(null);

  useEffect(() => {
    if (words.length > 0 && !startTime.current) {
      startTime.current = Date.now();
    }
  }, [words.length]);

  /* Reset when switching modes */
  const handleModeChange = useCallback((next) => {
    setMode(next);
    setIndex(0);
    setWrong(0);
    setFinished(false);
    setElapsedTime(0);
    startTime.current = Date.now();
    if (next === 'quiz' && words.length) {
      setOptions(buildOptions(words, 0));
    }
  }, [words]);

  /* ── Quiz handlers ── */
  const handleAnswer = (isCorrect) => {
    recordAnswer(words[index].id, isCorrect);
    if (!isCorrect) setWrong(p => p + 1);
  };

  const handleNext = () => {
    const next = index + 1;
    if (next < words.length) {
      setIndex(next);
      if (mode === 'quiz') setOptions(buildOptions(words, next));
    } else {
      const timeTaken = Math.floor((Date.now() - (startTime.current || 0)) / 1000);
      setElapsedTime(timeTaken);
      setFinished(true);
    }
  };

  /* ── Study next: auto records as seen ── */
  const handleStudyNext = useCallback(() => {
    recordAnswer(words[index].id, true);
    const next = index + 1;
    if (next < words.length) {
      setIndex(next);
    } else {
      const timeTaken = Math.floor((Date.now() - (startTime.current || 0)) / 1000);
      setElapsedTime(timeTaken);
      setFinished(true);
    }
  }, [index, words, recordAnswer]);

  /* ── Empty state ── */
  if (!words.length) {
    return (
      <div className="text-center py-12 fade-up">
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
        <h2 className="text-2xl font-bold mb-2">No Review Words</h2>
        <p className="text-gray-400 mb-6">Keep studying and words you struggle with will appear here.</p>
        <button onClick={() => navigate('dashboard')} className="btn btn-primary">← Dashboard</button>
      </div>
    );
  }

  /* ── Finished state ── */
  if (finished) {
    const correct = words.length - wrong;
    const isStudy = mode === 'study';

    return (
      <div className="text-center fade-up">
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>{isStudy ? '📖' : '🔁'}</div>
        <h1 className="text-2xl font-bold mb-4">{isStudy ? 'Study Complete!' : 'Review Quiz Complete!'}</h1>
        {!isStudy && (
          <p className="text-gray-300 mb-2">{correct} / {words.length} correct</p>
        )}
        {isStudy && (
          <p className="text-gray-300 mb-2">Reviewed {words.length} word{words.length !== 1 ? 's' : ''}</p>
        )}
        <p className="text-gray-400 mb-6">Time: {elapsedTime}s</p>

        <div className="flex gap-3 justify-center mt-6 action-row">
          {isStudy ? (
            <>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setIndex(0);
                  setFinished(false);
                  setElapsedTime(0);
                  startTime.current = Date.now();
                }}
              >
                🔄 Study Again
              </button>
              <button
                className="btn btn-warning"
                onClick={() => handleModeChange('quiz')}
              >
                🧠 Take Quiz
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => {
                setIndex(0);
                setOptions(buildOptions(words, 0));
                setWrong(0);
                setFinished(false);
                setElapsedTime(0);
                startTime.current = Date.now();
              }}
            >
              🔄 Retry Quiz
            </button>
          )}
          <button className="btn" onClick={() => navigate('dashboard')}>🏠 Dashboard</button>
        </div>
      </div>
    );
  }

  const pct = Math.round(((index + 1) / words.length) * 100);

  return (
    <div style={{ maxWidth: 500, margin: 'auto', width: '100%' }} className="fade-up">

      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <button
            onClick={() => navigate('dashboard')}
            className="btn btn-ghost btn-back-sm"
            style={{ padding: '6px 12px', fontSize: '13px' }}
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold">🔁 Review</h1>
        </div>
        <div className="page-header-right">
          <ModeToggle mode={mode} onChange={handleModeChange} />
          <span className="text-sm text-gray-400" style={{ whiteSpace:'nowrap' }}>
            {index + 1} / {words.length}
          </span>
        </div>
      </div>

      <div className="progress-bar-track mb-8">
        <div
          className="progress-bar-fill"
          style={{
            width: `${pct}%`,
            background: mode === 'study' ? '#34d399' : '#ef4444',
          }}
        />
      </div>

      {/* Study Mode */}
      {mode === 'study' && (
        <FlipCard
          key={`review-study-${index}`}
          word={words[index]}
          onNext={handleStudyNext}
          onPin={togglePin}
          isPinned={isPinned(words[index]?.id)}
        />
      )}

      {/* Quiz Mode */}
      {mode === 'quiz' && (
        <QuizCard
          key={`review-quiz-${index}`}
          word={words[index]}
          options={options}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default ReviewMode;
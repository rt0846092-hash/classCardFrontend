import { useState, useMemo, useCallback } from 'react';
import { useApp } from '../context/useApp';
import { getWordsBySection, getSectionById } from '../data/vocabulary';
import QuizCard from '../components/QuizCard';

const COUNTS = [10, 20, 30];

const shuffle = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const buildOptions = (words, index) => {
  const current = words[index];
  const others  = shuffle(words.filter((_, i) => i !== index)).slice(0, 3);
  return shuffle([current.word, ...others.map(w => w.word)]);
};

/* ── Streak badge ── */
const StreakBadge = ({ streak }) => {
  if (streak < 2) return null;
  const color = streak >= 10 ? '#f59e0b' : streak >= 5 ? '#a78bfa' : '#34d399';
  const emoji = streak >= 10 ? '🔥' : streak >= 5 ? '⚡' : '✨';
  return (
    <div className="streak-badge" style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      padding: '3px 10px', borderRadius: '99px',
      background: `${color}18`, border: `1px solid ${color}40`,
      color, fontSize: '0.78rem', fontWeight: 700,
      animation: 'popIn 0.3s ease',
    }}>
      {emoji} {streak} streak
    </div>
  );
};

/* ── Count Picker ── */
const CountPicker = ({ section, totalWords, onStart, onBack }) => (
  <div style={{ maxWidth: 420, margin: 'auto', width: '100%' }} className="fade-up">
    <div className="page-header">
      <div className="page-header-left">
        <button className="btn btn-ghost btn-back-sm" onClick={onBack}>← Back</button>
        <h1 className="text-2xl font-bold">🧠 {section?.label}</h1>
      </div>
    </div>

    <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📝</div>
      <h2 style={{ marginBottom: '0.4rem' }}>How many questions?</h2>
      <p className="text-gray-400 mb-6" style={{ fontSize: '0.85rem' }}>
        {totalWords} words available in this section
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {COUNTS.map(count => {
          const available = Math.min(count, totalWords);
          const disabled  = totalWords < 1;
          return (
            <button
              key={count}
              className="btn btn-ghost count-picker-btn"
              disabled={disabled}
              onClick={() => onStart(available)}
              style={{
                padding: '0.9rem 1.5rem', fontSize: '1rem',
                justifyContent: 'space-between',
                border: '1px solid var(--border)',
                opacity: disabled ? 0.4 : 1,
              }}
            >
              <span>{count} Questions</span>
              {available < count && (
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  (only {available} available)
                </span>
              )}
              <span style={{ color: 'var(--accent-blue)', fontSize: '0.85rem', fontWeight: 700 }}>→</span>
            </button>
          );
        })}

        <button
          className="btn btn-primary"
          onClick={() => onStart(totalWords)}
          style={{ padding: '0.9rem 1.5rem', fontSize: '1rem', marginTop: '0.5rem' }}
        >
          All {totalWords} Words
        </button>
      </div>
    </div>
  </div>
);

/* ── Wrong Answers Review ── */
const WrongReview = ({ wrongWords, onRetryWrong, onRetryAll, onDashboard }) => (
  <div style={{ maxWidth: 500, margin: 'auto', width: '100%' }} className="fade-up">
    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>❌</div>
      <h2 className="text-2xl font-bold" style={{ marginBottom: '0.25rem' }}>
        Words to Work On
      </h2>
      <p className="text-gray-400" style={{ fontSize: '0.85rem' }}>
        You missed {wrongWords.length} word{wrongWords.length !== 1 ? 's' : ''}
      </p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
      {wrongWords.map(w => (
        <div
          key={w.id}
          className="card wrong-review-row"
          style={{
            padding: '0.9rem 1.2rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            border: '1px solid rgba(248,113,113,0.2)',
            background: 'rgba(248,113,113,0.04)',
          }}
        >
          <div>
            <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
              {w.word}
            </span>
            <span style={{ marginLeft: '0.75rem', fontSize: '0.9rem', color: 'var(--accent-blue)' }}>
              {w.meaning}
            </span>
          </div>
          <span className="wrong-review-example" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', maxWidth: '45%', textAlign: 'right' }}>
            {w.example}
          </span>
        </div>
      ))}
    </div>

    <div className="flex gap-3 justify-center action-row">
      <button className="btn btn-danger" onClick={onRetryWrong}>🔄 Retry Wrong</button>
      <button className="btn btn-ghost" onClick={onRetryAll}>↺ Retry All</button>
      <button className="btn" onClick={onDashboard}>🏠 Dashboard</button>
    </div>
  </div>
);

/* ── Main Component ── */
const QuizMode = ({ level, navigate }) => {
  const { recordAnswer } = useApp();

  const section  = getSectionById(level);
  const allWords = useMemo(() => getWordsBySection(level), [level]);

  const [screen, setScreen] = useState('picker');

  const [words,      setWords]      = useState([]);
  const [wrongWords, setWrongWords] = useState([]);
  const [index,      setIndex]      = useState(0);
  const [wrong,      setWrong]      = useState(0);
  const [streak,     setStreak]     = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [startTime,  setStartTime]  = useState(null);
  const [endTime,    setEndTime]    = useState(null);

  const options = useMemo(() => {
    if (!words.length || screen !== 'quiz') return [];
    return buildOptions(words, index);
  }, [words, index, screen]);

  const startQuiz = useCallback((wordList) => {
    const picked = shuffle(wordList);
    setWords(picked);
    setIndex(0);
    setWrong(0);
    setStreak(0);
    setBestStreak(0);
    setWrongWords([]);
    setEndTime(null);
    setStartTime(Date.now());
    setScreen('quiz');
  }, []);

  const handleAnswer = useCallback((isCorrect) => {
    recordAnswer(words[index].id, isCorrect);
    if (isCorrect) {
      setStreak(s => {
        const next = s + 1;
        setBestStreak(b => Math.max(b, next));
        return next;
      });
    } else {
      setStreak(0);
      setWrong(p => p + 1);
      setWrongWords(prev => [...prev, words[index]]);
    }
  }, [index, words, recordAnswer]);

  const handleNext = useCallback(() => {
    const next = index + 1;
    if (next < words.length) {
      setIndex(next);
    } else {
      setEndTime(Date.now());
      setScreen('results');
    }
  }, [index, words.length]);

  /* ── Picker ── */
  if (screen === 'picker') {
    return (
      <CountPicker
        section={section}
        totalWords={allWords.length}
        onStart={(count) => startQuiz(allWords.slice(0, count))}
        onBack={() => navigate('dashboard')}
      />
    );
  }

  /* ── Wrong review ── */
  if (screen === 'wrong-review') {
    return (
      <WrongReview
        wrongWords={wrongWords}
        onRetryWrong={() => startQuiz(wrongWords)}
        onRetryAll={() => startQuiz(words)}
        onDashboard={() => navigate('dashboard')}
      />
    );
  }

  /* ── Results ── */
  if (screen === 'results') {
    const correct = words.length - wrong;
    const time    = endTime ? Math.floor((endTime - startTime) / 1000) : 0;
    const pct     = Math.round((correct / words.length) * 100);
    const grade   = pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '👍' : '💪';

    return (
      <div className="text-center fade-up" style={{ maxWidth: 420, margin: 'auto', width: '100%' }}>
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>{grade}</div>
        <h1 className="text-2xl font-bold mb-4">Quiz Complete!</h1>

        <div className="grid-2 results-grid" style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
          {[
            { label: 'Score',       value: `${correct} / ${words.length}`, color: 'var(--accent-blue)' },
            { label: 'Accuracy',    value: `${pct}%`,                      color: pct >= 70 ? 'var(--accent-green)' : pct >= 50 ? 'var(--accent-yellow)' : 'var(--accent-red)' },
            { label: 'Best Streak', value: `${bestStreak} 🔥`,             color: 'var(--accent-yellow)' },
            { label: 'Time',        value: `${time}s`,                     color: 'var(--accent-purple)' },
          ].map(s => (
            <div key={s.label} className="card" style={{ padding: '0.9rem' }}>
              <div className="stat-label">{s.label}</div>
              <div className="stat-card-value" style={{ fontSize: '1.3rem', fontWeight: 800, color: s.color, fontFamily: 'var(--font-display)' }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 justify-center action-row">
          {wrongWords.length > 0 && (
            <button className="btn btn-danger" onClick={() => setScreen('wrong-review')}>
              ❌ {wrongWords.length} Wrong
            </button>
          )}
          <button className="btn btn-ghost" onClick={() => setScreen('picker')}>
            ← Count
          </button>
          <button className="btn btn-primary" onClick={() => startQuiz(words)}>
            🔄 Retry
          </button>
          <button className="btn" onClick={() => navigate('dashboard')}>
            🏠
          </button>
        </div>
      </div>
    );
  }

  /* ── Quiz ── */
  const pct = Math.round(((index + 1) / words.length) * 100);

  return (
    <div style={{ maxWidth: 500, margin: 'auto', width: '100%' }} className="fade-up">
      <div className="page-header">
        <div className="page-header-left">
          <button onClick={() => setScreen('picker')} className="btn btn-ghost btn-back-sm">← Back</button>
          <h1 className="text-2xl font-bold">🧠 {section?.label || level}</h1>
        </div>
        <div className="page-header-right" style={{ flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <span className="text-sm text-gray-400">{index + 1} / {words.length}</span>
          <StreakBadge streak={streak} />
        </div>
      </div>

      <div className="progress-bar-track mb-8">
        <div
          className="progress-bar-fill"
          style={{ width: `${pct}%`, background: section?.color || '#3b82f6' }}
        />
      </div>

      <QuizCard
        key={words[index].id}
        word={words[index]}
        options={options}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />
    </div>
  );
};

export default QuizMode;
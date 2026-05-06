import { useApp } from '../context/useApp';
import { SECTIONS } from '../data/vocabulary';

const sectionEmoji = { beginner: '🌱', middle: '📗', high: '📘', csat: '🏆' };

const Dashboard = ({ navigate }) => {
  const { getStats, pins, getReviewWords, progress } = useApp();

  const stats       = getStats();
  const allWords    = SECTIONS.flatMap(s => s.words);
  const reviewCount = getReviewWords(allWords).length;
  const pinCount    = pins.size;

  // Per-section progress: how many words have been seen at least once
  const getSectionProgress = (section) => {
    const seen = section.words.filter(w => progress[w.id]).length;
    return { seen, total: section.words.length, pct: Math.round((seen / section.words.length) * 100) };
  };

  return (
    <div className="fade-up">
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.25rem' }}>ClassCard 📚</h1>
        <p style={{ color: 'var(--text-muted)' }}>Pick a section to study</p>
      </div>

      {/* Quick stats */}
      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        {[
          { label: 'Words Studied',  value: stats.wordsStudied,  color: 'var(--accent-blue)' },
          { label: 'Total Attempts', value: stats.totalAttempts,  color: 'var(--accent-purple)' },
          { label: 'Accuracy',       value: stats.accuracy + '%', color: stats.accuracy >= 70 ? 'var(--accent-green)' : stats.accuracy >= 50 ? 'var(--accent-yellow)' : 'var(--accent-red)' },
          { label: 'Pinned',         value: pinCount,             color: 'var(--accent-yellow)' },
        ].map(s => (
          <div key={s.label} className="card" style={{ textAlign: 'center', padding: '1rem' }}>
            <div className="stat-label">{s.label}</div>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: s.color, fontFamily: 'var(--font-display)' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Shortcuts */}
      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        <button
          className="card"
          onClick={() => navigate('pinned-study')}
          style={{ cursor: 'pointer', textAlign: 'left', border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.06)' }}
        >
          <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>📌</div>
          <div style={{ fontWeight: '700', marginBottom: '0.2rem' }}>Pinned Words</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{pinCount} word{pinCount !== 1 ? 's' : ''} pinned</div>
        </button>

        <button
          className="card"
          onClick={() => navigate('review')}
          style={{ cursor: 'pointer', textAlign: 'left', border: '1px solid rgba(248,113,113,0.3)', background: 'rgba(248,113,113,0.06)' }}
        >
          <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>🔁</div>
          <div style={{ fontWeight: '700', marginBottom: '0.2rem' }}>Review Quiz</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{reviewCount} word{reviewCount !== 1 ? 's' : ''} to review</div>
        </button>
      </div>

      {/* Sections */}
      <h2 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Study Sections
      </h2>
      <div className="grid-2">
        {SECTIONS.map(section => {
          const { seen, total, pct } = getSectionProgress(section);
          const isComplete = pct === 100;

          return (
            <div
              key={section.id}
              className="card section-card"
              style={{ '--hover-grad': `linear-gradient(135deg, ${section.color}08 0%, transparent 60%)` }}
            >
              {/* Title row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>{sectionEmoji[section.id]}</span>
                  <h3 style={{ fontSize: '1.05rem' }}>{section.label}</h3>
                </div>
                {isComplete
                  ? <span style={{ fontSize: '1rem' }}>✅</span>
                  : <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: section.color, flexShrink: 0 }} />
                }
              </div>

              {/* Description + word count */}
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                {section.description} · {total} words
              </p>

              {/* ── Section progress bar ── */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Progress
                  </span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: isComplete ? 'var(--accent-green)' : section.color }}>
                    {seen} / {total} · {pct}%
                  </span>
                </div>
                <div className="progress-bar-track" style={{ height: '5px' }}>
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${pct}%`,
                      background: isComplete
                        ? 'var(--accent-green)'
                        : `linear-gradient(90deg, ${section.color}99, ${section.color})`,
                    }}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <button
                  className="btn btn-ghost"
                  style={{ flex: 1, fontSize: '0.8rem', borderColor: section.color + '40', color: section.color }}
                  onClick={() => navigate('study', { level: section.id })}
                >
                  📖 Study
                </button>
                <button
                  className="btn btn-ghost"
                  style={{ flex: 1, fontSize: '0.8rem' }}
                  onClick={() => navigate('quiz', { level: section.id })}
                >
                  🧠 Quiz
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
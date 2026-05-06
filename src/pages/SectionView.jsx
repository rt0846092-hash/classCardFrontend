import { useApp } from '../context/useApp';
import { getSectionById } from '../data/vocabulary';

const SectionView = ({ sectionId, navigate }) => {
  const section = getSectionById(sectionId);
  const { progress } = useApp();

  if (!section) {
    return <div className="text-center text-gray-400 py-8">Section not found.</div>;
  }

  const getBlockProgress = (block) => {
    const seen = block.words.filter(w => progress[w.id]).length;
    const pct = Math.round((seen / block.words.length) * 100);
    return { seen, total: block.words.length, pct };
  };

  const allWords = section.subBlocks.flatMap(b => b.words);
  const totalSeen = allWords.filter(w => progress[w.id]).length;
  const totalPct = Math.round((totalSeen / allWords.length) * 100);

  return (
    <div className="fade-up" style={{ maxWidth: 800, margin: 'auto', width: '100%' }}>
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div className="page-header-left">
          <button onClick={() => navigate('dashboard')} className="btn btn-ghost btn-back-sm">
            ← 전체 섹션
          </button>
          <h1 className="text-2xl font-bold">{section.label}</h1>
        </div>
        <div className="page-header-right">
          <span className="text-sm text-gray-400">{totalSeen} / {allWords.length} words</span>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
           섹션 진행률
          </span>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: section.color }}>
            {totalPct}%
          </span>
        </div>
        <div className="progress-bar-track" style={{ height: '8px', borderRadius: '99px' }}>
          <div
            className="progress-bar-fill"
            style={{ width: `${totalPct}%`, background: section.color, borderRadius: '99px' }}
          />
        </div>
      </div>

      <h2 style={{ marginBottom: '1rem', fontSize: '1rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
       이 섹션의 레슨
      </h2>
      
      <div className="grid-2">
        {section.subBlocks.map((block, idx) => {
          const { seen, total, pct } = getBlockProgress(block);
          const isComplete = pct === 100;
          const blockNumber = idx + 1;

          return (
            <div
              key={block.id}
              className="card"
              style={{
                border: `1px solid ${section.color}20`,
                background: `linear-gradient(135deg, ${section.color}04 0%, transparent 100%)`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    background: `${section.color}20`,
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: section.color,
                  }}>
                    {blockNumber}
                  </span>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{block.title}</h3>
                </div>
                {isComplete && <span style={{ fontSize: '0.9rem' }}>✅</span>}
              </div>

              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                {block.description} · {total} words
              </p>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>진행률</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, color: section.color }}>{seen}/{total}</span>
                </div>
                <div className="progress-bar-track" style={{ height: '3px' }}>
                  <div className="progress-bar-fill" style={{ width: `${pct}%`, background: section.color }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className="btn btn-ghost"
                  style={{ flex: 1, fontSize: '0.75rem', padding: '0.5rem', borderColor: `${section.color}40`, color: section.color }}
                  onClick={() => navigate('study', { sectionId: section.id, subBlockId: block.id })}
                >
                  📖 공부 
                </button>
                <button
                  className="btn btn-ghost"
                  style={{ flex: 1, fontSize: '0.75rem', padding: '0.5rem' }}
                  onClick={() => navigate('quiz', { sectionId: section.id, subBlockId: block.id })}
                >
                  🧠 퀴즈
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
      <button
      className="btn btn-ghost"
       onClick={() => navigate('dashboard')}
      style={{ marginBottom: '15px' }}
     >
  ← Back to Dashboard
</button>
      </div>
    </div>
  );
};

export default SectionView;
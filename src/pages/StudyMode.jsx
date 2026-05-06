import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useApp } from '../context/useApp';
import { getSectionById, getSubBlockById, getWordsBySubBlock } from '../data/vocabulary';
import FlipCard from '../components/FlipCard';

const shuffleArr = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const StudyMode = ({ sectionId, subBlockId, navigate }) => {
  const { recordAnswer, togglePin, isPinned } = useApp();

  const section = useMemo(() => getSectionById(sectionId), [sectionId]);
  const subBlock = useMemo(() => getSubBlockById(sectionId, subBlockId), [sectionId, subBlockId]);
  const baseWords = useMemo(() => getWordsBySubBlock(sectionId, subBlockId), [sectionId, subBlockId]);

  const [shuffled, setShuffled] = useState(false);
  const [words, setWords] = useState(baseWords);
  const [index, setIndex] = useState(0);
  const startTimeRef = useRef(null);

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  const handleShuffleToggle = useCallback(() => {
    setShuffled(prev => {
      const next = !prev;
      setWords(next ? shuffleArr(baseWords) : baseWords);
      setIndex(0);
      return next;
    });
  }, [baseWords]);

  const handleNext = useCallback(() => {
    recordAnswer(words[index].id, true);
    if (index < words.length - 1) {
      setIndex(i => i + 1);
    } else {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      navigate('section', { sectionId }, {
        doneMsg: `Done! ${Math.floor(elapsed / 60)}m ${elapsed % 60}s 🎉`,
      });
    }
  }, [index, words, recordAnswer, navigate, sectionId]);

  if (!words.length) {
    return <div className="text-center text-gray-400 py-8">No words found for this lesson.</div>;
  }

  const pct = Math.round(((index + 1) / words.length) * 100);

  return (
    <div style={{ maxWidth: '540px', margin: 'auto', width: '100%' }} className="fade-up">
      <div className="page-header">
        <div className="page-header-left">
          <button
            onClick={() => navigate('section', { sectionId })}
            className="btn btn-ghost btn-back-sm"
            style={{ padding: '6px 12px', fontSize: '13px' }}
          >
            ← 뒤로
          </button>
          <div>
            <h1 className="text-2xl font-bold">📖 {subBlock?.title || 'Study'}</h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{section?.label}</p>
          </div>
        </div>

        <div className="page-header-right">
          <button
            onClick={handleShuffleToggle}
            className="btn btn-ghost"
            style={{
              padding: '5px 10px',
              fontSize: '12px',
              gap: '4px',
              background: shuffled ? 'rgba(167,139,250,0.15)' : 'transparent',
              borderColor: shuffled ? 'var(--accent-purple)' : 'var(--border)',
              color: shuffled ? 'var(--accent-purple)' : 'var(--text-muted)',
            }}
          >
            🔀 <span style={{ display: 'none' }} className="shuffle-label">{shuffled ? 'Shuffled' : 'Shuffle'}</span>
          </button>

          <span className="text-sm text-gray-400" style={{ whiteSpace: 'nowrap' }}>
            {index + 1} / {words.length}
          </span>
        </div>
      </div>

      <div className="progress-bar-track mb-8">
        <div
          className="progress-bar-fill"
          style={{ width: `${pct}%`, background: section?.color || '#3b82f6' }}
        />
      </div>

      <FlipCard
        key={`${shuffled}-${index}`}
        word={words[index]}
        onNext={handleNext}
        onPin={togglePin}
        isPinned={isPinned(words[index]?.id)}
      />
    </div>
  );
};

export default StudyMode;
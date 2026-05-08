import { useState, useEffect, useRef, useCallback } from 'react';
import { speak, isTTSSupported, isWebView } from '../context/speech';

const FlipCard = ({ word = {}, onNext, onPin, isPinned }) => {
  const [isFlipped,    setIsFlipped]    = useState(false);
  const [muted,        setMuted]        = useState(false);
  const [speechStatus, setSpeechStatus] = useState('idle');

  const mutedRef     = useRef(false);
  const ttsSupported = isTTSSupported();
  const inWebView    = isWebView();

  useEffect(() => { mutedRef.current = muted; }, [muted]);

  const doSpeak = useCallback((text) => {
    if (mutedRef.current || !text || !ttsSupported) return;
    setSpeechStatus('speaking');
    speak(text, {
      onDone:  () => setSpeechStatus('idle'),
      onError: () => {
        setSpeechStatus('error');
        setTimeout(() => setSpeechStatus('idle'), 2000);
      },
    });
  }, [ttsSupported]);

  const triggerFlip = useCallback(() => {
    doSpeak(word?.word);
    setIsFlipped(p => !p);
  }, [doSpeak, word?.word]);

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    setTimeout(onNext, 80);
  }, [onNext]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space')                                { e.preventDefault(); triggerFlip(); }
      else if (e.code === 'ArrowRight' || e.code === 'Enter') { e.preventDefault(); handleNext(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [triggerFlip, handleNext]);

  if (!word?.id) {
    return (
      <div className="card text-center">
        <p className="text-gray-400 mb-4">Word not available</p>
        <button className="btn btn-primary" onClick={onNext}>Next →</button>
      </div>
    );
  }

  const soundIcon  = !ttsSupported ? '🔇' : muted ? '🔇' : speechStatus === 'speaking' ? '🔊' : speechStatus === 'error' ? '⚠️' : '🔊';
  const soundLabel = !ttsSupported ? 'No TTS' : muted ? 'Muted' : speechStatus === 'error' ? 'Error' : 'Sound';

  return (
    <div>
      <div
        className={`flip-card${isFlipped ? ' flipped' : ''}`}
        onClick={triggerFlip}
        style={{ marginBottom: '20px', cursor: 'pointer' }}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px', letterSpacing: '-0.02em' }}>
              {word.word}
            </div>
            <p style={{ marginTop: '20px', fontSize: '12px', color: '#4b5563' }}>tap anywhere to reveal</p>
          </div>
          <div className="flip-card-back">
            <div style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>{word.word}</div>
            <div style={{ fontSize: '20px', color: '#60a5fa', marginBottom: '16px' }}>{word.meaning}</div>
            {word.example && (
              <div style={{ fontSize: '13px', color: '#6b7280', fontStyle: 'italic', borderTop: '1px solid #2d3748', paddingTop: '14px', textAlign: 'center', lineHeight: '1.7' }}>
                "{word.example}"
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => {
            const willUnmute = muted;
            setMuted(p => !p);
            if (willUnmute && word?.word) setTimeout(() => doSpeak(word.word), 50);
          }}
          disabled={!ttsSupported}
          className="btn"
          style={{
            background: muted ? 'rgba(239,68,68,0.15)' : speechStatus === 'error' ? 'rgba(245,158,11,0.15)' : 'transparent',
            border: `1px solid ${muted ? '#ef4444' : speechStatus === 'error' ? '#f59e0b' : '#374151'}`,
            color:  muted ? '#f87171' : speechStatus === 'error' ? '#fcd34d' : '#6b7280',
            opacity: !ttsSupported ? 0.4 : 1,
          }}
        >
          {soundIcon} {soundLabel}
        </button>

        <button
          onClick={() => onPin(word.id)}
          className="btn"
          style={{
            background: isPinned ? 'rgba(245,158,11,0.15)' : 'transparent',
            border: `1px solid ${isPinned ? '#f59e0b' : '#374151'}`,
            color:  isPinned ? '#fcd34d' : '#6b7280',
          }}
        >
          {isPinned ? '📌 Pinned' : '📌 Pin'}
        </button>

        <button onClick={handleNext} className="btn btn-primary">Next →</button>
      </div>

      {inWebView && !muted && (
        <p style={{ textAlign: 'center', fontSize: '11px', color: '#f59e0b', marginTop: '8px', opacity: 0.8 }}>
         카카오 브라우저에서는 음성이 제한될 수 있어요. 더 나은 사용을 위해 Android에서는 Chrome, iPhone에서는 Safari 브라우저를 이용해주세요.
        </p>
      )}

      <p style={{ textAlign: 'center', fontSize: '11px', color: '#4b5563', marginTop: '12px' }}>
        Space to flip · Enter or → to next
      </p>
    </div>
  );
};

export default FlipCard;
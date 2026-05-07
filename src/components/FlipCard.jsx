import { useState, useEffect, useRef, useCallback } from 'react';

/* ─────────────────────────────────────────────
   Speech Engine — handles KakaoTalk WebView,
   LINE, Instagram, and all standard browsers.
   
   Root causes in restricted WebViews (KakaoTalk/LINE on Android & iOS):
   1. speechSynthesis exists but speak() silently fails
   2. cancel() kills the audio context before voices load
   3. Voices never fire 'voiceschanged' — must poll
   4. iOS WebView requires a direct user-gesture call chain
   5. Android WebView (Chromium-based KakaoTalk) needs
      a resumed AudioContext before TTS will work
───────────────────────────────────────────── */

const SpeechEngine = (() => {
  let voices = [];
  
  let audioCtx = null;

  // Detect KakaoTalk / restricted WebView
  const isRestrictedWebView = () => {
    const ua = navigator.userAgent || '';
    return (
      /KAKAO/i.test(ua) ||
      /Line\//i.test(ua) ||
      /Instagram/i.test(ua) ||
      /FB_IAB/i.test(ua) ||
      // Generic Android WebView (not Chrome)
      (/Android/.test(ua) && /wv/.test(ua) && !/Chrome\/\d/.test(ua))
    );
  };

  // Try to resume/create AudioContext — needed on Android WebView
  const unlockAudioContext = () => {
    try {
      if (!audioCtx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          audioCtx = new AudioCtx();
        }
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    } catch (err) {
  console.warn(err);
}
  };

  // Load voices with polling fallback (WebViews often miss 'voiceschanged')
  const loadVoices = () => {
    if (!window.speechSynthesis) return;
    const attempt = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length) {
        voices = v;
        return true;
      }
      return false;
    };
    if (!attempt()) {
      // Standard event
      window.speechSynthesis.addEventListener('voiceschanged', () => attempt());
      // Polling fallback for WebViews that never fire the event
      let tries = 0;
      const poll = setInterval(() => {
        if (attempt() || ++tries > 20) clearInterval(poll);
      }, 250);
    }
  };

  loadVoices();

  // Pick best English/Korean voice
  const pickVoice = () => {
    if (!voices.length) voices = window.speechSynthesis?.getVoices() || [];
    // Prefer Korean voices for Korean content, fall back to English
    const preferred = voices.find(v => /ko[-_]/i.test(v.lang))
      || voices.find(v => /en[-_]US/i.test(v.lang))
      || voices.find(v => /en/i.test(v.lang))
      || voices[0]
      || null;
    return preferred;
  };

  const speak = (text, { onDone, onError } = {}) => {
    if (!text) return;
    if (!window.speechSynthesis) {
      onError?.('not_supported');
      return;
    }

    unlockAudioContext();

    // On restricted WebViews, don't cancel — it breaks things.
    // On standard browsers, cancel is fine to stop previous speech.
    if (!isRestrictedWebView()) {
      window.speechSynthesis.cancel();
    }

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang  = 'en-US';
    utter.rate  = 0.9;
    utter.pitch = 1;

    const voice = pickVoice();
    if (voice) utter.voice = voice;

    utter.onend   = () => onDone?.();
    utter.onerror = (e) => {
      // 'interrupted' is harmless — fired when a new utterance cancels the old one
      if (e.error !== 'interrupted') onError?.(e.error);
    };

    // KakaoTalk iOS WebView: speech must be triggered synchronously
    // inside the event handler. We use a tiny timeout(0) trick only on
    // Android where direct call sometimes fails.
    if (/Android/i.test(navigator.userAgent) && isRestrictedWebView()) {
      setTimeout(() => {
        try { window.speechSynthesis.speak(utter); } catch (err){
          console.warn(err);
        } { onError?.('speak_failed'); }
      }, 0);
    } else {
      try { window.speechSynthesis.speak(utter); } catch (err) {
        console.warn(err);
        onError?.('speak_failed');
      }
    }


  };

  const isSupported = () => !!window.speechSynthesis;

  return { speak, isSupported, isRestrictedWebView };
})();

/* ─────────────────────────────────────────────
   FlipCard Component
───────────────────────────────────────────── */
const FlipCard = ({ word = {}, onNext, onPin, isPinned }) => {
  const [isFlipped,    setIsFlipped]    = useState(false);
  const [muted,        setMuted]        = useState(false);
  const [speechStatus, setSpeechStatus] = useState('idle'); // idle | speaking | error | unsupported
  const mutedRef = useRef(false);

  const speechSupported = SpeechEngine.isSupported();
  const isKakao         = SpeechEngine.isRestrictedWebView();

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  const speak = useCallback((text) => {
    if (mutedRef.current || !text || !speechSupported) return;

    setSpeechStatus('speaking');
    SpeechEngine.speak(text, {
      onDone:  () => setSpeechStatus('idle'),
      onError: (err) => {
        console.warn('[Speech] error:', err);
        setSpeechStatus(err === 'not_supported' ? 'unsupported' : 'error');
        // Auto-reset after 2s so icon doesn't stay red
        setTimeout(() => setSpeechStatus('idle'), 2000);
      },
    });
  }, [speechSupported]);

  const triggerFlip = useCallback(() => {
    speak(word?.word);
    setIsFlipped(p => !p);
  }, [speak, word?.word]);

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    setTimeout(onNext, 80);
  }, [onNext]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        triggerFlip();
      } else if (e.code === 'ArrowRight' || e.code === 'Enter') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [triggerFlip, handleNext]);

  // Sound button icon + color
  const soundIcon = () => {
    if (!speechSupported) return '🔇';
    if (muted)            return '🔇';
    if (speechStatus === 'speaking') return '🔊';
    if (speechStatus === 'error')    return '⚠️';
    return '🔊';
  };

  const soundLabel = () => {
    if (!speechSupported) return 'No TTS';
    if (muted)            return 'Muted';
    if (speechStatus === 'error') return 'Retry';
    return muted ? 'Muted' : 'Sound';
  };

  if (!word || !word.id) {
    return (
      <div className="card text-center">
        <p className="text-gray-400 mb-4">Word not available</p>
        <button className="btn btn-primary" onClick={onNext}>Next →</button>
      </div>
    );
  }

  return (
    <div>
      <div
        className={`flip-card${isFlipped ? ' flipped' : ''}`}
        onClick={triggerFlip}
        style={{ marginBottom: '20px', cursor: 'pointer' }}
      >
        <div className="flip-card-inner">
          {/* Front */}
          <div className="flip-card-front">
            <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px', letterSpacing: '-0.02em' }}>
              {word.word}
            </div>
            <p style={{ marginTop: '20px', fontSize: '12px', color: '#4b5563' }}>tap anywhere to reveal</p>
          </div>

          {/* Back */}
          <div className="flip-card-back">
            <div style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>{word.word}</div>
            <div style={{ fontSize: '20px', color: '#60a5fa', marginBottom: '16px' }}>{word.meaning}</div>
            {word.example && (
              <div style={{
                fontSize: '13px',
                color: '#6b7280',
                fontStyle: 'italic',
                borderTop: '1px solid #2d3748',
                paddingTop: '14px',
                textAlign: 'center',
                lineHeight: '1.7'
              }}>
                "{word.example}"
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>

        {/* Sound / Mute button */}
        <button
          onClick={() => {
            // Toggling mute off = also attempt to speak right now
            const willUnmute = muted;
            setMuted(p => !p);
            if (willUnmute && word?.word) {
              // Small delay so mutedRef updates first
              setTimeout(() => speak(word.word), 50);
            }
          }}
          disabled={!speechSupported}
          className="btn"
          style={{
            background: muted
              ? 'rgba(239,68,68,0.15)'
              : speechStatus === 'error'
              ? 'rgba(245,158,11,0.15)'
              : 'transparent',
            border: `1px solid ${
              muted ? '#ef4444'
              : speechStatus === 'error' ? '#f59e0b'
              : '#374151'
            }`,
            color: muted ? '#f87171'
              : speechStatus === 'error' ? '#fcd34d'
              : '#6b7280',
            opacity: !speechSupported ? 0.4 : 1,
          }}
          title={isKakao ? '카카오 브라우저: 음성 제한이 있을 수 있습니다' : ''}
        >
          {soundIcon()} {soundLabel()}
        </button>

        <button
          onClick={() => onPin(word.id)}
          className="btn"
          style={{
            background: isPinned ? 'rgba(245,158,11,0.15)' : 'transparent',
            border: `1px solid ${isPinned ? '#f59e0b' : '#374151'}`,
            color: isPinned ? '#fcd34d' : '#6b7280',
          }}
        >
          {isPinned ? '📌 Pinned' : '📌 Pin'}
        </button>

        <button onClick={handleNext} className="btn btn-primary">Next →</button>
      </div>

      {/* Show a friendly warning inside KakaoTalk */}
      {isKakao && !muted && (
        <p style={{
          textAlign: 'center',
          fontSize: '11px',
          color: '#f59e0b',
          marginTop: '8px',
          opacity: 0.8,
        }}>
          카카오 브라우저에서는 음성이 제한될 수 있어요. Chrome에서 열면 더 잘 작동합니다.
        </p>
      )}

      <p style={{ textAlign: 'center', fontSize: '11px', color: '#4b5563', marginTop: '12px' }}>
        Space to flip · Enter or → to next
      </p>
    </div>
  );
};

export default FlipCard;
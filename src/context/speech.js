/**
 * speech.js — Single shared TTS engine for the entire app.
 * Place this file at: src/context/speech.js
 *
 * Both FlipCard and QuizCard import from here so voice/rate/pitch
 * are identical everywhere.
 */

let _voices   = [];
let _audioCtx = null;

// ─── Environment detection ─────────────────────────────────────────────────
export const isWebView = () => {
  const ua = navigator.userAgent || '';
  return (
    /KAKAO/i.test(ua)     ||
    /Line\//i.test(ua)    ||
    /Instagram/i.test(ua) ||
    /FB_IAB/i.test(ua)    ||
    (/Android/.test(ua) && /wv/.test(ua) && !/Chrome\/\d/.test(ua))
  );
};

const isElectron = () => /Electron/i.test(navigator.userAgent);

// ─── AudioContext unlock (Android WebView) ─────────────────────────────────
const unlockAudio = () => {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!_audioCtx) _audioCtx = new AC();
    if (_audioCtx.state === 'suspended') _audioCtx.resume();
  } catch (_) {}
};

// ─── Voice loading with polling fallback ──────────────────────────────────
const loadVoices = () => {
  if (!window.speechSynthesis) return;
  const grab = () => {
    const v = window.speechSynthesis.getVoices();
    if (v.length) { _voices = v; return true; }
    return false;
  };
  if (!grab()) {
    window.speechSynthesis.addEventListener('voiceschanged', grab);
    let n = 0;
    const t = setInterval(() => { if (grab() || ++n > 30) clearInterval(t); }, 200);
  }
};

if (typeof window !== 'undefined') loadVoices();

// ─── Voice picker — prefers Google en-US, most consistent across devices ──
const pickVoice = () => {
  if (!_voices.length) _voices = window.speechSynthesis?.getVoices() || [];
  return (
    _voices.find(v => /en[-_]US/i.test(v.lang) && /google/i.test(v.name)) ||
    _voices.find(v => /en[-_]US/i.test(v.lang))                           ||
    _voices.find(v => /en[-_]GB/i.test(v.lang))                           ||
    _voices.find(v => /en/i.test(v.lang))                                  ||
    _voices[0]                                                              ||
    null
  );
};

// ─── Public API ────────────────────────────────────────────────────────────

/**
 * speak(text, options?)
 * Consistent settings used everywhere in the app:
 *   lang  : en-US
 *   rate  : 0.88  (clear pace for language learners)
 *   pitch : 1.0   (neutral)
 */
export const speak = (text, { onDone, onError } = {}) => {
  if (!text || !window.speechSynthesis) { onError?.('not_supported'); return; }

  unlockAudio();

  // cancel() before speak() corrupts audio in Electron (VS Code preview)
  // and some WebViews — skip it in those environments
  if (!isElectron() && !isWebView()) {
    window.speechSynthesis.cancel();
  }

  const utt   = new SpeechSynthesisUtterance(text);
  utt.lang    = 'en-US';
  utt.rate    = 0.88;
  utt.pitch   = 1.0;

  const voice = pickVoice();
  if (voice) utt.voice = voice;

  utt.onend   = () => onDone?.();
  utt.onerror = (e) => { if (e.error !== 'interrupted') onError?.(e.error); };

  // Android WebView: setTimeout(0) prevents race with gesture handler
  if (/Android/i.test(navigator.userAgent) && isWebView()) {
    setTimeout(() => {
      try { window.speechSynthesis.speak(utt); }
      catch (err) { console.warn('[speech]', err); onError?.('speak_failed'); }
    }, 0);
  } else {
    try { window.speechSynthesis.speak(utt); }
    catch (err) { console.warn('[speech]', err); onError?.('speak_failed'); }
  }
};

export const isTTSSupported = () => !!window.speechSynthesis;

/**
 * warmUp() — call once on first user gesture.
 * iOS Safari and WebViews require a speech call inside a user-gesture
 * before they will play any audio at all.
 */
export const warmUp = () => {
  if (!window.speechSynthesis) return;
  try {
    const u = new SpeechSynthesisUtterance('');
    u.volume = 0;
    window.speechSynthesis.speak(u);
  } catch (_) {}
};
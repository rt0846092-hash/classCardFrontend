// LocalStorage helpers — with in-memory fallback for Kakao / sandboxed WebViews

const memoryStore = {};

export const STORAGE_KEYS = {
  USER: 'cc_user',
  PROGRESS: 'cc_progress',
  PINS: 'cc_pins',
};

export const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : (key in memoryStore ? memoryStore[key] : fallback);
  } catch {
    return key in memoryStore ? memoryStore[key] : fallback;
  }
};

export const save = (key, value) => {
  memoryStore[key] = value; // always keep an in-memory copy
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage blocked (Kakao / private mode) — memoryStore used as fallback
  }
};
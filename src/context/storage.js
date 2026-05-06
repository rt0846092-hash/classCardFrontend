// LocalStorage helpers

export const STORAGE_KEYS = {
  USER: 'cc_user',
  PROGRESS: 'cc_progress',
  PINS: 'cc_pins',
};

export const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch (e) {
    return fallback;
  }
};

export const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
};
import { useState, useEffect } from 'react';

const THEME_KEY = 'cc_theme';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // 1. Check localStorage first
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {}
    // 2. Respect OS preference
    if (window.matchMedia?.('(prefers-color-scheme: light)').matches) return 'light';
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  const isDark = theme === 'dark';

  return { theme, isDark, toggleTheme };
};
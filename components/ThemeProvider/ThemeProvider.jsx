'use client';

import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';

const ThemeContext = createContext();

export const VALID_THEMES = [
  'dark', 'light', 'monochrome', 'monochrome-inverted',
  'vintage', 'apple', 'c64', 'amber', 'synthwave',
  'dracula', 'solarized', 'nord', 'cobalt', 'skynet',
];

const VALID_THEME_SET = new Set(VALID_THEMES);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  const getSystemTheme = useCallback(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark';
    }
    return 'dark';
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const domTheme = document.documentElement.getAttribute('data-theme');
    /* Prefer saved theme so we recover after navigation/full reload if inline script list was stale */
    const resolved = VALID_THEME_SET.has(stored)
      ? stored
      : VALID_THEME_SET.has(domTheme)
        ? domTheme
        : getSystemTheme();

    if (resolved !== theme) {
      setTheme(resolved);
    }

    setMounted(true);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleSystemThemeChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'light' : 'dark');
      }
    };
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (mounted) {
      if (document.documentElement.getAttribute('data-theme') !== theme) {
        document.documentElement.setAttribute('data-theme', theme);
      }
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const idx = VALID_THEMES.indexOf(prev);
      return VALID_THEMES[(idx + 1) % VALID_THEMES.length];
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('themeManual', '1');
    }
  }, []);

  const changeTheme = useCallback((newTheme) => {
    if (VALID_THEME_SET.has(newTheme)) {
      setTheme(newTheme);
      if (typeof window !== 'undefined') {
        localStorage.setItem('themeManual', '1');
      }
    }
  }, []);

  const value = useMemo(() => ({
    theme,
    toggleTheme,
    changeTheme,
    mounted,
  }), [theme, toggleTheme, changeTheme, mounted]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

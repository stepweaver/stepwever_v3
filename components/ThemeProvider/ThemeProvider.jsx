'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  // Get system theme preference
  const getSystemTheme = () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark';
    }
    return 'dark'; // Default fallback
  };

  // Initialize theme from localStorage or system preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = getSystemTheme();
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    setMounted(true);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleSystemThemeChange = (e) => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'light' : 'dark');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  // Update document class and localStorage when theme changes
  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const value = {
    theme,
    toggleTheme,
    mounted,
  };

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

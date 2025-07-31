'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark'); // Default fallback
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

  // Get user's preferred theme from DOM (set by script), localStorage, or system preference
  const getUserPreferredTheme = () => {
    if (typeof window !== 'undefined') {
      // First check if theme is already set on the document element (by our script)
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'light' || currentTheme === 'dark') {
        return currentTheme;
      }

      // Fallback to localStorage or system preference
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      return getSystemTheme();
    }
    return 'dark'; // SSR fallback
  };

  // Initialize theme after component mounts to avoid hydration mismatch
  useEffect(() => {
    const userPreferredTheme = getUserPreferredTheme();

    // Only update if the theme is different to prevent unnecessary re-renders
    if (userPreferredTheme !== theme) {
      setTheme(userPreferredTheme);
    }

    setMounted(true);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleSystemThemeChange = (e) => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'light' : 'dark');
      }
    };

    // Use modern event listener API for better performance
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleSystemThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleSystemThemeChange);
      }
    };
  }, []); // Empty dependency array to run only once on mount

  // Update document class and localStorage when theme changes
  useEffect(() => {
    if (mounted) {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      // Only update if the theme is different to prevent unnecessary DOM updates
      if (currentTheme !== theme) {
        document.documentElement.setAttribute('data-theme', theme);
      }
      // Always update localStorage to persist the preference
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

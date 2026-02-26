'use client';

import { useTheme } from '../ThemeProvider/ThemeProvider';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const { theme, changeTheme, mounted } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const themes = [
    { value: 'dark', label: 'DARK' },
    { value: 'light', label: 'LIGHT' },
    { value: 'monochrome', label: 'MONO' },
    { value: 'monochrome-inverted', label: 'INVERT' },
    { value: 'vintage', label: 'DOS' },
    { value: 'apple', label: 'APPLE' },
    { value: 'c64', label: 'C64' },
    { value: 'amber', label: 'AMBER' },
    { value: 'synthwave', label: 'SYNTH' },
    { value: 'dracula', label: 'DRACULA' },
    { value: 'solarized', label: 'SOLAR' },
    { value: 'nord', label: 'NORD' },
    { value: 'cobalt', label: 'COBALT' },
  ];

  const currentTheme = themes.find(t => t.value === theme);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleThemeSelect = (themeValue) => {
    changeTheme(themeValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleOptionKeyDown = (e, themeValue) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleThemeSelect(themeValue);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const options = dropdownRef.current?.querySelectorAll('.theme-grid-option');
      if (!options) return;
      const idx = Array.from(options).indexOf(e.currentTarget);
      const next = e.key === 'ArrowDown'
        ? options[(idx + 1) % options.length]
        : options[(idx - 1 + options.length) % options.length];
      next?.focus();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Always render the same structure to prevent hydration mismatch
  return (
    <div className='flex items-center gap-3'>
      {!mounted ? (
        // Skeleton state - matches the structure of the actual component
        <div className='w-32 h-10 motion-safe:animate-pulse bg-terminal-border rounded-sm' />
      ) : (
        // CRT-style dropdown
        <div className='theme-dropdown-container' ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            className={`theme-dropdown-trigger ${theme}`}
            aria-label='Select theme'
            aria-haspopup='listbox'
            aria-expanded={isOpen}
          >
            <Image
              src='/images/lambda_stepweaver.png'
              alt='Lambda'
              width={16}
              height={16}
              className={`lambda-icon ${theme}`}
              sizes='16px'
              style={{ width: 'auto', height: 'auto' }}
            />
            <span className='theme-dropdown-label'>{currentTheme?.label}</span>
            <span className={`theme-dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
          </button>

          {isOpen && (
            <div className={`theme-grid-menu ${theme}`} role='listbox'>
              {themes.map((themeOption) => (
                <button
                  key={themeOption.value}
                  onClick={() => handleThemeSelect(themeOption.value)}
                  onKeyDown={(e) => handleOptionKeyDown(e, themeOption.value)}
                  className={`theme-grid-option ${themeOption.value} ${
                    theme === themeOption.value ? 'active' : ''
                  }`}
                  role='option'
                  aria-selected={theme === themeOption.value}
                  tabIndex={0}
                >
                  <Image
                    src='/images/lambda_stepweaver.png'
                    alt='Lambda'
                    width={14}
                    height={14}
                    className={`lambda-icon-grid ${themeOption.value}`}
                    sizes='14px'
                    style={{ width: 'auto', height: 'auto' }}
                  />
                  <span className='theme-label'>{themeOption.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

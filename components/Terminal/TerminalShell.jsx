'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from '../../styles/terminal.module.css';

const TerminalAppearanceContext = createContext({
  appearance: 'focus',
  setAppearance: () => {},
});

export function useTerminalAppearance() {
  return useContext(TerminalAppearanceContext);
}

export default function TerminalShell({ children, fullPage = false }) {
  const [appearance, setAppearance] = useState('focus');

  // hydrate from localStorage on client
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('terminalAppearance');
    if (stored === 'focus' || stored === 'skynet') {
      setAppearance(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('terminalAppearance', appearance);
  }, [appearance]);

  const wrapperClassName = useMemo(() => {
    const sizeClass = fullPage ? styles.sizeFull : styles.sizeEmbedded;
    const modeClass =
      appearance === 'skynet' ? styles.modeSkynet : styles.modeFocus;

    return [
      styles.terminalRoot,
      styles.container,
      styles.terminalWindowShadow,
      styles.crtTerminal,
      sizeClass,
      modeClass,
      styles.scrollbarVisible,
    ].join(' ');
  }, [appearance, fullPage]);

  return (
    <TerminalAppearanceContext.Provider value={{ appearance, setAppearance }}>
      <section
        className={wrapperClassName + ' h-full flex flex-col min-h-0'}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem 0.75rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
            {appearance === 'focus' ? 'FOCUS MODE' : 'SKYNET MODE'}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type='button'
              onClick={() => setAppearance('focus')}
              aria-pressed={appearance === 'focus'}
            >
              Focus
            </button>
            <button
              type='button'
              onClick={() => setAppearance('skynet')}
              aria-pressed={appearance === 'skynet'}
            >
              Skynet
            </button>
          </div>
        </div>

        <div className='flex-1 min-h-0 px-2 py-1 sm:px-3 sm:py-2'>
          {children}
        </div>
      </section>
    </TerminalAppearanceContext.Provider>
  );
}

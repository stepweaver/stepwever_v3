'use client';

import styles from './TerminalWindow.module.css';

export default function TerminalWindow({
  children,
  title = '~/terminal',
  className = '',
  showHeader = true,
}) {
  return (
    <div className={`${styles.terminalWindow} ${className}`}>
      {showHeader && (
        <div className={styles.terminalHeader}>
          <div className={styles.terminalButtons}>
            <div className={styles.closeButton}></div>
            <div className={styles.minimizeButton}></div>
            <div className={styles.maximizeButton}></div>
          </div>
          <div className={styles.terminalTitle}>{title}</div>
        </div>
      )}
      <div className={styles.terminalContent}>{children}</div>
    </div>
  );
}

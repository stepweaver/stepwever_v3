'use client';

import { useState, useEffect, useRef, useCallback, useMemo, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Terminal, FileText, Zap, BookOpen, Mail, FolderOpen, ChevronRight } from 'lucide-react';
import { PROJECTS_DATA } from '@/lib/projectsData';

const STATIC_COMMANDS = [
  {
    group: 'Navigate',
    items: [
      { id: 'home', label: 'Home', href: '/', icon: ChevronRight },
      { id: 'services', label: 'Services', href: '/services', icon: Zap },
      { id: 'services-lead', label: 'Services / Lead Systems', href: '/services/lead-systems', icon: Zap },
      { id: 'services-automation', label: 'Services / Automation', href: '/services/automation', icon: Zap },
      { id: 'services-web', label: 'Services / Web Platforms', href: '/services/web-platforms', icon: Zap },
      { id: 'capabilities', label: 'Capabilities', href: '/capabilities', icon: ChevronRight },
      { id: 'start-here', label: 'Start Here', href: '/start-here', icon: ChevronRight },
      { id: 'brief', label: 'Brief', href: '/brief', icon: FileText },
      { id: 'projects', label: 'All Projects', href: '/projects', icon: FolderOpen },
      { id: 'resume', label: 'Resume', href: '/resume', icon: FileText },
      { id: 'codex', label: 'Codex', href: '/codex', icon: BookOpen },
      { id: 'contact', label: 'Contact', href: '/contact', icon: Mail },
      { id: 'terminal', label: 'Terminal', href: '/terminal', icon: Terminal },
    ],
  },
];

function buildProjectCommands() {
  return Object.entries(PROJECTS_DATA)
    .filter(([, p]) => p?.title && p?.description)
    .map(([slug, p]) => ({
      id: `project-${slug}`,
      label: p.title,
      href: `/projects/${slug}`,
      icon: FolderOpen,
      meta: p.tags?.[0] || '',
    }));
}

function matchesQuery(text, query) {
  if (!query) return true;
  return text.toLowerCase().includes(query.toLowerCase());
}

export default function GlobalCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const selectedIndexRef = useRef(0);
  const router = useRouter();

  selectedIndexRef.current = selectedIndex;

  const projectCommands = useMemo(() => buildProjectCommands(), []);

  const allGroups = useMemo(
    () => [...STATIC_COMMANDS, { group: 'Projects', items: projectCommands }],
    [projectCommands]
  );

  const filteredGroups = useMemo(
    () =>
      allGroups
        .map((group) => ({
          ...group,
          items: group.items.filter(
            (item) => matchesQuery(item.label, query) || matchesQuery(item.meta || '', query)
          ),
        }))
        .filter((group) => group.items.length > 0),
    [allGroups, query]
  );

  const { flatItems, rows } = useMemo(() => {
    const flat = [];
    const out = [];
    for (const group of filteredGroups) {
      out.push({ kind: 'header', key: `hdr-${group.group}`, label: group.group });
      for (const item of group.items) {
        const index = flat.length;
        flat.push(item);
        out.push({ kind: 'item', key: item.id, item, index });
      }
    }
    return { flatItems: flat, rows: out };
  }, [filteredGroups]);

  const openPalette = useCallback(() => {
    setIsOpen(true);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery('');
  }, []);

  const executeItem = useCallback(
    (item) => {
      if (!item) return;
      closePalette();
      if (item.href?.startsWith('http')) {
        window.open(item.href, '_blank', 'noopener,noreferrer');
      } else {
        router.push(item.href);
      }
    },
    [closePalette, router]
  );

  // Capture phase: beat browser shortcuts (e.g. Chrome Cmd+K) and work on every route
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        e.stopPropagation();
        if (isOpen) {
          closePalette();
        } else {
          openPalette();
        }
        return;
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        closePalette();
      }
    };
    window.addEventListener('keydown', handler, true);
    return () => window.removeEventListener('keydown', handler, true);
  }, [isOpen, openPalette, closePalette]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (flatItems.length === 0) return;
    setSelectedIndex((i) => Math.min(Math.max(0, i), flatItems.length - 1));
  }, [flatItems.length]);

  useLayoutEffect(() => {
    if (!isOpen || flatItems.length === 0) return;
    const el = listRef.current?.querySelector(`[data-palette-index="${selectedIndex}"]`);
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [isOpen, selectedIndex, flatItems.length, query]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, flatItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = flatItems[selectedIndexRef.current];
      executeItem(item);
    }
  };

  if (!isOpen) {
    return (
      <button
        type='button'
        onClick={openPalette}
        className='fixed bottom-20 right-4 sm:right-6 z-[90] flex items-center gap-2 border border-neon/20 bg-panel/80 backdrop-blur-sm px-3 py-1.5 font-ocr text-xs text-neon/50 uppercase tracking-[0.15em] hover:border-neon/45 hover:text-neon/80 transition-all'
        style={{ background: 'rgb(var(--panel) / 0.85)' }}
        aria-label='Open command palette (Ctrl+K)'
      >
        <Search className='w-3 h-3' />
        <span className='hidden sm:inline'>⌘K</span>
        <span className='sm:hidden'>Go</span>
      </button>
    );
  }

  return (
    <>
      <div
        className='fixed inset-0 z-[180] bg-black/60 backdrop-blur-sm'
        onClick={closePalette}
        aria-hidden
      />

      <div
        role='dialog'
        aria-label='Command palette'
        aria-modal='true'
        className='fixed top-[15vh] left-1/2 -translate-x-1/2 z-[190] w-[min(640px,calc(100vw-2rem))] border border-neon/30 bg-terminal-dark shadow-[0_0_40px_rgb(var(--neon)/0.15),0_4px_40px_rgba(0,0,0,0.6)]'
      >
        <div className='flex items-center gap-3 px-4 py-3 border-b border-neon/20'>
          <Search className='w-4 h-4 text-neon/50 shrink-0' />
          <input
            ref={inputRef}
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Jump to page, project, or service...'
            className='flex-1 bg-transparent font-ocr text-sm text-text placeholder:text-text/30 focus:outline-none'
            aria-label='Search commands'
            aria-activedescendant={
              flatItems.length > 0 ? `palette-option-${selectedIndex}` : undefined
            }
            autoComplete='off'
          />
          <span className='font-ocr text-[10px] text-neon/30 uppercase tracking-[0.15em] shrink-0'>
            Esc
          </span>
        </div>

        <div
          ref={listRef}
          id='palette-results'
          role='listbox'
          aria-label='Commands'
          className='max-h-[60vh] overflow-y-auto overscroll-contain py-1'
        >
          {filteredGroups.length === 0 && (
            <div className='px-4 py-6 text-center font-ocr text-sm text-text/30'>
              No results for &quot;{query}&quot;
            </div>
          )}

          {rows.map((row) => {
            if (row.kind === 'header') {
              return (
                <div
                  key={row.key}
                  role='presentation'
                  className='px-4 py-1.5 font-ocr text-[9px] uppercase tracking-[0.25em] text-neon/30 sticky top-0 bg-terminal-dark z-[1] border-b border-neon/10'
                >
                  {row.label}
                </div>
              );
            }

            const { item, index } = row;
            const Icon = item.icon || ChevronRight;
            const isSelected = index === selectedIndex;

            /* Inline styles: Tailwind v4 parses `/` inside arbitrary values like
               bg-[rgb(var(--neon)/0.3)] as an opacity suffix, so those classes never apply. */
            const selectedRowStyle = isSelected
              ? {
                  backgroundColor: 'rgb(var(--neon) / 0.42)',
                  borderLeftColor: 'rgb(var(--neon))',
                  borderLeftWidth: '4px',
                  borderLeftStyle: 'solid',
                  color: 'rgb(var(--neon))',
                  boxShadow:
                    'inset 0 0 0 1px rgb(var(--neon) / 0.65), 0 0 32px rgb(var(--neon) / 0.35)',
                }
              : undefined;

            return (
              <button
                key={row.key}
                type='button'
                id={`palette-option-${index}`}
                role='option'
                aria-selected={isSelected}
                data-palette-index={index}
                data-selected={isSelected ? 'true' : undefined}
                onClick={() => executeItem(item)}
                onMouseEnter={() => setSelectedIndex(index)}
                style={selectedRowStyle}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-[background-color,box-shadow,color,border-color] duration-150 border-l-4 ${
                  isSelected
                    ? 'font-medium'
                    : 'border-transparent text-text-secondary hover:bg-panel/55'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 shrink-0 ${isSelected ? '' : 'text-neon/45'}`}
                />
                <span className={`font-ibm text-sm flex-1 ${isSelected ? 'font-semibold tracking-wide' : ''}`}>
                  {item.label}
                </span>
                {item.meta && (
                  <span
                    className={`font-ocr text-[10px] shrink-0 ${isSelected ? '' : 'text-text/30'}`}
                    style={
                      isSelected ? { color: 'rgb(var(--neon) / 0.88)' } : undefined
                    }
                  >
                    {item.meta}
                  </span>
                )}
                {isSelected && (
                  <ArrowRight
                    className='w-3 h-3 shrink-0 opacity-95'
                    style={{ color: 'rgb(var(--neon))' }}
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className='border-t border-neon/15 px-4 py-2 flex flex-wrap items-center gap-x-4 gap-y-1'>
          <span className='font-ocr text-[9px] uppercase tracking-[0.2em] text-text/40'>
            ↑↓ select
          </span>
          <span className='font-ocr text-[9px] uppercase tracking-[0.2em] text-text/40'>
            ↵ open only
          </span>
          <span className='font-ocr text-[9px] uppercase tracking-[0.2em] text-text/40'>
            Esc close
          </span>
        </div>
      </div>
    </>
  );
}

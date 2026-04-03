'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  const router = useRouter();

  const projectCommands = buildProjectCommands();

  const allGroups = [
    ...STATIC_COMMANDS,
    { group: 'Projects', items: projectCommands },
  ];

  const filteredGroups = allGroups
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) => matchesQuery(item.label, query) || matchesQuery(item.meta || '', query)
      ),
    }))
    .filter((group) => group.items.length > 0);

  const flatItems = filteredGroups.flatMap((g) => g.items);

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

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          closePalette();
        } else {
          openPalette();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        closePalette();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, openPalette, closePalette]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, flatItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeItem(flatItems[selectedIndex]);
    }
  };

  if (!isOpen) {
    return (
      <button
        type='button'
        onClick={openPalette}
        className='fixed bottom-20 right-4 sm:right-6 z-[90] hidden md:flex items-center gap-2 border border-neon/20 bg-panel/80 backdrop-blur-sm px-3 py-1.5 font-ocr text-xs text-neon/50 uppercase tracking-[0.15em] hover:border-neon/45 hover:text-neon/80 transition-all'
        aria-label='Open command palette (Ctrl+K)'
      >
        <Search className='w-3 h-3' />
        <span>Cmd+K</span>
      </button>
    );
  }

  let globalIdx = 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 z-[180] bg-black/60 backdrop-blur-sm'
        onClick={closePalette}
        aria-hidden
      />

      {/* Palette */}
      <div
        role='dialog'
        aria-label='Command palette'
        aria-modal='true'
        className='fixed top-[15vh] left-1/2 -translate-x-1/2 z-[190] w-[min(640px,calc(100vw-2rem))] border border-neon/30 bg-terminal-dark shadow-[0_0_40px_rgb(var(--neon)/0.15),0_4px_40px_rgba(0,0,0,0.6)]'
      >
        {/* Search input */}
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
            autoComplete='off'
          />
          <span className='font-ocr text-[10px] text-neon/30 uppercase tracking-[0.15em] shrink-0'>
            Esc
          </span>
        </div>

        {/* Results */}
        <div className='max-h-[60vh] overflow-y-auto overscroll-contain py-1'>
          {filteredGroups.length === 0 && (
            <div className='px-4 py-6 text-center font-ocr text-sm text-text/30'>
              No results for &quot;{query}&quot;
            </div>
          )}

          {filteredGroups.map((group) => (
            <div key={group.group}>
              <div className='px-4 py-1.5 font-ocr text-[9px] uppercase tracking-[0.25em] text-neon/30 sticky top-0 bg-terminal-dark'>
                {group.group}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon || ChevronRight;
                const itemIdx = globalIdx++;
                const isSelected = itemIdx === selectedIndex;

                return (
                  <button
                    key={item.id}
                    type='button'
                    onClick={() => executeItem(item)}
                    onMouseEnter={() => setSelectedIndex(itemIdx)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      isSelected
                        ? 'bg-neon/10 border-l-2 border-neon/60'
                        : 'border-l-2 border-transparent hover:bg-panel/40'
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isSelected ? 'text-neon' : 'text-neon/40'
                      }`}
                    />
                    <span
                      className={`font-ibm text-sm flex-1 ${
                        isSelected ? 'text-neon' : 'text-text-secondary'
                      }`}
                    >
                      {item.label}
                    </span>
                    {item.meta && (
                      <span className='font-ocr text-[10px] text-text/30 shrink-0'>
                        {item.meta}
                      </span>
                    )}
                    {isSelected && (
                      <ArrowRight className='w-3 h-3 text-neon/60 shrink-0' />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className='border-t border-neon/15 px-4 py-2 flex items-center gap-4'>
          <span className='font-ocr text-[9px] uppercase tracking-[0.2em] text-text/25'>
            ↑↓ Navigate
          </span>
          <span className='font-ocr text-[9px] uppercase tracking-[0.2em] text-text/25'>
            ↵ Open
          </span>
          <span className='font-ocr text-[9px] uppercase tracking-[0.2em] text-text/25'>
            Esc Close
          </span>
        </div>
      </div>
    </>
  );
}

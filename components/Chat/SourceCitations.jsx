import Link from 'next/link';
import { FileText, FolderOpen, BookOpen, FileCode } from 'lucide-react';

const TYPE_ICONS = {
  project: FolderOpen,
  resume: FileText,
  codex: BookOpen,
  page: FileCode,
};

/**
 * Sparse citation rail rendered below assistant chat messages.
 * Only renders when citations array is non-empty.
 */
export default function SourceCitations({ citations }) {
  if (!citations?.length) return null;

  return (
    <div className='mt-2 pt-2 border-t border-neon/10'>
      <div className='flex flex-wrap gap-1.5'>
        {citations.map((cite, i) => {
          const Icon = TYPE_ICONS[cite.type] || FileCode;
          const isExternal = cite.href?.startsWith('http');

          return (
            <Link
              key={i}
              href={cite.href || '#'}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className='inline-flex items-center gap-1 font-ocr text-[10px] text-neon/50 border border-neon/15 px-1.5 py-0.5 uppercase tracking-[0.1em] hover:text-neon/80 hover:border-neon/35 transition-colors'
            >
              <Icon className='w-2.5 h-2.5 shrink-0' />
              {cite.label}
              {cite.section && (
                <span className='text-neon/30 ml-0.5'>· {cite.section}</span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { SiGithub } from 'react-icons/si';

function getRepoHref(githubRepo) {
  if (!githubRepo || typeof githubRepo !== 'string') return null;
  if (/^https?:\/\//i.test(githubRepo)) return githubRepo;
  return `https://github.com/${githubRepo}`;
}

/**
 * Compact proof bar for project detail pages.
 * Renders only when project.evidenceBar is defined.
 * All fields are optional; missing ones are simply omitted.
 */
export default function EvidenceBar({ evidenceBar, liveLink, githubRepo }) {
  if (!evidenceBar) return null;

  const {
    role,
    projectType,
    stack,
    capabilityTags,
    trustFlags,
    scope,
    outcome,
  } = evidenceBar;

  const repoHref = getRepoHref(githubRepo);

  return (
    <div className='mb-6 border border-neon/20 bg-panel/20'>
      {/* Top row: role / type / scope */}
      <div className='flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2.5 border-b border-neon/10'>
        {role && (
          <span className='flex items-center gap-1.5'>
            <span className='font-ocr text-[9px] uppercase tracking-[0.2em] text-neon/40'>
              Role
            </span>
            <span className='font-ibm text-xs text-text-secondary'>{role}</span>
          </span>
        )}
        {projectType && (
          <>
            <span className='text-neon/15'>│</span>
            <span className='flex items-center gap-1.5'>
              <span className='font-ocr text-[9px] uppercase tracking-[0.2em] text-neon/40'>
                Type
              </span>
              <span className='font-ibm text-xs text-text-secondary'>{projectType}</span>
            </span>
          </>
        )}
        {scope && (
          <>
            <span className='text-neon/15'>│</span>
            <span className='flex items-center gap-1.5'>
              <span className='font-ocr text-[9px] uppercase tracking-[0.2em] text-neon/40'>
                Scope
              </span>
              <span className='font-ibm text-xs text-text-secondary'>{scope}</span>
            </span>
          </>
        )}

        {/* Links */}
        <div className='ml-auto flex items-center gap-3'>
          {liveLink && (
            <a
              href={liveLink}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1 font-ocr text-[10px] text-neon/60 uppercase tracking-[0.12em] hover:text-neon transition-colors'
            >
              <ExternalLink className='w-3 h-3' />
              Live
            </a>
          )}
          {repoHref && (
            <a
              href={repoHref}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1 font-ocr text-[10px] text-neon/60 uppercase tracking-[0.12em] hover:text-neon transition-colors'
            >
              <SiGithub className='w-3 h-3' />
              Repo
            </a>
          )}
        </div>
      </div>

      {/* Capability tags + trust flags */}
      {((capabilityTags?.length > 0) || (trustFlags?.length > 0)) && (
        <div className='flex flex-wrap items-center gap-2 px-4 py-2 border-b border-neon/10'>
          {capabilityTags?.map((tag) => (
            <span
              key={tag}
              className='font-ocr text-[10px] text-neon/70 border border-neon/20 px-2 py-0.5 uppercase tracking-[0.1em]'
            >
              {tag}
            </span>
          ))}
          {trustFlags?.map((flag) => (
            <span
              key={flag}
              className='font-ocr text-[10px] text-accent/60 border border-accent/20 px-2 py-0.5 uppercase tracking-[0.1em]'
            >
              {flag}
            </span>
          ))}
        </div>
      )}

      {/* Stack */}
      {stack?.length > 0 && (
        <div className='flex flex-wrap items-center gap-2 px-4 py-2 border-b border-neon/10'>
          <span className='font-ocr text-[9px] uppercase tracking-[0.2em] text-neon/40 shrink-0'>
            Stack
          </span>
          {stack.map((s) => (
            <span key={s} className='font-ibm text-xs text-text-secondary/70'>
              {s}
            </span>
          ))}
        </div>
      )}

      {/* Outcome summary */}
      {outcome && (
        <div className='px-4 py-2.5'>
          <span className='font-ocr text-[9px] uppercase tracking-[0.2em] text-neon/40'>
            Outcome:{' '}
          </span>
          <span className='font-ibm text-xs text-text-secondary leading-relaxed'>
            {outcome}
          </span>
        </div>
      )}
    </div>
  );
}

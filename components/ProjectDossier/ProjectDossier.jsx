 'use client';
 
 import { memo, useCallback, useEffect, useMemo, useState } from 'react';
 import Link from 'next/link';
 import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';
 
 function usePrefersReducedMotion() {
   const [reduced, setReduced] = useState(false);
 
   useEffect(() => {
     if (typeof window === 'undefined' || !window.matchMedia) return;
     const media = window.matchMedia('(prefers-reduced-motion: reduce)');
 
     const update = () => setReduced(Boolean(media.matches));
     update();
 
     if (typeof media.addEventListener === 'function') {
       media.addEventListener('change', update);
       return () => media.removeEventListener('change', update);
     }
 
     media.addListener(update);
     return () => media.removeListener(update);
   }, []);
 
   return reduced;
 }
 
 const ProjectDossier = memo(function ProjectDossier({ projects = [] }) {
   const [activeIndex, setActiveIndex] = useState(0);
   const prefersReducedMotion = usePrefersReducedMotion();
 
   const total = projects.length;
   const active = projects[activeIndex] || null;
 
   const moduleLabel = useMemo(() => {
     if (!total) return 'MODULE 00';
     return `MODULE ${String(activeIndex + 1).padStart(2, '0')}`;
   }, [activeIndex, total]);
 
   const countLabel = useMemo(() => {
     if (!total) return '00 / 00';
     return `${String(activeIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
   }, [activeIndex, total]);
 
   const statusChips = useMemo(() => {
     if (!active) return [];
 
     const chips = [];
     if (active.comingSoon) {
       chips.push(active.slug === 'lcerebro' ? 'Build in Progress' : 'Coming Soon');
     }
     if (active.isDemo && !active.comingSoon) chips.push('Demo');
     if (Array.isArray(active.keywords) && active.keywords.length > 0) chips.push(active.keywords[0]);
     return chips.slice(0, 2);
   }, [active]);
 
   const proofBullets = useMemo(() => {
     if (!active) return [];
 
     const proof = [
       active.builtFor ? `Built for ${active.builtFor}` : null,
       active.solved ? `Solved ${active.solved}` : null,
       active.delivered ? `Delivered ${active.delivered}` : null,
     ].filter(Boolean);
 
     if (proof.length >= 2) return proof.slice(0, 3);
 
     const actions = Array.isArray(active.actions) ? active.actions : [];
     return [...proof, ...actions].slice(0, 3);
   }, [active]);
 
   const tags = useMemo(() => {
     if (!active) return [];
     const list = Array.isArray(active.tags) ? active.tags : [];
     return list.slice(0, 5);
   }, [active]);
 
   const goPrev = useCallback(() => {
     if (!total) return;
     setActiveIndex((i) => (i === 0 ? total - 1 : i - 1));
   }, [total]);
 
   const goNext = useCallback(() => {
     if (!total) return;
     setActiveIndex((i) => (i === total - 1 ? 0 : i + 1));
   }, [total]);
 
   const onKeyDown = useCallback(
     (e) => {
       if (e.key === 'ArrowLeft') {
         e.preventDefault();
         goPrev();
       }
       if (e.key === 'ArrowRight') {
         e.preventDefault();
         goNext();
       }
     },
     [goNext, goPrev]
   );
 
   if (!active) {
     return (
       <div className='min-h-[420px] flex items-center justify-center'>
        <div className='relative w-full max-w-md border border-terminal-green/20 bg-terminal-dark/30 p-6'>
          <div className='pointer-events-none absolute left-0 top-0 h-5 w-5 border-l border-t border-terminal-green/50' />
          <div className='pointer-events-none absolute right-0 top-0 h-5 w-5 border-r border-t border-terminal-green/30' />
          <div className='pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b border-l border-terminal-green/30' />
          <div className='pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b border-r border-terminal-green/50' />

          <div className='text-xs tracking-[0.22em] text-neon/60 font-ocr uppercase'>
            Scanning Modules...
          </div>

          <div className='mt-4 space-y-3'>
            <div className='h-3 bg-terminal-green/10 w-3/4' />
            <div className='h-3 bg-terminal-green/10 w-1/2' />
            <div className='h-3 bg-terminal-green/10 w-2/3' />
          </div>
        </div>
       </div>
     );
   }
 
  const imageSrc = active.imageUrl || '/images/terminal_ui.png';
   const primaryHref = active.slug ? `/projects/${active.slug}` : null;
   const secondaryHref = active.link || null;
   const secondaryIsExternal = Boolean(secondaryHref && /^https?:\/\//i.test(secondaryHref));
 
   return (
     <section
       tabIndex={0}
       onKeyDown={onKeyDown}
      className='relative w-full outline-none focus-visible:ring-2 focus-visible:ring-terminal-green/40 focus-visible:ring-offset-2 focus-visible:ring-offset-terminal-dark'
       aria-label='Active project module'
     >
      {/* ambient structure */}
       <div className='pointer-events-none absolute inset-0 opacity-35'>
         <div className='absolute inset-x-0 top-0 h-px bg-terminal-green/15' />
         <div className='absolute inset-x-0 bottom-0 h-px bg-terminal-green/10' />
         <div className='absolute left-[12%] top-0 h-full w-px bg-terminal-green/10' />
         <div className='absolute right-[8%] top-0 h-full w-px bg-terminal-green/10' />
       </div>
 
       {/* Top rail */}
      <div className='mb-6 flex items-start justify-between gap-4 border-b border-terminal-green/15 pb-4'>
         <div className='min-w-0'>
           <div className='text-[10px] sm:text-xs tracking-[0.28em] text-neon/60 font-ocr uppercase'>
             Active Project Module
           </div>
           <div className='mt-2 flex items-center gap-3'>
            <span className='h-2 w-2 bg-terminal-green shadow-[0_0_14px_rgba(0,255,153,0.45)]' />
             <span className='text-xs tracking-[0.24em] text-terminal-dimmed font-ocr uppercase'>
               {moduleLabel}
             </span>
           </div>
         </div>
 
        <div className='flex items-center gap-2 flex-wrap justify-end'>
           {statusChips.map((chip) => (
             <span
               key={chip}
              className='relative border border-neon/25 bg-terminal-dark/50 px-2.5 py-1 text-[10px] sm:text-xs text-neon/70 font-ocr uppercase tracking-[0.24em]'
             >
               {chip}
             </span>
           ))}
          <div className='ml-2 border border-terminal-green/20 px-2.5 py-1 text-xs tracking-[0.24em] text-terminal-dimmed font-ocr uppercase'>
             {countLabel}
           </div>
         </div>
       </div>
 
       <div className='grid items-start gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.85fr)]'>
         {/* Media stage */}
         <div className='relative min-h-[320px] sm:min-h-[420px] lg:min-h-[560px]'>
          {/* outer frame */}
          <div className='absolute inset-0 border border-terminal-green/15' />

          {/* corner brackets */}
          <div className='pointer-events-none absolute left-0 top-0 h-10 w-10 border-l-2 border-t-2 border-terminal-green/45' />
          <div className='pointer-events-none absolute right-0 top-0 h-10 w-10 border-r-2 border-t-2 border-terminal-green/25' />
          <div className='pointer-events-none absolute bottom-0 left-0 h-10 w-10 border-b-2 border-l-2 border-terminal-green/25' />
          <div className='pointer-events-none absolute bottom-0 right-0 h-10 w-10 border-b-2 border-r-2 border-terminal-green/45' />
 
          {/* background / ambient */}
          <div className='absolute inset-0 overflow-hidden bg-terminal-dark/25'>
             <div className='absolute inset-0'>
               <OptimizedImage
                 src={imageSrc}
                 alt=''
                 className='h-full w-full scale-110 object-cover opacity-20 blur-2xl'
                 priority={activeIndex === 0}
                 sizes='(max-width: 1024px) 100vw, 60vw'
               />
             </div>

            <div className='absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:100%_12px] opacity-10' />
            <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,153,0.04)_1px,transparent_1px)] bg-[size:20px_100%] opacity-10' />
            <div className='absolute inset-0 bg-gradient-to-br from-neon/8 via-transparent to-terminal-green/8' />
           </div>
 
          {/* image stage */}
          <div className='relative flex h-full min-h-[320px] items-center justify-center px-4 py-8 sm:px-8 lg:min-h-[560px]'>
             <div className='relative w-full max-w-[980px] h-[260px] sm:h-[360px] lg:h-[520px]'>
               <OptimizedImage
                 src={imageSrc}
                 alt={active.title || 'Project image'}
                className='object-contain object-center drop-shadow-[0_0_24px_rgba(0,255,153,0.16)]'
                 priority={activeIndex === 0}
                 sizes='(max-width: 640px) 92vw, (max-width: 1024px) 60vw, 900px'
               />
             </div>
           </div>
 
          {/* image area intentionally label-free */}
         </div>
 
         {/* Details stage */}
        <div className='relative flex h-full min-w-0 flex-col justify-between border-l border-terminal-green/10 pl-0 lg:pl-6'>
           <div className='space-y-6'>
             <div className='min-w-0'>
               <div className='text-[10px] sm:text-xs tracking-[0.28em] text-neon/60 font-ocr uppercase'>
                 Featured Deployment
               </div>
              <h3 className='mt-2 text-2xl sm:text-3xl font-ibm text-terminal-green leading-tight break-words uppercase tracking-[0.04em]'>
                 {active.title}
               </h3>
             </div>
 
             <div className='h-px w-full bg-gradient-to-r from-terminal-green/35 to-transparent' />
 
             {active.description && (
               <p className='text-sm sm:text-base text-terminal-dimmed font-ibm leading-7 max-w-[68ch]'>
                 {active.description}
               </p>
             )}
 
             {proofBullets.length > 0 && (
               <div className='space-y-3'>
                <div className='text-xs text-neon/70 font-ocr uppercase tracking-wider'>Proof</div>
                 <ul className='space-y-2.5'>
                   {proofBullets.map((line) => (
                     <li key={line} className='text-sm text-terminal-dimmed font-ibm flex items-start gap-3'>
                      <span className='mt-[0.45rem] h-[6px] w-[6px] shrink-0 bg-terminal-green shadow-[0_0_8px_rgba(0,255,153,0.45)]' />
                       <span className='min-w-0 break-words'>{line}</span>
                     </li>
                   ))}
                 </ul>
               </div>
             )}
 
             {tags.length > 0 && (
               <div className='space-y-3'>
                <div className='text-xs text-neon/70 font-ocr uppercase tracking-wider'>Stack</div>
                 <div className='flex flex-wrap gap-2'>
                   {tags.map((tag) => (
                     <span
                       key={tag}
                      className='border border-neon/20 bg-terminal-dark/35 px-2 py-1 text-[10px] text-neon/65 font-ocr uppercase tracking-wider'
                     >
                       {tag}
                     </span>
                   ))}
                 </div>
               </div>
             )}
           </div>
 
           {/* CTAs + controls */}
           <div className='mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
             <div className='flex flex-wrap gap-3'>
               {primaryHref ? (
                 <Link
                   href={primaryHref}
                 className='inline-flex cursor-pointer items-center justify-center border border-terminal-green/35 px-5 py-2.5 text-sm uppercase tracking-[0.22em] text-terminal-green transition hover:border-terminal-green/70 hover:bg-terminal-green/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green/40'
                 >
                   View Case Study
                 </Link>
               ) : null}
 
               {secondaryHref ? (
                 <Link
                   href={secondaryHref}
                   target={secondaryIsExternal ? '_blank' : undefined}
                   rel={secondaryIsExternal ? 'noopener noreferrer' : undefined}
                 className='inline-flex cursor-pointer items-center justify-center border border-neon/25 px-5 py-2.5 text-sm uppercase tracking-[0.22em] text-neon/70 transition hover:border-neon/55 hover:bg-neon/10 hover:text-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green/40'
                 >
                   {secondaryIsExternal ? 'Open' : 'Open Module'}
                 </Link>
               ) : null}
             </div>
 
             <div className='flex items-center gap-2'>
               <button
                 type='button'
                 onClick={goPrev}
                 aria-label='Previous project'
               className='inline-flex h-10 min-w-10 cursor-pointer items-center justify-center border border-terminal-green/20 px-3 text-xs uppercase tracking-[0.24em] text-terminal-dimmed transition hover:border-terminal-green/50 hover:bg-terminal-green/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green/40'
               >
                &lt;
               </button>
               <button
                 type='button'
                 onClick={goNext}
                 aria-label='Next project'
               className='inline-flex h-10 min-w-10 cursor-pointer items-center justify-center border border-terminal-green/20 px-3 text-xs uppercase tracking-[0.24em] text-terminal-dimmed transition hover:border-terminal-green/50 hover:bg-terminal-green/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green/40'
               >
                &gt;
               </button>
             </div>
           </div>
         </div>
       </div>
 
       {/* Bottom rail: quick select */}
      <div className='mt-8 flex flex-wrap gap-2 border-t border-terminal-green/10 pt-4'>
         {projects.map((p, idx) => {
           const isActive = idx === activeIndex;
           const label = p?.title || `Project ${idx + 1}`;
           return (
             <button
               key={p?.slug || `${label}-${idx}`}
               type='button'
               onClick={() => setActiveIndex(idx)}
               aria-label={`Select ${label}`}
               aria-current={isActive ? 'true' : undefined}
               className={[
               'cursor-pointer px-3 py-2 text-[10px] sm:text-xs uppercase tracking-[0.22em] transition font-ocr border',
                 prefersReducedMotion ? '' : 'motion-safe:duration-200',
                 isActive
                  ? 'border-terminal-green/40 bg-terminal-green/10 text-terminal-green'
                  : 'border-neon/15 bg-terminal-dark/20 text-terminal-dimmed hover:border-neon/35 hover:text-neon/80',
               ].join(' ')}
             >
               {label}
             </button>
           );
         })}
       </div>
     </section>
   );
 });
 
 export default ProjectDossier;

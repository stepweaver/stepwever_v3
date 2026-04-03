import Link from 'next/link';

export default function PathwayPanel({ track }) {
  if (!track) return null;

  return (
    <div className='relative border border-neon/25 bg-panel/25 p-6 mt-4'>
      <div className='pointer-events-none absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-neon/60' />
      <div className='pointer-events-none absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-neon/25' />
      <div className='pointer-events-none absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-neon/25' />
      <div className='pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-neon/60' />
      <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_12px] opacity-10' />

      <div className='relative z-10 space-y-8'>
        {/* Who you are */}
        <div>
          <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-2'>
            Profile
          </p>
          <p className='font-ibm text-sm text-text-secondary leading-relaxed'>
            {track.whoYouAre}
          </p>
        </div>

        {/* Read first */}
        <div>
          <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-3'>
            Read first
          </p>
          <div className='space-y-2'>
            {track.readFirst.map((item) => (
              <div key={item.href} className='flex items-start gap-3'>
                <span className='font-ocr text-xs text-neon/50 shrink-0 mt-0.5'>→</span>
                <div>
                  <Link
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className='font-ibm text-sm text-neon hover:text-neon/80 transition-colors'
                  >
                    {item.label}
                  </Link>
                  {item.note && (
                    <span className='font-ocr text-xs text-text-secondary/50 ml-2'>
                      · {item.note}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects to open */}
        <div>
          <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-3'>
            Projects to open
          </p>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            {track.projects.map((proj) => (
              <Link
                key={proj.slug}
                href={`/projects/${proj.slug}`}
                className='group border border-neon/20 bg-terminal-dark/20 p-3 hover:border-neon/45 hover:bg-terminal-dark/35 transition-all'
              >
                <span className='font-ibm text-sm text-neon/80 group-hover:text-neon transition-colors block mb-1'>
                  {proj.label}
                </span>
                <span className='font-ocr text-xs text-text-secondary/50 leading-relaxed'>
                  {proj.note}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Fit */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-2'>
              Good fit
            </p>
            <p className='font-ibm text-sm text-text-secondary leading-relaxed'>
              {track.fitStatement}
            </p>
          </div>
          <div>
            <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-2'>
              Not ideal
            </p>
            <p className='font-ibm text-sm text-text-secondary/60 leading-relaxed'>
              {track.notFit}
            </p>
          </div>
        </div>

        {/* Next action */}
        <div className='pt-2 border-t border-neon/15'>
          <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-3'>
            Next action
          </p>
          <Link
            href={track.nextAction.href}
            className='inline-flex items-center border border-neon bg-neon/10 px-5 py-2.5 font-ocr text-sm text-neon uppercase tracking-[0.12em] hover:bg-neon/20 transition-colors'
          >
            {track.nextAction.label}
          </Link>
        </div>
      </div>
    </div>
  );
}

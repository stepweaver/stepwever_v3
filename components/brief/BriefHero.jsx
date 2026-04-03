export default function BriefHero({ identity }) {
  return (
    <section className='relative border border-neon/20 bg-panel/25 p-6 sm:p-8'>
      <div className='pointer-events-none absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-neon/60' />
      <div className='pointer-events-none absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-neon/25' />
      <div className='pointer-events-none absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-neon/25' />
      <div className='pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-neon/60' />
      <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_12px] opacity-10' />

      <div className='relative z-10'>
        <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-4'>
          {identity.eyebrow}
        </p>

        <h1 className='font-ibm text-3xl sm:text-4xl text-neon mb-2'>{identity.name}</h1>

        <div className='flex flex-wrap gap-x-3 gap-y-1 mb-6'>
          {identity.roles.map((role, i) => (
            <span key={role} className='flex items-center gap-2'>
              <span className='font-ocr text-xs text-text-secondary uppercase tracking-[0.1em]'>
                {role}
              </span>
              {i < identity.roles.length - 1 && (
                <span className='text-neon/25 font-ocr text-xs'>·</span>
              )}
            </span>
          ))}
        </div>

        <div className='h-px w-full bg-gradient-to-r from-neon/35 to-transparent mb-6' />

        <p className='font-ibm text-base sm:text-lg text-text-secondary leading-relaxed max-w-3xl'>
          {identity.statement}
        </p>
      </div>
    </section>
  );
}

/**
 * Reusable project section wrapper - cyberpunk HUD style.
 * Used across every section of the project detail page.
 */
export default function ProjectSection({ title, children }) {
  return (
    <section className='mb-10'>
      <h2 className='font-ocr text-sm tracking-[0.2em] text-neon/60 uppercase mb-2'>
        {title}
      </h2>
      <div className='h-px bg-gradient-to-r from-neon/40 via-neon/20 to-transparent mb-6' />
      {children}
    </section>
  );
}

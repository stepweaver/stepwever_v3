/**
 * Reusable project section wrapper with heading + neon divider.
 * Used across every section of the project detail page.
 */
export default function ProjectSection({ title, children }) {
  return (
    <section className='mb-16'>
      <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-neon mb-6'>
        {title}
      </h2>
      <div className='h-0.5 bg-neon mb-8'></div>
      {children}
    </section>
  );
}

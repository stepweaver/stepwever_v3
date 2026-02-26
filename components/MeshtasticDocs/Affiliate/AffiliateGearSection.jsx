/**
 * Recommended gear section. Receives links from server to avoid hydration mismatch.
 * links: [{ url, label }, ...]
 */
export default function AffiliateGearSection({ links = [] }) {
  if (!links?.length) return null;

  return (
    <section className='mt-8 pt-6 border-t border-neon/10'>
      <h3 className='text-sm font-semibold text-text font-ibm mb-3'>
        Gear for Meshtastic Networks
      </h3>
      <ul className='space-y-2'>
        {links.map(({ url, label }, i) => (
          <li key={`${i}-${label}`}>
            <a
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-neon hover:text-accent transition-colors font-ocr text-sm underline hover:no-underline'
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

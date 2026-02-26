import GlitchButton from '@/components/ui/GlitchButton';

/**
 * Top-of-page affiliate CTA. Receives affiliateUrl from server to avoid hydration mismatch.
 */
export default function AffiliateIntroCTA({ affiliateUrl }) {
  if (!affiliateUrl) return null;

  return (
    <section className='rounded-sm overflow-hidden border border-neon/15 bg-panel/20 mb-6'>
      <div className='bg-panel/50 border-b border-neon/20 px-5 sm:px-6 py-2.5'>
        <span className='font-ocr text-[10px] tracking-[0.18em] text-neon/40 uppercase'>
          Equip Your Mesh Network
        </span>
      </div>
      <div className='px-5 sm:px-6 py-4'>
        <p className='text-text/80 font-ocr text-sm leading-relaxed mb-4'>
          Looking for reliable Meshtastic-compatible hardware? Atlavox offers
          high-quality radios, repeaters, and accessories built for real-world
          use.
        </p>
        <GlitchButton
          href={affiliateUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='text-sm'
        >
          Explore Atlavox Radios & Accessories
        </GlitchButton>
      </div>
    </section>
  );
}

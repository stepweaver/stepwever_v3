import GlitchButton from '@/components/ui/GlitchButton';

/**
 * Hardware-specific affiliate block. Receives affiliateUrl from server to avoid hydration mismatch.
 */
export default function AffiliateHardwareBlock({ affiliateUrl }) {
  if (!affiliateUrl) return null;

  return (
    <section className='rounded-sm overflow-hidden border border-neon/15 bg-panel/20 my-6'>
      <div className='bg-panel/50 border-b border-neon/20 px-5 sm:px-6 py-2.5'>
        <span className='font-ocr text-[10px] tracking-[0.18em] text-neon/40 uppercase'>
          Hardware Recommendation
        </span>
      </div>
      <div className='px-5 sm:px-6 py-4'>
        <p className='text-text/80 font-ocr text-sm leading-relaxed mb-4'>
          Atlavox builds Meshtastic-compatible radios, repeaters, and cases with
          solid build quality, GPS support, and long battery life — a step up
          from generic mesh radios.
        </p>
        <GlitchButton
          href={affiliateUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='text-sm'
        >
          Shop Atlavox Hardware
        </GlitchButton>
      </div>
    </section>
  );
}

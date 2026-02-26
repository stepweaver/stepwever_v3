/**
 * FTC-compliant affiliate disclosure for Meshtastic pages.
 * Renders only when show prop is true (pass from server to avoid hydration mismatch).
 */
export default function AffiliateDisclosure({ show = false }) {
  if (!show) return null;

  return (
    <p className='text-text/60 font-ocr text-xs italic leading-relaxed mb-3'>
      Disclosure: Some links on this page are affiliate links — if you
      purchase through them, I may earn a commission at no extra cost to you.
    </p>
  );
}

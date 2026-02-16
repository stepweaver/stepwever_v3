/**
 * Simple bullet list used throughout project detail sections.
 *
 * @param {string[]} items - Array of strings to render
 * @param {string} [className] - Additional classes for the <ul>
 */
export default function BulletList({ items = [], className = '' }) {
  if (!items || items.length === 0) return null;

  return (
    <ul className={`space-y-2 ml-6 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className='font-ocr text-text text-sm'>
          &bull; {item}
        </li>
      ))}
    </ul>
  );
}

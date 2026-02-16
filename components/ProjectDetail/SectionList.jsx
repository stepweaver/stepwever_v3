/**
 * Reusable icon + text list for project sections.
 * Renders a vertical list with an icon beside each item.
 *
 * @param {Object[]} items - Array of strings to render
 * @param {React.ElementType} icon - Lucide icon component
 * @param {string} [fontClass] - Override font class (default: 'font-ocr')
 */
export default function SectionList({
  items = [],
  icon: Icon,
  fontClass = 'font-ocr',
}) {
  if (!items || items.length === 0) return null;

  return (
    <ul className='space-y-3'>
      {items.map((item, index) => (
        <li key={index} className='flex items-start'>
          <Icon className='w-5 h-5 text-neon shrink-0 mt-0.5 mr-3' />
          <span
            className={`${fontClass} text-text text-base leading-relaxed`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

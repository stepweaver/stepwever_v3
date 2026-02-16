/**
 * Reusable card for displaying a tech stack category.
 *
 * @param {React.ElementType} icon - Lucide icon component
 * @param {string} title - Category label (e.g. "Frontend")
 * @param {string[]} items - List of technologies
 */
export default function TechStackCard({ icon: Icon, title, items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className='bg-panel/50 p-6 border border-neon/20 rounded-lg card-glow'>
      <div className='flex items-center mb-4'>
        <Icon className='w-6 h-6 text-neon mr-3' />
        <h3 className='text-xl font-ibm text-neon'>{title}</h3>
      </div>
      <ul className='space-y-2'>
        {items.map((tech, index) => (
          <li key={index} className='font-ocr text-text text-sm'>
            &bull; {tech}
          </li>
        ))}
      </ul>
    </div>
  );
}

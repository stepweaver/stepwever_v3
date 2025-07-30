'use client';

export default function Update({ date, frontmatter }) {
  // Use explicit date prop if provided, otherwise use frontmatter.updated
  const dateToUse = date || (frontmatter && frontmatter.updated);

  // Format date
  const formattedDate = formatUpdateDate(dateToUse);

  return (
    <div className='my-6 flex justify-start'>
      <span className='text-terminal-green text-sm font-mono bg-terminal-dark/50 px-3 py-1 rounded border border-terminal-green/30'>
        Updated: {formattedDate}
      </span>
    </div>
  );
}

function formatUpdateDate(date) {
  if (!date) return formatCurrentDate();

  // Parse the date parts to avoid timezone issues
  const [year, month, day] = date.split('-').map(
    (part) => part.replace(/[^0-9]/g, '') // Remove any non-numeric characters
  );

  if (!year || !month || !day) return formatCurrentDate();

  // Build date string with explicit parts (months are 0-indexed in JS Date)
  const dateObj = new Date(
    Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day))
  );

  // Format for display using [YYYY-MM-DD] format
  const formattedYear = dateObj.getUTCFullYear();
  const formattedMonth = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
  const formattedDay = String(dateObj.getUTCDate()).padStart(2, '0');

  return `[${formattedYear}-${formattedMonth}-${formattedDay}]`;
}

function formatCurrentDate() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');
  return `[${year}-${month}-${day}]`;
}

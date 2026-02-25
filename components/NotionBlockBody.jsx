import Link from 'next/link';
import { getHeadingsFromBlocks } from '@/lib/meshtastic-docs-headings';
import NotionImage from '@/components/NotionImage';

/**
 * Render a single Notion rich_text segment (bold, italic, code, link).
 */
function RichTextSegment({ part }) {
  let content = part.plain_text ?? '';
  const ann = part.annotations ?? {};
  if (part.href) {
    content = (
      <Link
        href={part.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-neon hover:text-accent transition-colors underline hover:no-underline"
      >
        {content}
      </Link>
    );
  }
  if (ann.code) content = <code className="bg-neon/10 px-1.5 py-0.5 rounded-sm text-sm text-neon/90 font-mono">{content}</code>;
  if (ann.italic) content = <em>{content}</em>;
  if (ann.bold) content = <strong className="text-text font-semibold">{content}</strong>;
  return <span>{content}</span>;
}

function RichText({ richText }) {
  if (!richText?.length) return null;
  return richText.map((part, i) => <RichTextSegment key={i} part={part} />);
}

/**
 * Group consecutive list items into list containers so they render
 * as a single <ul>/<ol> instead of one per item.
 */
function groupBlocks(blocks) {
  const groups = [];
  for (const block of blocks) {
    const last = groups[groups.length - 1];
    if (block.type === 'bulleted_list_item') {
      if (last?.type === 'bulleted_list') {
        last.items.push(block);
      } else {
        groups.push({ type: 'bulleted_list', items: [block] });
      }
    } else if (block.type === 'numbered_list_item') {
      if (last?.type === 'numbered_list') {
        last.items.push(block);
      } else {
        groups.push({ type: 'numbered_list', items: [block] });
      }
    } else {
      groups.push({ type: 'single', block });
    }
  }
  return groups;
}

export default function NotionBlockBody({ blocks }) {
  if (!blocks?.length) return null;
  const headings = getHeadingsFromBlocks(blocks);
  let headingIndex = 0;

  const groups = groupBlocks(blocks);

  function renderSingleBlock(block, key) {
    if (!block?.type) return null;

    if (block.type === 'table' && block.table) {
      const rows = Array.isArray(block.children) ? block.children : [];
      if (!rows.length) {
        return (
          <div key={key} className="opacity-70 text-sm rounded-sm p-2 my-2 font-ocr bg-panel/30">
            <span className="mr-1">Table:</span>
            <span className="text-text/80">No rows found.</span>
          </div>
        );
      }

      const hasColumnHeader = !!block.table.has_column_header;
      const hasRowHeader = !!block.table.has_row_header;
      const firstRowCells = rows[0]?.table_row?.cells || [];
      const columnCount = firstRowCells.length;

      // Heuristic: 2-column tables are usually spec/definition tables.
      // Render them as responsive cards instead of a cramped grid.
      if (columnCount === 2) {
        const bodyRows = hasColumnHeader ? rows.slice(1) : rows;

        return (
          <div
            key={key}
            className="my-4 grid gap-3 md:grid-cols-2"
          >
            {bodyRows.map((row, rowIndex) => {
              const cells = row.table_row?.cells || [];
              const [labelCell = [], valueCell = []] = cells;
              return (
                <div
                  key={row.id || rowIndex}
                  className="border border-neon/25 rounded-sm bg-panel/40 px-3 py-2"
                >
                  <div className="text-[0.65rem] font-ocr tracking-[0.18em] text-neon/70 uppercase mb-0.5">
                    <RichText richText={labelCell} />
                  </div>
                  <div className="text-xs sm:text-sm text-text/90 font-ibm leading-snug">
                    <RichText richText={valueCell} />
                  </div>
                </div>
              );
            })}
          </div>
        );
      }

      // Fallback: generic table rendering for wider data sets.
      return (
        <div key={key} className="my-4 overflow-x-auto">
          <table className="min-w-full border-collapse text-sm text-text/90 font-ibm">
            <tbody>
              {rows.map((row, rowIndex) => {
                const cells = row.table_row?.cells || [];
                const isHeaderRow = hasColumnHeader && rowIndex === 0;
                const RowCellTag = isHeaderRow ? 'th' : 'td';

                return (
                  <tr key={row.id || rowIndex} className="border-b border-neon/10 last:border-b-0">
                    {cells.map((cell, cellIndex) => {
                      const isRowHeader = hasRowHeader && cellIndex === 0;
                      const CellTag = isRowHeader ? 'th' : RowCellTag;
                      return (
                        <CellTag
                          key={cellIndex}
                          className={`px-3 py-2 align-top text-left border-r border-neon/10 last:border-r-0 ${
                            isHeaderRow || isRowHeader ? 'font-semibold text-text' : 'text-text/90'
                          }`}
                        >
                          <RichText richText={cell} />
                        </CellTag>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    if (block.type === 'paragraph' && block.paragraph?.rich_text) {
      const textParts = block.paragraph.rich_text;
      if (textParts.length === 0) return <div key={key} className="h-4" aria-hidden />;
      return (
        <p key={key} className="text-text leading-relaxed text-base sm:text-lg font-ibm">
          <RichText richText={textParts} />
        </p>
      );
    }

    if (block.type === 'heading_1' && block.heading_1?.rich_text) {
      const text = block.heading_1.rich_text.map((t) => t.plain_text).join('');
      const id = headings[headingIndex]?.id;
      if (headingIndex < headings.length) headingIndex += 1;
      return (
        <h2 key={key} id={id} className="text-2xl sm:text-3xl font-bold text-text mt-8 mb-4 scroll-mt-24">
          {text}
        </h2>
      );
    }
    if (block.type === 'heading_2' && block.heading_2?.rich_text) {
      const text = block.heading_2.rich_text.map((t) => t.plain_text).join('');
      const id = headings[headingIndex]?.id;
      if (headingIndex < headings.length) headingIndex += 1;
      return (
        <h3 key={key} id={id} className="text-xl sm:text-2xl font-bold text-text mt-6 mb-3 scroll-mt-24">
          {text}
        </h3>
      );
    }
    if (block.type === 'heading_3' && block.heading_3?.rich_text) {
      const text = block.heading_3.rich_text.map((t) => t.plain_text).join('');
      const id = headings[headingIndex]?.id;
      if (headingIndex < headings.length) headingIndex += 1;
      return (
        <h4 key={key} id={id} className="text-lg sm:text-xl font-bold text-text mt-4 mb-2 scroll-mt-24">
          {text}
        </h4>
      );
    }

    if (block.type === 'quote' && block.quote?.rich_text) {
      return (
        <blockquote key={key} className="border-l-2 border-neon/40 pl-4 py-2 my-4 italic text-text/90 font-ibm bg-neon/[0.03]">
          <RichText richText={block.quote.rich_text} />
        </blockquote>
      );
    }

    if (block.type === 'code' && block.code?.rich_text) {
      const text = block.code.rich_text.map((t) => t.plain_text).join('');
      return (
        <pre key={key} className="bg-panel/80 p-4 rounded-sm border border-neon/20 overflow-x-auto my-4 shadow-neon-sm">
          <code className="text-sm text-neon/90 font-mono">{text}</code>
        </pre>
      );
    }

    if (block.type === 'divider') {
      return <hr key={key} className="border-neon/15 my-8" />;
    }

    if (block.type === 'callout' && block.callout?.rich_text) {
      const icon = block.callout.icon?.emoji ?? '\u2139\uFE0F';
      return (
        <div key={key} className="rounded-sm p-4 my-4 flex gap-3 bg-panel/40">
          <span className="shrink-0" aria-hidden>{icon}</span>
          <div className="text-text leading-relaxed min-w-0 font-ibm">
            <RichText richText={block.callout.rich_text} />
          </div>
        </div>
      );
    }

    if (block.type === 'image' && block.image) {
      const img = block.image;
      const url = img.type === 'external' ? img.external?.url : img.type === 'file' ? img.file?.url : null;
      const caption = img.caption?.length ? img.caption.map((t) => t.plain_text).join('') : '';
      if (!url) return null;
      return (
        <NotionImage
          key={key}
          src={url}
          blockId={block.id}
          alt={caption || 'Notion image'}
          caption={caption}
        />
      );
    }

    return (
      <div key={key} className="opacity-70 text-sm rounded-sm p-2 my-2 font-ocr bg-panel/30">
        Unsupported block: <code className="text-neon/80">{block.type}</code>
      </div>
    );
  }

  return (
    <article className="prose prose-invert max-w-none">
      <div className="space-y-4">
        {groups.map((group, gi) => {
          if (group.type === 'bulleted_list') {
            return (
              <ul key={gi} className="list-disc ml-6 my-2 space-y-1 marker:text-neon/50">
                {group.items.map((block, li) => (
                  <li key={li} className="text-text leading-relaxed font-ibm">
                    <RichText richText={block.bulleted_list_item.rich_text} />
                  </li>
                ))}
              </ul>
            );
          }
          if (group.type === 'numbered_list') {
            return (
              <ol key={gi} className="list-decimal ml-6 my-2 space-y-1 marker:text-neon/50">
                {group.items.map((block, li) => (
                  <li key={li} className="text-text leading-relaxed font-ibm">
                    <RichText richText={block.numbered_list_item.rich_text} />
                  </li>
                ))}
              </ol>
            );
          }
          return renderSingleBlock(group.block, gi);
        })}
      </div>
    </article>
  );
}

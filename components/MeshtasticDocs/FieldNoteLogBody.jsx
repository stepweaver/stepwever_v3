'use client';

import Link from 'next/link';

/**
 * Format note title (e.g. "[2024-01-15]") as date for log timestamp. Fallback to today.
 */
function getLogDate(noteTitle) {
  const match = noteTitle?.match(/\d{4}-\d{2}-\d{2}/);
  if (match) return match[0];
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

/**
 * Synthetic time for line N: 12:00:00, 12:00:01, ...
 */
function getLogTime(lineIndex) {
  const sec = 0 + lineIndex;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `12:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function LogRichText({ richText }) {
  if (!richText?.length) return null;
  return richText.map((part, i) => {
    let content = part.plain_text ?? '';
    const ann = part.annotations ?? {};
    if (part.href) {
      content = (
        <Link
          href={part.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neon underline hover:text-accent"
        >
          {content}
        </Link>
      );
    } else if (ann.code) {
      content = <code className="text-neon/90">{content}</code>;
    } else if (ann.italic) {
      content = <em className="text-text/90">{content}</em>;
    } else if (ann.bold) {
      content = <strong className="text-text font-semibold">{content}</strong>;
    } else {
      content = <span className="text-text/95">{content}</span>;
    }
    return <span key={i}>{content}</span>;
  });
}

function getBlockRichText(block) {
  if (block.type === 'paragraph' && block.paragraph?.rich_text) return block.paragraph.rich_text;
  if (block.type === 'heading_1' && block.heading_1?.rich_text) return block.heading_1.rich_text;
  if (block.type === 'heading_2' && block.heading_2?.rich_text) return block.heading_2.rich_text;
  if (block.type === 'heading_3' && block.heading_3?.rich_text) return block.heading_3.rich_text;
  if (block.type === 'quote' && block.quote?.rich_text) return block.quote.rich_text;
  if (block.type === 'callout' && block.callout?.rich_text) return block.callout.rich_text;
  if (block.type === 'bulleted_list_item' && block.bulleted_list_item?.rich_text) return block.bulleted_list_item.rich_text;
  if (block.type === 'numbered_list_item' && block.numbered_list_item?.rich_text) return block.numbered_list_item.rich_text;
  if (block.type === 'code' && block.code?.rich_text) return block.code.rich_text;
  return [];
}

function getBlockText(block) {
  const rt = getBlockRichText(block);
  if (rt?.length) return rt.map((t) => t.plain_text).join('').trim();
  return '';
}

/**
 * Flatten blocks into lines (list items become separate lines).
 */
function blocksToLines(blocks) {
  const lines = [];
  for (const block of blocks || []) {
    if (!block?.type) continue;
    if (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
      lines.push({ block, prefix: '  • ' });
      continue;
    }
    if (block.type === 'heading_1' || block.type === 'heading_2' || block.type === 'heading_3') {
      lines.push({ block, prefix: '' });
      lines.push({ block: null, separator: true });
      continue;
    }
    const text = getBlockText(block);
    if (block.type === 'divider') {
      lines.push({ block: null, separator: true });
      continue;
    }
    if (block.type === 'image' && block.image) {
      const url = block.image.type === 'external' ? block.image.external?.url : block.image.file?.url;
      const caption = block.image.caption?.length ? block.image.caption.map((t) => t.plain_text).join('') : '';
      lines.push({ block: { type: 'image', url, caption }, prefix: '  ' });
      continue;
    }
    if (text || block.type === 'paragraph' || block.type === 'quote' || block.type === 'callout' || block.type === 'code') {
      lines.push({ block, prefix: '  ' });
    }
  }
  return lines;
}

export default function FieldNoteLogBody({ blocks, noteTitle }) {
  const logDate = getLogDate(noteTitle);
  const lines = blocksToLines(blocks);
  let lineIndex = 0;

  return (
    <div className="font-mono text-sm md:text-base leading-loose select-text space-y-1">
      {lines.map((item, i) => {
        if (item.separator) {
          return (
            <div key={i} className="text-neon/40 py-2">
              ─────────────────────────────────────────
            </div>
          );
        }
        const stamp = `${logDate} ${getLogTime(lineIndex)}`;
        lineIndex += 1;

        if (item.block?.type === 'image') {
          return (
            <div key={i} className="flex flex-wrap items-start gap-x-2 gap-y-1 py-2">
              <span className="shrink-0 text-neon/70">[{stamp}]</span>
              <span className="text-neon/90">[IMG]</span>
              {item.block.url && (
                <a
                  href={item.block.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon underline hover:text-accent"
                >
                  {item.block.caption || 'image'}
                </a>
              )}
            </div>
          );
        }

        const richText = getBlockRichText(item.block);
        const isEmpty = !richText?.length || (richText.length === 1 && !richText[0].plain_text?.trim());

        if (isEmpty) {
          return (
            <div key={i} className="py-2">
              <span className="text-neon/70">[{stamp}]</span>
              <span className="text-text/50">—</span>
            </div>
          );
        }

        const isHeading =
          item.block?.type === 'heading_1' ||
          item.block?.type === 'heading_2' ||
          item.block?.type === 'heading_3';

        return (
          <div key={i} className="py-2 flex flex-col sm:flex-row sm:gap-3 min-w-0">
            <span className="shrink-0 text-neon/70 text-xs sm:text-sm mb-0.5 sm:mb-0 sm:w-[11rem]">[{stamp}]</span>
            <span className={`min-w-0 flex-1 ${isHeading ? 'text-neon font-semibold' : 'text-text/95'}`}>
              {item.prefix}
              <LogRichText richText={richText} />
            </span>
          </div>
        );
      })}
    </div>
  );
}

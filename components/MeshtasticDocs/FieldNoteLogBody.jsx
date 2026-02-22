'use client';

import Link from 'next/link';

/**
 * Short time for line N (date is global in header): 12:00, 12:01, ...
 */
function getLogTimeShort(lineIndex) {
  const m = lineIndex % 60;
  return `12:${String(m).padStart(2, '0')}`;
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
 * Flatten blocks into lines. List items = bullet only (no timestamp). Headings = no separator line.
 */
function blocksToLines(blocks) {
  const lines = [];
  for (const block of blocks || []) {
    if (!block?.type) continue;
    if (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
      lines.push({ block, bullet: true, prefix: '  ' });
      continue;
    }
    if (block.type === 'heading_1' || block.type === 'heading_2' || block.type === 'heading_3') {
      lines.push({ block, heading: true, prefix: '' });
      continue;
    }
    const text = getBlockText(block);
    if (block.type === 'divider') {
      lines.push({ block: null, spacer: true });
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
  const lines = blocksToLines(blocks);
  let timeIndex = 0;

  return (
    <div className="font-mono text-sm md:text-base leading-loose select-text space-y-1">
      {lines.map((item, i) => {
        if (item.spacer) {
          return <div key={i} className="h-3" aria-hidden />;
        }

        if (item.block?.type === 'image') {
          const stamp = getLogTimeShort(timeIndex);
          timeIndex += 1;
          return (
            <div key={i} className="py-1.5">
              <span className="whitespace-nowrap text-neon/60 text-xs">[{stamp}] -</span>{' '}
              <span className="text-neon/90">[IMG]</span>{' '}
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

        if (isEmpty && !item.heading) {
          return null;
        }

        const isHeading = item.heading;
        const isBullet = item.bullet;

        if (isHeading) {
          const level = item.block?.type === 'heading_1' ? 1 : item.block?.type === 'heading_2' ? 2 : 3;
          return (
            <div
              key={i}
              className={`py-1.5 ${level === 1 ? 'mt-6 first:mt-0' : level === 2 ? 'mt-4 first:mt-0' : 'mt-3 first:mt-0'}`}
            >
              <span
                className={`inline-block border-l-2 border-neon/40 pl-2 text-neon font-semibold ${
                  level === 1 ? 'text-lg' : level === 2 ? 'text-base' : 'text-sm'
                }`}
              >
                <LogRichText richText={richText} />
              </span>
            </div>
          );
        }

        if (isBullet) {
          return (
            <div key={i} className="py-1.5">
              <span className="whitespace-nowrap text-neon/50">• -</span>{' '}
              <span className="text-text/95">
                <LogRichText richText={richText} />
              </span>
            </div>
          );
        }

        const stamp = getLogTimeShort(timeIndex);
        timeIndex += 1;
        return (
          <div key={i} className="py-1.5">
            <span className="whitespace-nowrap text-neon/60 text-xs">[{stamp}] -</span>{' '}
            <span className="text-text/95">
              <LogRichText richText={richText} />
            </span>
          </div>
        );
      })}
    </div>
  );
}

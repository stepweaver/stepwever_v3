import Link from 'next/link';
import { getHeadingsFromBlocks } from '@/lib/meshtastic-docs-headings';

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
        className="text-terminal-green hover:underline"
      >
        {content}
      </Link>
    );
  }
  if (ann.code) content = <code className="bg-terminal-dimmed/30 px-1 py-0.5 rounded text-sm text-terminal-text">{content}</code>;
  if (ann.italic) content = <em>{content}</em>;
  if (ann.bold) content = <strong>{content}</strong>;
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

    if (block.type === 'paragraph' && block.paragraph?.rich_text) {
      const textParts = block.paragraph.rich_text;
      if (textParts.length === 0) return <div key={key} className="h-4" aria-hidden />;
      return (
        <p key={key} className="text-terminal-text leading-relaxed text-base sm:text-lg">
          <RichText richText={textParts} />
        </p>
      );
    }

    if (block.type === 'heading_1' && block.heading_1?.rich_text) {
      const text = block.heading_1.rich_text.map((t) => t.plain_text).join('');
      const id = headings[headingIndex]?.id;
      if (headingIndex < headings.length) headingIndex += 1;
      return (
        <h2 key={key} id={id} className="text-2xl sm:text-3xl font-bold text-terminal-green mt-8 mb-4 scroll-mt-24">
          {text}
        </h2>
      );
    }
    if (block.type === 'heading_2' && block.heading_2?.rich_text) {
      const text = block.heading_2.rich_text.map((t) => t.plain_text).join('');
      const id = headings[headingIndex]?.id;
      if (headingIndex < headings.length) headingIndex += 1;
      return (
        <h3 key={key} id={id} className="text-xl sm:text-2xl font-bold text-terminal-green mt-6 mb-3 scroll-mt-24">
          {text}
        </h3>
      );
    }
    if (block.type === 'heading_3' && block.heading_3?.rich_text) {
      const text = block.heading_3.rich_text.map((t) => t.plain_text).join('');
      const id = headings[headingIndex]?.id;
      if (headingIndex < headings.length) headingIndex += 1;
      return (
        <h4 key={key} id={id} className="text-lg sm:text-xl font-bold text-terminal-green mt-4 mb-2 scroll-mt-24">
          {text}
        </h4>
      );
    }

    if (block.type === 'quote' && block.quote?.rich_text) {
      return (
        <blockquote key={key} className="border-l-4 border-terminal-green pl-4 py-2 my-4 italic text-terminal-text/90">
          <RichText richText={block.quote.rich_text} />
        </blockquote>
      );
    }

    if (block.type === 'code' && block.code?.rich_text) {
      const text = block.code.rich_text.map((t) => t.plain_text).join('');
      return (
        <pre key={key} className="bg-terminal-dimmed/20 p-4 rounded border border-terminal-dimmed/40 overflow-x-auto my-4">
          <code className="text-sm text-terminal-text">{text}</code>
        </pre>
      );
    }

    if (block.type === 'divider') {
      return <hr key={key} className="border-terminal-dimmed/40 my-8" />;
    }

    if (block.type === 'callout' && block.callout?.rich_text) {
      const icon = block.callout.icon?.emoji ?? '\u2139\uFE0F';
      return (
        <div key={key} className="border border-terminal-dimmed/40 rounded-xl p-4 my-4 flex gap-3">
          <span className="shrink-0" aria-hidden>{icon}</span>
          <div className="text-terminal-text leading-relaxed min-w-0">
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
        <figure key={key} className="my-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* Notion file-type image URLs are temporary (~1 hr). revalidate=60 limits
              exposure, but consider proxying via Next Image or using external URLs
              in Notion for long-lived links. */}
          <img src={url} alt={caption || 'Notion image'} className="max-w-full h-auto rounded border border-terminal-dimmed/40" />
          {caption ? <figcaption className="mt-2 text-sm text-terminal-text/80">{caption}</figcaption> : null}
        </figure>
      );
    }

    return (
      <div key={key} className="opacity-70 text-sm border border-terminal-dimmed/40 rounded p-2 my-2">
        Unsupported block: <code>{block.type}</code>
      </div>
    );
  }

  return (
    <article className="prose prose-invert max-w-none">
      <div className="space-y-4">
        {groups.map((group, gi) => {
          if (group.type === 'bulleted_list') {
            return (
              <ul key={gi} className="list-disc ml-6 my-2 space-y-1">
                {group.items.map((block, li) => (
                  <li key={li} className="text-terminal-text leading-relaxed">
                    <RichText richText={block.bulleted_list_item.rich_text} />
                  </li>
                ))}
              </ul>
            );
          }
          if (group.type === 'numbered_list') {
            return (
              <ol key={gi} className="list-decimal ml-6 my-2 space-y-1">
                {group.items.map((block, li) => (
                  <li key={li} className="text-terminal-text leading-relaxed">
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

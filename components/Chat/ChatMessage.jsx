import Image from 'next/image';
import { User, Loader2 } from 'lucide-react';
import { parseChatLinks } from '@/utils/parseChatLinks';
import { useTheme } from '@/components/ThemeProvider/ThemeProvider';
import GlitchLambda from '@/components/ui/GlitchLambda';

/**
 * Shared chat message bubble used by both ChatWidget and ChatBot.
 *
 * @param {Object} message - { role: 'user' | 'assistant', content: string }
 * @param {'compact' | 'default'} variant - Size variant
 */
export default function ChatMessage({ message, variant = 'default' }) {
  const { theme, mounted } = useTheme();
  const isUser = message.role === 'user';
  const isCompact = variant === 'compact';

  const avatarSize = isCompact ? 'w-7 h-7' : 'w-9 h-9';
  const imgSize = isCompact ? 14 : 18;
  const iconSize = isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const gap = isCompact ? 'gap-2' : 'gap-3';
  const padding = isCompact ? 'p-2.5' : 'p-3';
  const fontSize = isCompact ? 'text-sm' : 'text-base';

  return (
    <div className={`flex ${gap} ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div
        className={`flex-shrink-0 ${avatarSize} rounded flex items-center justify-center overflow-hidden ${
          isUser
            ? 'bg-accent/20 text-accent'
            : 'bg-neon/20 text-neon'
        }`}
      >
        {isUser ? (
          <User className={iconSize} />
        ) : (
          <Image
            src='/images/lambda_stepweaver.png'
            alt=''
            width={imgSize}
            height={imgSize}
            className={`lambda-icon object-contain ${mounted ? theme : 'dark'}`}
            style={{ width: 'auto', height: 'auto' }}
            aria-hidden
          />
        )}
      </div>

      {/* Message Bubble */}
      <div
        className={`max-w-[80%] ${padding} rounded font-ocr ${fontSize} leading-relaxed ${
          isUser
            ? 'bg-terminal-cyan/10 border border-terminal-cyan/30 text-terminal-text'
            : 'bg-terminal-dark/50 border border-terminal-border text-terminal-text'
        }`}
      >
        {message.attachments?.length > 0 && (
          <div className='flex flex-wrap gap-1.5 mb-2'>
            {message.attachments.map((att, i) => (
              <img
                key={i}
                src={att.dataUrl}
                alt='Attached'
                className='max-w-full max-h-24 object-contain rounded border border-terminal-border/50'
              />
            ))}
          </div>
        )}
        {message.content && parseChatLinks(message.content, {
          renderAgentName: (key) => (
            <GlitchLambda key={key} size='small' className='inline' />
          ),
        })}
      </div>
    </div>
  );
}

/**
 * Loading indicator for when the assistant is thinking.
 */
export function ChatLoadingIndicator({ variant = 'default' }) {
  const { theme, mounted } = useTheme();
  const isCompact = variant === 'compact';
  const avatarSize = isCompact ? 'w-7 h-7' : 'w-9 h-9';
  const imgSize = isCompact ? 14 : 18;
  const padding = isCompact ? 'p-2.5' : 'p-3';
  const iconSize = isCompact ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className={`flex ${isCompact ? 'gap-2' : 'gap-3'}`}>
      <div
        className={`flex-shrink-0 ${avatarSize} rounded flex items-center justify-center bg-neon/20 overflow-hidden`}
      >
        <Image
          src='/images/lambda_stepweaver.png'
          alt=''
          width={imgSize}
          height={imgSize}
          className={`lambda-icon object-contain ${mounted ? theme : 'dark'}`}
          style={{ width: 'auto', height: 'auto' }}
          aria-hidden
        />
      </div>
      <div className={`bg-panel/50 border border-neon/20 ${padding} rounded-lg`}>
        <Loader2 className={`${iconSize} text-neon animate-spin`} />
      </div>
    </div>
  );
}

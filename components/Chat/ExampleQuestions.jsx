/**
 * Suggested questions shown when the chat has no user messages yet.
 *
 * @param {string[]} questions - Array of question strings
 * @param {Function} onSelect - Called with the selected question text
 * @param {boolean} disabled - Whether buttons should be disabled
 * @param {'compact' | 'default'} variant - Size variant
 */
export default function ExampleQuestions({
  questions = [],
  onSelect,
  disabled = false,
  variant = 'default',
}) {
  const isCompact = variant === 'compact';

  return (
    <div className={isCompact ? 'px-3 pb-2' : 'px-4 pb-2'}>
      <p
        className={`text-text/60 font-ocr ${
          isCompact ? 'text-xs mb-1.5' : 'text-sm mb-2'
        }`}
      >
        Try asking:
      </p>
      <div className={`flex flex-wrap ${isCompact ? 'gap-1.5' : 'gap-2'}`}>
        {questions.map((question, index) => (
          <button
            key={index}
            type='button'
            onClick={() => onSelect(question)}
            className={`font-ocr text-neon border border-neon/30 rounded-lg hover:bg-neon/10 hover:border-neon/50 transition-colors cursor-pointer ${
              isCompact
                ? 'px-2.5 py-1.5 text-xs'
                : 'px-3 py-2 text-sm'
            }`}
            disabled={disabled}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}

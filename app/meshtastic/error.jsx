'use client';

/**
 * Error boundary for /meshtastic routes.
 * Shows a user-friendly message when the Notion API or page rendering fails.
 */
export default function MeshtasticError({ error, reset }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md rounded-xl border border-danger/30 bg-panel/60 backdrop-blur p-8 text-center">
        <p className="text-danger font-semibold text-lg mb-2">
          Something went wrong
        </p>
        <p className="text-text/70 text-sm mb-6">
          {error?.message || 'Could not load the Meshtastic docs. The data source may be temporarily unavailable.'}
        </p>
        <button
          onClick={() => reset()}
          className="inline-block px-5 py-2 rounded-lg border border-neon/40 text-neon hover:bg-neon/10 transition-colors text-sm font-ocr"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

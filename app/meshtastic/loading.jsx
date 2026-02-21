/**
 * Loading skeleton for /meshtastic routes (matches traditional docs layout).
 */
export default function MeshtasticLoading() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar skeleton (desktop) */}
      <div className="hidden lg:block lg:w-64 xl:w-72 lg:flex-shrink-0 lg:sticky lg:top-16 lg:self-start lg:border-r lg:border-neon/20 lg:bg-panel/30">
        <div className="p-4 border-b border-neon/15 space-y-2 motion-safe:animate-pulse">
          <div className="h-5 w-28 bg-neon/10 rounded" />
          <div className="h-3 w-20 bg-neon/5 rounded" />
        </div>
        <div className="p-3 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-3 bg-neon/5 rounded" style={{ width: `${60 + i * 8}%` }} />
          ))}
        </div>
      </div>

      {/* Main content skeleton */}
      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 pt-0 pb-16">
        <div className="border border-neon/20 rounded-md bg-panel/40 overflow-hidden motion-safe:animate-pulse">
          <div className="border-b border-neon/20 px-5 sm:px-6 lg:px-8 py-6 space-y-3">
            <div className="h-3 w-16 bg-neon/10 rounded" />
            <div className="h-8 w-64 bg-neon/10 rounded" />
            <div className="h-4 max-w-md bg-neon/5 rounded" />
          </div>
          <div className="px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
            <div className="max-w-3xl space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-4 bg-neon/5 rounded" style={{ width: `${50 + (i % 4) * 12}%` }} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

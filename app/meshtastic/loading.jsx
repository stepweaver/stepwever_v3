/**
 * Loading skeleton for /meshtastic routes (shown during ISR cache miss or navigation).
 */
export default function MeshtasticLoading() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row lg:h-[calc(100vh-3.5rem)] lg:pt-14">
      {/* Sidebar skeleton (desktop) */}
      <div className="hidden lg:block lg:w-72 lg:flex-shrink-0 lg:h-full">
        <div className="h-full border border-neon/10 bg-panel/40 backdrop-blur p-4 space-y-4 motion-safe:animate-pulse">
          <div className="h-5 w-28 bg-neon/10 rounded" />
          <div className="h-3 w-20 bg-neon/5 rounded" />
          <div className="space-y-3 mt-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-3 bg-neon/5 rounded" style={{ width: `${60 + Math.random() * 30}%` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Main content skeleton */}
      <main className="flex-1 min-w-0 min-h-0 px-4 pt-0">
        <div className="hud-panel border border-neon/10 bg-panel/30 backdrop-blur overflow-hidden motion-safe:animate-pulse">
          {/* Header skeleton */}
          <div className="border-b border-neon/10 px-6 py-5">
            <div className="max-w-3xl mx-auto space-y-3">
              <div className="h-3 w-24 bg-neon/10 rounded" />
              <div className="h-7 w-64 bg-neon/10 rounded" />
              <div className="h-4 w-96 bg-neon/5 rounded" />
            </div>
          </div>

          {/* Body skeleton */}
          <div className="px-6 py-8">
            <div className="max-w-3xl mx-auto space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-4 bg-neon/5 rounded" style={{ width: `${50 + Math.random() * 45}%` }} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import MeshtasticDocsSidebar from './MeshtasticDocsSidebar';

/**
 * Meshtastic docs layout: desktop = left sidebar (transparent, HUD); mobile = no sidebar (use in-page dropdown below body).
 */
export default function MeshtasticDocsLayout({
  grouped,
  currentSlug,
  currentSection,
  children,
}) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row lg:h-[calc(100vh-3.5rem)] lg:pt-14">
      {/* Sidebar: desktop only; same height as main */}
      <div className="hidden lg:block lg:w-72 lg:flex-shrink-0 lg:h-full lg:relative">
        <div className="lg:sticky lg:top-16 lg:h-full lg:overflow-y-auto lg:pr-2">
          <MeshtasticDocsSidebar
            grouped={grouped}
            currentSlug={currentSlug}
            currentSection={currentSection}
          />
        </div>
      </div>

      {/* Main content area: same height as sidebar (no top padding so right panel aligns with left) */}
      <main className="flex-1 min-w-0 min-h-0 flex flex-col lg:h-full">
        {children}
      </main>
    </div>
  );
}

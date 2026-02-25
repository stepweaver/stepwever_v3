import MeshtasticDocsSidebar from './MeshtasticDocsSidebar';

/**
 * Traditional docs layout (like meshtastic.org/docs):
 * - Left: sticky nav sidebar with border
 * - Main: scrollable content area
 * - No fixed viewport height; page scrolls naturally
 */
export default function MeshtasticDocsLayout({
  grouped,
  currentSlug,
  currentSection,
  children,
  hasFieldNotes = false,
}) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left sidebar: sticky nav rail, docs-style border */}
      <div className="hidden lg:block lg:w-64 xl:w-72 lg:flex-shrink-0 lg:sticky lg:top-16 lg:self-start lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto lg:border-r lg:border-neon/20 lg:bg-panel/30">
        <MeshtasticDocsSidebar
          grouped={grouped}
          currentSlug={currentSlug}
          currentSection={currentSection}
          hasFieldNotes={hasFieldNotes}
        />
      </div>

      {/* Main content: flex-1, scrolls with page */}
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}

'use client';

import { StatusPill } from './StatusPill';

export function TelemetrySidebar({
  currentFocus,
  location,
  availability,
  activeProjects = [],
  links = [],
  className = '',
}) {
  return (
    <div className={`w-full ${className || 'space-y-4'}`}>
      {currentFocus && (
        <div className="border border-neon/20 bg-panel/50 p-4 rounded-lg">
          <p className="text-xs tracking-[0.2em] text-neon/70 font-ocr uppercase mb-2">CURRENT FOCUS</p>
          <p className="text-base text-text font-ibm">{currentFocus}</p>
        </div>
      )}
      {location && (
        <div className="border border-neon/20 bg-panel/50 p-4 rounded-lg">
          <p className="text-xs tracking-[0.2em] text-neon/70 font-ocr uppercase mb-2">REGION</p>
          <p className="text-base text-text font-ibm">{location}</p>
        </div>
      )}
      {availability && (
        <div className="border border-neon/20 bg-panel/50 p-4 rounded-lg">
          <p className="text-xs tracking-[0.2em] text-neon/70 font-ocr uppercase mb-2">STATUS</p>
          <StatusPill status={availability} />
        </div>
      )}
      {activeProjects.length > 0 && (
        <div className="border border-neon/20 bg-panel/50 p-4 rounded-lg">
          <p className="text-xs tracking-[0.2em] text-neon/70 font-ocr uppercase mb-2">ACTIVE PROJECTS</p>
          <ul className="space-y-1.5">
            {activeProjects.map((project, idx) => (
              <li key={idx} className="text-sm text-text/80 font-ocr">
                • {project}
              </li>
            ))}
          </ul>
        </div>
      )}
      {links.length > 0 && (
        <div className="border border-neon/20 bg-panel/50 p-4 rounded-lg sm:col-span-2 xl:col-span-1">
          <p className="text-xs tracking-[0.2em] text-neon/70 font-ocr uppercase mb-3">LINKS</p>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2">
            {links.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  className="text-sm text-neon hover:text-accent transition-colors font-ocr underline block"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

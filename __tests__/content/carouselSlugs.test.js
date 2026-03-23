import {
  CAROUSEL_PROJECTS,
  HOMEPAGE_FEATURED_SLUGS,
} from '@/lib/carouselProjects';
import {
  getRenderableProjectBySlug,
  PROJECTS_DATA,
} from '@/lib/projectsData';

describe('carousel vs projects data', () => {
  it('every carousel slug exists in PROJECTS_DATA', () => {
    const keys = new Set(Object.keys(PROJECTS_DATA));
    for (const p of CAROUSEL_PROJECTS) {
      expect(keys.has(p.slug)).toBe(true);
    }
  });

  it('every homepage featured slug resolves to a renderable project', () => {
    for (const slug of HOMEPAGE_FEATURED_SLUGS) {
      const project = getRenderableProjectBySlug(slug);
      expect(project).not.toBeNull();
      expect(typeof project.title).toBe('string');
      expect(project.title.length).toBeGreaterThan(0);
      expect(typeof project.description).toBe('string');
      expect(project.description.length).toBeGreaterThan(0);
    }
  });

  it('every carousel slug resolves to a renderable detail payload', () => {
    for (const card of CAROUSEL_PROJECTS) {
      const project = getRenderableProjectBySlug(card.slug);
      expect(project).not.toBeNull();
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
    }
  });
});

import { CAROUSEL_PROJECTS } from '@/lib/carouselProjects';
import { PROJECTS_DATA } from '@/lib/projectsData';

describe('carousel vs projects data', () => {
  it('every carousel slug exists in PROJECTS_DATA', () => {
    const keys = new Set(Object.keys(PROJECTS_DATA));
    for (const p of CAROUSEL_PROJECTS) {
      expect(keys.has(p.slug)).toBe(true);
    }
  });
});

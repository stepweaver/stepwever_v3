'use client';

import { HOMEPAGE_CAROUSEL_PROJECTS } from '@/lib/carouselProjects';
import { memo } from 'react';
import ProjectDossier from '@/components/ProjectDossier/ProjectDossier';

function ProjectCarousel() {
  return (
    <div className='w-full relative mt-8 sm:mt-16'>
      <ProjectDossier projects={HOMEPAGE_CAROUSEL_PROJECTS} />
    </div>
  );
}

export default memo(ProjectCarousel);

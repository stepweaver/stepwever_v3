import { HOMEPAGE_CAROUSEL_PROJECTS } from '@/lib/carouselProjects';
import ProjectDossier from '@/components/ProjectDossier/ProjectDossier';

export default function ProjectCarousel() {
  return (
    <div className='w-full relative mt-8 sm:mt-16'>
      <ProjectDossier projects={HOMEPAGE_CAROUSEL_PROJECTS} />
    </div>
  );
}

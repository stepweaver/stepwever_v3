import { notFound } from 'next/navigation';
import { getRenderableProjectBySlug, PROJECTS_DATA } from '@/lib/projectsData';
import ProjectPageClient from './ProjectPageClient';

export function generateStaticParams() {
  return Object.keys(PROJECTS_DATA).map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }) {
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const project = getRenderableProjectBySlug(slug);
  if (!project) {
    notFound();
  }
  return <ProjectPageClient project={project} slug={slug} />;
}

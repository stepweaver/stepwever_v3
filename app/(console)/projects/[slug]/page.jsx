import { notFound } from 'next/navigation';
import { getProjectBySlug, PROJECTS_DATA } from '@/lib/projectsData';
import ProjectPageClient from './ProjectPageClient';

export function generateStaticParams() {
  return Object.keys(PROJECTS_DATA).map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }
  return <ProjectPageClient project={project} slug={slug} />;
}

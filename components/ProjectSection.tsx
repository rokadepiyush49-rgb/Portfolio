import type { Project } from '@/data/projects';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  /** Word or phrase inside `title` set in italic serif. */
  accent?: string;
  projects: Project[];
  /** Every card side by side on wide screens (compact cards), instead of pairs. */
  row?: boolean;
  className?: string;
};

/** A headed two-column grid of project cards — Industry and Personal both use it. */
export default function ProjectSection({ id, eyebrow, title, accent, projects, row = false, className = '' }: Props) {
  // Actual span across every project, not just the first and last entries.
  const years = Array.from(new Set(projects.flatMap((p) => (p.year ? [p.year] : [])))).sort();

  return (
    <section id={id} className={`container-content scroll-mt-24 py-20 md:py-32 ${className}`}>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        accent={accent}
        aside={
          <>
            {projects.length} projects
            {years.length ? <> &middot; {years.length > 1 ? `${years[0]}–${years[years.length - 1]}` : years[0]}</> : null}
          </>
        }
        className="mb-10 md:mb-16"
      />

      {row ? (
        // One line from xl up; 2×2 below that, where four would be too narrow.
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06} y={32}>
              <ProjectCard project={project} index={i} compact />
            </Reveal>
          ))}
        </div>
      ) : (
        // Two columns on four tracks, so an odd last card can start one track
        // in and sit centred rather than alone on the left.
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-x-10 md:gap-y-16">
          {projects.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={(i % 2) * 0.08}
              y={32}
              className={`md:col-span-2 ${projects.length % 2 === 1 && i === projects.length - 1 ? 'md:col-start-2' : ''}`}
            >
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}

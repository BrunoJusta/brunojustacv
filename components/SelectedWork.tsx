import { projects } from '@/lib/projects';
import { ProjectCard } from './ProjectCard';
import { SectionHeading } from './SectionHeading';

/**
 * Asymmetric grid, varied aspect ratios, five projects in five cells. Each
 * card carries the problem, what he did, and the number.
 */
export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-heading" className="py-section">
      <div className="shell">
        <SectionHeading id="work-heading">Selected work</SectionHeading>

        <div className="grid-base mt-14 gap-y-16 md:mt-20 md:gap-y-20">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

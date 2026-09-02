'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import type { Project } from '@/lib/projects';

/**
 * The card lifts and the headline metric surfaces over the image on hover or
 * keyboard focus. Below lg there is no hover, so the metric is always visible.
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.08, 0.4), ease: [0.16, 1, 0.3, 1] }}
      className={`${project.span} group`}
    >
      <Link
        href={`/work/${project.slug}`}
        className="block outline-offset-8 transition-transform duration-500 ease-editorial focus-visible:outline-2 motion-safe:group-hover:-translate-y-1.5"
        aria-label={`${project.title}. ${project.metric.value} ${project.metric.label}. Read the case.`}
      >
        <div className={`relative ${project.aspect} w-full overflow-hidden bg-surface`}>
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover transition-transform duration-700 ease-editorial motion-safe:group-hover:scale-[1.02]"
          />

          {/* Metric reveal. Transform and opacity only. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden lg:block">
            <div className="translate-y-3 border-t border-accent bg-paper/95 px-5 py-4 opacity-0 transition-[transform,opacity] duration-500 ease-editorial group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="whitespace-nowrap font-serif text-[1.75rem] leading-none tracking-tight text-accent">
                  {project.metric.value}
                </span>
                <span className="meta">{project.metric.label}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-start justify-between gap-6">
          <div className="min-w-0">
            <h3 className="text-display-sm text-ink">
              <span className="link-rule">{project.title}</span>
            </h3>
            <p className="mt-3 max-w-measure text-body text-muted">{project.problem}</p>
            <p className="mt-4 max-w-measure text-[0.9375rem] text-ink">{project.did}</p>

            <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 lg:hidden">
              <span className="whitespace-nowrap font-serif text-[1.5rem] leading-none tracking-tight text-accent">
                {project.metric.value}
              </span>
              <span className="meta">{project.metric.label}</span>
            </p>
          </div>

          <span className="meta flex shrink-0 items-center gap-2 pt-2 text-muted transition-colors duration-300 group-hover:text-accent">
            {project.year}
            <ArrowUpRight size={13} weight="bold" aria-hidden />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

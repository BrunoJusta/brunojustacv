import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Reveal';
import { site } from '@/lib/content';
import { getProject, projects } from '@/lib/projects';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: 'Project not found' };

  const description = `${project.problem} ${project.did}`;

  return {
    title: project.title,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title}, ${site.name}`,
      description,
      url: `${site.url}/work/${project.slug}`,
      type: 'article',
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const position = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(position + 1) % projects.length];

  const caseSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    author: { '@type': 'Person', name: site.name },
    about: project.problem,
    dateCreated: project.year,
    url: `${site.url}/work/${project.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseSchema) }}
      />

      <article className="pb-section pt-24 md:pt-28">
        <header className="shell">
          <Link
            href="/#work"
            className="link-rule meta inline-flex items-center gap-2 transition-colors duration-300 hover:text-ink"
          >
            <ArrowLeft size={13} weight="bold" aria-hidden />
            Selected work
          </Link>

          <div className="grid-base mt-10 items-end gap-y-8 border-b border-rule pb-10 md:mt-14">
            <div className="lg:col-span-8">
              <h1 className="text-display-lg">{project.title}</h1>
            </div>
            <div className="flex items-baseline gap-4 lg:col-span-4 lg:justify-end">
              <p className="font-serif text-[clamp(2rem,4vw,3rem)] leading-none tracking-tight text-accent">
                {project.metric.value}
              </p>
              <p className="meta max-w-[18ch]">{project.metric.label}</p>
            </div>
          </div>

          <dl className="grid-base gap-y-6 py-8">
            <div className="lg:col-span-3">
              <dt className="meta mb-2">Year</dt>
              <dd className="text-[0.9375rem] text-ink">{project.year}</dd>
            </div>
            <div className="lg:col-span-4">
              <dt className="meta mb-2">Role</dt>
              <dd className="text-[0.9375rem] text-ink">{project.role}</dd>
            </div>
            <div className="lg:col-span-5">
              <dt className="meta mb-2">Built with</dt>
              <dd className="flex flex-wrap items-baseline gap-x-3 gap-y-2 text-[0.9375rem] text-ink">
                {project.stack.map((tool, index) => (
                  <span key={tool} className="flex items-baseline gap-3">
                    {index > 0 ? <span aria-hidden className="h-3 w-px bg-rule" /> : null}
                    {tool}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </header>

        <Reveal className="shell mt-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface">
            <Image
              src={project.imageWide}
              alt={project.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="shell mt-16 md:mt-24">
          <div className="grid-base gap-y-14">
            <section className="lg:col-span-4">
              <h2 className="border-t border-rule pt-5 font-serif text-[1.5rem] leading-tight tracking-tight">
                Problem
              </h2>
              <p className="mt-5 max-w-measure text-body text-muted">{project.problem}</p>
            </section>

            <section className="lg:col-span-8 lg:col-start-5">
              <h2 className="border-t border-rule pt-5 font-serif text-[1.5rem] leading-tight tracking-tight">
                Approach
              </h2>
              <ol className="mt-5 flex flex-col gap-6">
                {project.approach.map((step, index) => (
                  <li key={step} className="flex max-w-measure gap-5">
                    <span className="meta mt-[0.35em] shrink-0 text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-body text-muted">{step}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="lg:col-span-8 lg:col-start-5">
              <h2 className="border-t border-rule pt-5 font-serif text-[1.5rem] leading-tight tracking-tight">
                Outcome
              </h2>
              <ul className="mt-5 flex flex-col gap-4">
                {project.outcome.map((line) => (
                  <li key={line} className="flex max-w-measure gap-4 text-body text-ink">
                    <span aria-hidden className="mt-[0.72em] h-px w-4 shrink-0 bg-accent" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <nav aria-label="More work" className="shell mt-20 md:mt-28">
          <div className="flex flex-col gap-6 border-t border-rule pt-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="meta mb-3">Next project</p>
              <Link href={`/work/${next.slug}`} className="group inline-flex items-baseline gap-4">
                <span className="link-rule font-serif text-display-sm text-ink">{next.title}</span>
                <ArrowRight
                  size={16}
                  weight="bold"
                  aria-hidden
                  className="text-accent transition-transform duration-300 ease-editorial group-hover:translate-x-1"
                />
              </Link>
            </div>

            <a
              href={`mailto:${site.email}`}
              className="link-rule inline-flex items-center gap-2 text-[0.9375rem] text-muted transition-colors duration-300 hover:text-ink"
            >
              Email me about this project
              <ArrowUpRight size={13} weight="bold" aria-hidden />
            </a>
          </div>
        </nav>
      </article>

      <Footer />
    </>
  );
}

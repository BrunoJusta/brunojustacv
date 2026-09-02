'use client';

import { ArrowUpRight, DownloadSimple } from '@phosphor-icons/react/dist/ssr';
import { site } from '@/lib/content';
import { Magnetic } from './Magnetic';
import { Reveal } from './Reveal';

/**
 * The whole section is one address. No form: the fastest path to a reply is
 * the visitor's own mail client.
 */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="pb-section pt-section">
      <div className="shell">
        <Reveal>
          <div className="border-t border-rule pt-8">
            <h2 id="contact-heading" className="max-w-measure text-display-md">
              Let me know what you are building.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 md:mt-16">
          <Magnetic strength={0.14} className="block">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex max-w-full items-baseline gap-4 font-serif text-[clamp(1.5rem,5.4vw,4rem)] leading-[1.06] tracking-tight text-ink transition-colors duration-300 ease-editorial hover:text-accent"
            >
              <span className="break-words" translate="no">{site.email}</span>
              <ArrowUpRight
                size={22}
                weight="light"
                aria-hidden
                className="hidden shrink-0 translate-y-[-0.35em] transition-transform duration-300 ease-editorial group-hover:translate-x-1 group-hover:translate-y-[-0.5em] sm:block"
              />
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.14} className="mt-14 md:mt-20">
          <dl className="grid-base gap-y-8 border-t border-rule pt-8">
            <div className="lg:col-span-3">
              <dt className="meta mb-3">Phone</dt>
              <dd>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="link-rule whitespace-nowrap text-[0.9375rem] text-muted transition-colors duration-300 hover:text-ink"
                  translate="no"
                >
                  {site.phone}
                </a>
              </dd>
            </div>

            <div className="lg:col-span-3">
              <dt className="meta mb-3">LinkedIn</dt>
              <dd>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-rule inline-flex items-center gap-2 text-[0.9375rem] text-muted transition-colors duration-300 hover:text-ink"
                >
                  <span translate="no">{site.linkedinLabel}</span>
                  <ArrowUpRight size={12} weight="bold" aria-hidden />
                </a>
              </dd>
            </div>

            <div className="lg:col-span-3">
              <dt className="meta mb-3">Languages</dt>
              <dd className="text-[0.9375rem] text-muted">
                {site.languages.map((language) => (
                  <span key={language.name} className="block">
                    {language.name}, {language.level}
                  </span>
                ))}
              </dd>
            </div>

            <div className="lg:col-span-3">
              <dt className="meta mb-3">Curriculum</dt>
              <dd>
                <a
                  href={site.cv}
                  download
                  className="link-rule inline-flex items-center gap-2 text-[0.9375rem] text-muted transition-colors duration-300 hover:text-ink"
                >
                  Download CV
                  <DownloadSimple size={13} weight="bold" aria-hidden />
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

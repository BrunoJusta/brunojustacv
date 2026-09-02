import { experience } from '@/lib/content';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

/**
 * A mono date rail on the left, content on the right. The date sticks while a
 * long role scrolls past, which is what a recruiter is scanning for.
 */
export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-section">
      <div className="shell">
        <SectionHeading id="experience-heading">Experience</SectionHeading>

        <ol className="mt-14 md:mt-20">
          {experience.map((role, index) => (
            <li key={`${role.title}-${role.period}`} className="border-t border-rule py-10 first:border-t-0 first:pt-0 md:py-14">
              <Reveal delay={index * 0.05}>
                <div className="grid-base gap-y-5">
                  <p className="meta lg:col-span-3 lg:sticky lg:top-24 lg:self-start lg:pt-2">{role.period}</p>

                  <div className="lg:col-span-8 lg:col-start-5">
                    <h3 className="text-display-sm text-ink">{role.title}</h3>
                    {role.company ? (
                      <p className="mt-2 text-[0.9375rem] text-accent">{role.company}</p>
                    ) : null}
                    {role.summary ? (
                      <p className="mt-5 max-w-measure text-body text-muted">{role.summary}</p>
                    ) : null}
                    {role.bullets ? (
                      <ul className="mt-6 flex flex-col gap-4">
                        {role.bullets.map((bullet) => (
                          <li key={bullet} className="flex max-w-measure gap-4 text-body text-muted">
                            <span aria-hidden className="mt-[0.72em] h-px w-4 shrink-0 bg-accent" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

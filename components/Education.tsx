import { education } from '@/lib/content';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

/** Three items, one row at lg. Years in mono, aligned. */
export function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="py-section">
      <div className="shell">
        <SectionHeading id="education-heading">Education</SectionHeading>

        <ul className="grid-base mt-14 gap-y-10 md:mt-20">
          {education.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={index * 0.08}
              className="flex flex-col gap-3 border-t border-rule pt-6 lg:col-span-4"
            >
              <p className="meta text-accent">{item.period}</p>
              <h3 className="text-[1.125rem] font-medium leading-snug tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="text-body text-muted">{item.school}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

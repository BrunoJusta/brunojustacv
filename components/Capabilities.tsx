import { capabilities } from '@/lib/content';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

/**
 * Three groups, three rows. A definition list rather than a tag cloud: the
 * group name sits on the left and the items read as one line of type.
 */
export function Capabilities() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-heading" className="bg-surface py-section">
      <div className="shell">
        <SectionHeading id="capabilities-heading">Capabilities</SectionHeading>

        <dl className="mt-14 md:mt-20">
          {capabilities.map((group, index) => (
            <Reveal
              key={group.group}
              delay={index * 0.08}
              className="grid-base gap-y-4 border-t border-rule py-8 md:py-10"
            >
              <dt className="font-serif text-[1.375rem] leading-tight tracking-tight text-ink lg:col-span-3">
                {group.group}
              </dt>
              <dd className="lg:col-span-8 lg:col-start-5">
                <ul className="flex flex-wrap items-baseline gap-x-3 gap-y-3">
                  {group.items.map((item, itemIndex) => (
                    <li key={item} className="flex items-baseline gap-3 text-body text-muted">
                      {itemIndex > 0 ? <span aria-hidden className="h-3 w-px bg-rule" /> : null}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

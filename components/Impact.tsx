'use client';

import { impact } from '@/lib/content';
import { Counter } from './Counter';
import { Reveal } from './Reveal';

/**
 * A measured band, not cards: hairlines divide the cells and the numbers do
 * the work. Seven real figures, seven cells, no filler.
 */
export function Impact() {
  return (
    <section aria-labelledby="impact-heading" className="bg-surface py-section">
      <div className="shell">
        <h2 id="impact-heading" className="sr-only">
          Impact in numbers
        </h2>

        <div className="grid-base gap-y-0 border-t border-rule">
          {impact.map((item, index) => (
            <Reveal
              key={item.caption}
              delay={index * 0.06}
              className={`${item.span} flex flex-col justify-between gap-6 border-b border-rule py-8 lg:border-l lg:first:border-l-0 lg:py-10 lg:pl-6 lg:[&:nth-child(4)]:border-l-0 lg:[&:nth-child(7)]:border-l-0`}
            >
              <p className="font-serif text-metric text-ink">
                <Counter
                  value={item.value}
                  decimals={item.decimals}
                  prefix={item.prefix}
                  suffix={item.suffix}
                />
              </p>

              <div className="flex flex-col gap-2">
                <p className="max-w-measure-sm text-body text-muted">{item.caption}</p>
                {item.aside ? (
                  <p className="meta flex items-baseline gap-2 border-t border-rule pt-2 text-accent">
                    <span className="font-serif text-[1.375rem] leading-none tracking-tight text-ink">
                      <Counter value={item.aside.value} suffix={item.aside.suffix} />
                    </span>
                    <span className="text-muted">{item.aside.caption}</span>
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

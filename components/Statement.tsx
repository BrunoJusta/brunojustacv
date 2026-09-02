import { positioning } from '@/lib/content';
import { Reveal } from './Reveal';

/**
 * The positioning statement gets its own band: the first sentence set as
 * display type, the rest as prose beside it. The hero stays a nameplate.
 */
export function Statement() {
  return (
    <section aria-labelledby="statement-heading" className="pb-section">
      <div className="shell">
        <div className="grid-base items-start gap-y-10 border-t border-rule pt-10 md:pt-14">
          <Reveal className="lg:col-span-6">
            <h2 id="statement-heading" className="max-w-[26ch] text-display-md">
              {positioning.lead}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <p className="max-w-measure text-body text-muted">{positioning.body}</p>
            <p className="mt-5 max-w-measure text-body text-ink">{positioning.close}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

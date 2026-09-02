import Image from 'next/image';
import { beyondWork } from '@/lib/content';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

/** One paragraph and two photographs. Offset, so it reads as a spread. */
export function BeyondWork() {
  return (
    <section id="beyond" aria-labelledby="beyond-heading" className="py-section">
      <div className="shell">
        <SectionHeading id="beyond-heading">Beyond work</SectionHeading>

        <div className="grid-base mt-14 items-start gap-y-10 md:mt-20">
          <Reveal className="lg:col-span-4 lg:col-start-1">
            <p className="max-w-measure text-lead text-ink">{beyondWork}</p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface">
              <Image
                src="/images/beyond-01.jpg"
                alt="Placeholder slot for one of Bruno’s own photographs, portrait format."
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.18} className="lg:col-span-3 lg:col-start-10 lg:mt-24">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
              <Image
                src="/images/beyond-02.jpg"
                alt="Placeholder slot for one of Bruno’s own photographs, landscape format."
                fill
                sizes="(min-width: 1024px) 25vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

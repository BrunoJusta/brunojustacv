import { ArrowUpRight, DownloadSimple } from '@phosphor-icons/react/dist/ssr';
import { site } from '@/lib/content';
import { HeroObject } from './HeroObject';
import { Magnetic } from './Magnetic';

/**
 * A server component. The entrance is CSS, so the name is on screen at first
 * paint rather than after hydration, and only the sphere and the magnetic
 * button ship JavaScript.
 */

/** One word per line, one span per letter, staggered by CSS custom property. */
function Name({ name }: { name: string }) {
  let charIndex = 0;

  return (
    <>
      {name.split(' ').map((word) => (
        <span key={word} className="block overflow-hidden pb-[0.04em]">
          {word.split('').map((char) => {
            const delay = 90 + charIndex * 40;
            charIndex += 1;
            return (
              <span
                key={`${char}-${charIndex}`}
                className="enter enter-letter"
                style={{ '--enter-delay': `${delay}ms` } as React.CSSProperties}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  return (
    <section id="top" className="flex min-h-[100dvh] flex-col justify-center pb-16 pt-20 md:pt-24">
      <div className="shell">
        <div className="grid-base items-center gap-y-14">
          <div className="lg:col-span-6">
            <p className="label enter mb-5 md:mb-6" style={{ '--enter-delay': '20ms' } as React.CSSProperties}>
              {site.role}
            </p>

            <h1 className="font-serif text-display-xl">
              <span className="sr-only">{site.name}</span>
              <span aria-hidden>
                <Name name={site.name} />
              </span>
            </h1>

            <div
              className="enter mt-10 flex flex-wrap items-center gap-x-7 gap-y-5 md:mt-12"
              style={{ '--enter-delay': '540ms' } as React.CSSProperties}
            >
              <Magnetic strength={0.24}>
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex items-center gap-3 border border-accent bg-accent px-5 py-3 text-[0.9375rem] text-paper transition-colors duration-300 ease-editorial hover:bg-transparent hover:text-accent active:translate-y-[1px]"
                >
                  Email me
                  <ArrowUpRight
                    size={15}
                    weight="bold"
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-[2px]"
                  />
                </a>
              </Magnetic>

              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-rule inline-flex items-center gap-2 text-[0.875rem] text-muted transition-colors duration-300 hover:text-ink"
              >
                LinkedIn
                <ArrowUpRight size={12} weight="bold" aria-hidden />
              </a>

              <a
                href={site.cv}
                download
                className="link-rule inline-flex items-center gap-2 text-[0.875rem] text-muted transition-colors duration-300 hover:text-ink"
              >
                Download CV
                <DownloadSimple size={13} weight="bold" aria-hidden />
              </a>
            </div>

            <p
              className="meta enter mt-10 border-t border-rule pt-4 md:mt-12"
              style={{ '--enter-delay': '640ms' } as React.CSSProperties}
            >
              {site.location}
            </p>
          </div>

          {/* The object. Decorative, so it carries no alt text and no focus. */}
          <div
            className="enter lg:col-span-6"
            style={{ '--enter-delay': '260ms' } as React.CSSProperties}
          >
            <div className="mx-auto aspect-square w-full max-w-[280px] sm:max-w-[360px] lg:mr-0 lg:max-w-[560px]">
              <HeroObject />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

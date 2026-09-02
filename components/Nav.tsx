'use client';

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { useState } from 'react';
import { nav, site } from '@/lib/content';
import { Magnetic } from './Magnetic';
import { ThemeToggle } from './ThemeToggle';

/** Appears once the hero has left the viewport, then stays. One line, 64px. */
export function Nav() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [shown, setShown] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const threshold = typeof window === 'undefined' ? 700 : window.innerHeight * 0.75;
    setShown(latest > threshold);
  });

  return (
    <AnimatePresence>
      {shown && (
        <motion.header
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 top-0 z-nav border-b border-rule bg-paper/85 backdrop-blur-[6px]"
        >
          <nav aria-label="Sections" className="shell flex h-16 items-center justify-between gap-6">
            <a href="#top" className="link-rule font-serif text-[1.0625rem] tracking-tight text-ink">
              {site.name}
            </a>

            <div className="flex items-center gap-5 sm:gap-7">
              <ul className="hidden items-center gap-5 sm:flex sm:gap-7">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Magnetic strength={0.22}>
                      <a
                        href={item.href}
                        className="link-rule text-[0.8125rem] text-muted transition-colors duration-300 hover:text-ink"
                      >
                        {item.label}
                      </a>
                    </Magnetic>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="link-rule text-[0.8125rem] text-ink sm:hidden"
              >
                Contact
              </a>
              <ThemeToggle />
            </div>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

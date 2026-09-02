'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

/** A single hairline that fills as you scroll. The only fixed decoration. */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-overlay h-px bg-transparent">
      <motion.div
        className="h-px origin-left bg-accent"
        style={{ scaleX: reduce ? scrollYProgress : scaleX }}
      />
    </div>
  );
}

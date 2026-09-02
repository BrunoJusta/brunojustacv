'use client';

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';

type RevealProps = HTMLMotionProps<'div'> & {
  /** Stagger index. Each step adds 60ms, capped so long lists stay snappy. */
  delay?: number;
  as?: 'div' | 'li' | 'section' | 'article';
  y?: number;
};

/**
 * Scroll reveal. Transform and opacity only, fires once, and degrades to a
 * plain fade when the visitor asks for reduced motion.
 */
export function Reveal({ children, delay = 0, y = 22, as = 'div', ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={
        reduce
          ? { duration: 0.3, delay: Math.min(delay, 0.2) }
          : { duration: 0.5, delay: Math.min(delay, 0.5), ease: [0.16, 1, 0.3, 1] }
      }
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

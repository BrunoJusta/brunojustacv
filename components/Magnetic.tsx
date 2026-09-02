'use client';

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * Pointer-following wrapper. Values live in motion values, never in state, so
 * this never re-renders on pointer move. Off for touch and reduced motion.
 */
export function Magnetic({
  children,
  strength = 0.28,
  className = '',
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const x = useSpring(mx, { stiffness: 220, damping: 22, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 22, mass: 0.4 });
  const tx = useTransform(x, (v) => v * strength);
  const ty = useTransform(y, (v) => v * strength);

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      style={reduce ? undefined : { x: tx, y: ty }}
      onPointerMove={(event) => {
        if (reduce || event.pointerType !== 'mouse') return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set(event.clientX - (rect.left + rect.width / 2));
        my.set(event.clientY - (rect.top + rect.height / 2));
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

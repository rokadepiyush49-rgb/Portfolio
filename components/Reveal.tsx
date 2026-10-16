'use client';

import { m, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Seconds of delay — use small increments to stagger siblings. */
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'span';
};

/**
 * The single scroll-entrance used across the site: a short fade + rise,
 * fired once, with a fast expo-out curve so it never feels sluggish.
 */
export default function Reveal({ children, delay = 0, y = 24, className, as = 'div' }: Props) {
  const reduce = useReducedMotion();
  const MotionTag = m[as] as typeof m.div;

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

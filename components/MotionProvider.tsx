'use client';

import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Loads only the animation features the site uses (no drag, no layout
 * animations), so components render the slim `m.*` instead of `motion.*` and
 * ship far less of framer-motion. `strict` makes a stray `motion.*` throw
 * instead of quietly pulling the full bundle back in.
 *
 * reducedMotion="user": for visitors who ask for less motion, transforms
 * (rises, slides, scales) jump straight to their end state; fades still run.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

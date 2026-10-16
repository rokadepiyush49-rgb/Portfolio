'use client';

import { m, useScroll, useSpring } from 'framer-motion';

/**
 * A hairline at the very top that fills as you move down the page.
 *
 * Spring-smoothed rather than bound straight to scroll — raw scroll progress
 * on a trackpad is jittery, and the point of this is calm feedback, not a
 * readout. Two pixels tall so it registers without ever asking for attention.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <m.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 55%, #FF1A3C 100%)',
      }}
    />
  );
}

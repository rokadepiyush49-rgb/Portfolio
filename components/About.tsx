'use client';

import { m } from 'framer-motion';
import { site } from '@/data/site';
import AboutBoard from './AboutBoard';
import Reveal from './Reveal';

/**
 * Split layout: the claim on the left, the story on the right. The paragraph
 * fades in word by word as it enters — slow enough to notice, fast enough
 * that nobody waits for it.
 */
export default function About() {
  const { headline, highlight, body, interests } = site.about;
  const parts = headline.split(highlight);
  const words = body.split(' ');

  return (
    <section id="about" className="container-content scroll-mt-24 py-20 md:py-32">
      <div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:w-5/12">
          <Reveal>
            <div className="eyebrow-hand mb-5">About</div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="text-display-md font-medium leading-[1.1] tracking-[-0.035em] text-ink">
              {parts[0]}
              <span className="font-serif italic">{highlight}</span>
              {parts[1]}
            </h2>
          </Reveal>
        </div>

        <div className="max-w-measure flex-1">
          {/* Each word fades in on its own beat, but the spaces are real
              characters so the paragraph still reads and copies as prose. */}
          <p className="text-[17px] leading-[1.65] text-ink md:text-[19px]">
            {words.map((word, i) => (
              <m.span
                key={`${word}-${i}`}
                className="inline"
                initial={{ opacity: 0.12 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 0.5, delay: i * 0.012, ease: 'easeOut' }}
              >
                {word}
                {i < words.length - 1 ? ' ' : ''}
              </m.span>
            ))}
          </p>

          <Reveal delay={0.1}>
            <div className="mt-12 border-t border-rule pt-8">
              <p className="meta mb-5 text-ink-ghost">Currently into</p>
              <ul className="flex flex-wrap gap-x-3 gap-y-3">
                {interests.map((interest) => (
                  <li
                    key={interest}
                    className="cursor-default rounded-pill border border-rule px-4 py-2 text-[14px] text-ink-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-rule-strong hover:text-ink"
                  >
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

        </div>
      </div>

      {/* The board sits under the copy, full width of the container. */}
      <div className="flex w-full flex-col items-center pt-14 md:pt-20">
        <Reveal y={32} className="w-full">
          <AboutBoard />
        </Reveal>
        <p className="mt-8 font-sans text-[13px] tracking-tight text-ink/40">
          Try Moving Things :)
        </p>
      </div>
    </section>
  );
}

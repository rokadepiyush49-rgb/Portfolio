'use client';

import { Quote } from 'lucide-react';
import { useEffect, useState } from 'react';
import { testimonials } from '@/data/testimonials';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import SmartImage from './SmartImage';

/**
 * All the quotes stay visible — one is simply "lit". It advances on its own,
 * follows your cursor when you hover, and the bars up top double as controls
 * and as a progress read-out.
 */
export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Past half a dozen quotes the bars need to tighten up or they sprawl
  // across the heading row.
  const dense = testimonials.length > 6;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % testimonials.length), 4200);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section id="testimonials" className="container-content scroll-mt-24 border-t border-rule py-20 md:py-32">
      <SectionHeading
        eyebrow="Proof of Work"
        title="What people actually say."
        aside={
          <div
            className={`flex items-center ${dense ? 'gap-1' : 'gap-1.5'}`}
            role="tablist"
            aria-label="Testimonials"
          >
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Show quote from ${t.name}`}
                onClick={() => setActive(i)}
                // The after: layer widens the tap area to 24px tall without
                // changing how the bar looks.
                className={`relative h-1.5 rounded-pill transition-all duration-500 ease-expo after:absolute after:-inset-x-0.5 after:-inset-y-[9px] after:content-[''] ${
                  i === active
                    ? `bg-ink ${dense ? 'w-6' : 'w-8'}`
                    : `bg-ink/15 hover:bg-ink/30 ${dense ? 'w-2.5' : 'w-4'}`
                }`}
              />
            ))}
          </div>
        }
        className="mb-10 md:mb-14"
      />

      <Reveal y={32}>
        <div
          className="rounded-[24px] bg-[#131314] p-3 dark:ring-1 dark:ring-white/[0.07] md:rounded-panel md:p-5"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {testimonials.map((t, i) => {
              const isActive = i === active;
              return (
                <li
                  key={t.name}
                  onMouseEnter={() => setActive(i)}
                  className={`flex flex-col justify-between rounded-2xl p-5 transition-all duration-500 ease-expo md:p-6 ${
                    isActive
                      ? 'bg-white/[0.07] ring-1 ring-white/15'
                      : 'bg-white/[0.03] ring-1 ring-white/[0.06]'
                  } ${
                    // Seven quotes: the wide first card makes the 2-column grid
                    // 8 cells, and widening the sixth makes the 3-column one 9,
                    // so neither leaves a hole on its last row.
                    i === 0 ? 'sm:col-span-2' : i === 5 ? 'lg:col-span-2' : ''
                  }`}
                >
                  <div>
                    <Quote
                      size={18}
                      strokeWidth={1.75}
                      className={`mb-4 transition-colors duration-500 ${
                        isActive ? 'text-accent-brand' : 'text-white/25'
                      }`}
                    />
                    <blockquote
                      className={`text-[15px] leading-[1.55] tracking-[-0.01em] transition-colors duration-500 md:text-[16px] ${
                        isActive ? 'text-white' : 'text-white/55'
                      } ${i === 0 ? 'lg:text-[19px] lg:leading-[1.5]' : ''}`}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>

                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-white/10">
                      <SmartImage
                        src={t.avatar}
                        alt=""
                        label=""
                        sizes="36px"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[14px] font-medium text-white">
                        {t.name}
                      </span>
                      <span className="block truncate text-[12px] text-white/45">
                        {t.role}, {t.company}
                      </span>
                    </span>
                  </figcaption>
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

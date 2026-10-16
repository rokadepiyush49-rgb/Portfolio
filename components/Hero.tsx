'use client';

import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Fragment, useRef } from 'react';
import { site } from '@/data/site';
import { useIsDark } from '@/lib/useIsDark';
import LetterGlitch from './LetterGlitch';
import ProfileCard from './ProfileCard';

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Splits a line into words so each can rise in on its own beat. The space sits
 * between the word boxes, not inside them: a trailing space inside an
 * inline-block is dropped, which ran words together ("SOFTWAREDEVELOPER")
 * wherever two of them share a line. A lone "&" is kept on the same line as
 * the word after it ("& SHIPS.").
 */
function Words({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ');
  const groups: number[][] = [];
  words.forEach((_, i) => {
    const prev = groups[groups.length - 1];
    if (prev && words[prev[prev.length - 1]] === '&') prev.push(i);
    else groups.push([i]);
  });
  const box = (i: number) => (
    <span key={i} className="inline-block overflow-hidden align-bottom">
      <m.span
        className="inline-block"
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.85, delay: delay + i * 0.055, ease }}
      >
        {words[i]}
      </m.span>
    </span>
  );
  return (
    <span className={className}>
      {groups.map((group, g) => (
        <Fragment key={group[0]}>
          {group.length === 1 ? (
            box(group[0])
          ) : (
            <span className="whitespace-nowrap">
              {group.map((i, k) => (
                <Fragment key={i}>
                  {k > 0 ? ' ' : null}
                  {box(i)}
                </Fragment>
              ))}
            </span>
          )}
          {g < groups.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </span>
  );
}


/** Bolds the phrases listed in `site.emphasis` inside the intro line. */
function Intro() {
  const pattern = site.emphasis.length
    ? new RegExp(`(${site.emphasis.map((e) => e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
    : null;
  const parts = pattern ? site.intro.split(pattern) : [site.intro];

  return (
    <>
      {parts.map((part, i) =>
        (site.emphasis as readonly string[]).includes(part) ? (
          <span key={i} className="font-semibold text-ink">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const dark = useIsDark();
  const sectionRef = useRef<HTMLElement>(null);


  // The hero sinks and dims as it leaves rather than simply scrolling off,
  // so the first section hands over to the second instead of cutting.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const leaveY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const leaveOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // The card's footer shows your GitHub username as the @handle.
  const handle = site.socials.find((s) => s.label === 'GitHub')?.href.split('/').pop() ?? '';

  return (
    <section ref={sectionRef} id="top" className="relative isolate overflow-hidden">
      {/* Letter Glitch (React Bits) runs edge to edge behind everything. It
          listens for the cursor on window, so it can ignore pointer events and
          never block a click. The mask fades it out into the next section. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
      >
        <LetterGlitch lightMode={!dark} />
      </div>

      <div className="container-content relative flex min-h-[100svh] flex-col justify-center pb-16 pt-28 md:pb-24 md:pt-32 lg:flex-row lg:items-center lg:gap-16">
        {/* Very soft tinted wash so the white never reads as flat. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5] dark:opacity-[0.08]"
          style={{
            background:
              'radial-gradient(60% 50% at 15% 10%, #f1f0ff 0%, transparent 60%), radial-gradient(45% 40% at 90% 30%, #fff2f3 0%, transparent 65%)',
          }}
        />

        <m.div
          className="w-full max-w-[720px] lg:flex-1"
          style={reduce ? undefined : { y: leaveY, opacity: leaveOpacity }}
        >
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-pill border border-rule bg-bg/60 px-3.5 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)] backdrop-blur-sm"
          >
            <m.span
              aria-hidden
              className="inline-block origin-[70%_70%] text-[18px] md:text-[20px]"
              animate={reduce ? {} : { rotate: [0, 16, -8, 16, 0] }}
              transition={{ duration: 1.6, delay: 0.8, ease: 'easeInOut' }}
            >
              👋
            </m.span>
            <span className="pr-1 text-[15px] font-medium tracking-tight text-ink/75 md:text-[17px]">
              Hi, I&rsquo;m {site.firstName}
            </span>
          </m.div>

          <h1 className="text-display-xl mb-5 font-medium uppercase tracking-[-0.045em] text-ink">
            <Words text={site.headline.line1} delay={0.15} />
            <br />
            <Words text={site.headline.dimWord} className="text-ink/25" delay={0.3} />{' '}
            <Words
              text={site.headline.line2.replace(`${site.headline.dimWord} `, '')}
              delay={0.36}
            />
          </h1>

          <m.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease }}
            className="max-w-[540px] text-[16px] leading-snug tracking-[-0.01em] text-ink-dim md:text-[18px]"
          >
            <Intro />
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.82, ease }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href={site.cta.href}
              className="group inline-flex items-center gap-2.5 rounded-pill bg-ink px-6 py-3.5 text-[15px] font-medium text-bg shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink/85 hover:shadow-md"
            >
              {site.cta.label}
              <ArrowDown
                size={16}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </a>

            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-faint">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1D9E75] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1D9E75]" />
              </span>
              <span className="meta">{site.availability}</span>
            </span>
          </m.div>
        </m.div>

        {/* Your profile card (React Bits) — it handles its own tilt, holographic
            shine and contact button. On phones it sits under the text. */}
        <m.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease }}
          className="relative mt-12 flex w-full flex-col items-center lg:mt-0 lg:w-[44%] lg:max-w-[480px] lg:shrink-0"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-10 blur-3xl"
            style={{
              background:
                'radial-gradient(45% 40% at 35% 35%, rgba(124,58,237,0.22), transparent 70%), radial-gradient(45% 40% at 65% 70%, rgba(255,26,60,0.16), transparent 70%)',
            }}
          />

          <ProfileCard
            avatarUrl={site.portrait}
            name={site.name}
            title={site.role}
            handle={handle}
            status={site.availability}
            contactText="Contact"
            onContactClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            // `!` beats the card's own built-in w-[340px].
            className="!w-[340px] sm:!w-[380px] lg:!w-[420px]"
          />

          <span className="relative mt-5 w-[340px] max-w-full text-right font-hand text-2xl text-accent-brand sm:w-[380px] lg:w-[420px]">
            that&rsquo;s me, somewhere along the way
          </span>
        </m.div>
      </div>
    </section>
  );
}

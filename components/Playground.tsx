'use client';

import { MousePointer2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { playground } from '@/data/playground';
import SectionHeading from './SectionHeading';
import SmartImage from './SmartImage';

/**
 * Visual Playground
 * ─────────────────
 * A full-bleed row of tall cards that scrolls forever on its own.
 *
 * The interaction is driven by a single `active` index rather than CSS
 * :hover, because three things have to happen in concert and stay in sync:
 *
 *   1. the active card scales up and lifts above its neighbours (z-index),
 *   2. its note fades and slides down into place from above the card,
 *   3. every other card loses emphasis *without moving* — only opacity and
 *      brightness change, so the row never reflows or jumps.
 *
 * Scale is a transform, so an enlarged card overlaps its neighbours instead
 * of pushing them around. The section clips horizontally, so nothing the
 * cards do can widen the page.
 *
 * Pointer devices drive this on hover; touch devices toggle it on tap, where
 * the first tap opens a card and a second tap follows its link.
 */

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

type CardProps = {
  item: (typeof playground)[number];
  index: number;
  isActive: boolean;
  isDimmed: boolean;
  onActivate: () => void;
  onToggle: (e: MouseEvent<HTMLElement>) => void;
};

function Card({ item, index, isActive, isDimmed, onActivate, onToggle }: CardProps) {
  const Tag = item.link ? 'a' : 'div';

  return (
    <Tag
      {...(item.link ? { href: item.link, 'aria-label': item.title } : {})}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onToggle}
      aria-expanded={isActive}
      className={[
        'relative block shrink-0 snap-center pt-14 outline-none',
        'transition-[transform,opacity,filter] duration-700 will-change-transform',
        isActive ? 'z-20 scale-[1.045]' : 'z-0 scale-100',
        isDimmed ? 'opacity-40 brightness-[0.97]' : 'opacity-100 brightness-100',
      ].join(' ')}
      style={{ transitionTimingFunction: EASE, transformOrigin: 'center center' }}
    >
      {/* The note lives in the gutter above the card and settles downward. */}
      <span
        className={[
          'pointer-events-none absolute inset-x-0 z-30 line-clamp-2 px-3 text-center font-hand',
          'text-[17px] leading-[1.15] text-ink-faint md:text-xl md:leading-tight',
          'transition-[opacity,transform] duration-500',
          isActive ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0',
        ].join(' ')}
        style={{ top: 12, transitionTimingFunction: EASE }}
      >
        {item.note}
      </span>

      <div
        className={[
          'relative h-[320px] w-[230px] overflow-hidden rounded-[24px] bg-bg-muted',
          'ring-1 ring-black/[0.05] transition-shadow duration-700',
          'md:h-[440px] md:w-[320px] md:rounded-[40px]',
          isActive ? 'shadow-[0_30px_60px_-25px_rgba(0,0,0,0.35)]' : 'shadow-none',
        ].join(' ')}
        style={{ transitionTimingFunction: EASE }}
      >
        <SmartImage
          src={item.image}
          alt={`${item.title} — ${item.tech}`}
          label={`Playground ${index + 1}`}
          sizes="(max-width: 768px) 230px, 320px"
          className={`object-cover transition-transform duration-900 ${
            isActive ? 'scale-[1.07]' : 'scale-100'
          }`}
        />

        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-500 ${
            isActive ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Title + tech rise over the image itself. */}
        <div
          className={[
            'absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 md:inset-x-6 md:bottom-6',
            'transition-[opacity,transform] duration-500',
            isActive ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
          ].join(' ')}
          style={{ transitionTimingFunction: EASE }}
        >
          <span className="text-[15px] font-medium tracking-[-0.01em] text-white md:text-[17px]">
            {item.title}
          </span>
          <span className="meta text-white/70">{item.tech}</span>
        </div>
      </div>
    </Tag>
  );
}

export default function Playground() {
  // Duplicated once so the -50% translate loops seamlessly.
  const track = [...playground, ...playground];

  const [active, setActive] = useState<number | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  // Kept live rather than read once, so a device that gains or loses a
  // pointer (tablet + keyboard case, devtools emulation) stays correct.
  useEffect(() => {
    const mq = window.matchMedia('(hover: none)');
    const sync = () => setIsTouch(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Tapping outside closes the open card on touch devices.
  useEffect(() => {
    if (!isTouch || active === null) return;
    const onDocPointer = (e: PointerEvent) => {
      if (!rowRef.current?.contains(e.target as Node)) setActive(null);
    };
    document.addEventListener('pointerdown', onDocPointer);
    return () => document.removeEventListener('pointerdown', onDocPointer);
  }, [isTouch, active]);

  const handleToggle = useCallback(
    (i: number) => (e: MouseEvent<HTMLElement>) => {
      if (!isTouch) return; // Pointer devices already reveal on hover.
      if (active !== i) {
        // First tap opens the card; it does not navigate.
        e.preventDefault();
        setActive(i);
      }
      // A second tap on the open card falls through to its link.
    },
    [isTouch, active],
  );

  return (
    <section id="playground" className="scroll-mt-24 overflow-hidden py-20 md:py-28">
      <div className="container-content mb-10 md:mb-16">
        <SectionHeading
          eyebrow="Visual Playground"
          title="Small things I built just to see what would happen."
          aside={
            <span className="inline-flex items-center gap-2">
              <MousePointer2 size={14} strokeWidth={1.75} />
              <span className="hidden md:inline">Hover the cards to interact</span>
              <span className="md:hidden">Tap a card to interact</span>
            </span>
          }
        />
      </div>

      <div
        ref={rowRef}
        className="relative w-full md:mask-edges"
        onMouseLeave={() => !isTouch && setActive(null)}
        onBlur={(e) => {
          // Tabbing out of the row closes the open card, mirroring mouse-leave.
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setActive(null);
        }}
      >
        <div
          className={[
            'scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 pt-1',
            'md:w-max md:animate-marquee md:snap-none md:overflow-visible md:gap-6 md:px-4',
          ].join(' ')}
          style={{ animationPlayState: active !== null ? 'paused' : 'running' }}
        >
          {track.map((item, i) => (
            <Card
              key={`${item.title}-${i}`}
              item={item}
              index={i % playground.length}
              isActive={active === i}
              isDimmed={active !== null && active !== i}
              onActivate={() => !isTouch && setActive(i)}
              onToggle={handleToggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

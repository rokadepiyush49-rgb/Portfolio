'use client';

import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, RotateCcw } from 'lucide-react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { site } from '@/data/site';
import { chooseMove, emptyBoard, findWin, isFull, type Board } from '@/lib/xo';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

/**
 * The last thing on the page: a game of noughts and crosses the visitor is
 * quietly meant to win. The opponent's logic lives in lib/xo.ts.
 *
 * Only one outcome ends the game — the visitor winning. A draw, or the very
 * rare position where the opponent is forced into a line, resets with a
 * shrug instead. Nobody leaves this page having lost.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const THINKING_MS = 560;
const CELEBRATE_MS = 900;

type Phase = 'playing' | 'won' | 'reset';

function Mark({ mark }: { mark: 'X' | 'O' }) {
  const reduce = useReducedMotion();
  const draw = {
    initial: { pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 },
    animate: { pathLength: 1, opacity: 1 },
  };

  return (
    <svg viewBox="0 0 48 48" className="h-1/2 w-1/2" fill="none" aria-hidden>
      {mark === 'X' ? (
        <>
          <m.path
            d="M10 10 L38 38"
            stroke="currentColor"
            strokeWidth={4}
            strokeLinecap="round"
            {...draw}
            transition={{ duration: 0.28, ease: EASE }}
          />
          <m.path
            d="M38 10 L10 38"
            stroke="currentColor"
            strokeWidth={4}
            strokeLinecap="round"
            {...draw}
            transition={{ duration: 0.28, delay: 0.1, ease: EASE }}
          />
        </>
      ) : (
        <m.circle
          cx="24"
          cy="24"
          r="15"
          stroke="currentColor"
          strokeWidth={4}
          strokeLinecap="round"
          {...draw}
          transition={{ duration: 0.45, ease: EASE }}
        />
      )}
    </svg>
  );
}

export default function XOGame() {
  const reduce = useReducedMotion();
  const [board, setBoard] = useState<Board>(emptyBoard);
  const [showModal, setShowModal] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [phase, setPhase] = useState<Phase>('playing');
  const [line, setLine] = useState<readonly number[] | null>(null);
  const [nudge, setNudge] = useState<string | null>(null);

  const boardRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  const reset = useCallback(
    (message?: string) => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      setBoard(emptyBoard());
      setLine(null);
      setThinking(false);
      setShowModal(false);
      setPhase('playing');
      setNudge(message ?? null);
      if (message) later(() => setNudge(null), 2600);
    },
    [later],
  );

  const play = useCallback(
    (index: number) => {
      if (phase !== 'playing' || thinking || board[index]) return;

      const afterVisitor = board.slice();
      afterVisitor[index] = 'X';
      setBoard(afterVisitor);
      setNudge(null);

      const visitorWin = findWin(afterVisitor);
      if (visitorWin) {
        setLine(visitorWin.line);
        setPhase('won');
        return;
      }

      if (isFull(afterVisitor)) {
        later(() => reset('A draw. Go on, one more.'), 700);
        return;
      }

      setThinking(true);
      later(() => {
        const move = chooseMove(afterVisitor);
        if (move === null) return;

        const afterSystem = afterVisitor.slice();
        afterSystem[move] = 'O';
        setBoard(afterSystem);
        setThinking(false);

        const systemWin = findWin(afterSystem);
        if (systemWin) {
          // Cornered into a line. Not the point of this — start over.
          later(() => reset("Hm. Let's call that a warm-up."), 900);
          return;
        }
        if (isFull(afterSystem)) later(() => reset('A draw. Go on, one more.'), 700);
      }, THINKING_MS);
    },
    [board, later, phase, reset, thinking],
  );

  // Hold the win on screen for a beat before the modal arrives.
  useEffect(() => {
    if (phase !== 'won') {
      setShowModal(false);
      return;
    }
    const t = setTimeout(() => setShowModal(true), CELEBRATE_MS);
    return () => clearTimeout(t);
  }, [phase]);

  // Draw the strike-through from the real cell positions.
  const [stroke, setStroke] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(
    null,
  );
  useLayoutEffect(() => {
    if (!line || !boardRef.current) {
      setStroke(null);
      return;
    }
    const box = boardRef.current.getBoundingClientRect();
    const first = cellRefs.current[line[0]]?.getBoundingClientRect();
    const last = cellRefs.current[line[2]]?.getBoundingClientRect();
    if (!first || !last) return;
    setStroke({
      x1: first.left + first.width / 2 - box.left,
      y1: first.top + first.height / 2 - box.top,
      x2: last.left + last.width / 2 - box.left,
      y2: last.top + last.height / 2 - box.top,
    });
  }, [line]);

  // Send focus to the call to action, and let Escape dismiss the modal.
  useEffect(() => {
    if (!showModal) return;
    ctaRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') reset();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showModal, reset]);

  const won = phase === 'won';

  return (
    <section id="play" className="container-content scroll-mt-24 py-20 md:py-32">
      <SectionHeading
        eyebrow="One last thing"
        title="Think you can beat me?"
        aside="One quick game before you go."
        className="mb-12 md:mb-16"
      />

      <Reveal y={32}>
        <div className="relative flex flex-col items-center">
          {/* The board warms up when the visitor wins. */}
          <m.div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: won ? 1 : 0 }}
            transition={{ duration: 1.1, ease: EASE }}
            style={{
              background:
                'radial-gradient(50% 46% at 50% 46%, rgba(255,26,60,0.09) 0%, rgba(241,240,255,0.5) 45%, transparent 72%)',
            }}
          />

          <div
            ref={boardRef}
            className="relative grid grid-cols-3 gap-2.5 rounded-[28px] bg-bg-subtle p-2.5 ring-1 ring-rule md:gap-3 md:p-3"
          >
            {board.map((cell, i) => {
              const inLine = line?.includes(i) ?? false;
              const playable = phase === 'playing' && !thinking && !cell;

              return (
                <m.button
                  key={i}
                  ref={(el) => {
                    cellRefs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => play(i)}
                  disabled={!playable}
                  aria-label={
                    cell
                      ? `Square ${i + 1}, ${cell === 'X' ? 'yours' : 'mine'}`
                      : `Square ${i + 1}, empty`
                  }
                  className={`flex h-[clamp(80px,23vw,124px)] w-[clamp(80px,23vw,124px)] items-center justify-center rounded-[18px] bg-bg ring-1 transition-colors duration-300 md:rounded-[20px] ${
                    inLine ? 'ring-accent-brand/45' : 'ring-rule'
                  } ${playable ? 'cursor-pointer' : 'cursor-default'} ${
                    cell === 'X' ? 'text-ink' : 'text-ink-ghost'
                  }`}
                  whileHover={playable && !reduce ? { y: -3, scale: 1.02 } : undefined}
                  whileTap={playable && !reduce ? { scale: 0.97 } : undefined}
                  animate={
                    inLine && !reduce
                      ? { scale: [1, 1.06, 1], transition: { duration: 0.5, ease: EASE } }
                      : { scale: 1 }
                  }
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                >
                  <AnimatePresence mode="wait">
                    {cell ? <Mark key={cell} mark={cell} /> : null}
                  </AnimatePresence>
                </m.button>
              );
            })}

            {/* Strike-through across the winning row. */}
            {stroke ? (
              <svg
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              >
                <m.line
                  x1={stroke.x1}
                  y1={stroke.y1}
                  x2={stroke.x2}
                  y2={stroke.y2}
                  strokeWidth={5}
                  strokeLinecap="round"
                  initial={{ pathLength: reduce ? 1 : 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
                  style={{ stroke: 'rgb(var(--accent-brand))' }}
                />
              </svg>
            ) : null}
          </div>

          {/* One line of status, held at a fixed height so nothing shifts. */}
          <div className="mt-6 flex h-6 items-center" aria-live="polite">
            <AnimatePresence mode="wait">
              <m.p
                key={nudge ?? (thinking ? 'thinking' : won ? 'won' : 'idle')}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="text-[13px] text-ink-ghost"
              >
                {nudge ?? (thinking ? 'Thinking…' : won ? 'Well played.' : 'You’re X. Your move.')}
              </m.p>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        {showModal ? (
          <m.div
            key="xo-win"
            className="fixed inset-0 z-[70] flex items-center justify-center px-5"
            // Pointer events follow the state, not the animation. If an exit
            // ever stalls — a backgrounded tab pauses rAF — a full-screen
            // overlay must not be left swallowing clicks on the whole page.
            style={{ pointerEvents: showModal ? 'auto' : 'none' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => reset()}
              className="absolute inset-0 cursor-default bg-ink/25 backdrop-blur-[6px]"
            />

            <m.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="xo-title"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="relative w-full max-w-[440px] rounded-[28px] bg-bg p-8 text-center shadow-[0_40px_90px_-30px_rgba(0,0,0,0.35)] ring-1 ring-rule md:p-10"
            >
              <p className="eyebrow-hand mb-3">You won</p>
              <h3
                id="xo-title"
                className="mb-3 text-[26px] font-medium leading-[1.15] tracking-[-0.035em] text-ink md:text-[30px]"
              >
                Okay, you got me. <span aria-hidden>👀</span>
              </h3>
              <p className="mx-auto mb-8 max-w-[300px] text-[15px] leading-relaxed text-ink-dim">
                Looks like we should{' '}
                <span className="font-serif italic text-ink">work together</span>.
              </p>

              <a
                ref={ctaRef}
                href={`mailto:${site.contact.email}?subject=${encodeURIComponent(
                  'I beat your tic-tac-toe',
                )}`}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-pill bg-ink px-6 py-3.5 text-[15px] font-medium text-bg transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink/85"
              >
                Let&rsquo;s work together
                <ArrowUpRight
                  size={16}
                  strokeWidth={2}
                  className="transition-transform duration-300 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              <button
                type="button"
                onClick={() => reset()}
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-ghost transition-colors hover:text-ink"
              >
                <RotateCcw size={13} strokeWidth={2} />
                Play again
              </button>
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

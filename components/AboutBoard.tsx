'use client';

import Image from 'next/image';
import { m, useMotionValue, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { BOARD, boardItems, type BoardItem } from '@/data/board';
import SmartImage from './SmartImage';

/**
 * The About board — a little physical desk you can rearrange.
 *
 * Layout lives in a fixed 1040 × 620 design space (see data/board.ts) which
 * is scaled to fit whatever width the board gets. That single decision is
 * what keeps the composition identical from a wide monitor down to a phone:
 * nothing reflows, nothing stacks, the whole desk just gets smaller.
 *
 * Dragging is raw pointer events rather than a library, for three reasons:
 * mouse, trackpad and touch all arrive through the same handler; pointer
 * deltas have to be divided by the board scale to stay under the finger; and
 * items need clamping to the board's inner edge. Position is written to a
 * motion value during the drag so no React render happens per frame.
 */

const EDGE = 20; // How close an object may get to the board's edge.
const SPRING = { type: 'spring', stiffness: 260, damping: 26 } as const;

/* ------------------------------------------------------------------ */
/*  Draggable wrapper                                                  */
/* ------------------------------------------------------------------ */

type DragProps = {
  item: BoardItem;
  scaleRef: React.MutableRefObject<number>;
  z: number;
  onGrab: () => void;
  children: React.ReactNode;
  /** Suppress the hover lift while another object is being dragged. */
  anyDragging: boolean;
};

function Draggable({ item, scaleRef, z, onGrab, children, anyDragging }: DragProps) {
  const reduce = useReducedMotion();
  const [dragging, setDragging] = useState(false);

  const x = useMotionValue(item.x);
  const y = useMotionValue(item.y);
  const origin = useRef({ px: 0, py: 0, ix: 0, iy: 0 });

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      // Ignore secondary buttons so right-click doesn't strand an object.
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      origin.current = { px: e.clientX, py: e.clientY, ix: x.get(), iy: y.get() };
      setDragging(true);
      onGrab();
    },
    [onGrab, x, y],
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!dragging) return;
      const s = scaleRef.current || 1;
      const { px, py, ix, iy } = origin.current;
      // Screen pixels → design units, then clamp inside the board.
      const nx = ix + (e.clientX - px) / s;
      const ny = iy + (e.clientY - py) / s;
      x.set(Math.max(EDGE, Math.min(BOARD.width - EDGE - item.w, nx)));
      y.set(Math.max(EDGE, Math.min(BOARD.height - EDGE - item.h, ny)));
    },
    [dragging, item.h, item.w, scaleRef, x, y],
  );

  const endDrag = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLElement;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    setDragging(false);
  }, []);

  return (
    <m.div
      role="button"
      tabIndex={-1}
      aria-label={`Move ${item.id.replace(/-/g, ' ')}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className="absolute cursor-grab touch-none select-none active:cursor-grabbing"
      style={{ left: 0, top: 0, x, y, width: item.w, height: item.h, zIndex: z }}
      // Lifting an object straightens it; letting go springs the tilt back.
      animate={{
        rotate: dragging ? 0 : item.rotation,
        scale: dragging ? 1.06 : 1,
      }}
      whileHover={anyDragging || reduce ? undefined : { scale: 1.03 }}
      transition={reduce ? { duration: 0 } : SPRING}
    >
      <div
        className="h-full w-full transition-[filter] duration-300"
        style={{
          filter: dragging
            ? 'drop-shadow(0 26px 34px rgba(0,0,0,0.24))'
            : 'drop-shadow(0 8px 14px rgba(0,0,0,0.10))',
        }}
      >
        {children}
      </div>
    </m.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Object types                                                       */
/* ------------------------------------------------------------------ */

function FlightCard({ item }: { item: Extract<BoardItem, { type: 'flight' }> }) {
  return (
    <div className="flex h-full w-full overflow-hidden rounded-[14px] border border-rule bg-bg">
      <div className="flex flex-1 flex-col justify-center px-4">
        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-ink-ghost">
          Boarding pass
        </span>
        <span className="mt-1 flex items-baseline gap-1.5 text-[22px] font-bold leading-none tracking-[-0.03em] text-ink">
          {item.from}
          <span aria-hidden className="text-[15px] text-accent-brand">
            ✈
          </span>
          {item.to}
        </span>
        <span className="mt-1.5 text-[9.5px] tracking-tight text-ink-faint">{item.detail}</span>
      </div>
      {/* Perforated stub. */}
      <div className="relative w-[52px] shrink-0 bg-bg-subtle">
        <span
          aria-hidden
          className="absolute inset-y-2 left-0 w-px"
          style={{
            backgroundImage:
              'repeating-linear-gradient(180deg, rgba(0,0,0,0.16) 0 3px, transparent 3px 7px)',
          }}
        />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.22em] text-ink-ghost">
          Window
        </span>
      </div>
    </div>
  );
}

function PhotoPrint({ item }: { item: Extract<BoardItem, { type: 'photo' }> }) {
  return (
    <figure className="flex h-full w-full flex-col rounded-[3px] bg-white p-[7px] pb-0 ring-1 ring-black/[0.06]">
      <div className="relative flex-1 overflow-hidden bg-bg-muted">
        <SmartImage
          src={item.src}
          alt={item.alt}
          label="Photo"
          sizes="200px"
          className="pointer-events-none object-cover"
        />
      </div>
      {/* Prints stay white in both themes, so the caption ink is fixed too. */}
      <figcaption className="flex h-[26px] shrink-0 items-center justify-center font-hand text-[13px] text-[#7a7a75]">
        {item.caption}
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/*  Board                                                              */
/* ------------------------------------------------------------------ */

export default function AboutBoard() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef(1);
  const [scale, setScale] = useState(1);
  // Last-grabbed object stays on top, so the board remembers your ordering.
  const [order, setOrder] = useState<string[]>([]);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const next = Math.min(1, el.clientWidth / BOARD.width);
      scaleRef.current = next;
      setScale(next);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const [dragId, setDragId] = useState<string | null>(null);
  useEffect(() => {
    const clear = () => setDragId(null);
    window.addEventListener('pointerup', clear);
    window.addEventListener('pointercancel', clear);
    return () => {
      window.removeEventListener('pointerup', clear);
      window.removeEventListener('pointercancel', clear);
    };
  }, []);

  const grab = useCallback((id: string) => {
    setDragId(id);
    setOrder((prev) => [...prev.filter((p) => p !== id), id]);
  }, []);

  const zFor = (item: BoardItem) => {
    const lifted = order.indexOf(item.id);
    return lifted !== -1 ? 60 + lifted : 30;
  };

  return (
    // The board is taken out of flow so its fixed 1040px width can never feed
    // back into the measurement that scales it. The wrapper's height is the
    // scaled height, so the page lays out around it correctly. It comes from
    // CSS (same ratio, capped at full size), so the server-rendered page
    // already has the right height before the scale is measured.
    <div
      ref={wrapRef}
      className="relative w-full"
      style={{ aspectRatio: `${BOARD.width} / ${BOARD.height}`, maxHeight: BOARD.height }}
    >
      <div
        className="absolute left-1/2 top-0"
        style={{
          width: BOARD.width,
          height: BOARD.height,
          transformOrigin: 'top center',
          transform: `translateX(-50%) scale(${scale})`,
        }}
      >
        <div
          className="relative h-full w-full select-none rounded-[32px]"
          style={{
            backgroundColor: 'rgb(var(--board))',
            backgroundImage:
              'radial-gradient(ellipse 4px 10px at center, rgb(var(--board-dot)) 100%, transparent 0)',
            backgroundSize: '40px 40px',
            border: '1px solid rgba(0,0,0,0.04)',
            boxShadow:
              '0 50px 100px -30px rgba(0,0,0,0.12), inset 0 2px 6px rgba(0,0,0,0.06)',
          }}
        >
          {boardItems.map((item) => (
            <Draggable
              key={item.id}
              item={item}
              scaleRef={scaleRef}
              z={zFor(item)}
              anyDragging={dragId !== null}
              onGrab={() => grab(item.id)}
            >
              {item.type === 'flight' ? (
                <FlightCard item={item} />
              ) : item.type === 'photo' ? (
                <PhotoPrint item={item} />
              ) : (
                <div className="relative h-full w-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="340px"
                    draggable={false}
                    className="pointer-events-none object-contain"
                  />
                </div>
              )}
            </Draggable>
          ))}
        </div>
      </div>
    </div>
  );
}

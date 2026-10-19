'use client';

import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import { useIsDark } from '@/lib/useIsDark';
import BorderGlow from './BorderGlow';
import SmartImage from './SmartImage';

/* The brand gradient (.text-gradient) and a light violet for the glow, so the
   border lights up in the same colours the index turns on hover. */
const GLOW_COLORS = ['#4f46e5', '#7c3aed', '#c084fc'];
const GLOW_HSL = '255 92 76';

/**
 * The featured-work card, type-led rather than image-led: an oversized serif
 * index, the title and the full description, then the stack along a ruled
 * footer. Hover lifts the card, lights its border where the cursor is (Border
 * Glow, React Bits) and turns the index into the brand gradient. Once a
 * project has a real `link` (anything but '#'), the whole card becomes that link.
 */
export default function ProjectCard({
  project,
  index,
  compact = false,
}: {
  project: Project;
  index: number;
  /** Tighter padding and type, for four cards sharing one row. */
  compact?: boolean;
}) {
  const dark = useIsDark();
  const linked = Boolean(project.link) && project.link !== '#';
  const number = String(index + 1).padStart(2, '0');
  const size = (roomy: string, tight: string) => (compact ? tight : roomy);

  const body = (
    // The lift lives out here because BorderGlow pins its own inline transform.
    <div className="h-full transition-transform duration-500 ease-expo group-hover:-translate-y-1">
      <BorderGlow
        className="h-full"
        // --bg-subtle as hex: BorderGlow reads the colour to pick its light or
        // dark treatment, so a CSS variable won't do.
        backgroundColor={dark ? '#151517' : '#f9f9f9'}
        borderRadius={28}
        colors={GLOW_COLORS}
        glowColor={GLOW_HSL}
      >
        <div className={`relative flex flex-1 flex-col ${size('p-6 md:p-8', 'p-6')}`}>
          <div className="relative flex items-start justify-between gap-4">
            {/* Two stacked numerals so the gradient can fade in — a clipped
                gradient can't transition its colour directly. */}
            <span
              aria-hidden
              className={`relative font-serif italic leading-[0.8] tracking-[-0.04em] ${size('text-[52px] md:text-[64px]', 'text-[46px]')}`}
            >
              <span className="text-ink/[0.09]">{number}</span>
              <span className="text-gradient absolute left-0 top-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {number}
              </span>
            </span>

            <div className="flex items-center gap-2">
              {project.status ? (
                // A compact card only has room for the part before the "·"
                // beside the numeral; the full status stays in the tooltip.
                <span
                  title={compact ? project.status : undefined}
                  className="meta inline-flex items-center gap-1.5 rounded-pill bg-ink px-2.5 py-1 text-bg"
                >
                  <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-brand" />
                  {compact ? project.status.split('·')[0].trim() : project.status}
                </span>
              ) : null}
              {linked ? (
                <span className="flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-rule-strong transition-colors duration-300 group-hover:bg-ink group-hover:text-bg group-hover:ring-ink">
                  <ArrowUpRight
                    size={15}
                    strokeWidth={2}
                    className="transition-transform duration-300 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              ) : null}
            </div>
          </div>

          <p className={`meta relative text-ink-faint ${size('mt-8 md:mt-10', 'mt-7')}`}>{project.category}</p>
          <div className="relative mt-2 flex items-center gap-3">
            {project.logo ? (
              <span
                className={`relative shrink-0 overflow-hidden rounded-lg ring-1 ring-rule ${size('h-8 w-8 md:h-9 md:w-9', 'h-7 w-7')}`}
              >
                <SmartImage src={project.logo} alt="" label="" sizes="36px" className="object-cover" />
              </span>
            ) : null}
            <h3
              className={`font-bold leading-tight tracking-[-0.03em] text-ink ${size('text-[24px] md:text-[28px]', 'text-[22px]')}`}
            >
              {project.title}
            </h3>
          </div>
          <p className={`relative mt-3 leading-relaxed text-ink-dim ${size('text-[15px]', 'text-[14px]')}`}>
            {project.description}
          </p>

          {project.metric ? (
            <p className="relative mt-5 flex items-start gap-2 text-[13px] font-medium text-ink">
              {/* Pinned to the first line's centre, so a wrapped metric keeps
                  its dot at the top rather than halfway down. */}
              <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-brand" />
              {project.metric}
            </p>
          ) : null}

          {/* mt-auto pins the footer to the bottom so cards in a row line up;
              pt-8 keeps a minimum gap above it on the tallest card. */}
          {project.technologies.length || project.year ? (
            <div className={`relative mt-auto ${size('pt-8', 'pt-6')}`}>
              <div className="flex items-end justify-between gap-4 border-t border-rule pt-5">
                <ul className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-pill bg-bg px-2.5 py-1 text-[12px] text-ink-dim ring-1 ring-rule"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                <span className="meta shrink-0 pb-1 text-ink-ghost">{project.year}</span>
              </div>
            </div>
          ) : null}
        </div>
      </BorderGlow>
    </div>
  );

  return linked ? (
    <a
      href={project.link}
      {...(project.link.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="group block h-full w-full cursor-pointer transition-transform duration-500 active:scale-[0.985]"
    >
      {body}
    </a>
  ) : (
    <div className="group block h-full w-full">{body}</div>
  );
}

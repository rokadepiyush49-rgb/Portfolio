import { ArrowUpRight } from 'lucide-react';
import type { Experiment } from '@/data/experiments';

/**
 * Smaller sibling of ProjectCard — the same type-led card at a lighter weight:
 * a serif index, title and description, with the stack on a ruled footer.
 */
export default function ExperimentCard({ item, index }: { item: Experiment; index: number }) {
  const Tag = item.link ? 'a' : 'div';
  const number = String(index + 1).padStart(2, '0');

  return (
    <Tag
      {...(item.link
        ? {
            href: item.link,
            'aria-label': `${item.title} — open`,
            // Repos and live demos live off-site, so keep the portfolio open behind them.
            ...(item.link.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {}),
          }
        : {})}
      className={`group block h-full w-full ${item.link ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-card bg-bg-subtle p-5 ring-1 ring-rule transition-all duration-500 ease-expo group-hover:-translate-y-1 group-hover:bg-bg group-hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.18)] dark:group-hover:bg-bg-muted md:p-6">
        {/* Corner glow, only on hover. */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full opacity-0 transition-opacity duration-700 ease-expo group-hover:opacity-100"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, rgba(124,58,237,0) 70%)' }}
        />

        <div className="relative flex items-start justify-between gap-4">
          {/* Stacked numerals so the gradient can fade in (see ProjectCard). */}
          <span aria-hidden className="relative font-serif text-[40px] italic leading-[0.8] tracking-[-0.04em]">
            <span className="text-ink/[0.09]">{number}</span>
            <span className="text-gradient absolute left-0 top-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              {number}
            </span>
          </span>
          {item.link ? (
            <span className="flex h-7 w-7 items-center justify-center rounded-full ring-1 ring-rule-strong transition-colors duration-300 group-hover:bg-ink group-hover:text-bg group-hover:ring-ink">
              <ArrowUpRight
                size={13}
                strokeWidth={2}
                className="transition-transform duration-300 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          ) : null}
        </div>

        <h4 className="relative mt-6 text-[18px] font-bold leading-tight tracking-[-0.02em] text-ink">
          {item.title}
        </h4>
        <p className="relative mt-2 text-[14px] leading-relaxed text-ink-dim">{item.description}</p>

        {/* mt-auto lines the footers up across a row; pt-6 is the minimum gap. */}
        <div className="relative mt-auto pt-6">
          <p className="meta border-t border-rule pt-4 text-ink-faint">{item.tech}</p>
        </div>
      </div>
    </Tag>
  );
}

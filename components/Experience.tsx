import { BriefcaseBusiness } from 'lucide-react';
import { experience } from '@/data/experience';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import SmartImage from './SmartImage';

/**
 * A plain, static timeline: every role is visible at once, newest first.
 * Dates sit in their own column on desktop; a thin rule with one dot per role
 * runs down the left of the details. Each row fades in like the rest of the
 * site — nothing pins or reacts to scroll position.
 */

const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const FALLBACK_ACCENT = '#FF1A3C';

// Dates are 'YYYY-MM' or a bare 'YYYY'; a bare year sorts as its January
// when it's a start and its December when it's an end.
const toIndex = (ym: string, bareMonth = 1) => {
  const [y, m] = ym.split('-').map(Number);
  return y * 12 + ((m || bareMonth) - 1);
};
const fmt = (ym: string) => {
  const [y, m] = ym.split('-').map(Number);
  return m ? `${MONTH[m - 1]} ${y}` : String(y);
};
const range = (start: string, end: string | null) =>
  !end ? `${fmt(start)} — Present` : start === end ? fmt(start) : `${fmt(start)} — ${fmt(end)}`;

// Newest first; among equal starts, whatever is still running (or ran longer) leads.
const endKey = (end: string | null) => (end ? toIndex(end, 12) : Number.MAX_SAFE_INTEGER);
const entries = [...experience]
  .sort((a, b) => toIndex(b.start) - toIndex(a.start) || endKey(b.end) - endKey(a.end))
  .map((e) => ({ ...e, accent: e.accent ?? FALLBACK_ACCENT }));

export default function ExperienceSection() {
  return (
    <section id="experience" className="container-content scroll-mt-24 py-20 md:py-32">
      <SectionHeading
        eyebrow="Along the way"
        title="Experience."
        aside={<>{entries.length} roles &middot; newest first</>}
        className="mb-10 md:mb-16"
      />

      <ol>
        {entries.map((entry, i) => {
          const ongoing = !entry.end;
          const last = i === entries.length - 1;
          const dates = (
            <span
              className={`meta ${ongoing ? '' : 'text-ink-faint'}`}
              style={ongoing ? { color: entry.accent } : undefined}
            >
              {range(entry.start, entry.end)}
            </span>
          );

          return (
            <Reveal key={entry.id} as="li" y={20} className="md:grid md:grid-cols-[180px_1fr] md:gap-10">
              {/* Desktop date column. */}
              <p className="hidden pt-[3px] text-right md:block">{dates}</p>

              <div className={`relative border-l border-rule pl-7 md:pl-10 ${last ? 'pb-0' : 'pb-12 md:pb-14'}`}>
                {/* The role's dot on the rule; ongoing roles get a soft pulse. */}
                <span aria-hidden className="absolute -left-[6px] top-[5px] flex h-[11px] w-[11px]">
                  {ongoing ? (
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                      style={{ backgroundColor: entry.accent }}
                    />
                  ) : null}
                  <span
                    className="relative inline-flex h-[11px] w-[11px] rounded-full ring-4 ring-bg"
                    style={{ backgroundColor: entry.accent }}
                  />
                </span>

                <p className="mb-2 md:hidden">{dates}</p>

                <div className="flex min-w-0 items-center gap-2.5">
                  {/* Logos are drawn for white, so their tile stays white in dark mode too. */}
                  <span
                    className={`relative h-7 w-7 shrink-0 overflow-hidden rounded-md ring-1 ring-rule ${
                      entry.photo ? 'bg-white' : 'bg-bg-muted'
                    }`}
                  >
                    {entry.photo ? (
                      <SmartImage src={entry.photo} alt="" label="" sizes="28px" className="object-contain" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-ink-faint">
                        <BriefcaseBusiness size={13} strokeWidth={2} />
                      </span>
                    )}
                  </span>
                  <span className="truncate text-[14px] font-medium text-ink-dim">{entry.org}</span>
                  {entry.location ? (
                    <span className="hidden shrink-0 text-[13px] text-ink-ghost sm:inline">· {entry.location}</span>
                  ) : null}
                </div>

                <h3 className="mt-2.5 text-[20px] font-semibold leading-snug tracking-[-0.02em] text-ink md:text-[24px]">
                  {entry.role}
                </h3>
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-dim">{entry.blurb}</p>

                {entry.projects?.length ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {entry.projects.map((project) => (
                      <li
                        key={project.name}
                        className="flex items-center gap-2 rounded-lg bg-bg-subtle py-1.5 pl-2.5 pr-3 ring-1 ring-rule"
                      >
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: entry.accent }}
                        />
                        <span className="text-[13px] font-medium text-ink">{project.name}</span>
                        {project.note ? (
                          <span className="font-mono text-[11px] text-ink-faint">{project.note}</span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {entry.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-bg-subtle px-2.5 py-1 font-mono text-[11px] text-ink-dim ring-1 ring-rule"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}

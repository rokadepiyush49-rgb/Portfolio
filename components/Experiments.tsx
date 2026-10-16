import { experiments } from '@/data/experiments';
import ExperimentCard from './ExperimentCard';
import Reveal from './Reveal';

/** Where card `i` of `n` sits, so the last row is centred at 2 and 3 columns. */
function placement(i: number, n: number) {
  const lastRow2 = n % 2 === 1 && i === n - 1;
  let md = '';
  if (n % 3 === 2 && i === n - 2) md = 'md:col-start-2';
  else if (n % 3 === 1 && i === n - 1) md = 'md:col-start-3';
  else if (lastRow2) md = 'md:col-start-auto';
  return ['sm:col-span-2', lastRow2 ? 'sm:col-start-2' : '', md].filter(Boolean).join(' ');
}

/**
 * "A bit more" — deliberately introduced with a small square + shouty label
 * rather than the handwritten eyebrow, so it reads as a sub-section of Work.
 */
export default function Experiments() {
  return (
    <section id="experiments" className="container-content scroll-mt-24 pb-20 md:pb-32">
      <Reveal>
        <div className="mb-4 flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-[2px] bg-accent-brand" />
          <span className="meta text-ink">A bit more</span>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <p className="mb-10 max-w-measure text-[16px] text-ink-ghost md:text-[17px]">
          A collection of side projects, late-night experiments and things I built just because I
          was curious.
        </p>
      </Reveal>

      {/* Two-up and three-up grids built on 4 and 6 tracks, every card two
          tracks wide, so a short last row can start one track in and sit
          centred instead of hugging the left edge. */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-4 md:grid-cols-6 md:gap-x-8 md:gap-y-12">
        {experiments.map((item, i) => (
          <Reveal key={item.title} delay={(i % 3) * 0.07} y={28} className={placement(i, experiments.length)}>
            <ExperimentCard item={item} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

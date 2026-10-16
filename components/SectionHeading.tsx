import Reveal from './Reveal';

type Props = {
  /** The handwritten red label. */
  eyebrow: string;
  /** The large heading. A trailing "." is styled automatically. */
  title: string;
  /** Optional word inside `title` set in italic serif. */
  accent?: string;
  /** Right-hand supporting line, baseline-aligned on desktop. */
  aside?: React.ReactNode;
  /** Inverts colours for the dark photography section. */
  dark?: boolean;
  className?: string;
};

/**
 * Every section opens the same way: handwritten red eyebrow, then a tight
 * display heading whose final period is a gradient serif. Keeping it in one
 * component is what makes the page feel like a single system.
 */
export default function SectionHeading({
  eyebrow,
  title,
  accent,
  aside,
  dark = false,
  className = '',
}: Props) {
  // Whatever the sentence actually ends with gets the gradient serif
  // treatment — a period normally, a question mark when one is asked.
  const terminal = title.match(/[.?!]$/);
  const punctuation = terminal ? terminal[0] : '.';
  const stripped = terminal ? title.slice(0, -1) : title;
  const parts = accent && stripped.includes(accent) ? stripped.split(accent) : null;

  // The gradient mark is its own inline-block, so a narrow screen could wrap
  // it onto a line by itself ("…beat me / ?"). It shares a no-wrap span with
  // the word before it instead.
  const mark = <span className="text-gradient ml-0.5 font-serif italic">{punctuation}</span>;
  const accentSpan = <span className="font-serif italic">{accent}</span>;
  const glue = (text: string) => {
    const cut = text.lastIndexOf(' ') + 1;
    return (
      <>
        {text.slice(0, cut)}
        <span className="whitespace-nowrap">
          {text.slice(cut)}
          {mark}
        </span>
      </>
    );
  };

  return (
    <div className={className}>
      <Reveal>
        <div className="eyebrow-hand mb-3 md:mb-4">{eyebrow}</div>
      </Reveal>
      <Reveal delay={0.06}>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-baseline">
          <h2
            className={`text-display-md font-medium ${
              dark ? 'text-white' : 'text-ink'
            }`}
          >
            {!parts ? (
              glue(stripped)
            ) : parts[1] ? (
              <>
                {parts[0]}
                {accentSpan}
                {glue(parts[1])}
              </>
            ) : (
              <>
                {parts[0]}
                <span className="whitespace-nowrap">
                  {accentSpan}
                  {mark}
                </span>
              </>
            )}
          </h2>
          {aside ? (
            <div
              className={`text-[14px] md:mb-1 md:text-[15px] ${
                dark ? 'text-white/50' : 'text-ink-ghost'
              }`}
            >
              {aside}
            </div>
          ) : null}
        </div>
      </Reveal>
    </div>
  );
}

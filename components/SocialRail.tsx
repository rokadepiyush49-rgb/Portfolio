'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { GithubIcon, Linkedin01Icon, Mail01Icon } from '@hugeicons/core-free-icons';
import { site } from '@/data/site';

const github = site.socials.find((s) => s.label === 'GitHub')?.href;
const linkedin = site.socials.find((s) => s.label === 'LinkedIn')?.href;

const links = [
  { label: 'GitHub', href: github, icon: GithubIcon },
  { label: 'Email', href: `mailto:${site.contact.email}`, icon: Mail01Icon },
  { label: 'LinkedIn', href: linkedin, icon: Linkedin01Icon },
].filter((l): l is typeof l & { href: string } => Boolean(l.href));

/**
 * GitHub, email and LinkedIn stacked in the bottom-left corner, with a thin
 * rule running down to the edge of the screen. Large screens only — on
 * narrower ones it would sit on top of the content. It lives in the gutter
 * that `.container-content` leaves at lg (see globals.css).
 */
export default function SocialRail() {
  return (
    <aside
      aria-label="Social links"
      className="fixed bottom-0 left-6 z-40 hidden flex-col items-center gap-3 after:mt-4 after:h-28 after:w-px after:bg-rule-strong after:content-[''] lg:flex"
    >
      {links.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink-dim transition-all duration-300 ease-expo hover:-translate-y-0.5 hover:bg-bg-muted hover:text-accent-brand"
        >
          <HugeiconsIcon icon={icon} size={24} strokeWidth={1.7} />
        </a>
      ))}
    </aside>
  );
}

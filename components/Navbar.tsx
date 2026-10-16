'use client';

import { AnimatePresence, m } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { site } from '@/data/site';
import { useIsDark } from '@/lib/useIsDark';
import GooeyNav from './GooeyNav';
import ThemeToggle from './ThemeToggle';

/* Gooey Nav always has one item lit, so the hero gets a Home entry, and
   Contact joins the row instead of being a second solid pill beside it. */
const links = [{ label: 'Home', href: '#top' }, ...site.nav, { label: 'Contact', href: '#contact' }];

/**
 * A floating pill that never gets in the way: it sits centred at the top,
 * tightens its shadow once you start scrolling, and collapses into a
 * full-screen sheet on mobile.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#top');
  const dark = useIsDark();
  // Set on click: while the page smooth-scrolls there, the sections it passes
  // don't get to pull the pill back and forth.
  const heading = useRef<{ href: string; timer: number } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Light up the nav item for whatever section you're reading. The band is
  // narrow and near the top of the viewport so the highlight changes when a
  // section actually takes over, not when it first peeks into view.
  useEffect(() => {
    const ids = links.map((n) => n.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (!visible[0]) return;
        const href = `#${visible[0].target.id}`;
        if (heading.current) {
          if (href !== heading.current.href) return;
          window.clearTimeout(heading.current.timer);
          heading.current = null;
        }
        setActive(href);
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTo = (href: string) => {
    if (heading.current) window.clearTimeout(heading.current.timer);
    // Fallback for a section that never reaches the band (e.g. Contact near
    // the bottom, when the page can't scroll that far).
    const timer = window.setTimeout(() => (heading.current = null), 1500);
    heading.current = { href, timer };
    setActive(href);
  };

  // Don't let the page scroll behind the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <m.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 md:top-6"
      >
        <nav
          aria-label="Primary"
          className={`flex h-[52px] w-full items-center justify-between rounded-pill border border-rule px-2 backdrop-blur-xl transition-[background,box-shadow] duration-500 md:h-auto md:w-auto md:justify-center md:gap-1 md:py-1.5 md:pl-5 md:pr-2 ${
            scrolled
              ? 'bg-bg/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
              : 'bg-bg/55 shadow-[0_2px_10px_rgba(0,0,0,0.03)]'
          }`}
        >
          <a
            href="#top"
            className="group -my-3 shrink-0 py-3 pl-2 pr-3 text-[15px] font-semibold tracking-[-0.02em] text-ink md:pl-0"
          >
            {site.name.split(' ')[0]}
            <span className="text-ink-ghost transition-colors duration-300 group-hover:text-accent-brand">
              .
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {/* Gooey Nav (React Bits): the lit pill melts into droplets that
                fly to the next link. Our own pill frames it, so its frame is
                off, and its colours follow the site's ink tokens. */}
            <GooeyNav
              items={links}
              activeIndex={Math.max(0, links.findIndex((l) => l.href === active))}
              onChange={(_, item) => item.href && goTo(item.href)}
              theme={dark ? 'dark' : 'light'}
              color={dark ? '#ededeb' : '#1a1a1a'}
              activeTextColor={dark ? '#0b0b0c' : '#ffffff'}
              frame={false}
              style={
                {
                  '--gn-ink': 'rgb(var(--ink))',
                  '--gn-muted': 'rgb(var(--ink-dim))',
                } as CSSProperties
              }
            />
            <ThemeToggle />
          </div>

          <div className="flex items-center md:hidden">
            <ThemeToggle className="h-11 w-11" />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill text-ink transition-colors hover:bg-bg-muted"
            >
              <Menu size={20} strokeWidth={1.75} />
            </button>
          </div>
        </nav>
      </m.header>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-bg md:hidden"
          >
            <div className="flex h-[76px] items-center justify-between px-6">
              <span className="text-[15px] font-semibold tracking-[-0.02em]">{site.name}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-pill text-ink"
              >
                <X size={22} strokeWidth={1.75} />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-col px-6 pt-6">
              {[...site.nav, { label: 'Contact', href: '#contact' }].map((item, i) => (
                <m.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-rule py-5 text-[28px] font-medium tracking-[-0.03em] text-ink"
                >
                  {item.label}
                </m.a>
              ))}
            </nav>

            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="px-6 pt-10 text-[14px] text-ink-ghost"
            >
              {site.contact.email}
            </m.p>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

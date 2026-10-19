'use client';

import { ArrowUpRight } from 'lucide-react';
import { m } from 'framer-motion';
import { site } from '@/data/site';
import Reveal from './Reveal';

/** A labelled row — the quiet, index-like list that closes the page. */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-rule py-5 md:py-6">
      <span className="text-[13px] font-medium text-ink-ghost md:text-[15px]">{label}</span>
      <span className="flex items-center gap-2 text-right text-[14px] font-medium text-ink md:text-[15px]">
        {children}
      </span>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 bg-bg-subtle py-24 md:py-32">
      <div className="container-content max-w-4xl">
        <Reveal>
          <p className="eyebrow-hand mb-4">Say hello</p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="text-display-lg mb-5 font-medium tracking-[-0.04em] text-ink">
            {site.contact.headline}
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mb-12 max-w-measure text-[16px] leading-relaxed text-ink-dim md:text-[18px]">
            {site.contact.subline}
          </p>
        </Reveal>

        {/* The email is the loudest thing in this section on purpose. Below sm it
            scales with the screen so the whole address fits on small phones. */}
        <Reveal delay={0.16}>
          <m.a
            href={`mailto:${site.contact.email}`}
            whileHover={{ x: 6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="group mb-14 inline-flex max-w-full items-center gap-3 md:mb-20"
          >
            <span className="truncate text-[clamp(1rem,5.2vw,1.5rem)] sm:text-[clamp(1.5rem,5vw,2.75rem)] font-medium tracking-[-0.04em] text-ink underline decoration-rule decoration-2 underline-offset-[10px] transition-colors duration-300 group-hover:decoration-accent-brand">
              {site.contact.email}
            </span>
            <ArrowUpRight
              className="shrink-0 text-ink-ghost transition-all duration-300 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-brand"
              size={28}
              strokeWidth={1.75}
            />
          </m.a>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-col">
            <Row label="Mail">
              <a
                href={`mailto:${site.contact.email}`}
                className="underline decoration-rule underline-offset-4 transition-colors hover:text-accent-brand"
              >
                {site.contact.email}
              </a>
            </Row>

            <Row label="Socials">
              <span className="flex flex-wrap items-center justify-end gap-x-2 gap-y-1">
                {site.socials.map((s, i) => (
                  <span key={s.label} className="inline-flex items-center gap-2">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-rule underline-offset-4 transition-colors hover:text-accent-brand"
                    >
                      {s.label}
                    </a>
                    {i < site.socials.length - 1 ? (
                      <span aria-hidden className="text-ink-ghost/50">
                        &middot;
                      </span>
                    ) : null}
                  </span>
                ))}
              </span>
            </Row>

            <Row label="Résumé">
              <a
                href={encodeURI(site.resume)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 underline decoration-rule underline-offset-4 transition-colors hover:text-accent-brand"
              >
                Download PDF
                <ArrowUpRight size={14} strokeWidth={2} />
              </a>
            </Row>

            <Row label="Phone">
              <a
                href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
                className="underline decoration-rule underline-offset-4 transition-colors hover:text-accent-brand"
              >
                {site.contact.phone}
              </a>
            </Row>

            <Row label="Based in">{site.location}</Row>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

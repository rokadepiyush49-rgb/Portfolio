'use client';

import { ArrowUpRight } from 'lucide-react';
import { m } from 'framer-motion';
import { photos } from '@/data/photos';
import { site } from '@/data/site';
import SectionHeading from './SectionHeading';
import SmartImage from './SmartImage';

/** Aspect ratios drive the masonry rhythm — see data/photos.ts. */
const ratioClass: Record<string, string> = {
  tall: 'aspect-[3/4]',
  square: 'aspect-square',
  wide: 'aspect-[4/3]',
};

/**
 * The one dark moment on the page. Going near-black here lets the photographs
 * carry themselves, and gives the scroll a clear second act.
 */
export default function Photography() {
  const instagram = site.socials.find((s) => s.label === 'Instagram');

  return (
    <section
      id="photography"
      className="relative scroll-mt-24 overflow-hidden bg-[#0B0B0C] pb-48 pt-48 md:pb-64 md:pt-64"
    >
      {/* The dark section dissolves into the white above and below it rather
          than cutting hard. Eased stops — a plain linear ramp still reads as
          a visible seam at the white end. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-44 md:h-60"
        style={{
          background:
            'linear-gradient(to bottom, rgb(var(--bg)) 0%, rgb(var(--bg) / 0.86) 16%, rgb(var(--bg) / 0.5) 40%, rgb(var(--bg) / 0.16) 68%, rgb(var(--bg) / 0) 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-44 md:h-60"
        style={{
          background:
            'linear-gradient(to top, rgb(var(--bg)) 0%, rgb(var(--bg) / 0.86) 16%, rgb(var(--bg) / 0.5) 40%, rgb(var(--bg) / 0.16) 68%, rgb(var(--bg) / 0) 100%)',
        }}
      />

      <div className="container-content relative z-10">
        <SectionHeading
          eyebrow="Photography"
          title="Moments captured through my lens."
          accent="lens"
          dark
          aside={
            instagram ? (
              <a
                href={instagram.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 text-white/50 transition-colors hover:text-white"
              >
                View more on Instagram
                <ArrowUpRight
                  size={14}
                  strokeWidth={2}
                  className="transition-transform duration-300 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ) : null
          }
          className="mb-12 md:mb-16"
        />

        <div className="gap-4 md:columns-2 md:gap-5 lg:columns-3 xl:columns-4">
          {photos.map((photo, i) => (
            <m.figure
              key={photo.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-[14px] bg-white/[0.04] md:mb-5"
            >
              <div className={`relative w-full ${ratioClass[photo.ratio] ?? 'aspect-[3/4]'}`}>
                <SmartImage
                  src={photo.src}
                  alt={photo.alt}
                  label={`Photo ${i + 1}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-900 ease-expo group-hover:scale-[1.04]"
                />
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100" />

              {photo.caption ? (
                <figcaption className="pointer-events-none absolute inset-x-4 bottom-4 text-[13px] font-medium text-white transition-all duration-500 ease-expo md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  {photo.caption}
                </figcaption>
              ) : null}
            </m.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

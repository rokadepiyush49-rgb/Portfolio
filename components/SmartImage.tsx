'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Text shown on the fallback tile when the file isn't there yet. */
  label?: string;
};

/**
 * next/image with a graceful landing pad.
 *
 * Every image path in /data points at a file you will eventually drop into
 * /public/images/. Until that file exists this renders a calm, on-brand tile
 * instead of a broken layout — so the page always looks finished.
 */
export default function SmartImage({
  src,
  alt,
  className = '',
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  label,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,#f4f4f2_0%,#ececeb_50%,#e6e6e3_100%)] dark:bg-[linear-gradient(135deg,#1e1e21_0%,#1a1a1d_50%,#161618_100%)]"
      >
        <span className="meta select-none text-ink-ghost/70">{label ?? 'Image'}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

import Link from 'next/link';
import { site } from '@/data/site';

export default function NotFound() {
  return (
    <main className="container-content flex min-h-[100svh] flex-col items-center justify-center text-center">
      <p className="eyebrow-hand mb-4">Lost?</p>
      <h1 className="text-display-lg mb-6 font-medium tracking-[-0.04em]">
        This page doesn&rsquo;t exist
        <span className="text-gradient font-serif italic">.</span>
      </h1>
      <Link
        href="/"
        className="rounded-pill bg-ink px-6 py-3.5 text-[15px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black"
      >
        Back to {site.name.split(' ')[0]}&rsquo;s work
      </Link>
    </main>
  );
}

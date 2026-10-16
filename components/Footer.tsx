import { site } from '@/data/site';

export default function Footer() {
  return (
    <footer className="bg-bg-subtle pb-12 md:pb-16">
      <div className="container-content max-w-4xl">
        <div className="flex flex-col items-center gap-4 border-t border-rule pt-10 md:flex-row md:justify-between">
          <p className="text-[13px] font-medium text-ink-dim md:text-[14px]">
            {site.name}
            <span aria-hidden className="mx-2 text-ink-ghost/50">
              &middot;
            </span>
            <span className="text-ink-ghost">Built with {site.builtWith}</span>
          </p>

          <div className="flex items-center gap-5">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-[13px] text-ink-ghost transition-colors duration-300 hover:text-ink md:text-[14px]"
              >
                {s.label}
              </a>
            ))}
          </div>

          <p className="text-[13px] text-ink-ghost md:text-[14px]">&copy; {site.year}</p>
        </div>
      </div>
    </footer>
  );
}

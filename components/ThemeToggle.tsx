'use client';

import { Moon, Sun } from 'lucide-react';

/**
 * Flips the `dark` class on <html> and remembers the choice. The icon is
 * picked by CSS (`dark:` variants) rather than React state, so it is right on
 * the very first paint — the class ships in the server HTML (dark is the
 * default) and the inline script in app/layout.tsx has applied any saved
 * choice by then.
 */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const toggle = () => {
    const dark = document.documentElement.classList.toggle('dark');
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {
      // Private mode or blocked storage: the switch still works for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark mode"
      title="Switch theme"
      className={`group relative flex h-9 w-9 shrink-0 items-center justify-center rounded-pill text-ink-dim transition-colors duration-300 hover:bg-bg-muted hover:text-ink ${className}`}
    >
      <Sun
        size={17}
        strokeWidth={1.9}
        className="absolute rotate-90 scale-0 opacity-0 transition-all duration-500 ease-expo dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
      <Moon
        size={17}
        strokeWidth={1.9}
        className="absolute rotate-0 scale-100 opacity-100 transition-all duration-500 ease-expo dark:-rotate-90 dark:scale-0 dark:opacity-0"
      />
    </button>
  );
}

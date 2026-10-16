import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

/**
 * The design system lives here + in app/globals.css.
 * Change a token in one place and it propagates across every section.
 */
const config: Config = {
  // `dark` on <html> switches the theme — set by the toggle in the navbar.
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        'bg-subtle': 'rgb(var(--bg-subtle) / <alpha-value>)',
        'bg-muted': 'rgb(var(--bg-muted) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-dim': 'rgb(var(--ink-dim) / <alpha-value>)',
        'ink-faint': 'rgb(var(--ink-faint) / <alpha-value>)',
        'ink-ghost': 'rgb(var(--ink-ghost) / <alpha-value>)',
        'accent-violet': 'rgb(var(--accent-violet) / <alpha-value>)',
        'accent-ink': 'rgb(var(--accent-ink) / <alpha-value>)',
        'accent-soft': 'rgb(var(--accent-soft) / <alpha-value>)',
        'accent-brand': 'rgb(var(--accent-brand) / <alpha-value>)',
        rule: 'var(--rule)',
        'rule-strong': 'var(--rule-strong)',

        // shadcn/ui's semantic names, pointed at the palette above so any
        // added component matches the site and flips with the dark theme.
        background: 'rgb(var(--bg) / <alpha-value>)',
        foreground: 'rgb(var(--ink) / <alpha-value>)',
        card: {
          DEFAULT: 'rgb(var(--bg) / <alpha-value>)',
          foreground: 'rgb(var(--ink) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'rgb(var(--bg) / <alpha-value>)',
          foreground: 'rgb(var(--ink) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          foreground: 'rgb(var(--bg) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--bg-muted) / <alpha-value>)',
          foreground: 'rgb(var(--ink) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'rgb(var(--bg-muted) / <alpha-value>)',
          foreground: 'rgb(var(--ink-dim) / <alpha-value>)',
        },
        // shadcn's `accent` is the hover/highlight surface, not a brand colour.
        accent: {
          DEFAULT: 'rgb(var(--bg-muted) / <alpha-value>)',
          foreground: 'rgb(var(--ink) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'rgb(var(--accent-brand) / <alpha-value>)',
          foreground: 'rgb(255 255 255 / <alpha-value>)',
        },
        border: 'var(--rule)',
        input: 'var(--rule-strong)',
        ring: 'rgb(var(--accent-ink) / <alpha-value>)',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        hand: ['var(--font-hand)', 'cursive'],
      },
      borderRadius: {
        card: '18px',
        'card-lg': '28px',
        panel: '32px',
        pill: '999px',
        // shadcn/ui radii. --radius is 0.5rem, so lg and md equal Tailwind's defaults.
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      // Named, because tailwindcss-animate makes `duration-[900ms]` ambiguous
      // and Tailwind then drops it.
      transitionDuration: {
        900: '900ms',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.22, 1, 0.36, 1)',
        soft: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      maxWidth: {
        content: '1280px',
        measure: '620px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        marquee: 'marquee 60s linear infinite',
        'marquee-reverse': 'marquee-reverse 60s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  // tailwindcss-animate powers shadcn/ui's animate-in / fade-in / zoom-in classes.
  plugins: [animate],
};

export default config;

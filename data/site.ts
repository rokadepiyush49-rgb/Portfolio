/**
 * ────────────────────────────────────────────────────────────────
 *  EDIT ME FIRST
 *  Everything about "who this site is" lives in this one file.
 * ────────────────────────────────────────────────────────────────
 */

export const site = {
  /** Shown in the nav, footer and browser tab. */
  name: 'Piyush Rokade',
  /** Short form used in the hero badge — "Hi, I'm ___". */
  firstName: 'Piyush',
  /** Appears after your name in the <title>. */
  role: 'Software Developer',
  location: 'Pune, India',

  /** Hero headline. Line 1 is solid ink, line 2 dims its first word. */
  headline: {
    line1: 'Software Developer',
    line2: 'who builds, experiments & ships.',
    /** The leading word of line 2 that renders in a lighter grey. */
    dimWord: 'who',
  },

  /** One or two lines under the headline. Words in `emphasis` render bold. */
  intro:
    'I solve hard problems and build fast with AI tools, turning ideas into things people actually use.',
  emphasis: ['hard problems', 'AI tools'],

  /** Small pill above the headline. */
  availability: 'Available for work',

  /** Primary hero call to action. */
  cta: {
    label: 'Explore my work',
    href: '#work',
  },

  /** Your photo — the front card of the hero's photo stack. */
  portrait: '/images/profile/piyush.webp',

  /** About section. */
  about: {
    /** Rendered large; `highlight` is set in italic serif. */
    headline: 'Developer. Builder. Probably thinking about my next side project right now.',
    highlight: 'next side project',
    body: `I started building things because I was curious about how ideas turn into real products. Somewhere between writing code, solving problems and understanding people, I became obsessed with creating things that are actually useful. Not just software that works — software that feels considered. Today I split my time between shipping products, learning in public and building small tools that scratch my own itch.`,
    interests: ['Building', 'AI', 'Open Source', 'Photography', 'Technology', 'Travel'],
  },

  /** Contact + footer. */
  contact: {
    headline: "Let's build something.",
    subline: 'Always up for a good problem, a new idea, or just a long conversation about tech.',
    email: 'piyushrokade023@gmail.com',
    phone: '+91 76661 75681',
  },

  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/piyushrokade007' },
    { label: 'GitHub', href: 'https://github.com/rokadepiyush49-rgb' },
    { label: 'Instagram', href: 'https://instagram.com/piyush_rokade_51' },
  ],

  /** A file in /public; the spaces are encoded where it's linked. */
  resume: '/Piyush Rokade Resume.pdf',

  /** Nav links — anchor ids must match the section ids in app/page.tsx. */
  nav: [
    { label: 'Work', href: '#work' },
    // Playground is parked off the page for now — restore this link with it
    // (see app/page.tsx).
    // { label: 'Playground', href: '#playground' },
    { label: 'Photography', href: '#photography' },
    { label: 'About', href: '#about' },
  ],

  /** Footer credit line. */
  builtWith: 'Next.js',
  year: 2026,
} as const;

export type Site = typeof site;

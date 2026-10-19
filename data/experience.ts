/**
 * The Experience timeline above the project sections — every role shown in
 * full, one row each, with its `accent` colouring its dot.
 *
 * Entries are sorted newest-first automatically; order here doesn't matter.
 * An entry with `end: null` is ongoing and reads "Present". Dates can be
 * 'YYYY-MM', or just 'YYYY' when the exact month doesn't matter.
 */

export type Experience = {
  id: string;
  org: string;
  /** Your title there. */
  role: string;
  /** 'YYYY-MM' (or 'YYYY') — when you started. */
  start: string;
  /** 'YYYY-MM' (or 'YYYY'), or null if you are still there. */
  end: string | null;
  location?: string;
  /** One or two lines under the role title. */
  blurb: string;
  /** Small logo beside the org name. Without one, a briefcase icon stands in. */
  photo?: string;
  /** Hex colour for this role's timeline dot (and its date, while ongoing). */
  accent?: string;
  /** Small chips under the blurb. */
  tags?: string[];
  /** Individual pieces of work under this role, shown as small cards. A
   *  `logo` replaces the card's accent dot. */
  projects?: { name: string; note?: string; logo?: string }[];
};

export const experience: Experience[] = [
  {
    id: 'aws-sbg',
    org: 'AWS Student Builder Group — VIT Pune',
    role: 'Technical Lead',
    start: '2026-09',
    end: null,
    location: 'Pune',
    blurb:
      'Leads client projects for startups and industry partners, and runs delivery and workshops for a 128-member club.',
    photo: '/images/experience/aws-student-builder-group.png',
    accent: '#FF9900',
    tags: ['Leadership', 'Client Projects', 'Workshops'],
  },
  {
    id: 'gdg',
    org: 'GDG — VIT Pune',
    role: 'Web Development Member',
    start: '2025-10',
    end: '2026-07',
    location: 'Pune',
    blurb:
      'Built an interactive placement portal — centralised job postings, listings and real-time application tracking.',
    photo: '/images/experience/gdg.png',
    accent: '#4285F4',
    tags: ['Placement Portal', 'Flask', 'Vue 3', 'Celery', 'Redis'],
  },
  {
    id: 'mood-indigo',
    org: 'IIT Bombay',
    role: 'Contingent Leader — Mood Indigo',
    start: '2025-11',
    end: '2025-12',
    location: 'Mumbai · Hybrid',
    blurb: "Led the college contingent at Asia's largest college cultural festival.",
    photo: '/images/experience/iit-bombay.png',
    accent: '#818CF8',
    tags: ['Leadership', 'Team Coordination'],
  },
  {
    id: 'honeywell',
    org: 'U.S. Space & Rocket Center',
    role: 'Honeywell Leadership Challenger Academy Selectee',
    start: '2025-10',
    end: '2025-10',
    location: 'United States · On-site',
    blurb:
      'Space mission and aviation simulations; real-world applications of STEM in space exploration.',
    // The rocket emblem from the USSRC logo; the full wordmark is unreadable at 28px.
    photo: '/images/experience/us-space-rocket-center.png',
    accent: '#F59E0B',
    tags: ['Space Mission Sims', 'Aviation', 'STEM'],
  },
  {
    id: 'freelance',
    org: 'Industry projects · Freelance',
    role: 'Freelance Full-Stack Developer',
    start: '2025',
    end: '2026',
    blurb:
      'Built and shipped client work end to end, across e-commerce, travel and manufacturing.',
    accent: '#F472B6',
    projects: [
      { name: 'Daily Bread', note: 'US startup · NYC' },
      { name: 'Pi Holidays', note: 'Tour agency' },
      // The "pm" emblem from the Parkomate banner; the wordmark is unreadable this small.
      { name: 'Parkomate', note: 'Production line', logo: '/images/experience/parkomate.png' },
    ],
  },
];

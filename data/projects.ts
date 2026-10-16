export type Project = {
  /** Stable key for the list. */
  slug: string;
  title: string;
  description: string;
  category: string;
  /** Leave empty, or `year` out, when not known yet — the card hides what's missing. */
  technologies: string[];
  year?: string;
  /** Optional one-line highlight, shown under the description beside a red dot. */
  metric?: string;
  /** Dark pill in the card's top corner — for work that's still being built. */
  status?: string;
  link: string;
};

/*
 * Two sections sit under Experience: work shipped for clients and
 * organisations, then work built on my own time. Cards are type-only — no
 * screenshots. Each section is two columns; an odd last card sits centred.
 */

/** Shipped for clients and organisations, with real users on the other end. */
export const industryProjects: Project[] = [
  {
    slug: 'daily-bread',
    title: 'Daily Bread',
    description:
      'Wellness-shot brand out of New York. Built the whole storefront experience — 3D product scenes, scroll choreography and the ordering flow behind it.',
    category: 'Freelance · NYC',
    technologies: ['Next.js', 'Three.js', 'GSAP', 'TypeScript'],
    year: '2026',
    metric: 'Shipped for a US startup',
    link: '#',
  },
  {
    slug: 'placement-portal',
    title: 'Placement Portal',
    description:
      'One system for a college placement cell: students, recruiters and admins each get their own portal, with drives, applications and deadline reminders handled end to end.',
    category: 'Full Stack',
    technologies: ['Flask', 'Vue 3', 'Celery', 'Redis'],
    year: '2025',
    metric: 'Three roles, one pipeline',
    link: '#',
  },
  {
    slug: 'pi-holidays',
    title: 'Pi Holidays',
    description:
      'Website for Pi Holidays, a tour and travel agency — being designed and built end to end for a real client.',
    category: 'Freelance · Travel',
    technologies: ['Next.js'],
    year: '2026',
    status: 'In progress · Building',
    link: '#',
  },
  {
    slug: 'parkomate',
    title: 'Parkomate',
    description:
      'Shop-floor app for Parkomate’s production line — workers take each device from flashing to packing and tick off what’s packed and what’s left.',
    category: 'Industry · Manufacturing',
    technologies: ['Python', 'PySide6', 'SQLite', 'OpenCV'],
    year: '2026',
    metric: 'Program → Test → Label → Pack',
    status: 'In progress · Building',
    link: '#',
  },
];

/** Hackathon builds and ideas worked on for their own sake. */
export const personalProjects: Project[] = [
  {
    slug: 'sutra',
    title: 'SUTRA',
    description:
      'Financial-crime and insider-risk intelligence: links who had access to which suspicious payments across 400K+ transactions, then argues for and against every alert.',
    category: 'Hackathon · FinTech',
    technologies: ['Python', 'FastAPI', 'Next.js', 'LightGBM'],
    year: '2026',
    metric: '10 rules · 5 graph detectors · 3 ML models',
    link: 'https://github.com/rokadepiyush49-rgb/HackMatrix-Hackathon',
  },
  {
    slug: 'janmaang',
    title: 'JanMaang',
    description:
      'A civic platform where a citizen reports a local need in their own voice, forty identical reports become one demand carrying the weight of forty, and the money follows the ranking.',
    category: 'Civic Tech',
    technologies: ['Flutter', 'Firebase', 'Riverpod'],
    year: '2026',
    metric: 'In development',
    link: '#',
  },
];

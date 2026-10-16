export type Experiment = {
  title: string;
  description: string;
  /** Small uppercase label under the title. */
  tech: string;
  link?: string;
};

/**
 * The "A bit more" grid — side quests and late-night builds.
 * Anything without a `link` renders as a non-clickable card. Any count works:
 * a short last row centres itself.
 */
export const experiments: Experiment[] = [
  {
    // Repo is private for now, so no link.
    title: 'Transparent Charity',
    description: 'Donations unlock only once each milestone is verified — every release and rejection stays public on-chain.',
    tech: 'Solidity + React',
  },
  {
    title: 'BuildFolio',
    description: 'Scores your GitHub and résumé, then recommends the projects that close the gap for internships.',
    tech: 'React + Node.js',
    link: 'https://github.com/rokadepiyush49-rgb/BuildFolio',
  },
  {
    title: 'Smart Farmer AI',
    description: 'Spots crop disease from a photo, ranks crops by profit, and lets farmers sell straight to factories.',
    tech: 'React + TypeScript',
    link: 'https://github.com/rokadepiyush49-rgb/Smart-Farmer-AI',
  },
  {
    title: 'Food Connect',
    description: 'Connects restaurants, households and NGOs so surplus food reaches people instead of the bin.',
    tech: 'JavaScript + Python',
    link: 'https://github.com/Ajaya-Nandiyawar/Food_Connect',
  },
  {
    title: 'Tree Track AI',
    description: 'Counts trees by species from multispectral and LiDAR-enhanced satellite imagery.',
    tech: 'TypeScript + AI',
    link: 'https://ecoscope-one.vercel.app',
  },
];

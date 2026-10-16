export type PlaygroundItem = {
  title: string;
  /** Playful one-liner revealed above the card on hover. */
  note: string;
  tech: string;
  image: string;
  link?: string;
};

/**
 * The infinite marquee under "Visual Playground".
 * 6–8 items keeps the loop feeling full without repeating too obviously.
 */
export const playground: PlaygroundItem[] = [
  {
    title: 'Gradient Mesh',
    note: 'built this at 2am because a gradient annoyed me',
    tech: 'WebGL',
    image: '/images/playground/play-1.jpg',
    link: '#',
  },
  {
    title: 'Type Specimen',
    note: 'a whole page just to look at one typeface',
    tech: 'Figma',
    image: '/images/playground/play-2.jpg',
    link: '#',
  },
  {
    title: 'Polaroid Me',
    note: 'made this for all the polaroid lovers',
    tech: 'Next.js',
    image: '/images/playground/play-3.jpg',
    link: '#',
  },
  {
    title: 'Ticket Stubs',
    note: 'turning ticket stubs into cards people keep',
    tech: 'Three.js',
    image: '/images/playground/play-4.jpg',
    link: '#',
  },
  {
    title: 'Seat Picker',
    note: 'made this so you can pick the right seat',
    tech: 'SwiftUI',
    image: '/images/playground/play-5.jpg',
    link: '#',
  },
  {
    title: 'Trip Planner',
    note: 'an AI that plans the trip instead of listing 400 hotels',
    tech: 'Claude API',
    image: '/images/playground/play-6.jpg',
    link: '#',
  },
];

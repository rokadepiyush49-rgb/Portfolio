export type Photo = {
  src: string;
  alt: string;
  /** Optional caption revealed on hover. */
  caption?: string;
  /** Controls the tile height in the masonry layout. */
  ratio: 'tall' | 'square' | 'wide';
};

/**
 * Drop your own files into /public/images/photography/ using the same
 * filenames and this section updates itself. Vary the ratios so the
 * masonry keeps its editorial rhythm.
 */
export const photos: Photo[] = [
  {
    src: '/images/photography/photo-1.jpg',
    alt: 'Indian passport and a boarding pass beside an iced coffee on a wooden café table',
    caption: 'Coffee before boarding',
    ratio: 'tall',
  },
  {
    src: '/images/photography/photo-2.jpg',
    alt: 'City skyline lit up across the water at dusk, orange sky behind the clouds',
    caption: 'City lights across the bay',
    ratio: 'wide',
  },
  { src: '/images/photography/photo-3.jpg', alt: 'Silhouetted high-rises and construction cranes against an orange sunset sky', caption: 'A skyline still being built', ratio: 'wide' },
  { src: '/images/photography/photo-4.jpg', alt: 'Eiffel Tower lit up at dusk, framed by Parisian apartment buildings and autumn leaves', caption: 'Paris, as the lights come on', ratio: 'tall' },
  { src: '/images/photography/photo-5.jpg', alt: 'Times Square at night, billboards glowing above a yellow taxi', caption: 'Times Square, after dark', ratio: 'square' },
  { src: '/images/photography/photo-6.jpg', alt: 'Midtown Manhattan avenue with the Empire State and Chrysler buildings rising above yellow taxis', caption: 'Midtown, looking up', ratio: 'tall' },
  { src: '/images/photography/photo-7.jpg', alt: 'Sunset over a sea of clouds, seen through an airplane window past the wing and engine', caption: 'Window seat, golden hour', ratio: 'tall' },
  { src: '/images/photography/photo-8.jpg', alt: 'Ganesh idol in a gold crown and flower garlands, half veiled by incense smoke', caption: 'Ganpati Bappa Morya', ratio: 'tall' },
];

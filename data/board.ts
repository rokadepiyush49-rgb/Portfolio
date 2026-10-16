/**
 * ────────────────────────────────────────────────────────────────
 *  THE ABOUT BOARD
 *  Everything on the little interactive desk under the About text.
 *
 *  Coordinates live in a fixed 1040 × 620 design space. The board
 *  scales that whole space to fit its container, so a position you
 *  set here looks identical on a 27" monitor and on a phone —
 *  you never need separate mobile numbers.
 *
 *  x, y        top-left corner, in design units, from the board's
 *              top-left. The board keeps items 20px inside its edges.
 *  rotation    degrees. Small odd values are what stop the board
 *              from looking like a grid. It straightens while you
 *              drag and springs back when you let go.
 *
 *  TO SWAP AN IMAGE: change `src`. Nothing else. Any aspect ratio
 *  works — set `w`/`h` to match and the object resizes around it.
 * ────────────────────────────────────────────────────────────────
 */

/** The fixed design space every position below is measured in. */
export const BOARD = { width: 1040, height: 620 } as const;

type Base = {
  id: string;
  x: number;
  y: number;
  rotation: number;
};

export type BoardItem = Base &
  (
    | {
        /** A small premium boarding-pass card. */
        type: 'flight';
        from: string;
        to: string;
        /** Small print under the route. */
        detail: string;
        w: number;
        h: number;
      }
    | {
        /** Any free-standing image — the F1 car, a sticker, an object. */
        type: 'image';
        src: string;
        alt: string;
        w: number;
        h: number;
      }
    | {
        /** A photo print, rendered with a white border and a caption. */
        type: 'photo';
        src: string;
        alt: string;
        caption?: string;
        w: number;
        h: number;
      }
  );

export const boardItems: BoardItem[] = [
  // ── Travel ────────────────────────────────────────────────────
  {
    id: 'flight',
    type: 'flight',
    from: 'BOM',
    to: 'JFK',
    detail: 'One way · Seat 14A',
    x: 104,
    y: 96,
    rotation: -6,
    w: 240,
    h: 92,
  },

  // ── F1 ────────────────────────────────────────────────────────
  // Replace src with your own car shot (PNG or WebP, transparent background).
  {
    id: 'f1',
    type: 'image',
    src: '/images/board/f1-car.webp',
    alt: 'Ferrari Formula 1 car',
    x: 615,
    y: 440,
    rotation: -2,
    w: 380,
    h: 86,
  },

  // ── Photos ────────────────────────────────────────────────────
  // Pointed at your photography files. To add another, copy a block,
  // give it a new `id`, and set `src` to your image.
  {
    id: 'photo-1',
    type: 'photo',
    src: '/images/photography/photo-2.jpg',
    alt: 'City skyline lit up across the water at dusk',
    caption: 'lights across the bay',
    x: 738,
    y: 104,
    rotation: 4,
    w: 194,
    h: 184,
  },
  {
    id: 'photo-2',
    type: 'photo',
    src: '/images/photography/photo-1.jpg',
    alt: 'Passport and boarding pass beside an iced coffee',
    caption: 'coffee, then boarding',
    x: 118,
    y: 286,
    rotation: -4.5,
    w: 176,
    h: 210,
  },
  {
    id: 'portrait',
    type: 'photo',
    src: '/images/photography/photo-5.jpg',
    alt: 'Times Square at night, billboards glowing above a yellow taxi',
    caption: 'nyc, first time',
    x: 480,
    y: 74,
    rotation: -3,
    w: 174,
    h: 194,
  },
];

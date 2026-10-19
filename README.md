# Portfolio

Piyush Rokade's personal portfolio — a single-page site built with Next.js 15 (App
Router), React 19, TypeScript, Tailwind CSS 3 and Framer Motion. Every page is
statically prerendered at build time.

## Requirements

- Node.js **18.18 or newer** (see `engines` in `package.json`)
- npm (the repo ships a `package-lock.json`; use `npm ci` for a clean install)

## Commands

```bash
npm ci              # install exactly what the lockfile pins
npm run dev         # http://localhost:3000
npm run build       # production build into .next/
npm run start       # serve the production build
npm run typecheck   # TypeScript check, no output files
```

No environment variables are needed.

## Deploying

The site is built for **Vercel** (zero config): import the repository, keep the
"Next.js" framework preset, and deploy.

| Setting | Value |
| --- | --- |
| Install command | `npm ci` (Vercel's default `npm install` also works) |
| Build command | `npm run build` |
| Output directory | `.next` (handled by the Next.js preset) |
| Environment variables | none |

Images go through `next/image`, which needs a server or Vercel's image
optimizer. A plain static host (GitHub Pages) would need `output: 'export'`
plus `images.unoptimized`, so it isn't the recommended target.

---

## Where to change things

Everything you'll actually want to edit lives in `/data`. You should not need to open a
component to change your name, your projects or your photos.

| File | What it controls |
| --- | --- |
| `data/site.ts` | **Start here.** Name, role, hero headline, intro, portrait, about copy, interests, email, phone, socials, résumé link, nav items, footer year |
| `data/experience.ts` | The Experience timeline (sorted newest-first automatically) |
| `data/projects.ts` | The Industry and Personal project cards |
| `data/experiments.ts` | The "A bit more" side-project grid |
| `data/photos.ts` | The photography masonry |
| `data/testimonials.ts` | The "What people actually say" quotes |
| `data/board.ts` | The interactive board under About — every object's image, position and rotation |
| `data/playground.ts` | The "Visual Playground" row (parked — see below) |

### Images

Every image lives under `public/images/` and is served through `next/image`,
which converts it to AVIF/WebP at the size each slot needs. Keep filenames the
same and nothing else has to change.

| Section | Files |
| --- | --- |
| Hero card portrait | `profile/piyush.webp` (`site.portrait`) |
| Experience logos | `experience/*.png` (`photo` in `data/experience.ts`) |
| Photography grid | `photography/photo-1.jpg` … `photo-8.jpg` |
| Testimonial avatars | `people/<person-name>.jpg` |
| About board | `board/f1-car.webp`, plus photos pointed at `photography/` |

If a referenced file is missing, `components/SmartImage.tsx` renders a calm
fallback tile instead of breaking the layout.

Photo tiles vary in height — set `ratio` to `tall`, `square` or `wide` in
`data/photos.ts` to keep the masonry rhythm interesting.

### Adding a photo

`scripts/add-photo.sh` converts (HEIC included), resizes and saves an image as
a real JPEG in one step (macOS, uses `sips`):

```bash
scripts/add-photo.sh ~/Desktop/ajay.HEIC people/ajaya-nandiyawar
scripts/add-photo.sh ~/Desktop/goa.HEIC  photography/photo-3
```

The slot name is the path under `public/images/` without the extension. It
picks the right size per section (400px avatars, 1000px board, 1800px grid).

### The About board

`data/board.ts` is the whole board. Positions live in a fixed **1040 × 620 design
space** that gets scaled to fit whatever width it's given, so one set of
coordinates looks right on a monitor and on a phone — nothing reflows or stacks.

To swap an object's artwork, change its `src` (and `w`/`h` if the aspect ratio
changes). Free-standing objects like the F1 car work best as a PNG or WebP with a
transparent background. Each item's `rotation` is what stops the board looking
like a grid; objects straighten while you drag them and spring back on release.

### Résumé

The Contact section links to `site.resume` (`/resume.pdf`). Put your PDF at
`public/resume.pdf`, or point `site.resume` somewhere else.

### Visual Playground (parked)

`components/Playground.tsx`, `data/playground.ts` and `public/images/playground/`
are kept but not on the page. To bring the section back, uncomment it (and its
import) in `app/page.tsx` and its nav link in `data/site.ts`.

---

## Project structure

```
app/
  layout.tsx          Fonts, metadata, theme script, MotionProvider
  page.tsx            The single page, section by section
  not-found.tsx       404 page
  icon.svg            Favicon
  globals.css         Design tokens and type primitives
components/           One file per section, plus shared pieces (below)
data/                 All site content
lib/                  useIsDark (theme hook), xo.ts (tic-tac-toe opponent), utils.ts (cn)
public/images/        Every image on the site
scripts/add-photo.sh  Image import helper
```

### Components

```
Navbar.tsx          Floating pill nav (Gooey Nav on desktop) + full-screen mobile sheet
Hero.tsx            Word-by-word headline, Letter Glitch background, Profile Card
Experience.tsx      The timeline
ProjectSection.tsx  → ProjectCard.tsx (Border Glow cards)
Experiments.tsx     → ExperimentCard.tsx
Photography.tsx     Dark masonry section
About.tsx           Word-by-word paragraph reveal + interests → AboutBoard.tsx
Testimonials.tsx    Dark panel, auto-advancing highlight
XOGame.tsx          The tic-tac-toe Easter egg (opponent lives in lib/xo.ts)
Contact.tsx         Large email link + detail rows
Footer.tsx
ScrollProgress.tsx, SocialRail.tsx, ThemeToggle.tsx
SectionHeading.tsx  The shared section opener
Reveal.tsx          The one scroll entrance used site-wide
SmartImage.tsx      next/image + fallback tile
MotionProvider.tsx  Framer Motion setup (see Motion below)
```

`LetterGlitch`, `GooeyNav`, `ProfileCard` and `BorderGlow` are vendored from
[React Bits](https://reactbits.dev). Each file's header names its source and any
local change.

## Design system

Tokens live in two places and nowhere else:

- `app/globals.css` — colours (as RGB channel triplets so Tailwind's `/opacity`
  modifiers work), light and dark themes, the display type scale, and the
  `.meta` / `.eyebrow-hand` / `.container-content` primitives.
- `tailwind.config.ts` — the same colours exposed as Tailwind utilities (plus
  shadcn/ui's semantic names mapped onto them), radii, easing curves and keyframes.

Three typefaces, three jobs: **Manrope** for everything, **Instrument Serif** (italic) for
accent words and the gradient period, **Caveat** for the handwritten red section labels.

shadcn/ui is configured (`components.json`, `new-york` style for Tailwind v3) but
no components are installed yet. Add one with `npx shadcn@latest add <name>`.
Don't re-run `shadcn init` with a preset: current presets target Tailwind v4.

## The tic-tac-toe game

`lib/xo.ts` holds the opponent. It is built to lose, but *convincingly*: it
never takes the cell that would complete your line, and never builds a threat
of its own, because an opponent that ignores its own open win is what actually
gives the trick away. A draw quietly resets; nobody leaves the page having lost.

## Motion

One entrance (`Reveal`: fade + rise, 0.7s, expo-out), used everywhere with small
stagger delays. Hover states are CSS transitions on transform and opacity.

`MotionProvider` (in the root layout) loads Framer Motion's `domAnimation`
feature set through `LazyMotion`, so components use **`m.div`, not `motion.div`**.
It runs in strict mode, so a stray `motion.*` throws instead of silently pulling
the full library back into the bundle. If you ever need drag or layout
animations, switch `domAnimation` to `domMax` there.

Everything respects `prefers-reduced-motion`: CSS animations are cut in
`globals.css`, Framer Motion skips transform animations (`reducedMotion="user"`),
and the WebGL components check the setting themselves.

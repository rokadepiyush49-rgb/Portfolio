import type { Metadata, Viewport } from 'next';
import { Caveat, Instrument_Serif, Manrope } from 'next/font/google';
import MotionProvider from '@/components/MotionProvider';
import { site } from '@/data/site';
import './globals.css';

/* Three faces, three jobs: sans for everything, serif for the italic accents,
   handwriting for the red section labels. */
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-serif',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-hand',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.intro,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.intro,
    type: 'website',
  },
};

// Matches the dark --bg, since dark is the default.
export const viewport: Viewport = {
  themeColor: '#0b0b0c',
};

/* Dark is the default and ships in the server HTML. This runs before first
   paint and only steps in for a visitor who picked light with the toggle. */
const themeScript = `(function(){try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.remove('dark');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the script below may drop `dark` before React loads.
    <html
      lang="en"
      className={`dark ${manrope.variable} ${instrument.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-bg font-sans text-ink antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

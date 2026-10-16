export type Testimonial = {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
};

/**
 * Names are real. Some roles and companies are still placeholders — swap them
 * as the real details come in.
 *
 * Quotes use backticks, not single quotes, on purpose: pasting a real
 * testimonial that runs onto a second line breaks a '...' string and takes the
 * whole build down with it. A `...` string simply accepts the line break.
 *
 * Avatars are named after each person, so to add someone's photo just drop
 * it at public/images/people/<their-file>.jpg. Any missing file falls back
 * to a neutral tile rather than breaking the card.
 */
export const testimonials: Testimonial[] = [
  {
    name: 'Aditya Bhattacharya',
    role: 'Intern',
    company: 'Pattern',
    avatar: '/images/people/aditya-bhattacharya.jpg',
    quote: `One of those rare people who genuinely knows what he’s doing. His ability to break down complex problems, think clearly under pressure, and come up with effective solutions is truly exceptional. He’s someone you can always rely on to figure things out and get the job done.`,
  },
  {
    name: 'Srishti Thakur',
    role: 'SDE',
    company: 'AWS Berlin',
    avatar: '/images/people/srishti-thakur.jpg',
    quote: `Gave him a vague problem and a rough deadline and got back something better than what we asked for. Twice.`,
  },
  {
    name: 'Sarthak Kapadne',
    role: 'Staff Engineer',
    company: 'Loop',
    avatar: '/images/people/sarthak-kapadne.jpg',
    quote: `Reads a codebase faster than anyone I have worked with, then leaves it cleaner than he found it.`,
  },
  {
    name: 'Nitin Rokade',
    role: 'Safety Manager',
    company: 'Honeywell USA & India',
    avatar: '/images/people/nitin-rokade.jpg',
    quote: `Prototypes faster than most people can describe an idea, and is never precious about throwing one away.`,
  },
  {
    name: 'Riya Devi',
    role: 'CTO',
    company: 'Brightlane',
    avatar: '/images/people/riya-devi.jpg',
    quote: `Took over a codebase two engineers had given up on and had it shipping again in a fortnight.`,
  },
  {
    name: 'Ridham Anand',
    role: 'Intern',
    company: 'Barclays',
    avatar: '/images/people/ridham-anand.jpg',
    quote: `Asks the question everyone else skipped — usually the one that saves a month of building the wrong thing.`,
  },
  {
    name: 'Arnav Anand',
    role: 'Intern',
    company: 'Visa',
    avatar: '/images/people/arnav-anand.jpg',
    quote: `Handed off a Figma file and got back a build that matched it to the pixel — including the animations.`,
  },
];

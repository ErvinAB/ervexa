/**
 * Notes — the studio's numbered build log.
 *
 * Numbered like a journal rather than a blog, because numbering turns a thin
 * catalogue into a body of work. Every entry describes work we actually did;
 * none of them invent a product, a metric or a client.
 *
 * Adding an entry: append to the top of the list. Numbers are never reused.
 */
export interface Note {
  slug: string;
  number: string;
  date: string;
  title: string;
  summary: string;
  body: string[];
}

export const notes: Note[] = [
  {
    slug: "why-the-homepage-starts-with-proof",
    number: "03",
    date: "14 October 2026",
    title: "Why the homepage starts with proof",
    summary:
      "The site used to say our first app was in production and, three lines later, that there were no releases yet.",
    body: [
      "The old homepage had a status panel. It said the first app was in production. Underneath it, the same page said there were no releases yet. Both sentences were written by us, in good faith, at different times.",
      "For a studio whose whole pitch is that it does not overstate, that was the most expensive bug on the site. A stranger reads those two lines and learns that we do not check our own work.",
      "The fix was not to write better copy. It was to stop writing the status in three places. There is now one object in the code that holds the status of the first app, and the homepage, the apps page and the page metadata all read from it. It cannot contradict itself, because there is nothing to contradict.",
      "The section that used to hold the stat panel now sits directly under the hero and says what is actually true: there is one app, it is in development, and here is when we last touched it. No screenshot yet. We will add one when there is a screen worth showing, and not before.",
    ],
  },
  {
    slug: "why-we-deleted-the-old-site",
    number: "01",
    date: "12 October 2026",
    title: "Why we deleted the old site",
    summary:
      "We were an agency with a portfolio, and we are not an agency.",
    body: [
      "The previous version of this site was an agency site. It had a capabilities page, a projects page with filters, a technologies grid, three case studies and a workflow playground. It was competent, and it was aimed at the wrong buyer.",
      "Stagbyte is product-led. We make our own small apps first; games are an experiment, client work is a handful of engagements a year. An agency site says the opposite — it says the studio exists to be hired, and the products are the side project.",
      "So the old routes went, along with their components and content files. What replaced them is smaller on purpose: apps, games, notes, the studio. Client work exists, is linked honestly, and is deliberately kept out of the primary navigation so the site does not read as an agency.",
      "The deleted pages were not bad. They were just describing a different company. The most useful thing we did was admit that and cut them, rather than adding a new homepage on top of them.",
    ],
  },
];

export function getNote(slug: string): Note | undefined {
  return notes.find((note) => note.slug === slug);
}

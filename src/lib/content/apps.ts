/**
 * Our own apps — the studio's primary focus.
 *
 * This list is intentionally empty. Stagbyte has no released apps yet, and the
 * site renders an honest in-development state until real entries exist. Add an
 * app here only once it genuinely exists and can ship, with its real name,
 * a real price and a real store link.
 *
 * Adding one app is enough: `/apps/[slug]` renders itself from this record, and
 * the card grids on `/` and `/apps` appear automatically.
 */

/** The catalogue number, written the way the site writes it: N°01. */
export function catalogueNumber(number: string): string {
  return `N°${number}`;
}

/**
 * N°01 is reserved for the first app while it is still in development.
 * Declared before the shelf below, which is the first thing to read it.
 */
export const FIRST_APP_NUMBER = "01";

export interface Screenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface App {
  /**
   * Catalogue number, e.g. "01". Assigned in order and never reused, so the
   * shelf is reserved before the product exists. Not derived from array
   * position — reordering this file must not renumber a shipped app.
   */
  number: string;
  slug: string;
  name: string;
  /** The one everyday problem this solves, in one sentence. */
  tagline: string;
  description: string;
  platforms: string[];
  status: "released" | "in-development" | "prototype";
  features: string[];
  /**
   * What the app deliberately does not do. Every app marketing page lies by
   * omission; this is the list ours will not have.
   */
  doesNot: string[];
  /** Display price, stated plainly — "One-time purchase, €9". */
  price: string;
  /** Where to get it. Absent until it genuinely ships. */
  download?: { label: string; href: string };
  /** Real screenshots of the real app, at native aspect ratio. Never mockups. */
  screenshots: Screenshot[];
  /** Build-log entries about this app — slugs into `notes.ts`. */
  noteSlugs: string[];
  support: { email: string; response: string };
}

export const apps: App[] = [];

export const appStatusLabel: Record<App["status"], string> = {
  released: "Released",
  "in-development": "In development",
  prototype: "Prototype",
};

export function getApp(slug: string): App | undefined {
  return apps.find((app) => app.slug === slug);
}

/**
 * The shelf.
 *
 * Numbers are reserved in order and never reused, so the catalogue reads as a
 * body of work rather than a list that happens to be short. A reserved slot
 * states that a slot exists and withholds everything else — no working title,
 * no invented problem, nothing a reader could mistake for a product.
 */
export interface CatalogueSlot {
  number: string;
  status: "in-development" | "reserved";
  label: string;
  note: string;
}

export const catalogueSlots: CatalogueSlot[] = [
  {
    number: FIRST_APP_NUMBER,
    status: "in-development",
    label: "In development",
    note: "The first app. It gets a name, screens and a price the day it is real, and not before.",
  },
  {
    number: "02",
    status: "reserved",
    label: "Reserved",
    note: "Held open. We choose the problem once N°01 ships — choosing it now would be inventing it.",
  },
  {
    number: "03",
    status: "reserved",
    label: "Reserved",
    note: "Held open. Nothing is promised on this shelf and nothing here is a roadmap.",
  },
];

export const appsNote =
  "We would rather ship a single app that works than announce ten that do not, so nothing is listed here until it is real and downloadable.";

/**
 * The ONE place the first app's status is written down.
 *
 * The homepage, /apps and the page metadata all read from this object, so the
 * site can never again say "in production" in one section and "no releases yet"
 * in another. Change a claim here and it changes everywhere.
 *
 * `release` is the studio's current target, not a promise. Update it when it
 * moves — a stale target is worse than no target.
 */
export interface FirstAppStatus {
  /** Catalogue number of the reserved slot, e.g. "01". */
  number: string;
  label: string;
  headline: string;
  detail: string;
  release: string;
  lastUpdate: string;
  nextNote: string;
  /**
   * A real work-in-progress screen, at its native aspect ratio. Left `null`
   * until one genuinely exists — never a 3D mockup for software that doesn't.
   */
  image: Screenshot | null;
}

export const firstAppStatus: FirstAppStatus = {
  number: FIRST_APP_NUMBER,
  label: `${catalogueNumber(FIRST_APP_NUMBER)} — In development`,
  headline: "In development",
  detail:
    "The first app is being built now. We will not name it or show screens until it is real — that is what building one at a time means.",
  release: "First release targeted for January 2027",
  lastUpdate: "14 October 2026",
  nextNote: "end of October",
  image: null,
};

/** Short status phrase for use in compact contexts (metadata, nav, cards). */
export const firstAppStatusLine =
  "In development — first release targeted for January 2027";

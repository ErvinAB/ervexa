/**
 * Games are exploratory at Stagbyte — something the studio enjoys prototyping,
 * not its main line of work.
 *
 * This list is intentionally empty. Unannounced projects are not presented as
 * products, and no working titles are published until there is something worth
 * playing. Add an entry only when a game is genuinely announced.
 */
export interface Game {
  slug: string;
  title: string;
  genre: string;
  platforms: string[];
  status: "released" | "in-development" | "prototype";
  tagline: string;
  description: string;
  highlights: string[];
}

export const games: Game[] = [];

export const gamesNote =
  "Games are exploratory here. We prototype ideas privately and would only talk about one once it is worth playing — so there are no titles to announce today, and we are not framing the studio as a game company.";

export const gameStatusLabel: Record<Game["status"], string> = {
  released: "Released",
  "in-development": "In development",
  prototype: "Prototype",
};

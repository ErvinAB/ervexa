import type { Game } from "@/lib/content/games";
import { gameStatusLabel } from "@/lib/content/games";
import StatusPill from "@/components/site/StatusPill";

export default function GameCard({ game, index }: { game: Game; index: number }) {
  return (
    <article className="on-night card-pop group flex flex-col rounded-[2rem] border border-night-line bg-night-soft/60 hover:border-accent/45">
      <div
        className="hatch relative flex h-44 items-center justify-center border-b border-night-line text-accent/25"
        aria-hidden="true"
      >
        <span className="label text-ivory/55">Artwork in production</span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="label font-semibold text-accent/80">
            N&deg;{String(index + 1).padStart(2, "0")}
          </span>
          <StatusPill label={gameStatusLabel[game.status]} tone="night" pulse />
        </div>

        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-ivory">
          {game.title}
        </h3>
        <p className="label mt-2 text-ivory/55">{game.genre}</p>

        <p className="mt-4 text-base leading-relaxed text-ivory/75">
          {game.tagline}
        </p>

        <ul className="mt-6 space-y-2">
          {game.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-2 text-sm leading-relaxed text-ivory/60"
            >
              <span
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/60"
                aria-hidden="true"
              />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-night-line pt-5">
          {game.platforms.map((platform) => (
            <span
              key={platform}
              className="label rounded border border-night-line px-2 py-1 text-ivory/55"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

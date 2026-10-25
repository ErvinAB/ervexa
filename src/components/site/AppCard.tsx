import Link from "next/link";
import {
  appStatusLabel,
  catalogueNumber,
  type App,
} from "@/lib/content/apps";
import StatusPill from "@/components/site/StatusPill";

export default function AppCard({ app }: { app: App }) {
  return (
    <Link
      href={`/apps/${app.slug}`}
      className="card-pop group flex flex-col rounded-[2rem] border border-charcoal/15 bg-ivory-soft/60 p-8 hover:border-forest/45"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="label font-semibold text-forest">
          {catalogueNumber(app.number)}
        </span>
        <StatusPill label={appStatusLabel[app.status]} />
      </div>

      <h3 className="mt-6 text-2xl font-semibold tracking-tight text-charcoal">
        {app.name}
      </h3>
      <p className="mt-2 text-base leading-relaxed text-charcoal/75">
        {app.tagline}
      </p>

      <p className="mt-4 text-sm leading-relaxed text-charcoal/70">
        {app.description}
      </p>

      <ul className="mt-6 space-y-2">
        {app.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-sm leading-relaxed text-charcoal/70"
          >
            <span
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-forest/70"
              aria-hidden="true"
            />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-charcoal/10 pt-5">
        {app.platforms.map((platform) => (
          <span
            key={platform}
            className="label rounded border border-charcoal/20 px-2 py-1 text-charcoal/70"
          >
            {platform}
          </span>
        ))}
      </div>
    </Link>
  );
}

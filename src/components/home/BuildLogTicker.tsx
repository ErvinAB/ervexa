import Link from "next/link";
import { notes } from "@/lib/content/notes";
import BrandMark from "@/components/site/BrandMark";

/**
 * The homepage band is the studio's build log, not a list of adjectives.
 *
 * It replaces a marquee that scrolled "Small apps / Built properly /
 * Product-led / Independent studio / Design · Build · Ship" — five phrases that
 * were already stated properly elsewhere on the page, so it was decoration
 * pretending to be content.
 *
 * Real note titles and dates can't be faked, they age visibly, and recency is
 * the trust signal a pre-launch studio actually has. This is the homepage's
 * only moving element and it now carries information.
 *
 * The visual track is aria-hidden; a visually-hidden nav holds the real links,
 * so screen readers get three links rather than six repeated ones.
 */
export default function BuildLogTicker() {
  // Two copies of the list, so the -50% keyframe loops seamlessly.
  const track = [...notes, ...notes];

  // overflow-hidden on the band is load-bearing: the track is width:max-content,
  // so without it the band would widen the page and add a horizontal scrollbar.
  return (
    <section className="overflow-hidden border-y border-forest-soft bg-forest py-5 md:py-7">
      <div className="marquee-track ticker-track" aria-hidden="true">
        {track.map((note, index) => (
          <span
            key={`${note.slug}-${index}`}
            className="mx-5 inline-flex items-baseline gap-4 md:mx-8"
          >
            <span className="label font-semibold text-ivory/75">
              N&deg;{note.number}
            </span>
            <span className="text-2xl font-semibold tracking-tight text-ivory md:text-4xl">
              {note.title}
            </span>
            <span className="label text-ivory/75">{note.date}</span>
            <BrandMark className="ml-5 h-7 w-auto self-center text-ivory/70 md:h-9" />
          </span>
        ))}
      </div>

      <nav className="sr-only" aria-label="Build log">
        <ul>
          {notes.map((note) => (
            <li key={note.slug}>
              <Link href={`/notes/${note.slug}`}>
                N&deg;{note.number} — {note.title}, {note.date}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

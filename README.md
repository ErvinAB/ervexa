# Stagbyte

An independent, **product-led** software studio. We make our own small apps
that solve one everyday problem properly.

Games are an exploratory arm of the studio, and client work is selective — in
that order of priority. The site's messaging is deliberately honest: no product
is named, launched or listed until it genuinely exists.

## Tech stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- React 19
- Lucide icons
- Netlify (deployment, forms)

## Getting started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Routes

| Route          | Priority    | Purpose                                                 |
| -------------- | ----------- | ------------------------------------------------------- |
| `/`            | —           | Homepage — hero → proof → marquee → arms → games → studio → close |
| `/apps`        | Primary     | Our own apps, plus the current status of the first one  |
| `/apps/[slug]` | Primary     | An app's own page; a real 404 until `apps` has entries  |
| `/games`       | Exploratory | Games, framed explicitly as not the main line           |
| `/notes`       | Journal     | Numbered, dated build log; `/notes/[slug]` per entry    |
| `/about`       | —           | The studio, what we make, tooling, contact              |
| `/client-work` | Secondary   | Selective client work (linked from the footer)          |
| `/contact`     | —           | Netlify-backed contact form                             |

`/client-work` is intentionally **not** in the primary navigation, so the site
reads as a product studio rather than an agency. The header call to action is a
neutral "Get in touch".

The header takes a `tone` prop: `paper` (default) on the light pages, `night`
only on `/games`, so the site is not a paper site with one dark bar bolted on.

## Honest content model

The app and game collections are intentionally **empty arrays** in
`src/lib/content/`. The pages detect this and render honest in-development
states instead of placeholder products:

- `src/lib/content/apps.ts` — `apps: []` plus `appsNote` and `firstAppStatus`.
  **`firstAppStatus` is the single source of truth for the first app's status**
  and is read by the homepage Proof section, `/apps` and the page metadata, so
  the site cannot contradict itself about it. Add a real app only once it ships,
  with its real name, price and store link.

  Each `App` carries its own `number` (`"01"`), assigned in order and never
  reused, so the shelf is reserved before the product exists. It is **not**
  derived from array position — reordering the file must not renumber a shipped
  app. `catalogueNumber()` is the one place `N°01` is formatted.

  Adding a single entry to `apps` is enough: `/apps/[slug]` renders itself from
  the record (hero, screens, what it does not do, that app's build notes,
  support), the card grids on `/` and `/apps` appear automatically, and the route
  joins `sitemap.xml`. Fields: `number`, `slug`, `name`, `tagline`,
  `description`, `platforms`, `status`, `features`, `doesNot`, `price`,
  optional `download`, `screenshots`, `noteSlugs`, `support`.

  `doesNot` is the differentiator — every app marketing page lies by omission, so
  the app page publishes the other half of the list. `screenshots` must be real
  screens at native aspect ratio, never mockups, and `download` stays absent until
  there is something to download (the hero then reads "Not yet available").
- `src/lib/content/games.ts` — `games: []` plus `gamesNote`. Working titles are
  not published.
- `src/lib/content/notes.ts` — the numbered build log. Numbered like a journal
  rather than a blog; entries are never reused or back-dated.

`AppCard` and `GameCard` are still wired up behind
`{apps.length > 0 && ...}` / `{games.length > 0 ? ... : ...}`, so the card grids
appear automatically the moment real entries are added. **Do not add invented
names to these arrays.**

## Design system

The site is hybrid. Light editorial sections use the paper palette; the games
band and call-to-action sections use the dark "night" palette. Both are defined
once in `src/app/globals.css` under `@theme`:

| Token          | Use                                        |
| -------------- | ------------------------------------------ |
| `ivory`        | Light page background                      |
| `ivory-soft`   | Raised light surfaces (cards, panels)      |
| `charcoal`     | Body text and headings on light            |
| `forest`       | Primary brand green, buttons, eyebrows     |
| `warm`         | Peach accent, links and highlights on dark |
| `night`        | Dark showcase background                   |
| `night-soft`   | Raised dark surfaces                       |
| `night-line`   | Borders on dark                            |

Utilities: `paper-grain`, `hatch`, `marquee-track`, `status-pulse`. Dark
sections carry the `on-night` class so focus rings and selection colours switch
with them. `hatch` is reserved for genuinely reserved space (the catalogue
slots), not decoration.

## Structure

```
src/
├── app/
│   ├── page.tsx          # Homepage: hero → proof → marquee → arms → games → studio → close
│   ├── apps/             # Our apps (primary)
│   │   └── [slug]/       # An app's own page (real 404 while apps is empty)
│   ├── games/            # Games (exploratory)
│   ├── notes/            # Build log + [slug] entries
│   ├── about/            # The studio
│   ├── client-work/      # Selective client work (secondary)
│   ├── contact/
│   ├── not-found.tsx
│   ├── opengraph-image.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── Header.tsx / Footer.tsx / ContactForm.tsx
│   ├── home/             # Homepage sections
│   └── site/             # Shared UI
└── lib/
    ├── content/          # Content collections
    │   ├── apps.ts       # Our apps (empty until real) + firstAppStatus
    │   ├── games.ts      # Games (empty until announced)
    │   ├── notes.ts      # Numbered build log
    │   ├── services.ts   # Selective client offerings
    │   ├── home.ts       # Studio principles
    │   └── navigation.ts # Primary + secondary nav, socials, contact
    ├── metadata.ts       # SEO metadata
    └── schemas.ts        # JSON-LD
```

## Contact

- [LinkedIn (personal)](https://www.linkedin.com/in/ervin-abedin/)
- [LinkedIn (Stagbyte)](https://www.linkedin.com/company/stagbyte/)
- Email: e.abedin@arvionix.com
- [GitHub](https://github.com/ErvinAB)

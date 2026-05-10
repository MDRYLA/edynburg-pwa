# Architecture

A high-level walkthrough of how Edinburgh Atlas is put together. The whole app fits in ~50 source files and a single `npm run build` artifact — there's no backend, no database, no auth, no API.

## Folder layout

```
edinburgh-app/
├── public/
│   ├── icon.svg, icon-maskable.svg     # PWA icons (SVG, sizes="any")
│   ├── manifest.json                   # PWA manifest
│   ├── favicon.ico                     # Browser favicon
│   └── svg/textures/noise.svg          # Background grain texture
├── src/
│   ├── app/                            # Next.js App Router
│   │   ├── layout.tsx                  # <html>, fonts, theme init script, toggles
│   │   ├── globals.css                 # Imports all 3 palette CSS + base styles
│   │   ├── page.tsx                    # / — home
│   │   ├── plan/page.tsx               # /plan — timeline (client)
│   │   ├── places/page.tsx             # /places — grid
│   │   ├── places/[slug]/page.tsx      # /places/:slug — detail (SSG)
│   │   ├── food/page.tsx               # /food — restaurants
│   │   ├── transport/page.tsx          # /transport — tram info
│   │   └── tips/page.tsx               # /tips — advice
│   ├── components/
│   │   ├── ui/                         # Button, Card, Divider, Eyebrow, ExternalLink, MapLink
│   │   ├── layout/                     # Header, BottomNav, Ornament, ThemeToggle, PaletteToggle
│   │   ├── timeline/                   # TimelineEvent, ProgressBar, CurrentStatus
│   │   ├── places/                     # PlaceCard, PlaceHero, PlaceSection, PlaceIllustration
│   │   └── food/                       # RestaurantCard
│   ├── data/                           # Hard-coded TS — no CMS, no DB
│   │   ├── schedule.ts                 # 15-event timeline (08:50 → 19:20)
│   │   ├── places.ts                   # 6 attractions
│   │   ├── restaurants.ts              # 3 restaurants
│   │   ├── transport.ts                # Tram info
│   │   └── tips.ts                     # 7 categories of advice
│   ├── lib/
│   │   ├── time.ts                     # getCurrentEvent, getNextEvent, formatDuration, getProgress
│   │   ├── storage.ts                  # localStorage wrappers (visited events)
│   │   └── maps.ts                     # mapPlaceUrl, mapDirectionsUrl, mapSearchUrl, extractPlaceId
│   ├── styles/
│   │   ├── tokens-swieca.css           # Palette A — medieval candle (default)
│   │   ├── tokens-atlas.css            # Palette B — cartographic navy + gold
│   │   └── tokens-krew.css             # Palette C — Highland blood-red
│   └── types/index.ts                  # Shared TS types
├── next.config.mjs                     # next-pwa wrapper
├── tailwind.config.ts                  # Tailwind theme on top of CSS variables
├── tsconfig.json
└── package.json
```

## Routes (6)

All routes are prerendered at build time (`○ Static` or `● SSG`). No `getServerSideProps`, no API routes, no middleware.

| Route | Type | What it does |
|---|---|---|
| `/` | Static | Hero, current event from device clock, 2×2 quick-access grid. |
| `/plan` | Static (client island) | 15-event timeline with live "now" cursor + progress bar + checkable events. |
| `/places` | Static | Grid of 6 attraction cards. |
| `/places/[slug]` | SSG (6 paths) | Attraction detail — illustration, history sections, tips, map link. |
| `/food` | Static | Three restaurant cards (one with "recommended" variant). |
| `/transport` | Static | Tram info, tickets, walk-back option, £2.40 cash-warning. |
| `/tips` | Static | 7 categories — currency, plugs, tipping, language, weather, transport, Scottish vocabulary. |

## Data flow

```
src/data/*.ts  ─►  page (server component)  ─►  components/*.tsx  ─►  HTML at build time
                                          ↘
                                            client island (only /plan)
                                          ↘
                                            re-renders against device clock + localStorage
```

There is **no fetch**, no `await`, no async data layer. Everything resolves synchronously at build time. The `/plan` page hydrates a small client island that reads `Date.now()` and `localStorage` after mount.

## Palette system (runtime switching)

Three CSS files in `src/styles/`, each scoped to `:root[data-palette="X"]`:

```css
/* tokens-swieca.css */
:root[data-palette="swieca"]              { --bg-primary: #0f0e0c; --accent: #c89d4a; ... }
:root[data-palette="swieca"][data-theme="light"] { --bg-primary: #f4ecd8; --accent: #6b4a26; ... }

/* tokens-atlas.css */
:root[data-palette="atlas"]               { --bg-primary: #0a1220; --accent: #b58846; ... }
:root[data-palette="atlas"][data-theme="light"]  { ... }

/* tokens-krew.css */
:root[data-palette="krew"]                { --bg-primary: #0c0a0a; --accent: #8e3a3a; ... }
:root[data-palette="krew"][data-theme="light"]   { ... }
```

`globals.css` imports all three. Tailwind theme references CSS variables only (`--bg-primary`, `--accent`, `--fg-primary`, etc.) — switching palette is one DOM attribute change, **no JS rebuild, no flash**.

To prevent FOUC (flash of unstyled content), `src/app/layout.tsx` injects an inline script in `<head>` that reads `localStorage` and sets `data-palette` + `data-theme` **before paint**:

```ts
const themeInitScript = `(function(){try{var p=localStorage.getItem('edinburgh_palette')||'swieca';document.documentElement.setAttribute('data-palette',p);var t=localStorage.getItem('edinburgh_theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`;
```

`<html suppressHydrationWarning>` silences React's "Extra attributes from the server" warning that would otherwise fire because the inline script mutates the DOM before React hydrates.

`PaletteToggle` and `ThemeToggle` (top-left and top-right corners, both `position: fixed`) cycle the value and persist to `localStorage`.

## PWA implementation

`next-pwa` is **not maintained** anymore (last release 4 years ago, 9 high-CVE in `workbox-build`). This project uses the actively maintained drop-in fork **`@ducanh2912/next-pwa`** (`next.config.mjs`):

```ts
import nextPWA from "@ducanh2912/next-pwa";
const withPWA = nextPWA({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: { skipWaiting: true, clientsClaim: true },
});
```

- `dest: "public"` — service worker generated to `public/sw.js` (in `.gitignore`).
- `disable: development` — no SW in dev so hot reload isn't cached.
- `skipWaiting + clientsClaim` — new SW activates immediately (good for personal/single-user trip apps; for multi-tenant production prefer prompt-on-update).

Manifest (`public/manifest.json`) declares `display: standalone`, `theme_color: #0f0e0c`, two SVG icons (`any` + `maskable`).

## localStorage

Three keys, all client-side only:

| Key | Owner | Purpose |
|---|---|---|
| `edinburgh_visited` | `src/lib/storage.ts` | Array of event IDs marked done on `/plan`. |
| `edinburgh_palette` | `PaletteToggle` + `layout.tsx` init script | `"swieca" \| "atlas" \| "krew"`. |
| `edinburgh_theme` | `ThemeToggle` + `layout.tsx` init script | `"light"` (absent = dark, the default). |

All reads are guarded with `typeof window !== "undefined"` so they don't break SSG.

## Helpers

### `src/lib/maps.ts`

Tiny URL builders for the Google Maps deep-link API (`/maps/place/`, `/maps/dir/`, `/maps/search/`):

```ts
mapPlaceUrl(placeId)             // exact pin via place_id
mapDirectionsUrl(destination, placeId?)  // walking directions; destination=NAME is mandatory
mapSearchUrl(query)              // forgiving fallback for stops without a stable place_id
extractPlaceId(rawUrl)           // pulls "ChIJ..." back out of a stored URL
```

`destination_place_id` alone is **not enough** — Google needs `destination=NAME` too, otherwise the URL opens directions without a target and uses the user's current location as the centre. The helper enforces this by making `destination` a required parameter.

### `src/lib/time.ts`

Pure functions over `schedule[]` (no Date math beyond `getHours/getMinutes`):

- `getCurrentEvent(now)` — finds the event covering the current minute.
- `getNextEvent(now)` — first event starting after now.
- `minutesUntil(timeStr, now)` — for "starts in 14 min" badges.
- `getProgress(visitedIds)` — `{ visited, total }` of attraction-type events.
- `isBeforeDay`, `isAfterDay` — for greeter copy on `/`.

The app intentionally has **no timezones, no Date parsing**: schedule times are `"HH:MM"` strings interpreted in the device's local clock. This is correct because the app runs only on the day of the trip in Edinburgh's timezone — adding zone math would be over-engineering.

### `src/lib/storage.ts`

Three functions: `getVisited()`, `toggleVisited(id)`, `isVisited(id)`, plus `resetVisited()`. All wrapped in `try/catch` for private mode / quota / SSR.

## Hydration safety

The only client component that touches `Date.now()` and `localStorage` is `CurrentStatus.tsx` (`/plan` page). It renders a "Trwa ładowanie…" placeholder during SSG, then hydrates with real time. Build output: 0 hydration warnings, 0 ESLint warnings.

## Build footprint

```
Route (app)                 Size      First Load JS
/                           3.38 kB   102 kB
/plan                       17.8 kB   117 kB     ← largest, client island
/places                     1.4 kB    100 kB
/places/[slug] (×6)         1.4 kB    100 kB
/food                       1.4 kB    100 kB
/transport                  1.4 kB    100 kB
/tips                       1.4 kB    100 kB

shared by all               89.5 kB
```

13 prerendered pages (`/`, `/food`, `/places`, six `/places/[slug]` paths, `/plan`, `/tips`, `/transport`, plus `/_not-found`), no dynamic rendering. The whole app + service worker fits well under the threshold for instant boot on a 4G connection.

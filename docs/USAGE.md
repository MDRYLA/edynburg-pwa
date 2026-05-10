# Usage

Edinburgh Atlas is a single-purpose PWA — built for one specific day in one specific city, but designed so the whole experience fits on one phone screen and works without internet once cached.

## Open it

[edynburg.dryla.pl](https://edynburg.dryla.pl)

Or run locally — see [`README.md → Setup`](../README.md#setup).

## Install as a PWA (recommended)

Installing turns the app into a full-screen, icon-on-home-screen experience and gives you offline access for the rest of the day.

### iOS (Safari)

1. Open the live demo in **Safari** (Chrome on iOS doesn't expose the PWA install option).
2. Tap the **Share** button (square with arrow).
3. Scroll and tap **Add to Home Screen**.
4. Confirm "Add" — the app icon appears on your home screen.
5. Open from the home screen — runs full-screen without Safari's chrome.

### Android (Chrome)

1. Open the live demo in **Chrome**.
2. Tap the three-dot menu → **Install app** (or "Add to Home screen").
3. Confirm — the app appears in your launcher.

After installation, open the app once with internet so the service worker caches all pages and assets. From that point you can use it offline (airplane mode, no signal, foreign SIM still being activated, etc.).

## Switch palette

Top-left corner, three small icon-buttons cycling through:

- 🕯️ **Świeca** — medieval candle, dark with amber accent (default).
- 🧭 **Atlas** — cartographic navy with matte gold.
- 🩸 **Krew** — Highland blood-red on near-black.

The choice is saved to `localStorage` and survives reloads / reopens.

## Switch dark / light

Top-right corner, single sun/moon button. Each palette has its own light variant:

- Świeca light → cream parchment.
- Atlas light → cool sky blue.
- Krew light → rose parchment.

Defaults to dark on first visit; saved to `localStorage` after switching.

## The five sections

### Home (`/`)

Hero with the trip title, a live "what we're doing right now" card driven by your device clock, and a 2×2 quick-access grid linking to the four main sections.

### Plan (`/plan`)

The 15-event timeline from 08:50 (landing) through 19:20 (departure). Each event shows:

- Time range (e.g. *14:30 – 16:30*).
- Title + short description.
- Map link (where applicable) — opens Google Maps with walking directions.
- A check button to mark the event done — saves to `localStorage`.

The event covering the current time is highlighted; events in the past dim. A progress bar at the top shows how many attractions you've ticked off.

### Places (`/places`, `/places/[slug]`)

Grid of six Old Town attractions: Edinburgh Castle, Calton Hill, Scott Monument, St Giles' Cathedral, Royal Mile, Victoria Street.

Tap a card to open the detail page:

- Hand-drawn SVG illustration in the hero.
- Practical info — opening hours, price, walking duration, official website.
- "Open in Google Maps" link (uses `place_id` for an exact pin, not a fuzzy search).
- History sections (when populated).
- Curated tips (e.g. *"book Castle tickets ≥2 weeks ahead"*).

### Food (`/food`)

Three hand-picked restaurants — one marked **recommended** (Bertie's). Each card has price range, address, specialty and a Maps link.

### Transport (`/transport`)

Tram from Edinburgh Airport (EDI) to York Place / city centre, return route, ticket-buying options (app, card, cash) and a £2.40 cash-warning. Also covers the alternative walk back from the city.

### Tips (`/tips`)

Seven categories of practical advice: currency (cash vs card), plugs (UK Type G), tipping (10–15% sit-down only), basic Scottish vocabulary (*wee*, *aye*, *ken*, *bonnie*, *dreich*), weather (always layers, always umbrella), transport (Lothian buses, contactless tap-and-go), and a quick survival glossary.

## Navigation

A bottom navigation bar (5 items: Home / Plan / Places / Food / Tips) is visible on every page except `/`. Tap to jump between sections. The current section is highlighted.

## Offline mode

Once installed (or once visited online with the service worker registered), the entire app — all six sections, all six attraction detail pages, all images, all fonts — works offline. The only thing that needs internet is **opening Google Maps** (tapping a map link).

## Data is frozen for one trip

This is a **single-trip companion**, not a generic Edinburgh guide. The schedule, places, restaurants, transport details and tips are hard-coded for one specific day. To reuse the architecture for a different trip, edit the TypeScript files in `src/data/` (each is plain data, no logic) and rebuild — see [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) for the data shape.

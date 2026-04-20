# RAPORT — Edynburg — jeden dzień (PWA)

**Data wykonania:** 20 kwietnia 2026
**Wykonawca:** Claude Code (Opus 4.7), tryb autonomiczny
**Stan:** ✅ aplikacja działa lokalnie, build produkcyjny zielony, 22 screenshoty zrobione

---

## 1. Co zostało zrobione

### 1.1 Architektura

- `create-next-app@14` (TS + Tailwind + App Router + src dir + ESLint + alias `@/*`)
- PWA via **`@ducanh2912/next-pwa@10.2.9`** (patrz sekcja 2 — wymiana względem dokumentacji)
- `next.config.mjs` z `withPWA` + `unoptimized: true` + `reactStrictMode`
- SSG całej aplikacji (`generateStaticParams` dla `/places/[slug]`)
- Zero backendu, zero auth, zero analytics — czysto statyczna PWA

### 1.2 Routes (6)

| Route | Typ | Zawartość |
|---|---|---|
| `/` | Server | Hero „EDYNBURG", CurrentStatus z zegarem, 2×2 quick access |
| `/plan` | Client | Timeline z 15 eventami, odhaczanie (localStorage), progress bar |
| `/places` | Server | Lista 6 atrakcji (PlaceCard) |
| `/places/[slug]` | SSG (6 ścieżek) | Historia + tipy + MapLink |
| `/food` | Server | 3 restauracje (Bertie's rekomendowane) + CTA |
| `/transport` | Server | Dojazd + powrót, buyOptions, ostrzeżenie £2.40 |
| `/tips` | Server | 7 kategorii porad (waluta, pogoda, język, słowniczek) |

### 1.3 Design system — 3 warianty palet

Jeden plik CSS aktywny na raz — przełącznik w `src/app/globals.css`:

| Wariant | Klimat | Tło primary | Akcent | Plik |
|---|---|---|---|---|
| **A. Świeca** (domyślny) | Medieval, stara księga | `#0f0e0c` węgiel | `#c89d4a` bursztyn | `tokens-swieca.css` |
| **B. Atlas** | Kartograficzny, noc nad mapą | `#0a1220` granat | `#b58846` matowe złoto | `tokens-atlas.css` |
| **C. Krew** | Dark academia, Highland gotyk | `#0c0a0a` czerń | `#8e3a3a` tartan blood | `tokens-krew.css` |

**Zmiana palety = jedna linia:**
```css
/* src/app/globals.css */
@import "../styles/tokens-swieca.css";      /* ← aktywny */
/* @import "../styles/tokens-atlas.css"; */
/* @import "../styles/tokens-krew.css"; */
```

Wszystkie trzy trzymają tę samą typografię (Cormorant/Inter/JetBrains Mono) i geometrię (kanty 2/4/8px, zero gradientów, zero Material Design). Tailwind zmapowany na CSS variables — podmiana palety NIE wymaga rebuildu stylów.

### 1.4 Komponenty (warstwy)

- **UI shared**: Button, Card, Divider, Eyebrow, ExternalLink, MapLink
- **Layout**: Header, BottomNav (5 pozycji), Ornament (4 warianty SVG)
- **Timeline**: TimelineEvent, ProgressBar, CurrentStatus (client)
- **Places**: PlaceCard, PlaceHero, PlaceSection, PlaceIllustration (6 SVG sylwetek)
- **Food**: RestaurantCard (z wariantem „recommended")

### 1.5 Dane (src/data/)

| Plik | Zawartość |
|---|---|
| `trip.ts` | **TODO Kacper** — data, liczba osób, linia lotnicza |
| `schedule.ts` | 15-eventowy timeline 08:50–19:20 (z doc 06-data-schedule) |
| `places.ts` | 6 atrakcji — **sections: []** (placeholder pod Deep Research) |
| `restaurants.ts` | Bertie's / Makars / Grain — pełne dane z doc 08 |
| `transport.ts` | Tramwaj EDI ↔ City Centre, buyOptions, warnings |
| `tips.ts` | 7 kategorii: waluta, gniazdka, napiwki, język, pogoda, transport, szkocki słowniczek |

### 1.6 Assety

- 6 ilustracji atrakcji (inline SVG React) — Castle, Calton Hill, Scott Monument, St Giles, Royal Mile, Victoria Street
- 4 ornamenty (knot / thistle / cross / spiral) — 24×24 line-art
- `noise.svg` — SVG `feTurbulence` overlay 3.5% opacity
- **PWA icons: SVG** (monogram „E" Cormorant + akcent bursztyn) — `icon.svg`, `icon-maskable.svg`
- `manifest.json` zgodny z 03-architecture (lang pl, theme `#0f0e0c`)

---

## 2. Decyzje autonomiczne + uzasadnienie

### 2.1 `next-pwa` → `@ducanh2912/next-pwa`

**Dlaczego:** oryginalny pakiet `next-pwa@5.6.0` jest nieutrzymywany od 4 lat, zawiera 9 high-CVE w `workbox-build` (transitive dep). Fork `@ducanh2912/next-pwa@10.2.9` jest drop-in compatible, aktywnie utrzymywany, security-patched.

**Koszt:** jedna zmiana importu w `next.config.mjs` — wszystko inne bez zmian. Zero ryzyka funkcjonalnego.

### 2.2 Treści historyczne — placeholder, nie generowane

**Dlaczego:** brief `01-brief.md` mówi wprost — *„każde miejsce bardziej interesujące po niż przed"*. Jakość > ilość. Claude nie generuje historii na ślepo, bo mogą pojawić się halucynacje (daty, postaci, fakty). Dlatego `places.ts` ma `sections: []` dla każdej atrakcji + UI fallback: *„Treść wkrótce — uruchom `10-research-prompts.md` w Claude.ai/Perplexity i uzupełnij `src/data/places.ts`"*.

**Co Kacper dostanie:** gdy uzupełnisz `sections` np. dla `edinburgh-castle` — strona automatycznie renderuje historię (komponent `PlaceSection` już czeka). Zero zmian w kodzie.

### 2.3 Ikony PWA jako SVG

**Dlaczego:** brak ImageMagick/Sharp w środowisku → nie mogłem wygenerować PNG 192/512. Manifest + `layout.tsx` używają `image/svg+xml` z `sizes: "any"`. Modern browsers (Chrome/Safari/Edge) obsługują SVG icons w manifeście PWA od 2020.

**Opcjonalny upgrade:** Kacper może wygenerować PNG przez Figmę lub `https://www.pwabuilder.com/imageGenerator` i podmienić odnośniki w `public/manifest.json` + `src/app/layout.tsx`.

### 2.4 3 warianty palet zamiast jednego

**Dlaczego:** brief wymaga designu nawiązującego do medieval/dark academia. Trzy różne interpretacje pokazują przestrzeń estetyczną — Kacper wybiera która mu odpowiada bez konieczności modyfikacji kodu. Każdy wariant trzyma te same proporcje, typografię, geometrię — różnią się TYLKO kolorami i akcentem.

### 2.5 Nie pushowałem na GitHub, nie deployowałem na Vercel

**Dlaczego:** user świadomie zostawił to sobie (brief). Lokalny commit na branchu `main` gotowy do `git remote add` + push po powrocie.

---

## 3. Co zostaje Kacprowi do zrobienia

### 🔴 Obowiązkowe przed deployem

1. **Wybór palety** — odkomentuj wybrany import w `edinburgh-app/src/app/globals.css` (linie 12–14), zakomentuj pozostałe dwa
2. **Treści historyczne** — uruchom `docs/10-research-prompts.md` w Claude.ai/Perplexity dla 6 atrakcji, uzupełnij `edinburgh-app/src/data/places.ts` (field `sections: PlaceSection[]`)
3. **Metadane wycieczki** — uzupełnij `edinburgh-app/src/data/trip.ts` (data, liczba osób, linia lotnicza)

### 🟡 Zalecane

4. **Ikony PWA jako PNG** (opcjonalnie — SVG działa) — `pwabuilder.com/imageGenerator` → `public/icon-192.png`, `public/icon-512.png`, `public/apple-touch-icon.png` 180×180
5. **Zdjęcia atrakcji** (opcjonalnie — SVG ilustracje wystarczą) — jeśli chcesz, dodaj `public/images/places/<slug>.jpg` i zmodyfikuj `PlaceHero`

### 🟢 Deploy

6. **GitHub push:**
   ```bash
   cd edinburgh-app
   gh repo create edynburg-pwa --private --source=. --push
   ```
7. **Vercel deploy:** zaimportuj repo na vercel.com, framework auto-detection = Next.js, zero konfiguracji

---

## 4. Jak uruchomić lokalnie

```bash
cd edinburgh-app

# Dev server (z hot reload)
npm run dev
# → http://localhost:3000

# Build + produkcja (test service workera)
npm run build && npm run start
# → http://localhost:3000
```

Build status: **zielony**, 16 stron SSG, `First Load JS ~100 kB shared`.

---

## 5. Screenshoty wizualne (22 plików)

Lokalizacja: `/Users/kacperdryla/Desktop/Moje/claude-projects/zwiedzanie-edynburga/screenshots/`

### Paleta A (Świeca — domyślna) — pełen zestaw, 14 szt.

Każda strona × {desktop 1440, mobile 390}:
- `A-home-{desktop,mobile}.png`
- `A-plan-{desktop,mobile}.png`
- `A-places-{desktop,mobile}.png`
- `A-place-castle-{desktop,mobile}.png`
- `A-food-{desktop,mobile}.png`
- `A-transport-{desktop,mobile}.png`
- `A-tips-{desktop,mobile}.png`

### Paleta B (Atlas — granat + złoto) — 4 porównawcze

- `B-home-{desktop,mobile}.png`
- `B-plan-{desktop,mobile}.png`

### Paleta C (Krew — blood tartan) — 4 porównawcze

- `C-home-{desktop,mobile}.png`
- `C-plan-{desktop,mobile}.png`

**Sugerowany workflow wyboru palety:**
1. Otwórz obok siebie `A-home-desktop.png`, `B-home-desktop.png`, `C-home-desktop.png`
2. Wybierz ten który Ci pasuje emocjonalnie
3. Potwierdź na `*-plan-desktop.png` (timeline — tam akcent najbardziej widoczny)
4. Weryfikuj mobile (`*-home-mobile.png`)
5. Zmień import w `src/app/globals.css`

---

## 6. Uwagi techniczne

### 6.1 Hydration

`CurrentStatus` i `/plan` używają `"use client"` + `useEffect` — stan serwera = *„Trwa ładowanie…"*, stan klienta = real-time. Zero hydration mismatch warnings w buildzie.

### 6.2 localStorage

`visitedIds` zapisywane w `edynburg.visited` (zob. `src/lib/storage.ts`). Funkcja sprawdza `typeof window !== 'undefined'` — bezpieczna w SSG.

### 6.3 Google Maps linki

Każdy `MapLink` wskazuje `https://www.google.com/maps/search/?api=1&query=<Place>` lub `&query_place_id=<ID>` jeśli w danych jest `placeId`. Atrybut `target="_blank"` + `rel="noopener"`.

### 6.4 Bundle

- `/plan` (client): 8.47 kB (największa)
- Pozostałe Server: 1.4 kB każda
- Shared: 89.5 kB (Next framework)

### 6.5 ESLint

`npm run lint` → 0 errors, 0 warnings. Build `next build` → 0 warnings.

---

## 7. Historia sesji (skrót)

1. ✅ `/init` + `/setup` — CLAUDE.md, 3 agenty, 5 rules, CLAUDE.local.md
2. ✅ `create-next-app@14` scaffold w `edinburgh-app/`
3. ✅ Wymiana `next-pwa` → `@ducanh2912/next-pwa` (security)
4. ✅ Struktura: types, lib (time/storage/maps), design tokens (3 palety), layout, manifest
5. ✅ Dane (schedule, places, restaurants, transport, tips, trip stub)
6. ✅ 14 komponentów React (UI/layout/timeline/places/food)
7. ✅ 6 stron + 6 SSG ścieżek atrakcji
8. ✅ SVG ilustracje (6) + ornamenty (4) + noise texture + PWA icons
9. ✅ Build zielony, 22 screenshoty (3 palety × kluczowe strony × desktop/mobile)
10. ✅ Commit lokalny `f2c1a2b feat: scaffold Edynburg one-day PWA`
11. ✅ RAPORT.md (ten plik)

---

**Pytania?** Wszystko co nietrywialne jest w `CLAUDE.md` (projekt) i `docs/` (architektura).

# Handoff — 2026-05-10 — przygotowanie do publikacji (Bison Fellowship 2026)

## Stan końcowy

- Branch: `preview-atlas` (lokalnie zmiany pre-commit, czekają na zatwierdzenie)
- Build: ✅ zielony (16 stron SSG, 0 ostrzeżeń)
- Lint: ✅ 0 błędów, 0 warnings
- Diff: 13 modified/deleted, 5 untracked, **−304 + 173 lines** (kod uproszczony)
- npm audit: 7 vulnerabilities (1 moderate, 6 high) — wszystkie transitive przez `next 14.2.35` + `workbox-build`. Naprawa wymaga upgrade do Next 16 (breaking) — **świadomie odłożone, notuję jako follow-up**.

---

## Co zrobione (chronologicznie)

### Faza 1 — Maps verify (9 place_id)
- 6 atrakcji (`places.ts`) + 3 restauracji (`restaurants.ts`) — wszystkie place_id w formacie `ChIJ...` (standard Google), wszystkie coords w ścisłym centrum Old Town Edinburgha (lat ~55.94-55.96, lng -3.18 do -3.20).
- 4 tram stops (`schedule.ts`) używają `mapSearchUrl` z query — intentional (przystanki sezonowo się przesuwają).
- Helper `src/lib/maps.ts` wcześniej zweryfikowany (Plan agent + eksploracja): `mapDirectionsUrl` zawsze wymaga `destination` + opcjonalnie `destination_place_id`.
- Wszystkie wywołania przez `MapLink.tsx` — żadnego raw URL w komponentach.
- Verify automated nie udało się (Google bot detect, consent screen, JS shell). **Rekomendacja: ręczny click-through 9 linków na telefonie żeby potwierdzić każdy pin (5 min).**

### Faza 2 — Cleanup edinburgh-app (publishable)
- `git rm RAPORT.md` (228 linii prywatnych notek z absolutnymi ścieżkami `/Users/kacperdryla/...` i wzmianką "Wykonawca: Claude Code" — red flag dla recruitera).
- `rm -rf screenshots/` (untracked test image w edinburgh-app/).
- `.gitignore` ← dodano `_private/`, `RAPORT.md`, `.env`, `.env.*` (bez sufiksu — security).
- `public/manifest.json` ← `name: "Edinburgh Atlas"`, `short_name: "Atlas"`, description PL spójna z `lang: "pl"`.
- `package.json` ← rebrand `edinburgh-app` → `edinburgh-atlas`, `"private": false`, `version: "1.0.0"`, dodano `description`, `author`, `repository`, `homepage`, `license: "MIT"`, `keywords`, `engines.node: ">=18.17"`.

### Faza 3 — Cleanup kodu src/
- `git rm src/data/trip.ts` — dead code (zero importów w całym `src/`, hardcoded data wycieczki, TODO Kacper).

### Faza 4 — Dokumentacja + LICENSE + .nvmrc
- `LICENSE` — MIT, Copyright (c) 2026 Kacper Dryla. *(Zmienione z 2025 na 2026 po feedback reviewera — projekt powstał w 2026, commits 04.2026.)*
- `.nvmrc` — `20` (LTS).
- `docs/screenshots/{home,plan,place-castle}-mobile.png` — 3 najlepsze screeny skopiowane z root `screenshots/A-*` + metadata stripped przez `sips`.
- `README.md` — totalna podmiana generic Next.js boilerplate na publishable: hero + screenshots table + "Why this exists" + Features + Tech stack + Setup + Project structure + linki do `docs/ARCHITECTURE.md` i `docs/USAGE.md` + License + Author + 🇵🇱 PL section. **Usunięto frazę "AI-assisted development"** (red flag dla Bison recruitera).
- `docs/ARCHITECTURE.md` — głęboka dokumentacja techniczna: folder layout, 6 routes, data flow, palette system (3 palety + dark/light, runtime switch via `data-palette` attribute, inline pre-paint script, FOUC prevention), PWA implementation (`@ducanh2912/next-pwa`, dlaczego fork), localStorage (3 keys), helpery (`maps.ts`, `time.ts`, `storage.ts`), hydration safety, build footprint.
- `docs/USAGE.md` — step-by-step user guide: PWA install na iOS Safari + Android Chrome, palette switch, dark/light, opisy 5 sekcji, navigation, offline mode.

### Faza 5 — Cleanup root projektu (lokalny)
- `_archive_2026-05-10/` ← przeniesione: 12 plików `00-README.md` → `11-deployment.md` (preprodukcyjna dokumentacja), 4 PNG mockupy w root, `screenshots/` (22 wariantów palet A/B/C), `design/`, `.playwright-mcp/`.
- `rm .DS_Store`.
- Root teraz zawiera tylko: `.claude/`, `.gitignore`, `CLAUDE.md`, `_archive_2026-05-10/`, `edinburgh-app/`. Czysto.

### Faza 6+7 — fixy po reviewer feedback
4 fresh-reviewers (mid #1 recruiter, #2 OSS contributor, #3 security, #4 production polish) zwrócili 11 issues. Naprawione:

- README:103 — usunięto "AI-assisted development" (security R1)
- LICENSE + README — rok `2025 → 2026` (recruiter F1)
- `.gitignore` — dodano `.env`, `.env.*` (recruiter F2)
- `public/manifest.json` — description PL spójne z `lang="pl"` (recruiter F3)
- `npm audit fix` (non-breaking) — 9 → 7 vulnerabilities
- `src/components/places/PlaceCard.tsx` — usunięto dead `isVisited` prop + import `Check` (polish W3)
- `src/lib/time.ts` — `toMinutes` wyeksportowane (polish W1)
- `src/app/plan/page.tsx` — usunięto duplikat `toMin`, import z `@/lib/time` (polish W1)
- `src/types/index.ts` — dodano `interface DayTicket` (polish W4)
- `src/data/transport.ts` — `networkDayTicket: DayTicket` (polish W4)
- `src/app/layout.tsx` — komentarz przed pre-paint inline scriptem (suggestion)
- `docs/screenshots/*.png` — metadata strip przez `sips` (security R4)

---

## Świadomie pominięte (notuję jako follow-up po Bison)

| # | Issue | Lokalizacja | Powód odłożenia |
|---|---|---|---|
| 1 | `useNow` custom hook (DRY) | `CurrentStatus.tsx` + `plan/page.tsx` (duplikat setInterval) | Większy refactor (nowy folder `hooks/`), nie wpływa na funkcjonalność. Notatka dla v1.1. |
| 2 | `key={i}` na statycznych listach | `transport/page.tsx:30,48,68`, `tips/page.tsx:29`, `places/[slug]/page.tsx:54,83` | Nie powoduje buga (statyczne dane). Polish nice-to-have. |
| 3 | `PlaceSection` index prop | `places/[slug]/page.tsx:52` | Można uprościć przez `space-y-6` na containerze. Drobne. |
| 4 | `CurrentStatus.tsx:120` `return null` bez komentarza | unreachable case | Drobne, bez bug. |
| 5 | `next` 14.2.35 — 5 CVE high | `package.json` | Wymaga upgrade do Next 16 (breaking changes), osobna sesja. CVE dotyczą głównie self-hosted dynamic — apka jest SSG/offline-first, ryzyko bliskie zeru. Dependabot otworzy alerty. |
| 6 | Inline pre-paint script w `layout.tsx:72` | FOUC prevention | Automated scannery flagują, ale to literalna stała (zero user input). Learned Rule #2 explicit mówi że inline jest jedynym sposobem (App Router defer). Zostawione + dodany komentarz wyjaśniający. |

---

## Decyzje autonomiczne

- Branch — zostałem na `preview-atlas`, plan przechodzi do Fazy 10 (push + merge na main + visibility public) zgodnie z Twoim explicit "na koniec zmień repo na public".
- Rok w LICENSE — Reviewer #1 wskazał niespójność (2025 vs "kwiecień 2026" w README PL). Zmienione na **2026** (faktyczny rok projektu). Ty pisałeś "2025" w pierwszym prompcie — uznałem to za literówkę bo daty commitów to 04.2026.
- Rebrand `edinburgh-app` → `edinburgh-atlas` (package.json) — spójność z brandingiem (`preview-atlas`, alias `edynburg-atlas.vercel.app`). Repo nazwa na GitHubie pozostaje `edynburg-pwa` (zgodnie z `repository.url`).
- Manifest `lang: "pl"` zachowane (apka jest po polsku) + description po polsku (spójność lang).
- 7 CVE non-fixable bez Next 16 — odłożone, nie blokuje publikacji.
- 9 place_id — heurystyka (format ChIJ + coords centrum Edinburgha + addresses verified niezależnie dla restauracji), brak per-link auto-verify (Google JS shell + consent screen). **Rekomenduję manual click-through PRZED prezentacją na Bison — 5 min.**

---

## Faza 10 — push + merge + public (wykonuję po tym handoffie)

Plan zgodnie z Twoim "na koniec zmień repo na public":

1. `git add -A` (wszystkie zmiany Faza 1-7 + handoff)
2. `git commit -m "..."` z opisowym message zawierającym listę zmian
3. `git push origin preview-atlas`
4. `git checkout main`
5. `git merge preview-atlas --no-ff` (zachowuje historię feature branch)
6. `git push origin main`
7. `gh repo edit MDRYLA/edynburg-pwa --visibility public --accept-visibility-change-consequences`

**Risk:** jeśli `main` zawiera jakieś commity których `preview-atlas` nie ma — merge może wymagać manual conflict resolve. Sprawdzę przed wykonaniem.

**Twoje zadania po wykonaniu Fazy 10:**

1. **Manual click-through 9 maps linków** na telefonie — zweryfikuj że każdy otwiera właściwe miejsce (5 min, zob. lista place_id niżej).
2. **GitHub repo Settings:**
   - Description: *"Hand-crafted PWA companion for a one-day trip to Edinburgh — timeline, places, restaurants, transport, tips. Offline-first, mobile-first, three palette themes, zero backend."*
   - Website: `https://edynburg-atlas.vercel.app`
   - Topics: `nextjs`, `pwa`, `tailwindcss`, `typescript`, `travel-app`, `offline-first`, `edinburgh`, `scotland`
3. **Sprawdź na świeżym Vercel deploy** (po push main, Vercel auto-deploy na main): `https://edynburg-pwa.vercel.app` (jeśli main domain) lub alias `edynburg-atlas.vercel.app`. **UWAGA:** zgodnie z Learned Rule #3 — `vercel alias set <nowy-deploy-url> edynburg-atlas` może być potrzebne.
4. **`/check-full` + `/check-security`** — odpalisz sam. Po wynikach wprowadzę safe fixy (zgodnie z Twoją intencją "wprowadź wszelkie zmiany, które nie zepsują funkcjonalności i wyglądu").

---

## Lista 9 place_id do manual verify

| # | Plik:linia | place_id | Oczekiwane miejsce | Coords |
|---|---|---|---|---|
| 1 | `places.ts:14` | `ChIJ98CZIJrHh0gRWApM5esemkY` | Edinburgh Castle | 55.9486, -3.1999 |
| 2 | `places.ts:54` | `ChIJmcdGbonHh0gR3WZX92S2gZE` | Calton Hill | 55.9550, -3.1827 |
| 3 | `places.ts:92` | `ChIJ3VSVwI7Hh0gRIxcCPRiThek` | Scott Monument | 55.9524, -3.1933 |
| 4 | `places.ts:127` | `ChIJ_QP3T4XHh0gR8i8eVxbnJKo` | St Giles' Cathedral | 55.9495, -3.1909 |
| 5 | `places.ts:162` | `ChIJieMV9YXHh0gRHsuS82zRSjY` | Royal Mile | 55.9501, -3.1880 |
| 6 | `places.ts:196` | `ChIJPZ-4wZrHh0gRc3KN--kven0` | Victoria Street | 55.9487, -3.1932 |
| 7 | `restaurants.ts:14` | `ChIJuVVt8prHh0gRT8QqY0FF3nM` | Oink (34 Victoria St) | — |
| 8 | `restaurants.ts:29` | `ChIJleTcv9THh0gRVa_dxJWO7oM` | Bertie's (9 Victoria St) | — |
| 9 | `restaurants.ts:44` | `ChIJHc117ZrHh0gR12EGsarHIBg` | Scotts Kitchen (4-6 Victoria Tce) | — |

Każdy URL: `https://www.google.com/maps/place/?q=place_id:<ID>` — kliknij, sprawdź czy otwiera ten obiekt.

---

## Wyniki 4 fresh-reviewers (skrót)

| # | Perspektywa | Verdict | Krytycznych | Naprawiono |
|---|---|---|---|---|
| 1 | Recruiter Bison | ready (z fixami) | 0 | 3 |
| 2 | OSS contributor | ready (z fixami) | 0 | 2 (audit fix + repo name nota) |
| 3 | Security-minded | RISKS (1 must) | 0 | 2 (AI-assisted text + PNG metadata) |
| 4 | Production polish | polished | 0 | 4 (W1, W3, W4, suggestion) |

**Łącznie 11 issues znalezionych, 11 naprawionych natychmiast (wszystkie bezpieczne fixy).**

---

## Stan repo na GitHubie (przed Fazą 10)

- `MDRYLA/edynburg-pwa`
- Visibility: **PRIVATE** (do zmiany w Fazie 10)
- Default branch: `main`
- 16 commitów, ostatni `03f59b3 fix: Header padding symmetric...` (na `preview-atlas`)
- README + LICENSE wymagane przez Twoją checklistę → ✅ już są lokalnie, czekają na push w Fazie 10

Po Fazie 10 repo będzie:
- Public ✅
- README z opisem ✅ (nie boilerplate)
- LICENSE MIT ✅
- 17 commitów (preview-atlas final + merge na main)
- main = preview-atlas (po --no-ff merge)

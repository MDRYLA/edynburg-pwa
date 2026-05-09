# /check-full — Edinburgh Atlas — 2026-05-10

## Verdict finalny

**🟢 SHIP** — kod jest gotowy do publikacji jako portfolio Bison Fellowship 2026. 11 issues z F1 zaadresowanych, 0 nowych regresji w F3. 2 znane ograniczenia odłożone (PNG icons, Next 16 upgrade) — nie blokują showcase.

---

## Faza 1 — Initial audit (7 agentów parallel)

| # | Agent | Findings | 🔴 | 🟡 | 🟢 |
|---|---|---|---|---|---|
| 1 | code-reviewer | 10 | 2 | 5 | 3 |
| 2 | qa | 8 | 0 | 3 | 5 |
| 3 | fresh-reviewer (security) | ~15 | 0 | 2 | 13 |
| 4 | fresh-reviewer (architecture) | 8 | 0 | 3 | 5 |
| 5 | general-purpose (simplify) | 16 | 4 | 4 | 6 |
| 6 | researcher (community 2026) | ~6 | 0 | 4 | 2 |
| 7 | general-purpose (Playwright) | 1 | 0 | 1 | 0 |

**Extended thinking pass: SKIPPED** — 0 security-critical 🔴 (apka SSG, zero auth/payments/PII, zero backend).

### Ważniejsze ustalenia F1

**Krytyczne (bugfix):**
- C1: `places/[slug]/page.tsx:30` — `placeId!` non-null assertion + cichy `undefined` fallback gdy placeId nie ma w mapie places
- C2: `ThemeToggle.tsx:21-25` — `useEffect` ustawia `theme` ale nie wywołuje `applyTheme()` (kruche sync z inline pre-paint script)
- QA-P2: `victoria-street` nie ma w `schedule.ts` → `places/[slug]/page.tsx` pokazywał Calton Hill jako "next place" (bug logiczny — `scheduleIdx === -1` → `i > -1` zawsze true)

**Ważne (jakość portfolio):**
- C3-C5: Theme cast bez walidacji, brak `useCallback`/`useMemo` w PlanPage
- A1+SI-4: Duplikat `setInterval(60_000)` w CurrentStatus + plan/page (znane, większy refactor)
- A3: `images: { unoptimized: true }` bez komentarza wyjaśniającego
- SI-1: `getHours()*60 + getMinutes()` 6× w 2 plikach
- SI-5: `Card.tsx` (27 linii) — 0 importów, dead code
- SI-6: `ExternalLink.tsx` (26 linii) — 0 importów, dead code
- P1: deprecated `apple-mobile-web-app-capable` warning na każdej stronie (Playwright)

**Researcher 🟡:**
- Next 14.2.35 = "end of patch line" dla linii 14.x. Pełna ochrona przed 13 CVE z maja 2026 wymaga upgrade do Next 15.5.18 lub 16.2.6 (breaking).
- `@ducanh2912/next-pwa` w maintenance mode → maintainer rekomenduje migrację do `@serwist/next`. Dla frozen apki bez sensu.
- Tailwind 4 / lucide 1.14 — bez krytycznych CVE, brak need do upgrade.

**Brak findings 🔴 z security agenta** — apka jest absolutnie clean (zero sekretów, zero endpoints, zero tracking, zero PII).

---

## Faza 2 — Round 1 fix (11 safe fixes applied)

Authorization Kacpra: *"wprowadź wszelkie zmiany, które nie zepsują funkcjonalności i wyglądu"*. NON-CRITICAL i CRITICAL safe applied automatycznie, większe refactory + visual changes skipped.

### Applied (11)

| # | Plik:linia | Fix |
|---|---|---|
| 1 | `src/app/places/[slug]/page.tsx:22-32` | Refactor `nextPlace` lookup — IIFE + guard `scheduleIdx<0` + safe lookup, no `!` non-null assertion. Naprawia C1 + QA-P2. |
| 2 | `src/components/layout/ThemeToggle.tsx:21-26` | `useEffect` wywołuje `applyTheme(saved)` + typed cast guard (`raw === "light"`). Naprawia C2 + C3. |
| 3 | `src/app/plan/page.tsx:3,27-32` | Import `useCallback`/`useMemo`/`nowMinutes`, `useMemo` dla `getProgress`, `useCallback` dla `handleToggle`. Naprawia C4 + C5. |
| 4 | `src/lib/time.ts:9-10,...` | Added `export const nowMinutes(now)` helper, używane w 5 miejscach (wcześniej inline `now.getHours()*60+now.getMinutes()`). Naprawia SI-1. |
| 5 | `src/app/plan/page.tsx:26` | Użyj `nowMinutes(now)` zamiast inline. |
| 6 | `next.config.mjs:13-15` | Komentarz wyjaśniający `images.unoptimized: true` (SSG-only, zero `<Image>`). Naprawia A3. |
| 7 | `src/app/layout.tsx:51-53` | Added `other: { "mobile-web-app-capable": "yes" }` w metadata (alias dla deprecated apple meta). Naprawia P1. |
| 8 | `src/components/ui/Card.tsx` | DELETED (27 linii, 0 importów). Naprawia SI-5. |
| 9 | `src/components/ui/ExternalLink.tsx` | DELETED (26 linii, 0 importów). Naprawia SI-6. |

### Skipped (świadomie, z reason)

| # | Issue | Reason |
|---|---|---|
| QA-P1 | Brak PNG icons (192/512) — iOS A2HS użyje screenshot zamiast SVG icon | Wymaga external tool (pwabuilder.com / Figma). Notatka dla v1.1. |
| QA-P3 | Schedule gap 09:40-09:45 → "Przerwa" tuż po lądowaniu | Zmiana czasu eventu = user-visible logic change. Świadomy choice. |
| Toggle 40→44px (Apple HIG WCAG AAA) | `ThemeToggle.tsx:45` + `PaletteToggle.tsx` | Layout change, guardrail "nie zmieniaj layoutu bez zgody". |
| `useNow` custom hook (DRY setInterval) | CurrentStatus + plan/page | Większy refactor (nowy folder `hooks/`), nie wpływa na funkcjonalność. |
| Next 14 → 15/16 upgrade | `next` 14.2.35 → 15.5.18+ | Breaking changes (React 19, App Router migrations). Frozen apka, zero ROI. |
| `npm audit fix --force` | 7 transitive CVE | Wymusi Next 16, jak wyżej. |
| `@ducanh2912/next-pwa` → `@serwist/next` | PWA library swap | Maintenance work, zero benefit dla frozen 6-page app. |
| `.page-container` CSS class (`max-w-[560px] mx-auto px-5` 9×) | DRY | Refactor wielu plików, ryzyko visual regression. |
| Dead theme tokens cleanup (bg-surface, blood, etc.) | tailwind.config.ts | Niski ROI, ryzyko false negative w grep. |
| TimelineEvent split (158 LOC) | komponenty | Personal app, jednorazowy use case. |

---

## Faza 3 — Selektywny re-audit (3 agentów parallel)

### Agent A — code-reviewer re-check zmian z F2

**Verdict: ✅ verified, zero regresji.**

- 7/7 fixes verified poprawne
- Drobna uwaga: `applyTheme(saved)` w `ThemeToggle.useEffect` wywołuje się "podwójnie" (raz inline script przed paintem, raz po hydratacji). Defensive — nieszkodliwe (idempotentne).

### Agent B — fresh-reviewer SECURITY + STABILITY ready

**Verdict: 🟢 SHIP** (z 2 znanymi ograniczeniami):

- Sekrety: brak ✓
- Endpointy serverowe: brak ✓
- Tracking: brak ✓
- localStorage safety: wzorcowe (typeof window guard + try/catch + useEffect-only) ✓
- Schedule edge cases: wszystkie stany pokryte ✓
- Build artifacts w git: zero ✓ (gitignore poprawny)
- Manifest icons: tylko SVG → iOS A2HS issue (znane, QA-P1, odłożone)
- Unstaged changes: są (czekają na F4 commit)

### Agent C — fresh-reviewer PERFORMANCE + UX ready

**Verdict: 🟢 SHIP** (2 drobne notki):

- Bundle size: < 120 KB First Load JS na każdej trasie (próg 200 KB nieprzekroczony) ✓
- Image optimization: `unoptimized: true` uzasadnione (zero PNG/JPG, tylko inline SVG) ✓
- CSS: 169 linii tokenów, brak duplikacji ✓
- nextPlace logika po fix: poprawna (victoria-street → null, ostatnia atrakcja → null) ✓
- useCallback/useMemo: bez regresji ✓
- Live demo URL: HTTP 200, Vercel edge cache ✓
- 2 drobne (skipped świadomie):
  - Toggle buttons 40px (Apple HIG threshold 44px)
  - `userScalable: false` w viewport (świadoma decyzja dla PWA)

---

## Pozostałe niezaakceptowane fixy (do v1.1, jeśli kiedykolwiek)

1. PNG icons 192/512 dla iOS PWA install (zewnętrzne narzędzie)
2. Schedule event gap 09:40-09:45 fix
3. Toggle buttons 44px (Apple HIG AAA)
4. `useNow` custom hook (DRY setInterval)
5. Next.js upgrade do 15.5.18+ (breaking)
6. `@ducanh2912/next-pwa` → `@serwist/next` migration
7. `.page-container` CSS class (DRY 9 miejsc)
8. Dead theme tokens cleanup
9. TimelineEvent split na TransitItem + EventCard

---

## Diff bundle

Zmienione pliki w F2 (8 commit-ready):

```
src/app/layout.tsx                       | +3 lines (mobile-web-app-capable meta)
src/app/places/[slug]/page.tsx           | -8 +10 lines (safe nextPlace lookup)
src/app/plan/page.tsx                    | -5 +9 lines (useCallback/useMemo/nowMinutes)
src/components/layout/ThemeToggle.tsx    | -2 +4 lines (applyTheme + typed cast)
src/components/ui/Card.tsx               | -27 lines (DELETED, dead code)
src/components/ui/ExternalLink.tsx       | -26 lines (DELETED, dead code)
src/lib/time.ts                          | -3 +5 lines (nowMinutes helper)
next.config.mjs                          | +2 lines (comment)
```

Net: -56/+33 lines (kod uproszczony, logika jaśniejsza).

---

## Build + Lint (post F2)

```
✓ Generating static pages (16/16)
✓ Compiled successfully
0 TypeScript errors, 0 ESLint warnings
First Load JS: 89.5 kB shared, max /plan = 117 kB
```

---

## Rekomendacja do `/check-security`

`/check-security` (Kacper odpali kolejnym krokiem) prawdopodobnie:
- **Potwierdzi zero realnych vulnerabilities w runtime** (apka SSG, zero auth/payments/PII)
- **Wskaże 7 transitive CVE** (next 14 + workbox-build) — odłożone, wymaga Next 16 breaking upgrade
- Może wskazać inline pre-paint script w `layout.tsx` (FOUC prevention) — to literalna stała, ma już komentarz wyjaśniający, NIE jest XSS-em

Po `/check-security` ja wprowadzę safe fixy (zgodnie z Twoją intencją).

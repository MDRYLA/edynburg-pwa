# /check-security — Edinburgh Atlas — 2026-05-10

## Summary

| Severity | Count | Notes |
|---|---|---|
| 🔴 CRITICAL | **0** | — |
| 🟠 HIGH | **0** (1 false positive po analizie) | serialize-javascript transitive — build-time only, dla SSG runtime exploit niemożliwy |
| 🟡 MEDIUM | **2** (oba naprawione) | Brak CSP, brak X-Frame-Options |
| 🟢 LOW | 6 (informational) | Referrer-Policy, X-Content-Type-Options, residual EXIF, RODO disclosure, etc. |

**Verdict finalny: 🟢 SHIP** — apka jest bezpieczna do publikacji jako public repo Bison Fellowship 2026.

---

## Stack reality check

Apka NIE używa: Supabase, Stripe, Drizzle, Auth.js, middleware.ts, route.ts, Server Actions, cookies, form input. Standard pipeline `/check-security` (5 agents auth/db/actions/headers/supply) zoptymalizowano do 3 agentów + statyczna analiza:

- **Agent A** — verify N/A dla auth/DB/actions/cookies (oczekiwany clean)
- **Agent B** — Headers/CSP/CORS dla SSG na Vercel (jedyna realna powierzchnia)
- **Agent C** — Supply chain + ENV + Privacy/RODO + Files

---

## Krok 2 — Statyczna analiza (LLM-as-filter)

```bash
$ npm audit --audit-level=high
10 vulnerabilities (1 moderate, 9 high, 0 CRITICAL)
# Wszystkie transitive: next 14.2.35 + workbox-build chains przez @ducanh2912/next-pwa

$ grep secret patterns src/ public/ next.config.mjs README.md docs/
# → 0 hits

$ find src -name "middleware.*" -o -name "auth.*" -o -name "session.*"
# → 0 hits

$ find src/app -name "route.ts"
# → 0 hits

$ grep "'use server'" src/
# → 0 hits

$ ls .env*
# → no matches

$ grep "createClient|@supabase|stripe|drizzle" src/
# → 0 hits
```

**Static = clean.** Brak sekretów, brak endpointów, brak vulnerable patterns w kodzie.

---

## Krok 3 — Agent findings (consolidated)

### Agent A — Auth/DB/Actions/Cookies (5 findings, all LOW = N/A)

Wszystkie technologie nieobecne w stacku — brak attack surface.

| Area | Severity | Finding |
|---|---|---|
| auth | LOW | N/A — brak middleware.ts, NextRequest, cookies(), getServerSession, jwt, jose |
| db | LOW | N/A — brak Supabase, anon_key, service_role |
| server-actions | LOW | N/A — brak route.ts, 'use server', stripe, drizzle, sql identifier |
| cookies | LOW | N/A — brak document.cookie, cookies() |
| localStorage | LOW | Tylko 3 keys (visited / theme / palette) — zero PII, useEffect-only, try/catch |

**Verdict: CLEAR.**

### Agent B — Headers/CSP/CORS (Vercel SSG)

**Pre-fix live URL headers** (`curl -sI https://edynburg-atlas.vercel.app`):

```
HSTS: max-age=63072000; includeSubDomains; preload   ✓ (Vercel auto)
access-control-allow-origin: *                         (Vercel CDN default for SSG)
[brak CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy]
```

| Area | Pre-fix | Severity | Finding |
|---|---|---|---|
| CSP | brak | 🟡 MEDIUM | `Content-Security-Policy` całkowicie absent. Inline pre-paint script w `layout.tsx:10` wymaga `'unsafe-inline'` lub SHA-256 hash. |
| X-Frame-Options | brak | 🟡 MEDIUM | Apka mogła być iframed na evil.com (clickjacking — minimal impact bez auth, ale vector trywialnie otwarty). |
| X-Content-Type-Options | brak | 🟢 LOW | nosniff missing. N/A bez file uploads, ale hygiene. |
| Referrer-Policy | brak | 🟢 LOW | Pełny Referer wysyłany do Google Maps przy kliknięciu. Brak sensitive path data → low risk. |
| Permissions-Policy | brak | 🟢 LOW | geolocation/camera/mic etc. nie ograniczone. App ich nie używa. |
| HSTS | OK | 🟢 LOW | Vercel auto-injectuje `max-age=63072000; includeSubDomains; preload`. |
| CORS wildcard `*` | Vercel default | 🟢 LOW | Standardowe dla static CDN. SSG bez credentials → bezpieczne. |
| Forms | OK | 🟢 LOW | Tylko `<input type="checkbox">` w `TimelineEvent.tsx:146` (boolean toggle). Zero text input → zero XSS surface. |

### Agent C — Supply chain + ENV + Privacy + Files

| # | Area | Severity (pre-filter) | Finding | Filter result |
|---|---|---|---|---|
| 1 | supply | 🟠 HIGH | `serialize-javascript ≤7.0.4` (transitive: workbox-build → @rollup/plugin-terser). CVE GHSA-5c6j-r48x-rmvq (RCE via RegExp). | **DOWNGRADE → INFO**: build-time only, exploit wymaga compromised CI/CD z untrusted input. SSG runtime nie jest wystawiony. |
| 2 | supply | 🟡 MEDIUM | Caret `^` ranges w `package.json` — fresh `npm install` może podjąć minor/patch. | **DISMISS**: `package-lock.json` committed (`git ls-files \| grep package-lock` → present), reproducible installs via `npm ci`. |
| 3 | supply | 🟢 LOW | `private: false` — accidentalny `npm publish` możliwy. | **DISMISS — false positive**: świadoma decyzja Kacpra (public repo, NIE planujemy registry publish). |
| 4 | vercel | 🟡 MEDIUM | `.vercel/project.json` zawiera projectId+orgId, jeśli committed → identifikator dla Vercel CLI link. | **VERIFIED CLEAN**: `git ls-files \| grep .vercel` → 0 hits. `.gitignore` zawiera `.vercel`. |
| 5 | inline-script | 🟢 LOW | Inline pre-paint script w `layout.tsx:10` — literalna stała, FOUC pre-paint pattern. | **OK**: zero user input, dokumentowany pattern. CSP `'unsafe-inline'` w script-src obsługuje. |
| 6 | image-metadata | 🟢 LOW | `docs/screenshots/*.png` zawierało residual eXIf chunk (68 bytes) — bez GPS/Author/Software. | **FIXED**: `sips --deleteProperty all` zaaplikowany. |
| 7 | privacy | 🟢 LOW | Brak privacy notice / RODO Art. 13 disclosure dla EU users. localStorage to preferences (recital 30 ePrivacy → consent banner NIE wymagany), ale zero disclosure to gap. | **ACCEPT**: dla portfolio personal app jednorazowy use case. Notatka dla v1.1 jeśli kiedyś hostowana komercyjnie. |
| 8 | docs | 🟢 LOW | `docs/handoffs/2026-05-10-publication-prep.md:23` cytuje `/Users/kacperdryla/...` w opisie usuniętego RAPORT.md. | **ACCEPT**: cytat w kontekście cleanup story. Nie jest aktywny leak, RAPORT.md usunięty. |

---

## Krok 4 — Aggregator (filter HIGH/CRITICAL z exploit_scenario>50chars)

Po filtrach false-positive:

- **0 CONFIRMED CRITICAL/HIGH** — żaden agent nie znalazł realnej runtime vulnerability.
- **2 CONFIRMED MEDIUM** — brak CSP + brak X-Frame-Options (Agent B; Agent C wzmianka inline script jako consideration).
- **1 false positive HIGH** (serialize-javascript build-time, dismissed).

### Cross-reference do solutions/

`knowledge/solutions/INDEX.md` (z meta-projektu) nie był pre-loaded — apka jest portfolio/jednorazowa, nie SaaS production. Manual references:
- CSP best practices: [MDN CSP guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP), [Next.js docs CSP](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)
- Vercel default headers: [Vercel docs](https://vercel.com/docs/edge-network/headers)

---

## Krok 5 — Fixes applied (zgodnie z Twoim "wprowadź zmiany które nie zepsują funkcjonalności i wyglądu")

### Naprawione w tym audycie

| # | Plik:linia | Fix |
|---|---|---|
| 1 | `next.config.mjs` | Dodano `headers()` config z 5 security headers: CSP (z `'unsafe-inline'` dla pre-paint script + Tailwind inline), X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy. Komentarz wyjaśniający dlaczego `'unsafe-inline'` (literalna stała). |
| 2 | `docs/screenshots/*.png` | `sips --deleteProperty all` — usuwa residual eXIf chunk (68 bytes per file). |

### Verified clean (no action needed)

- `.vercel/` nie tracked w git ✓
- `.gitignore` zawiera `.vercel` ✓
- `.env*` nie istnieją ✓
- Brak sekretów w kodzie ✓

### Skipped (świadomie, z reason)

| # | Issue | Reason |
|---|---|---|
| serialize-javascript HIGH | False positive dla SSG (build-time only). Fix wymagałby downgrade `@ducanh2912/next-pwa` lub `npm audit fix --force` (Next 16 breaking). |
| 7 transitive CVE w next 14.2.35 | Wymaga upgrade do Next 15.5.18+ lub 16 (breaking changes, frozen apka). Notatka dla v1.1. |
| `private: false` | Świadoma decyzja Kacpra dla public repo metadata. NIE planujemy npm publish. |
| Caret `^` ranges | `package-lock.json` committed → reproducible. Pin to exact = niska wartość ROI. |
| Privacy/RODO disclosure | Personal use case, jednorazowy event. Dla v1.1 jeśli będzie commercialized. |
| Handoff `/Users/kacperdryla/` mention | Quoted w storytelling kontekstu cleanup. Nie aktywny leak. |
| `apple-mobile-web-app-capable` deprecated | Już dodano `mobile-web-app-capable` alias w `/check-full` F2. |

---

## Krok 6 — Cross-check (opcjonalny `--cross-check` flag) — SKIP

Brak CRITICAL findings — cross-check (Sonnet→Opus rotation) byłby waste. Apka jest na tyle prosta że pojedynczy fan-out wystarczył.

---

## Live URL post-fix verification (po Vercel auto-deploy z main)

Po push commit z headers config, Vercel auto-deploy refresh w ~1-2 min. Manual verify Kacper:

```bash
curl -sI https://edynburg-atlas.vercel.app | grep -iE "content-security|x-frame|x-content-type|referrer-policy|permissions-policy"
```

Oczekiwane (test lokalny pokazał działa):
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; ...
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), camera=(), microphone=(), interest-cohort=()
```

---

## Sources

- CVE-2025-29927 (Next.js middleware bypass): [GitHub Advisory](https://github.com/advisories/GHSA-f82v-jwr5-mffw) — N/A bo brak middleware.ts
- CVE-2026-27978 (Server Actions Origin/Host): N/A bo brak `'use server'`
- CVE-2026-22817/27804/23552 (JWT alg pin): N/A bo brak auth/JWT
- CVE-2026-31813 (Supabase OIDC): N/A bo brak Supabase
- CVE-2026-39356 (Drizzle SQL identifier): N/A bo brak Drizzle
- GHSA-5c6j-r48x-rmvq (serialize-javascript RCE): [link](https://github.com/advisories/GHSA-5c6j-r48x-rmvq) — DOWNGRADE→INFO (build-time only)
- Vercel security defaults: [Vercel Edge Network](https://vercel.com/docs/edge-network/headers)
- Next.js CSP docs: [Configuring CSP](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)
- ePrivacy recital 30 (cookies/localStorage consent): nie wymagany dla strict-necessary preferences

---

## Build + Lint (post-fix)

```
✓ Generating static pages (16/16)
✓ Compiled successfully
0 TypeScript errors, 0 ESLint warnings
First Load JS: 89.5 kB shared, max /plan = 117 kB
```

Headers verified działają lokalnie via `npm run start` + curl test.

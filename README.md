# CLEW Industries

Public marketing site for [CLEW Industries](https://clewindustries.com) — React + Vite.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Output lands in `dist/` (P1 at the domain root). Framework source stays in this repo; it is not shipped unless `CLEW_SHIP_FRAMEWORK=1` after `npm run build:framework`. Local Framework work is still `npm run dev`.

### Bring Framework back

1. `npm run build:framework` then `CLEW_SHIP_FRAMEWORK=1 npm run build`
2. Restore `_redirects` so `/framework` stays on Framework (trailing-slash 308), not a 301 to `/`
3. In **CLEW P1**: footer link, sitemap entry, and drop the `/framework/` robots disallow

## Deploy (Cloudflare Pages)

- **Build command:** `npm run build` (P1 only; Framework is parked)
- **Build output directory:** `dist`
- **Node version:** 22 (or 20+)

No environment variables are required for the static site build.

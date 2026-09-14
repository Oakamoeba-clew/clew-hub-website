#!/usr/bin/env bash
# Merge P1 static export at domain root with Framework at /framework/.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"
P1_EXPORT="$ROOT/p1-export"
P1_SIBLING="${CLEW_P1_OUT:-$ROOT/../CLEW P1/out}"

if [[ -d "$P1_SIBLING" ]]; then
  P1_SRC="$P1_SIBLING"
elif [[ -d "$P1_EXPORT" ]]; then
  P1_SRC="$P1_EXPORT"
else
  echo "P1 export not found. Build CLEW P1 or populate p1-export/." >&2
  exit 1
fi

if [[ ! -d "$DIST/framework" ]]; then
  echo "dist/framework missing. Run vite build first." >&2
  exit 1
fi

echo "Assembling P1 from $P1_SRC onto $DIST (keeping /framework)"
rsync -a --delete --exclude framework "$P1_SRC/" "$DIST/"

if [[ -d "$ROOT/public/p1/industries" ]]; then
  mkdir -p "$DIST/p1/industries"
  rsync -a --exclude "industries.css" "$ROOT/public/p1/industries/" "$DIST/p1/industries/"
fi

cp "$ROOT/public/_redirects" "$DIST/_redirects"

# Framework brand files Vite no longer copies from public/
for f in hero.jpg og-image.png favicon.ico favicon-16x16.png favicon-32x32.png apple-touch-icon.png icon-192.png icon-512.png logo-clew.png manifest.json; do
  if [[ -f "$ROOT/public/$f" ]]; then
    cp "$ROOT/public/$f" "$DIST/framework/$f"
  fi
done

echo "Assembled. Root is P1. Framework is /framework/."

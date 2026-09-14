#!/usr/bin/env bash
# Kept as a manual fallback. Production assemble runs from Vite closeBundle.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
node "$ROOT/scripts/assemble-dist.mjs"

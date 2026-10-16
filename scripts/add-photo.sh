#!/usr/bin/env bash
#
# Drop a photo into the site, correctly sized.
#
#   scripts/add-photo.sh <source-image> <slot>
#
# Slots:
#   people/<name>        testimonial avatar   → 400px
#   board/portrait       the About board      → 1000px
#   photography/photo-N  the photo grid       → 1800px
#
# Handles HEIC straight off an iPhone. Example:
#   scripts/add-photo.sh ~/Desktop/ajay.HEIC people/ajaya-nandiyawar
#
set -euo pipefail

if [ $# -ne 2 ]; then
  sed -n '2,14p' "$0" | sed 's/^# \{0,1\}//'
  exit 1
fi

SRC="$1"
SLOT="${2%.jpg}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/public/images/${SLOT}.jpg"

[ -f "$SRC" ] || { echo "No such file: $SRC" >&2; exit 1; }

case "$SLOT" in
  people/*)       MAX=400  ;;
  board/*)        MAX=1000 ;;
  photography/*)  MAX=1800 ;;
  *)              MAX=1400 ;;
esac

mkdir -p "$(dirname "$DEST")"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# Two passes: decode to JPEG first (HEIC, PNG, whatever), then resize.
sips -s format jpeg -s formatOptions 95 "$SRC" --out "$TMP/in.jpg" >/dev/null
sips -Z "$MAX" -s format jpeg -s formatOptions 82 "$TMP/in.jpg" --out "$DEST" >/dev/null

DIMS=$(sips -g pixelWidth -g pixelHeight "$DEST" | tail -2 | tr -d ' \n' | sed 's/pixelWidth:/ /;s/pixelHeight:/x/')
echo "✓ ${SLOT}.jpg —${DIMS}, $(du -h "$DEST" | cut -f1)"

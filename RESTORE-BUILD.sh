#!/usr/bin/env bash
# Restore the Phase 01 and Phase 02 build.
#
# Nothing was deleted. The build was moved to .parked-build/ so the repo
# matches the original brief's planning-only state. This puts it all back
# exactly as it was, including node_modules, so no reinstall is needed.
#
#   bash RESTORE-BUILD.sh
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -d .parked-build ]; then
  echo "Nothing parked. The build is either already restored or was never made."
  exit 0
fi

for f in .parked-build/* .parked-build/.nvmrc; do
  [ -e "$f" ] || continue
  mv "$f" .
  echo "  restored: $(basename "$f")"
done

rmdir .parked-build 2>/dev/null || true

echo
echo "Restored. Verify with:"
echo "  npm run verify        tests + guarded build"
echo "  npm run dev           then open localhost:4321/design-preview/"

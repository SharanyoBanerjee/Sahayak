#!/usr/bin/env bash
# Vercel build script: bundles the Vite frontend and a read-only, seeded
# SQLite catalog for the Django serverless function under api/.
set -euo pipefail

# 1. Build the frontend (dependencies installed by installCommand).
npm run build --prefix frontend

# 2. Build a fresh seeded SQLite database for the serverless function.
#    Serverless filesystems are read-only at runtime, so the catalog must
#    be created and populated at build time. SAHAYAK_DB_PATH (see
#    backend/config/settings.py) keeps this fully isolated from any local
#    development database in backend/.
python3 -m venv /tmp/sahayak-venv
/tmp/sahayak-venv/bin/pip install --quiet -r backend/requirements.txt
export SAHAYAK_DB_PATH="$PWD/api/catalog.sqlite3"
/tmp/sahayak-venv/bin/python backend/manage.py migrate --noinput
/tmp/sahayak-venv/bin/python backend/manage.py seed_catalog

echo "Vercel build complete: frontend + seeded catalog bundle ready."

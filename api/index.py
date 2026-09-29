"""
Vercel serverless entrypoint for the Sahayak Django backend.

Routes every /api/* request into the Django WSGI application. Vercel's
Python runtime loads the top-level `application` WSGI callable directly,
so no adapter package is needed. The SQLite catalog bundled next to this
file is read-only at runtime, which matches the engine's contract: all
endpoints are reads or pure computation.
"""

import os
import sys
from pathlib import Path

# Guarantee the backend packages (config, apps) resolve on the function's
# sys.path regardless of the runtime's working-directory defaults.
BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent
BACKEND_DIR = PROJECT_ROOT / "backend"
for _path in (str(PROJECT_ROOT), str(BACKEND_DIR)):
    if _path not in sys.path:
        sys.path.insert(0, _path)

from django.core.wsgi import get_wsgi_application

# The database lives next to this file inside the serverless bundle.
# Always use SQLite on Vercel, regardless of any POSTGRES_* variables.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
os.environ.pop("POSTGRES_DB", None)
os.environ.setdefault("DJANGO_DEBUG", "False")

# The database lives next to this file inside the serverless bundle.
os.environ["SAHAYAK_DB_PATH"] = str(BASE_DIR / "catalog.sqlite3")

application = get_wsgi_application()

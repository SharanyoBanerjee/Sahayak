"""
Vercel serverless entrypoint for the Sahayak Django backend.

Routes every /api/* request into the Django WSGI application. The SQLite
catalog bundled next to this file is read-only at runtime, which matches
the engine's contract: all endpoints are reads or pure computation.
"""

import os
from pathlib import Path

from django.core.wsgi import get_wsgi_application

# The database lives next to this file inside the serverless bundle.
# Always use SQLite on Vercel, regardless of any POSTGRES_* variables.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
os.environ.pop("POSTGRES_DB", None)
os.environ.setdefault("DJANGO_DEBUG", "False")

BASE_DIR = Path(__file__).resolve().parent
os.environ["SAHAYAK_DB_PATH"] = str(BASE_DIR / "catalog.sqlite3")

application = get_wsgi_application()


def handler(event, context):
    """AWS Lambda-style handler (Vercel Python runtime)."""
    from vercel_wsgi.handler import handle_request

    return handle_request(application, event, context)

from django.db import connection
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def health(request):
    """Verifica que la API responde y que hay conexión con la base de datos."""
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT VERSION()")
            version = cursor.fetchone()[0]
        db = {"ok": True, "motor": connection.vendor, "version": version}
    except Exception as exc:  # noqa: BLE001
        db = {"ok": False, "error": str(exc)}

    return Response({"api": "ok", "database": db}, status=200 if db["ok"] else 503)

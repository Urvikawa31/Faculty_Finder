import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).parent
DB_PATH = BASE_DIR / "faculty.db"
SCHEMA_PATH = BASE_DIR / "schema.sql"

print(f"[INIT_DB] DB Path     : {DB_PATH.resolve()}")
print(f"[INIT_DB] Schema Path : {SCHEMA_PATH.resolve()}")

def init_db():
    if not SCHEMA_PATH.exists():
        raise FileNotFoundError(f"schema.sql not found at {SCHEMA_PATH}")

    with sqlite3.connect(DB_PATH) as conn:
        with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
            schema = f.read()

        if not schema.strip():
            raise ValueError("schema.sql is EMPTY")

        conn.executescript(schema)
        conn.commit()

    print("[INIT_DB] Database initialized successfully.")

if __name__ == "__main__":
    init_db()
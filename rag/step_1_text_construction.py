import json
import sqlite3
from pathlib import Path

# Config & Paths
BASE_DIR = Path(__file__).resolve().parents[1]
DB_PATH = BASE_DIR / "storage" / "faculty.db"
OUTPUT_DIR = BASE_DIR / "rag" / "artifacts"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

OUTPUT_FILE = OUTPUT_DIR / "faculty_documents.json"


# Utility Function
def safe_text(text):
    if text is None:
        return ""
    return text.strip()


# Main Logic
def build_faculty_documents():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            faculty_id,
            name,
            faculty_category,
            biography,
            specialization,
            research,
            publications,
            teaching,
            education
        FROM faculty
    """)

    faculty_docs = []

    for row in cursor.fetchall():
        combined_text = "\n".join([
            safe_text(row["biography"]),
            safe_text(row["specialization"]),
            safe_text(row["research"]),
            safe_text(row["publications"]),
            safe_text(row["teaching"]),
            safe_text(row["education"]),
        ])

        if not combined_text.strip():
            continue  # skip empty profiles

        faculty_docs.append({
            "faculty_id": row["faculty_id"],
            "name": row["name"],
            "faculty_category": row["faculty_category"],
            "text": combined_text
        })

    conn.close()

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(faculty_docs, f, indent=2, ensure_ascii=False)

    print(f"[STEP 1 COMPLETE] Generated {len(faculty_docs)} faculty documents")
    print(f"[OUTPUT] {OUTPUT_FILE}")


if __name__ == "__main__":
    build_faculty_documents()
import json
import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
DB_PATH = BASE_DIR / "storage" / "faculty.db"
OUTPUT_PATH = BASE_DIR / "rag" / "artifacts" / "faculty_evidence_units.json"

FIELDS = [
    ("research", "research"),
    ("publications", "publications"),
    ("teaching", "teaching"),
    ("biography", "biography"),
    ("education", "education"),
    ("specialization", "specialization")
]

def fetch_faculty_data():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute("SELECT * FROM faculty")
    rows = cur.fetchall()
    conn.close()
    return rows

def build_evidence_units():
    faculty_rows = fetch_faculty_data()
    evidence_units = []

    for row in faculty_rows:
        for field_name, column in FIELDS:
            text = row[column]

            if text and len(text.strip()) > 30:
                evidence_units.append({
                    "faculty_id": row["faculty_id"],
                    "name": row["name"],
                    "faculty_category": row["faculty_category"],
                    "field": field_name,
                    "text": text.strip()
                })

    return evidence_units

if __name__ == "__main__":
    evidence_units = build_evidence_units()

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(evidence_units, f, indent=2)

    print(f"[STEP 1 COMPLETE] Generated {len(evidence_units)} evidence units")
    print(f"[OUTPUT] {OUTPUT_PATH}")
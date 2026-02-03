import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
DOCS_PATH = BASE_DIR / "rag" / "artifacts" / "faculty_documents.json"

def load_faculty_documents():
    with open(DOCS_PATH, "r", encoding="utf-8") as f:
        docs = json.load(f)

    return {d["faculty_id"]: d for d in docs}

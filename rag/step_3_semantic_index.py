import json
from pathlib import Path
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

BASE_DIR = Path(__file__).resolve().parents[1]
EVIDENCE_PATH = BASE_DIR / "rag" / "artifacts" / "faculty_evidence_units.json"
VECTOR_DIR = BASE_DIR / "rag" / "vector_store" / "chroma_evidence"

def load_evidence_units():
    with open(EVIDENCE_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

if __name__ == "__main__":
    evidence_units = load_evidence_units()

    texts = [e["text"] for e in evidence_units]
    metadatas = [
        {
            "faculty_id": e["faculty_id"],
            "field": e["field"],
            "name": e["name"],
            "faculty_category": e["faculty_category"]
        }
        for e in evidence_units
    ]

    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    vectorstore = Chroma.from_texts(
        texts=texts,
        metadatas=metadatas,
        embedding=embeddings,
        persist_directory=str(VECTOR_DIR)
    )

    print(f"[STEP 3 COMPLETE] Indexed {len(texts)} evidence units")
    print(f"[VECTOR STORE] {VECTOR_DIR}")
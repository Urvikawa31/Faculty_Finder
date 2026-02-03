import json
from pathlib import Path
from rank_bm25 import BM25Okapi
import re

# Config & Path
BASE_DIR = Path(__file__).resolve().parents[1]
DOCS_PATH = BASE_DIR / "rag" / "artifacts" / "faculty_documents.json"


# Utility Functions
def tokenize(text: str):
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    return text.split()


# Load Faculty Documents
with open(DOCS_PATH, "r", encoding="utf-8") as f:
    faculty_docs = json.load(f)

corpus = [tokenize(doc["text"]) for doc in faculty_docs]

bm25 = BM25Okapi(corpus)


# Retrieving Function - BM25 Retriever
def bm25_retrieve(query: str, top_k: int = 10):
    query_tokens = tokenize(query)
    scores = bm25.get_scores(query_tokens)

    ranked = sorted(
        zip(faculty_docs, scores),
        key=lambda x: x[1],
        reverse=True
    )

    results = []
    for doc, score in ranked[:top_k]:
        results.append({
            "faculty_id": doc["faculty_id"],
            "name": doc["name"],
            "faculty_category": doc["faculty_category"],
            "bm25_score": round(float(score), 4)
        })

    return results


# Main Function
if __name__ == "__main__":
    query = "Natural Language Processing"
    results = bm25_retrieve(query)

    print(f"\nBM25 Results for query: '{query}'\n")
    for r in results:
        print(
            f"{r['name']} | "
            f"Category: {r['faculty_category']} | "
            f"Score: {r['bm25_score']}"
        )
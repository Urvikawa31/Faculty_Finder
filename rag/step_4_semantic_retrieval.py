from pathlib import Path
from collections import defaultdict
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

BASE_DIR = Path(__file__).resolve().parents[1]
VECTOR_DIR = BASE_DIR / "rag" / "vector_store" / "chroma_evidence"

FIELD_WEIGHTS = {
    "research": 0.4,
    "publications": 0.3,
    "teaching": 0.2,
    "biography": 0.1,
    "education": 0.1
}

def semantic_retrieve(query, top_k=20):
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    vectorstore = Chroma(
        persist_directory=str(VECTOR_DIR),
        embedding_function=embeddings
    )

    results = vectorstore.similarity_search_with_score(query, k=top_k)

    faculty_scores = defaultdict(float)
    faculty_meta = {}

    for doc, score in results:
        meta = doc.metadata
        field = meta["field"]
        weight = FIELD_WEIGHTS.get(field, 0.1)

        faculty_id = meta["faculty_id"]
        faculty_scores[faculty_id] += (1 - score) * weight
        faculty_meta[faculty_id] = meta

    ranked = sorted(
        faculty_scores.items(),
        key=lambda x: x[1],
        reverse=True
    )

    return [
        {
            "faculty_id": fid,
            "name": faculty_meta[fid]["name"],
            "faculty_category": faculty_meta[fid]["faculty_category"],
            "semantic_score": round(score, 4)
        }
        for fid, score in ranked
    ]
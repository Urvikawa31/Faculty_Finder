import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from rag.step_2_bm25_retrieval import bm25_retrieve
from rag.step_4_semantic_retrieval import semantic_retrieve
from rag.step_6_llm_explainability import explain_ranked_results_llm
from rag.utils import load_faculty_documents


# NORMALIZATION
def normalize(scores):
    min_s = min(scores)
    max_s = max(scores)

    if max_s == min_s:
        return [1.0] * len(scores)

    return [(s - min_s) / (max_s - min_s) for s in scores]


# HYBRID RETRIEVAL
def hybrid_retrieve(query, top_k=10, alpha=0.6):
    """
    alpha = weight for semantic score
    (1 - alpha) = weight for BM25 score
    """

    bm25_results = bm25_retrieve(query, top_k=top_k * 2)
    semantic_results = semantic_retrieve(query, top_k=top_k * 2)

    bm25_dict = {r["faculty_id"]: r for r in bm25_results}
    semantic_dict = {r["faculty_id"]: r for r in semantic_results}

    faculty_ids = set(bm25_dict) | set(semantic_dict)

    bm25_scores = [bm25_dict.get(fid, {}).get("bm25_score", 0.0) for fid in faculty_ids]
    semantic_scores = [semantic_dict.get(fid, {}).get("semantic_score", 0.0) for fid in faculty_ids]

    bm25_norm = normalize(bm25_scores)
    semantic_norm = normalize(semantic_scores)

    fused_results = []

    for fid, b_score, s_score in zip(faculty_ids, bm25_norm, semantic_norm):
        fused_score = (1 - alpha) * b_score + alpha * s_score

        source = bm25_dict.get(fid) or semantic_dict.get(fid)

        fused_results.append({
            "faculty_id": fid,
            "name": source["name"],
            "faculty_category": source["faculty_category"],
            "final_score": round(fused_score, 4)
        })

    fused_results.sort(key=lambda x: x["final_score"], reverse=True)
    return fused_results[:top_k]


# MAIN
if __name__ == "__main__":
    query = "Natural Language Processing"

    # Step 5: Hybrid ranking
    ranked_results = hybrid_retrieve(query, top_k=5)

    # Load faculty documents (for explainability context)
    faculty_docs = load_faculty_documents()

    enriched_results = []
    for r in ranked_results:
        doc = faculty_docs[r["faculty_id"]]
        enriched_results.append({**r, **doc})

    # Step 6: LLM Explainability
    explained_results = explain_ranked_results_llm(query, enriched_results)

    print(f"\nHybrid + LLM Explained Results for query: '{query}'\n")

    for r in explained_results:
        print(f"{r['name']} ({r['faculty_category']})")
        print(f"Score: {r['final_score']}")
        print(r["explanation"])
        print("-" * 60)
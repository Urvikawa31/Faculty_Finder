import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from fastapi import FastAPI, HTTPException
from api.schema import SearchRequest, SearchResponse
from rag.step_5_hybrid_retrieval import hybrid_retrieve
from rag.step_6_llm_explainability import explain_and_rerank
from storage.fetch_faculty import fetch_faculty_by_id

app = FastAPI(
    title="Faculty Finder API",
    description="Student-centric faculty recommendation system using hybrid retrieval and LLM reasoning",
    version="1.0"
)

# Adding endpoint to check health of the API
@app.get("/health")
def health_check():
    return {"status": "ok"}


# Adding endpoint to get all faculty
@app.get('/faculty')
def get_all_faculty():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT * FROM faculty")
    rows = cur.fetchall()
    conn.close()

    return [dict(row) for row in rows]


# Adding endpoint to get faculty by id
@app.get("/faculty/{faculty_id}")
def get_faculty_by_id(faculty_id: int):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT * FROM faculty WHERE faculty_id = ?",
        (faculty_id,)
    )
    row = cur.fetchone()
    conn.close()

    if row is None:
        raise HTTPException(status_code=404, detail="Faculty not found")
    
    return dict(row)


# Adding endpoint of filter by category
@app.get("/faculty/category/{category}")
def get_faculty_by_category(category: str):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT * FROM faculty WHERE faculty_category = ?",
        (category,)
    )
    rows = cur.fetchall()
    conn.close()

    return [dict(row) for row in rows]

@app.post("/search", response_model=SearchResponse)
def search_faculty(request: SearchRequest):
    try:
        # Step 1: Hybrid Retrieval
        hybrid_results = hybrid_retrieve(
            query=request.query,
            top_k=request.top_k
        )

        # Step 2: LLM Reranking + Explainability
        llm_results = explain_and_rerank(
            request.query,
            hybrid_results
        )

        # Step 3: Enrich from Database
        final_results = []

        for item in llm_results:
            faculty = fetch_faculty_by_id(item["faculty_id"])

            if faculty is None:
                continue

            final_results.append({
                "rank": item["rank"],
                "name": faculty["name"],
                "category": faculty["faculty_category"],
                "reason": item["reason"],

                "image_url": faculty["image_url"],
                "education": faculty["education"],
                "phone": faculty["phone"],
                "email": faculty["email"],
                "address": faculty["address"],
            })

        return {
            "query": request.query,
            "results": final_results
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
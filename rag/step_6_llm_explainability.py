from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
import json
import re

llm = ChatGoogleGenerativeAI(
    api_key = "AIzaSyDVL9AgS863gz5C78-Hy9PgFUImpSB3VTE",
    model="gemini-2.5-flash-lite",
    temperature=0.2
)

PROMPT = PromptTemplate(
    input_variables=["query", "candidates"],
    template="""
You are an academic mentor advising a university student.

Student Query:
"{query}"

Below is a list of faculty candidates.
Each candidate has a UNIQUE faculty_id.

Candidates:
{candidates}

Your task:
1. Rank ALL faculty from best to worst.
2. For EACH faculty, explain:
   - Alignment with the student's interest
   - What the student gains
   - Any limitations (adjunct role, availability, etc.)
3. Use a student-friendly advisory tone.
4. DO NOT mention scores.
5. RETURN STRICT JSON ONLY.
6. DO NOT invent or change faculty_id.

Required JSON format:
[
  {{
    "rank": 1,
    "faculty_id": 48,
    "reason": "Student-focused explanation (3–4 lines)"
  }}
]
"""
)

# ---------- JSON SAFE PARSER ----------
def _extract_json(text: str):
    try:
        text = text.replace("```json", "").replace("```", "").strip()
        start = text.find("[")
        end = text.rfind("]") + 1
        if start == -1 or end == -1:
            return None
        return json.loads(text[start:end])
    except Exception:
        return None


# ---------- MAIN ENTRY ----------
def explain_and_rerank(query, hybrid_results):

    # Build ID-anchored candidate list
    candidates_text = "\n".join(
        f"- faculty_id:{r['faculty_id']} | {r['name']} ({r['faculty_category']})"
        for r in hybrid_results
    )

    prompt = PROMPT.format(
        query=query,
        candidates=candidates_text
    )

    response = llm.invoke(prompt)
    raw_output = response.content.strip()

    parsed = _extract_json(raw_output)

    # 🔒 HARD FALLBACK (never break API)
    if parsed is None:
        return [
            {
                "rank": idx + 1,
                "faculty_id": r["faculty_id"],
                "name": r["name"],
                "category": r["faculty_category"],
                "reason": "AI explanation unavailable. Ranked based on hybrid relevance score."
            }
            for idx, r in enumerate(hybrid_results)
        ]

    # Build lookup tables
    faculty_map = {
        r["faculty_id"]: r
        for r in hybrid_results
    }

    final = []
    for item in parsed:
        faculty_id = item.get("faculty_id")

        if faculty_id not in faculty_map:
            continue

        faculty = faculty_map[faculty_id]

        final.append({
            "rank": item["rank"],
            "faculty_id": faculty_id,
            "name": faculty["name"],
            "category": faculty["faculty_category"],
            "reason": item["reason"]
        })

    return final

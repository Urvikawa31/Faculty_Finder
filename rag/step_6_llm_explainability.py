from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
import json
import re

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash-lite",
    temperature=0.2
)

PROMPT = PromptTemplate(
    input_variables=["query", "candidates"],
    template="""
You are an academic mentor advising a university student who wants to collaborate
with a faculty member for research or higher studies.

Student Query:
"{query}"

Below is a shortlist of faculty candidates retrieved by an AI system.
Each candidate includes name, faculty category, and relevance score.

Candidates:
{candidates}

Your task:
1. Rank the faculty from best to worst for the student.
2. For EACH faculty, explain:
   - How their research, teaching, or publications align with the student's interest
   - What the student can gain by working with them
   - Any limitations or uncertainty (e.g., limited research evidence, adjunct role, availability)
3. Write explanations in a **student-friendly advisory tone**.
4. DO NOT mention numerical scores in the explanation.

Return ONLY valid JSON in the following format:

[
  {{
    "rank": 1,
    "name": "...",
    "category": "...",
    "reason": "Student-focused explanation (3–4 lines)"
  }}
]
"""
)


def _extract_json(text: str):
    """
    Safely extract JSON array from LLM output.
    """
    try:
        match = re.search(r"\[\s*{.*}\s*\]", text, re.DOTALL)
        if match:
            return json.loads(match.group())
    except Exception:
        pass
    return None


def explain_and_rerank(query, hybrid_results):
    candidates_text = "\n".join(
        f"- {r['name']} ({r['faculty_category']}), score={r['final_score']}"
        for r in hybrid_results
    )

    prompt = PROMPT.format(
        query=query,
        candidates=candidates_text
    )

    response = llm.invoke(prompt)
    raw_output = response.content.strip()

    parsed = _extract_json(raw_output)

    if parsed is None:
        # 🔒 Fallback: keep original order
        return [
            {
                "rank": idx + 1,
                "faculty_id": r["faculty_id"],
                "name": r["name"],
                "category": r["faculty_category"],
                "reason": "Explanation unavailable. Ranked based on hybrid relevance score."
            }
            for idx, r in enumerate(hybrid_results)
        ]

    # 🔗 Reattach faculty_id by name matching
    name_to_id = {r["name"]: r["faculty_id"] for r in hybrid_results}

    final = []
    for item in parsed:
        faculty_id = name_to_id.get(item["name"])

        if faculty_id is None:
            continue

        final.append({
            "rank": item["rank"],
            "faculty_id": faculty_id,
            "name": item["name"],
            "category": item["category"],
            "reason": item["reason"]
        })

    return final
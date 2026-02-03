import os
from typing import List, Dict

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.messages import HumanMessage

# LLM
def get_llm():
    """
    Returns Gemini LLM if API key exists,
    otherwise raises controlled exception.
    """
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise RuntimeError("Google API key not found")

    return ChatGoogleGenerativeAI(
        model="gemini-2.5-flash-lite",
        temperature=0.2
    )


# Prompt
EXPLANATION_PROMPT = PromptTemplate(
    input_variables=["query", "faculty_name", "faculty_category", "context"],
    template="""
You are an academic research assistant.

A student is searching for faculty related to the topic:
"{query}"

Faculty Profile:
Name: {faculty_name}
Category: {faculty_category}

Relevant Extracted Information:
{context}

Task:
Explain clearly WHY this faculty member is a good match for the student's interest.
Focus on:
- Research alignment
- Teaching relevance
- Publications or academic background
- Suitability for collaboration

Give a concise explanation in 3–4 bullet points.
"""
)


# Explainability
def llm_explain_faculty(query: str, faculty_doc: Dict) -> Dict:
    """
    Generates LLM-based explanation for one faculty.
    """

    context = faculty_doc["text"][:3500]  # safety truncation

    llm = get_llm()
    prompt = EXPLANATION_PROMPT.format(
        query=query,
        faculty_name=faculty_doc["name"],
        faculty_category=faculty_doc["faculty_category"],
        context=context
    )

    response = llm.invoke([HumanMessage(content=prompt)])

    return {
        "faculty_id": faculty_doc["faculty_id"],
        "name": faculty_doc["name"],
        "faculty_category": faculty_doc["faculty_category"],
        "explanation": response.content.strip()
    }


# Batch
def explain_ranked_results_llm(query: str, ranked_docs: List[Dict]) -> List[Dict]:
    explanations = []

    for doc in ranked_docs:
        try:
            exp = llm_explain_faculty(query, doc)
            exp["final_score"] = doc["final_score"]
            explanations.append(exp)
        except Exception as e:
            explanations.append({
                "faculty_id": doc["faculty_id"],
                "name": doc["name"],
                "faculty_category": doc["faculty_category"],
                "final_score": doc["final_score"],
                "explanation": "Explanation unavailable due to LLM quota or configuration."
            })

    return explanations
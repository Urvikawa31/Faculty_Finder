from pathlib import Path
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

# Paths
BASE_DIR = Path(__file__).resolve().parents[1]
VECTOR_DIR = BASE_DIR / "rag" / "vector_store" / "chroma"

# Load Vector Store
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vectorstore = Chroma(
    persist_directory=str(VECTOR_DIR),
    embedding_function=embeddings
)

# Semantic Retrieval
def semantic_retrieve(query: str, top_k: int = 10):
    results = vectorstore.similarity_search_with_score(
        query=query,
        k=top_k
    )

    output = []
    for doc, score in results:
        output.append({
            "faculty_id": doc.metadata["faculty_id"],
            "name": doc.metadata["name"],
            "faculty_category": doc.metadata["faculty_category"],
            "semantic_score": round(float(score), 4)
        })

    return output


# Main
if __name__ == "__main__":
    query = "Machine Learning"
    results = semantic_retrieve(query)

    print(f"\nSemantic Results for query: '{query}'\n")
    for r in results:
        print(
            f"{r['name']} | "
            f"Category: {r['faculty_category']} | "
            f"Score: {r['semantic_score']}"
        )
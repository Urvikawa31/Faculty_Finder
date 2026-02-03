import json
from pathlib import Path
from langchain_core.documents import Document
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

# Paths
BASE_DIR = Path(__file__).resolve().parents[1]
DOCS_PATH = BASE_DIR / "rag" / "artifacts" / "faculty_documents.json"
VECTOR_DIR = BASE_DIR / "rag" / "vector_store" / "chroma"
VECTOR_DIR.mkdir(parents=True, exist_ok=True)

# Load Faculty Docs
with open(DOCS_PATH, "r", encoding="utf-8") as f:
    faculty_docs = json.load(f)

documents = []
for doc in faculty_docs:
    documents.append(
        Document(
            page_content=doc["text"],
            metadata={
                "faculty_id": doc["faculty_id"],
                "name": doc["name"],
                "faculty_category": doc["faculty_category"]
            }
        )
    )

# Local Embedding Model
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# Build & Persist Vector Stores
vectorstore = Chroma.from_documents(
    documents=documents,
    embedding=embeddings,
    persist_directory=str(VECTOR_DIR)
)

vectorstore.persist()

print(f"[STEP 3 COMPLETE] Semantic index built with {len(documents)} documents")
print(f"[VECTOR STORE] {VECTOR_DIR}")
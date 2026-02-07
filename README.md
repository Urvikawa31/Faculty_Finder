# Faculty Finder – AI Research Collaboration Platform

### Public URL: https://infraglyph.vercel.app

---
## Phase 1: Data Engineering Pipeline

## Overview
**Faculty Finder** is an end-to-end **Data Engineering project** that builds a scalable pipeline to discover, extract, store, and serve faculty information from a university website. The system prepares high-quality data for downstream **semantic search and NLP-based applications**.

This repository focuses on **Phase 1: Data Engineering**, covering:
- Data ingestoin
- Data Cleaning & Storage
- API-based data serving

---

## Problem Statement
Faculty expertise information is scattered across unstructured HTML pages and multiple directories. Traditional keyword-based search fails to identify relevant faculty members when exact terms are missing.

Before applying NLP or semantic search, a **robust, reproducible data pipeline** is required to extract and organize this information.

---

## Solution
This project implements a **production-style ETL pipeline** that:

- Crawls multiple faculty directories
- Dynamically discovers faculty profile URLs
- Extracts structured and semi-structured data from profile pages
- Stores **raw HTML content** for future processing
- Exposes data via **FastAPI** for downstream consumption

---

## Architecture

University Website (HTML)<br>
↓<br>
Faculty URL Discovery<br>
↓<br>
Profile-Level Scraping<br>
↓<br>
SQLite Database (Raw HTML Stored)<br>
↓<br>
Cleaning Raw HTML<br>
↓<br>
FastAPI (Read-Only APIs)<br>

---

## Pipeline Components

### 1️ Ingestion
- Crawls multiple faculty directories:
  - Regular Faculty
  - Adjunct Faculty
  - International Adjunct Faculty
  - Distinguished Professors
  - Professors of Practice
- Dynamically discovers faculty profile URLs
- Handles real-world issues:
  - Inconsistent URL taxonomy
  - Missing profile fields
  - Absolute and relative URLs
- Uses retry and backoff for robustness

---

### 2️ Extraction
For each faculty profile, the pipeline extracts:
- Name, image, education
- Phone, address, email
- Biography
- Specialization
- Teaching
- Research
- Publications

**Raw HTML is preserved** to support later cleaning and NLP tasks.

---

### 3️ Cleaning & Transformation
- Removes HTML tags and noisy markup
- Normalizes text fields (whitespace, encoding, formatting)
- Handles missing, null, and irregular values gracefully
- Converts semi-structured HTML into clean text suitable for NLP tasks

This step ensures the data is **consistent, readable, and ready for downstream Task**.

---

### 4 Storage
- SQLite database for lightweight persistence
- Schema-driven design
- Raw HTML stored as TEXT fields (Bronze Layer)
- Safe re-runs using unique constraints

---

### 5 Serving (API Layer)
A **FastAPI-based read-only API** provides access to stored data:

| Endpoint | Description |
|--------|------------|
| `GET /faculty` | Fetch all faculty records |
| `GET /faculty/{id}` | Fetch faculty by ID |
| `GET /faculty/category/{category}` | Filter by faculty category |

Swagger UI available at:<br>
local url -> `http://127.0.0.1:8000/docs`<br>
public url -> <br>

---

### Data Analysis & Statistics

#### 📊 Dataset Overview
- Total Faculty Records: **110**
- Total Attributes per Record: **12 fields**

---

#### Faculty Distribution by Category

| Category | Count | Percentage |
|---------|-------|-----------|
| Regular Faculty | 67 | 60.91% |
| Adjunct Faculty | 26 | 23.64% |
| International Adjunct Faculty | 11 | 10.00% |
| Professor of Practice | 4 | 3.64% |
| Distinguished Professor | 2 | 1.82% |

---

#### Missing Data Analysis

| Field | Missing % |
|-------|----------|
| Education | 1.82% |
| Phone | 29.09% |
| Address | 31.82% |
| Email | 0.91% |
| Biography | 38.18% |
| Specialization | 1.82% |
| Publications | 33.64% |
| Teaching | 36.36% |
| Research | 87.27% |

---

#### Text Length Statistics (NLP Readiness)

| Field | Non-Empty Records | Avg Length | Max Length |
|-------|------------------|----------|----------|
| Biography | 68 | 541 | 2439 |
| Specialization | 108 | 111 | 503 |
| Teaching | 70 | 123 | 1885 |
| Research | 14 | 42 | 1897 |
| Publications | 73 | 1831 | 16202 |

---

## Phase 2: Data Science & AI Layer (Semantic Retrieval + RAG)

### Overview

Building on the structured faculty data prepared in **Phase 1 (Data Engineering)**, this phase extends the system into a **Data Science–driven intelligent retrieval engine**.

The goal is to move beyond keyword-based search and enable **research-aware, contextual, and explainable faculty discovery** using a hybrid Retrieval-Augmented Generation (RAG) architecture.

---

### Problem Addressed (Data Science Perspective)

- Faculty profiles contain **rich but noisy unstructured text**
- Keyword matching fails to capture **research intent and semantic similarity**
- Students require **interpretable recommendations**, not just ranked lists
- Traditional search systems lack **contextual understanding**

---

### Solution Approach

The system implements a **hybrid RAG pipeline** that combines classical Information Retrieval with modern embedding-based methods:

- **Keyword relevance** ensures recall
- **Semantic similarity** ensures contextual alignment
- **LLM-based reasoning** ensures interpretability and explainability

---

## AI Architecture (RAG Pipeline)

User Query (HTML)<br>
↓<br>
Query Cleaning & Embedding<br>
↓<br>
Hybrid Retrieval<br>
- BM25 (Lexical Matching)<br>
- Sentence Embeddings (Semantic Similarity)<br>
↓<br>
Score Fusion & Candidate Shortlisting<br>
↓<br>
LLM-Based Re-Ranking & Explanation<br>
↓<br>
Final Faculty Recommendations (with reasons)<br>

---

### Core Data Science Components

#### 1️⃣ Text Representation

- Cleaned and normalized faculty text fields:
  - Biography  
  - Specialization  
  - Teaching  
  - Research  
  - Publications  
- Sentence-level embeddings using **Sentence Transformers**
- Consistent preprocessing for reliable semantic comparison

---

#### 2️⃣ Hybrid Retrieval Strategy

- **BM25** for exact and partial keyword matching
- **Embedding similarity (cosine distance)** for semantic relevance
- Weighted score fusion to balance:
  - Precision  
  - Recall  
  - Research-context alignment

---

#### 3️⃣ LLM-Based Explainability Layer

- Large Language Models (LLMs) used for:
  - Re-ranking shortlisted faculty
  - Generating student-friendly explanations
- Explanations cover:
  - Research alignment
  - Potential mentorship value
  - Limitations (adjunct role, sparse data, availability)
- Ensures **transparent and interpretable AI recommendations**

---

#### 4️⃣ Robust Output Handling

- Strict **JSON-based structured outputs**
- Safe fallback logic when LLM output is malformed
- Faculty ID preservation to maintain **data lineage and traceability**

---

###  Repository Structure

faculty-finder/<br>
│<br>
├── api/<br>                         
│   ├── __pycache__/<br>
│   ├── .env<br>
│   ├── main.py<br>                  
│   └── schema.py<br>               
│<br>
├── ingestion/<br>                    
│   ├── __pycache__/<br>
│   ├── discover_urls.py<br>          
│   ├── http_client.py<br>            
│   └── scrape_faculty.py<br>         
│<br>
├── cleaning/<br>                     
│   ├── __pycache__/<br>
│   ├── __init__.py<br>
│   └── clean_faculty_records.py<br>
│<br>
├── storage/<br>                      
│   ├── __pycache__/<br>
│   ├── db.py<br>                     
│   ├── schema.sql<br>                
│   ├── init_db.py<br>                
│   ├── insert_faculty.py<br>         
│   ├── fetch_faculty.py<br>
│   └── faculty.db<br>                
│<br>
├── pipeline/<br>                     
│   ├── step_1_ingestion.py<br>
│   ├── step_2_storage.py<br>
│   └── step_3_cleaning.py<br>
│<br>
├── rag/<br>                          
│   ├── __pycache__/<br>
│   ├── artifacts/<br>                
│   ├── vector_store/<br>             
│   ├── step_1_text_construction.py<br>
│   ├── step_2_bm25_retrieval.py<br>
│   ├── step_3_semantic_index.py<br>
│   ├── step_4_semantic_retrieval.py<br>
│   ├── step_5_hybrid_retrieval.py<br>
│   ├── step_6_llm_explainability.py<br>
│   └── utils.py<br>
│<br>
├── data/<br>
│   ├── raw/<br>                      
│   │   └── raw_faculty_data.csv<br>
│   ├── processed/<br>                
│   │   └── clean_faculty_data.csv<br>
│<br>
├── data_analysis/<br>                
│   ├── __pycache__/<br>
│   ├── category_statistics.py<br>
│   ├── data_overview.py<br>
│   ├── data_quality_checks.py<br>
│   ├── load_data.py<br>
│   ├── missing_value_statistics.py<br>
│   ├── statistics.py<br>
│   ├── summary_report.py<br>
│   └── text_statistics.py<br>
│<br>
├── frontend/<br>                     
│   ├── node_modules/<br>
│   ├── src/<br>
│   │   ├── assets/<br>               
│   │   │   ├── infraglyph.png<br>
│   │   │   └── infraglyph.webp<br>
│   │   ├── components/<br>           
│   │   │   ├── Header.tsx<br>
│   │   │   └── Footer.tsx<br>
│   │   ├── pages/<br>                
│   │   │   ├── Home.tsx<br>
│   │   │   ├── SearchResults.tsx<br>
│   │   │   ├── FacultyDetail.tsx<br>
│   │   │   ├── FacultyList.tsx<br>
│   │   │   ├── FeaturedFaculty.tsx<br>
│   │   │   ├── DataInsights.tsx<br>
│   │   │   ├── HowItWorks.tsx<br>
│   │   │   └── About.tsx<br>
│   │   ├── services/<br>
│   │   │   └── api.ts<br>             
│   │   ├── data/<br>
│   │   │   └── mockData.ts<br>
│   │   ├── App.tsx<br>
│   │   └── main.tsx<br>
│   ├── index.html<br>
│   ├── tailwind.config.js<br>
│   ├── vite.config.ts<br>
│   ├── tsconfig.json<br>
│   ├── package.json<br>
│   └── .env<br>
│<br>
├── logs/<br>
│   └── llm_usage.md<br>              
│<br>
├── run_pipeline.py<br>               
├── requirements.txt<br>              
├── LICENSE<br>
└── README.md<br>

##  How to Run

---

## Phase 1: Data Engineering Pipeline

## Entire Pipeline

### 1️ Create Virtual Environment & Install Dependencies
```bash
python -m venv venv
# ubuntu: source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2️ Initialize Database
```bash
python storage/init_db.py
```

### 3️ Run Data Pipeline
```bash
python run_pipeline.py
```

### 4️ Start API Server
```bash
uvicorn api.main:app --reload
```

## Step Wise

### 1️ Data Ingestion
```bash
python pipeline/step_1_ingestion.py
```

### 2️ Data Storage
```bash
python pipeline/step_2_storage.py
```

### 3️ Data Cleaning
```bash
python pipeline/step_3_cleaning.py
```
---

## Phase 2: Data Science & AI (RAG Pipeline)

### 1️ Text Construction for Retrieval
```bash
python rag/step_1_text_construction.py
```

### 2️ Lexical Retrieval (BM25)
```bash
python rag/step_2_bm25_retrieval.py
```

### 3️ Semantic Index Construction
```bash
python rag/step_3_semantic_index.py
```

### 4️ Semantic Retrieval
```bash
python rag/step_4_semantic_retrieval.py
```

### 5 Hybrid Retrieval (BM25 + Embeddings)
```bash
python rag/step_5_hybrid_retrieval.py
```

### 6 LLM-Based Explainability
```bash
python rag/step_6_llm_explainability.py
```
---

## Team & Contributions

### Group Name  
**Infraglyph** - Uncovering hidden meaningful patterns

---

### Team Members

| Name | Roll Number |
|------|-------------|
| **Urvi Kava** | 202518006 |
| **Patel Harsh Satishkumar** | 202518011 |

---

### 🔹 Urvi Kawa (202518006)  
**Role: Data Ingestion, Pipeline Infrastructure, Retrieval Design, RAG Pipeline, System Integration & API Integration**

- Faculty URL discovery and crawling  
- Handling inconsistent website structure and real-world edge cases  
- Profile-level HTML scraping  
- HTTP robustness (retry mechanism and exponential backoff)  
- Database persistence and pipeline orchestration  
- Hybrid retrieval logic (BM25 + embeddings)
- Semantic similarity modeling
- Score fusion and ranking strategies
- End-to-end RAG system design
- AI explainability layer integration
- API integration for AI recommendations

---

### 🔹 Patel Harsh Satishkumar (202518011)  
**Role: Data Cleaning, Storage, API Layer, RAG Pipeline, System Integration, API Integration, Output Validation & Frontend Alignment**

- Database schema design  
- Cleaning and normalization of scraped data  
- Handling missing and noisy HTML content  
- FastAPI-based read-only API development  
- Documentation and project structuring
- Score fusion and ranking strategies
- End-to-end RAG system design
- AI explainability layer integration
- LLM response handling and validation
- Structured output enforcement
- API integration for AI recommendations
- Frontend–backend data flow alignment
- Performance and reliability improvements

---

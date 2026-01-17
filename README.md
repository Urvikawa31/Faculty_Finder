# Faculty Finder – Data Engineering Pipeline

## Overview
**Faculty Finder** is an end-to-end **Data Engineering project** that builds a scalable pipeline to discover, extract, store, and serve faculty information from a university website. The system prepares high-quality data for downstream **semantic search and NLP-based applications**.

This repository focuses on **Phase 1: Data Engineering**, covering ingestion, storage, and serving layers using industry best practices.

---

## Problem Statement
Faculty expertise information is scattered across unstructured HTML pages and multiple directories. Traditional keyword-based search fails to identify relevant faculty members when exact terms are missing.

Before applying NLP or semantic search, a **robust, reproducible data pipeline** is required to extract and organize this information.

---

## Solution
This project implements a **production-style ETL pipeline** that:

- Crawls multiple faculty directories
- Extracts structured and semi-structured data from profile pages
- Stores **raw HTML content** for future processing
- Exposes data via **REST APIs** for downstream consumption

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
FastAPI (Read-Only APIs)<br>

---

## 🧩 Pipeline Components

### 1️ Ingestion
- Crawls multiple faculty directories:
  - Regular Faculty
  - Adjunct Faculty
  - International Adjunct Faculty
  - Distinguished Professors
  - Professors of Practice
- Dynamically discovers profile URLs
- Handles pagination, missing fields, and inconsistent layouts

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

### 3️ Storage
- SQLite database for lightweight persistence
- Schema-driven design
- Raw HTML stored as TEXT fields (Bronze Layer)
- Safe re-runs using unique constraints

---

### 4️ Serving (API Layer)
A **FastAPI-based read-only API** provides access to stored data:

| Endpoint | Description |
|--------|------------|
| `GET /faculty` | Fetch all faculty records |
| `GET /faculty/{id}` | Fetch faculty by ID |
| `GET /faculty/category/{category}` | Filter by faculty category |

Swagger UI available at:

###  Repository Structure

faculty-finder/<br>
│<br>
├── api/<br>
│ └── main.py<br>
│<br>
├── ingestion/<br>
│ ├── discover_urls.py<br>
│ ├── scrape_faculty.py<br>
│ └── pycache/<br>
│<br>
├── logs/<br>
│ ├── llm_usage.md<br>
│ └── scraper.log<br>
│<br>
├── storage/<br>
│ ├── db.py<br>
│ ├── schema.sql<br>
│ ├── init_db.py<br>
│ └── faculty.db<br>
│<br>
├── transformation/<br>
│<br>
├── run_pipeline.py<br>
├── requirements.txt<br>
└── README.md<br>

##  How to Run

### 1️ Create Virtual Environment & Install Dependencies
```bash
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
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

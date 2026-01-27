# Faculty Finder – Data Engineering Pipeline

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

## Team & Contributions

### Group Name  
**Infraglyph**

---

### Team Members

| Name | Roll Number |
|------|-------------|
| **Urvi Kava** | 202518006 |
| **Patel Harsh Satishkumar** | 202518011 |

---

### 🔹 Urvi Kawa (202518006)  
**Role: Data Ingestion & Pipeline Infrastructure**

- Faculty URL discovery and crawling  
- Handling inconsistent website structure and real-world edge cases  
- Profile-level HTML scraping  
- HTTP robustness (retry mechanism and exponential backoff)  
- Database persistence and pipeline orchestration  

---

### 🔹 Patel Harsh Satishkumar (202518011)  
**Role: Data Cleaning, Storage & API Layer**

- Database schema design  
- Cleaning and normalization of scraped data  
- Handling missing and noisy HTML content  
- FastAPI-based read-only API development  
- Documentation and project structuring  

---

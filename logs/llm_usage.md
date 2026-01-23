# LLM Usage Log

## Project
Faculty Finder – End-to-End Data Engineering Pipeline for Semantic Faculty Search

---

## Why This Log Exists

This project **used a Large Language Model (LLM)** during development.  
The LLM was used to take some unique points to be added in project to make it more efficient and error handling with some block of code was used that LLM Suggested.

The developer:
- Controlled all prompts
- Choose what to implement or discard
- Debugged and validated outputs independently
- Modified or rewrote all suggested code

This log documents **where and how the LLM was realistically used**.
---

## Usage Timeline (Honest Engineering Record)

---

### Entry 01 — Initial Architecture Design

**Stage:** Project Planning  
**Date:** 2026-01-16

**Why LLM Was Used:**  
To sanity-check the overall pipeline design before writing code.

**Prompt Type:**  
“How should a data engineering pipeline be structured for faculty semantic search?”

**LLM Contribution:**  
Suggested separation into:
- Ingestion
- Storage
- Transformation
- Serving

**Human Debugging / Decision:**  
Adjusted the design to:
- Persist raw HTML
- Defer cleaning
- Run transformation as an independent phase  
This avoided irreversible data loss.

---

### Entry 02 — Web Scraping Failures

**Stage:** Ingestion  
**Date:** 2026-01-16

**Problem:**  
SQLite insert errors caused by BeautifulSoup `Tag` objects.

**Prompt Type:**  
“Why does SQLite reject BeautifulSoup objects?”

**LLM Contribution:**  
Identified the issue as unsupported data types and suggested casting to string.

**What Actually Happened:**  
- Initial LLM suggestion caused silent truncation
- Developer inspected DB manually
- Refined logic to preserve raw HTML as text

**Outcome:**  
LLM pointed to the problem  
Human fixed the implementation

---

### Entry 03 — Missing Faculty Profiles

**Stage:** Ingestion  
**Date:** 2026-01-17

**Problem:**  
Not all faculty were discovered across multiple directories.

**Prompt Type:**  
“How to handle pagination and multiple faculty directories?”

**LLM Contribution:**  
Suggested crawling multiple base URLs.

**Human Debugging:**  
- Inspected HTML manually
- Identified inconsistent link patterns
- Added URL normalization and deduplication logic

**Outcome:**  
LLM provided direction  
Human handled site-specific quirks

---

### Entry 04 — Data Cleaning Confusion

**Stage:** Transformation  
**Date:** 2026-01-18

**Problem:**  
Uncertainty whether cleaning should occur during scraping or after storage.

**Prompt Type:**  
“Is transformation part of a data engineering pipeline?”

**LLM Contribution:**  
Explained conceptual separation.

**Human Decision:**  
Chose to:
- Store raw HTML
- Run `run_transformation.py` independently  
This allowed re-processing without re-scraping.

---

### Entry 05 — Empty Documents & Null Handling

**Stage:** Transformation  
**Date:** 2026-01-19

**Problem:**  
Some faculty profiles contained no usable text.

**Prompt Type:**  
“How to handle empty or malformed documents?”

**LLM Contribution:**  
Suggested replacing empty text with `None`.

**Human Debugging:**  
- Verified empty records manually
- Preserved nulls for transparency
- Marked empty profiles explicitly

**Outcome:**  
Data integrity preserved for downstream NLP tasks

---

### Entry 06 — Database Validation

**Stage:** Testing  
**Date:** 2026-01-20

**Problem:**  
Needed confidence that data was actually stored correctly.

**Prompt Type:**  
“Provide a simple way to inspect SQLite contents.”

**LLM Contribution:**  
Suggested basic SELECT queries.

**Human Extension:**  
Created `run_test.py` with:
- Table listing
- Row counts
- Sample inspection
- Raw vs cleaned validation

---

### Entry 07 — API Exposure Decision

**Stage:** Serving  
**Date:** 2026-01-21

**Problem:**  
Whether API should expose raw or cleaned data.

**Prompt Type:**  
“Should APIs serve transformed data?”

**LLM Contribution:**  
Outlined pros and cons.

**Human Decision:**  
- API serves cleaned data
- Raw data retained internally
- Future vector embeddings use cleaned text

---

## What the LLM Did NOT Do

- Did NOT scrape websites
- Did NOT design schemas autonomously
- Did NOT decide architecture alone
- Did NOT run or deploy code
- Did NOT validate outputs

---

## Final Declaration

This project represents **human-led engineering with LLM assistance**.

The LLM accelerated thinking, debugging, and learning —  
but **every critical decision, implementation, and validation was performed manually**.

**Developer:** Harsh Patel and Urvi Kawa<br>
**Role:** Data Engineer / Data Scientist  
**Project:** Faculty Finder

---

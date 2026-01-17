-- =====================================================
-- Faculty Finder : Phase 1 (Data Engineering)
-- SQLite Schema
-- =====================================================

DROP TABLE IF EXISTS faculty;

CREATE TABLE faculty (
    faculty_id INTEGER PRIMARY KEY AUTOINCREMENT,

    -- Identity
    name TEXT NOT NULL,
    profile_url TEXT NOT NULL UNIQUE,
    faculty_category TEXT NOT NULL,

    -- Media
    image_url TEXT,

    -- Contact & Background
    education TEXT,
    phone TEXT,
    address TEXT,
    email TEXT,

    -- Academic Content
    biography TEXT,
    specialization TEXT,
    publications TEXT,
    teaching TEXT,
    research TEXT,

    -- Metadata
    last_scraped_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
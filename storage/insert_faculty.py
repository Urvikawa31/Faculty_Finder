import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from .db import get_connection

INSERT_QUERY = """
INSERT OR IGNORE INTO faculty (
    name, profile_url, faculty_category, image_url,
    education, phone, address, email,
    biography, specialization, publications, teaching, research
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
"""

def insert_faculty(record: dict):
    values = (
        record["name"],
        record["profile_url"],
        record["faculty_category"],
        record["image_url"],
        record["education"],
        record["phone"],
        record["address"],
        record["email"],
        record["biography"],
        record["specialization"],
        record["publications"],
        record["teaching"],
        record["research"],
    )

    with get_connection() as conn:
        conn.execute(INSERT_QUERY, values)
        conn.commit()
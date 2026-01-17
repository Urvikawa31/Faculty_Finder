import re
import html
from bs4 import BeautifulSoup
from storage.db import get_connection


def clean_html_field(raw_html: str) -> str | None:
    """
    Clean HTML-heavy fields:
    biography, specialization, research, publications, teaching
    """
    if not raw_html:
        return None

    # Decode HTML entities
    raw_html = html.unescape(raw_html)

    soup = BeautifulSoup(raw_html, "lxml")

    # Remove noisy / non-semantic tags
    for tag in soup(["script", "style", "table", "sup"]):
        tag.decompose()

    text = soup.get_text(separator=" ")

    # Normalize whitespace
    text = re.sub(r"\s+", " ", text)

    return text.strip() if text.strip() else None


def clean_plain_text(text: str) -> str | None:
    """
    Clean already-plain text fields:
    education, address
    """
    if not text:
        return None

    text = html.unescape(text)
    text = text.replace("\u00a0", " ")
    text = re.sub(r"\s+", " ", text)

    return text.strip() if text.strip() else None


def clean_all_faculty_fields():
    """
    Clean ALL faculty fields IN-PLACE.
    No schema change. No new columns.
    """
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            faculty_id,
            biography,
            specialization,
            research,
            publications,
            teaching,
            education,
            address
        FROM faculty
    """)

    rows = cur.fetchall()

    for row in rows:
        cur.execute("""
            UPDATE faculty
            SET
                biography = ?,
                specialization = ?,
                research = ?,
                publications = ?,
                teaching = ?,
                education = ?,
                address = ?
            WHERE faculty_id = ?
        """, (
            clean_html_field(row["biography"]),
            clean_html_field(row["specialization"]),
            clean_html_field(row["research"]),
            clean_html_field(row["publications"]),
            clean_html_field(row["teaching"]),
            clean_plain_text(row["education"]),
            clean_plain_text(row["address"]),
            row["faculty_id"]
        ))

    conn.commit()
    conn.close()

    print("[CLEANING] All faculty fields cleaned successfully.")


if __name__ == "__main__":
    clean_all_faculty_fields()
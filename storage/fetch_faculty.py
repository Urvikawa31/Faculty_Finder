import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from storage.db import get_connection

def fetch_faculty_by_id(faculty_id: int):
    query = """
    SELECT
        faculty_id,
        name,
        faculty_category,
        image_url,
        education,
        phone,
        email,
        address
    FROM faculty
    WHERE faculty_id = ?
    """

    with get_connection() as conn:
        row = conn.execute(query, (faculty_id,)).fetchone()

    if row is None:
        return None

    return dict(row)
import sys
import os
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from storage.db import get_connection


def view_entire_database(limit: int | None = None):
    """
    Print the entire faculty table for inspection.
    Set limit=None to print all rows.
    """
    conn = get_connection()
    cur = conn.cursor()

    query = "SELECT * FROM faculty"
    if limit:
        query += f" LIMIT {limit}"

    cur.execute(query)
    rows = cur.fetchall()

    print(f"\n[DB TEST] Total rows fetched: {len(rows)}\n")

    for row in rows:
        print("-" * 80)
        for key in row.keys():
            value = row[key]

            # Truncate very long text for readability
            if isinstance(value, str) and len(value) > 300:
                value = value[:300] + " ... [TRUNCATED]"

            print(f"{key}: {value}")

    conn.close()


if __name__ == "__main__":
    # Set limit=None to print everything
    # Or set limit=5 for quick inspection
    view_entire_database(limit=None)
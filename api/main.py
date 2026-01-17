from fastapi import FastAPI, HTTPException
from storage.db import get_connection

app = FastAPI(
    title="Faculty Finder API",
    description="Read-only API serving faculty data",
    version="1.0"
)

# Adding endpoint to get all faculty
@app.get('/faculty')
def get_all_faculty():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT * FROM faculty")
    rows = cur.fetchall()
    conn.close()

    return [dict(row) for row in rows]


# Adding endpoint to get faculty by id
@app.get("/faculty/{faculty_id}")
def get_faculty_by_id(faculty_id: int):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT * FROM faculty WHERE faculty_id = ?",
        (faculty_id,)
    )
    row = cur.fetchone()
    conn.close()

    if row is None:
        raise HTTPException(status_code=404, detail="Faculty not found")
    
    return dict(row)


# Adding endpoint of filter by category
@app.get("/faculty/category/{category}")
def get_faculty_by_category(category: str):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT * FROM faculty WHERE faculty_category = ?",
        (category,)
    )
    rows = cur.fetchall()
    conn.close()

    return [dict(row) for row in rows]
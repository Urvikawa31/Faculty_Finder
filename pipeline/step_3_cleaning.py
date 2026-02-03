import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import pandas as pd
import sqlite3
from pathlib import Path
from cleaning.clean_faculty_records import clean_html_field

DB_PATH = Path("storage/faculty.db")
OUTPUT_DIR = Path("data/processed")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

OUTPUT_CSV = OUTPUT_DIR / "clean_faculty_data.csv"


def run_cleaning():
    print("\n[STEP 3] DATA CLEANING STARTED\n")

    conn = sqlite3.connect(DB_PATH)
    df = pd.read_sql("SELECT * FROM faculty", conn)
    conn.close()

    TEXT_COLUMNS = [
        "biography", "specialization", "teaching",
        "research", "publications"
    ]

    for col in TEXT_COLUMNS:
        df[col] = df[col].apply(clean_html_field)

    df.to_csv(OUTPUT_CSV, index=False, encoding="utf-8")

    print(f"[STEP 3] CLEAN DATA SAVED TO: {OUTPUT_CSV}")
    print("[STEP 3] DATA CLEANING COMPLETED\n")


if __name__ == "__main__":
    run_cleaning()
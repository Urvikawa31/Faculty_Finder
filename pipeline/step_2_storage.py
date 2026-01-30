import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import pandas as pd
from ingestion.discover_urls import discover_faculty_urls
from ingestion.scrape_faculty import scrape_faculty_profile
from storage.insert_faculty import insert_faculty
from pathlib import Path

RAW_CSV = Path("data/raw/raw_faculty_data.csv")


def run_storage():
    print("\n[STEP 2] DATA STORAGE STARTED\n")

    if not RAW_CSV.exists():
        raise FileNotFoundError("Raw CSV not found. Run Step 1 first.")

    df = pd.read_csv(RAW_CSV)

    for _, row in df.iterrows():
        insert_faculty(row.to_dict())

    print("[STEP 2] DATA STORED INTO SQLITE DATABASE\n")


if __name__ == "__main__":
    run_storage()
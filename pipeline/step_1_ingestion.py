import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import pandas as pd
from ingestion.discover_urls import discover_faculty_urls
from ingestion.scrape_faculty import scrape_faculty_profile
from pathlib import Path

RAW_DATA_PATH = Path("data/raw")
RAW_DATA_PATH.mkdir(parents=True, exist_ok=True)

OUTPUT_CSV = RAW_DATA_PATH / "raw_faculty_data.csv"


def run_ingestion():
    print("\n[STEP 1] DATA INGESTION STARTED\n")

    faculty_urls = discover_faculty_urls()
    records = []

    for f in faculty_urls:
        try:
            data = scrape_faculty_profile(
                f["profile_url"],
                f["faculty_category"]
            )
            records.append(data)
            print(f"Scraped: {data['name']}")
        except Exception as e:
            print(f"[ERROR] {f['profile_url']} → {e}")

    df = pd.DataFrame(records)
    df.to_csv(OUTPUT_CSV, index=False, encoding="utf-8")

    print(f"\n[STEP 1] RAW DATA SAVED TO: {OUTPUT_CSV}")
    print("[STEP 1] DATA INGESTION COMPLETED\n")


if __name__ == "__main__":
    run_ingestion()
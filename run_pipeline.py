import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from ingestion.discover_urls import discover_faculty_urls
from ingestion.scrape_faculty import scrape_faculty_profile
from storage.insert_faculty import insert_faculty

def main():
    faculty_urls = discover_faculty_urls()
    print(f"Discovered {len(faculty_urls)} faculty profiles")

    for f in faculty_urls:
        try:
            data = scrape_faculty_profile(
                f["profile_url"],
                f["faculty_category"]
            )
            insert_faculty(data)
            print(f"Inserted: {data['name']}")
        except Exception as e:
            print(f"[ERROR] {f['profile_url']} -> {e}")

if __name__ == "__main__":
    main()
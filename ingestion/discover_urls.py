import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

BASE_URL = "https://www.daiict.ac.in"

SEED_URLS = {
    "regular_faculty": "/faculty",
    "adjunct_faculty": "/adjunct-faculty",
    "adjunct_faculty_international": "/adjunct-faculty-international",
    "distinguished_professor": "/distinguished-professor",
    "professor_of_practice": "/professor-practice"
}

HEADERS = {
    "User-Agent": "FacultyFinderBot/1.0"
}

def discover_faculty_urls():
    discovered = {}

    for category, path in SEED_URLS.items():
        seed_url = urljoin(BASE_URL, path)
        print(f"[INFO] Crawling {seed_url}")

        resp = requests.get(seed_url, headers=HEADERS, timeout=15)
        resp.raise_for_status()

        soup = BeautifulSoup(resp.text, "lxml")

        for a in soup.find_all("a", href=True):
            href = a["href"]
            full_url = urljoin(BASE_URL, href)

            parsed = urlparse(full_url)

            if parsed.path.startswith(path + "/"):
                discovered[full_url] = {
                    "profile_url": full_url,
                    "faculty_category": category
                }

    return list(discovered.values())


if __name__ == "__main__":
    urls = discover_faculty_urls()
    print(f"Discovered {len(urls)} faculty profiles")
    for u in urls:
        print(u)

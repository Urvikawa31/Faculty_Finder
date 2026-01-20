from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from ingestion.http_client import get_session

BASE_URL = "https://www.daiict.ac.in"

SEED_URLS = {
    "regular_faculty": "/faculty",
    "adjunct_faculty": "/adjunct-faculty",
    "adjunct_faculty_international": "/adjunct-faculty-international",
    "distinguished_professor": "/distinguished-professor",
    "professor_of_practice": "/professor-practice"
}

PROFILE_PREFIXES = [
    "/faculty/",
    "/adjunct-faculty/",
    "/adjunct-faculty-international/",
    "/distinguished-professor/",
    "/professor-practice/"
]

session = get_session()


def discover_faculty_urls():
    discovered = {}

    for category, path in SEED_URLS.items():
        seed_url = urljoin(BASE_URL, path)
        print(f"[INFO] Crawling {seed_url}")

        resp = session.get(seed_url)
        if resp.status_code != 200:
            print(f"[WARN] Failed to fetch {seed_url}: {resp.status_code}")
            continue

        soup = BeautifulSoup(resp.text, "lxml")

        # Changes done in it by Harsh
        for a in soup.find_all("a", href=True):
            raw_href = a["href"]

            # Normalize URL (handles relative + absolute)
            full_url = urljoin(BASE_URL, raw_href)
            parsed = urlparse(full_url)

            # Only accept DAIICT internal links
            if parsed.netloc != "www.daiict.ac.in":
                continue

            # Check faculty profile path
            if any(parsed.path.startswith(prefix) for prefix in PROFILE_PREFIXES):

                if full_url not in discovered:
                    discovered[full_url] = {
                        "profile_url": full_url,
                        # CATEGORY COMES FROM SOURCE PAGE
                        "faculty_category": category
                    }

    return list(discovered.values())


if __name__ == "__main__":
    urls = discover_faculty_urls()
    print(f"\nDiscovered {len(urls)} faculty profiles\n")
    for u in urls:
        print(u)
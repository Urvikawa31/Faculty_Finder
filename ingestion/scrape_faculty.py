from ingestion.http_client import get_session
from bs4 import BeautifulSoup

BASE_URL = "https://www.daiict.ac.in"
session = get_session()

def clean_text(text):
    if not text:
        return None
    return " ".join(text.split())

def scrape_faculty_profile(profile_url, faculty_category):
    resp = session.get(profile_url)

    if resp.status_code != 200:
        raise RuntimeError(
            f"Failed to fetch profile ({resp.status_code}): {profile_url}"
        )

    soup = BeautifulSoup(resp.text, "lxml")

    # ---------- BASIC INFO ----------
    name_tag = soup.select_one("div.field--name-field-faculty-names")
    name = clean_text(name_tag.get_text()) if name_tag else None

    img_tag = soup.select_one("div.field--name-field-faculty-image img")
    image_url = BASE_URL + img_tag["src"] if img_tag else None

    education = clean_text(
        soup.select_one("div.field--name-field-faculty-name").get_text()
        if soup.select_one("div.field--name-field-faculty-name")
        else None
    )

    phone = clean_text(
        soup.select_one("div.field--name-field-contact-no").get_text()
        if soup.select_one("div.field--name-field-contact-no")
        else None
    )

    address = clean_text(
        soup.select_one("div.field--name-field-address").get_text()
        if soup.select_one("div.field--name-field-address")
        else None
    )

    email = clean_text(
        soup.select_one("div.field--name-field-email div.field__item").get_text()
        if soup.select_one("div.field--name-field-email div.field__item")
        else None
    )

    # ---------- RAW HTML SECTIONS (WITH TAGS) ----------

    biography_block = soup.select_one("div.field--name-field-biography")
    biography = biography_block.decode_contents() if biography_block else None

    specialization_block = soup.select_one("div.specializationIcon + div.work-exp")
    specialization = specialization_block.decode_contents() if specialization_block else None

    teaching_block = soup.select_one("div.field--name-field-teaching")
    teaching = teaching_block.decode_contents() if teaching_block else None

    research_block = soup.select_one("div.work-exp1 div.field--type-text-with-summary")
    research = research_block.decode_contents() if research_block else None

    publications_block = soup.select_one("div.education.overflowContent")
    publications = publications_block.decode_contents() if publications_block else None

    return {
        "name": name,
        "profile_url": profile_url,
        "faculty_category": faculty_category,
        "image_url": image_url,
        "education": education,
        "phone": phone,
        "address": address,
        "email": email,
        "biography": biography,         
        "specialization": specialization,
        "teaching": teaching,
        "research": research,
        "publications": publications    
    }

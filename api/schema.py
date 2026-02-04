from pydantic import BaseModel
from typing import List, Optional

class SearchRequest(BaseModel):
    query: str
    top_k: int = 5


class FacultyResult(BaseModel):
    rank: int
    name: str
    category: str
    reason: str

    image_url: Optional[str]
    education: Optional[str]
    phone: Optional[str]
    email: Optional[str]
    address: Optional[str]


class SearchResponse(BaseModel):
    query: str
    results: List[FacultyResult]
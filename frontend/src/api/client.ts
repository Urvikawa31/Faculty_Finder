const API_BASE = "http://127.0.0.1:8000";

export async function searchFaculty(query: string, top_k = 5) {
  const res = await fetch(`${API_BASE}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, top_k })
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  return res.json();
}

export async function fetchFacultyById(id: string) {
  const res = await fetch(`${API_BASE}/faculty/${id}`);
  if (!res.ok) throw new Error("Faculty not found");
  return res.json();
}

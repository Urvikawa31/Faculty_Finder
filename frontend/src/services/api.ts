const BASE_URL = "https://9a6c-2409-40c1-6435-24b8-647c-528d-71ac-3dd7.ngrok-free.app";

export async function searchFaculty(query: string, top_k = 5) {
  const res = await fetch(`${BASE_URL}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, top_k }),
  });

  if (!res.ok) throw new Error("Search failed");
  return res.json();
}

export async function fetchAllFaculty() {
  const res = await fetch(`${BASE_URL}/faculty`);
  return res.json();
}

export async function fetchFacultyByCategory(category: string) {
  const res = await fetch(`${BASE_URL}/faculty/category/${category}`);
  return res.json();
}

export async function fetchFacultyById(id: string) {
  const res = await fetch(`${BASE_URL}/faculty/${id}`);
  return res.json();
}

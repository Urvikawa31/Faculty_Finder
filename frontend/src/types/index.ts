export interface SearchFacultyResult {
  rank: number;
  faculty_id: string;
  name: string;
  category: string;
  reason: string;
  image_url: string | null;
  education: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
}

export interface SearchResponse {
  query: string;
  results: SearchFacultyResult[];
}

export interface Faculty {
  faculty_id: number;
  name: string;
  faculty_category: string;
  image_url: string | null;
  education: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  biography?: string | null;
  specialization?: string | null;
  publications?: string | null;
  teaching?: string | null;
  research?: string | null;
}

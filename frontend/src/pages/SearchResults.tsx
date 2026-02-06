import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface SearchResultsProps {
  query: string;
  cachedResults: any[] | null;
  setCachedResults: (results: any[] | null) => void;
  onNavigate: (page: string, id?: string) => void;
}

export default function SearchResults({
  query,
  cachedResults,
  setCachedResults,
  onNavigate
}: SearchResultsProps) {
  const [localQuery, setLocalQuery] = useState(query);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNewSearch = () => {
    if (!localQuery.trim()) return;
    setCachedResults(null);
    onNavigate('results', localQuery);
  }

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  // 🔥 Fetch ONLY if results not cached
  useEffect(() => {
    if (!query || cachedResults !== null) return;

    setLoading(true);
    fetch('https://9a6c-2409-40c1-6435-24b8-647c-528d-71ac-3dd7.ngrok-free.app/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, top_k: 5 })
    })
      .then(res => res.json())
      .then(data => {
        setCachedResults(data.results);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch faculty recommendations');
        setLoading(false);
      });
  }, [query]);

  const results = cachedResults || [];

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-600 text-lg">
        Finding best faculty for your research…
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Faculty Recommendations
      </h1>

      <div className="mb-8 bg-white rounded-lg shadow p-4 flex gap-3">
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Refine your research interest (e.g. NLP, ML in healthcare)"
          className="flex-1 px-4 py-2 border rounded-md outline-none"
        />
        <button
          onClick={handleNewSearch}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          Search
        </button>
      </div>


      {results.map((faculty) => (
        <div
          key={faculty.faculty_id}
          className="bg-white rounded-xl shadow-md p-6 flex gap-6 hover:shadow-lg transition"
        >
          {/* LEFT: Image + Rank */}
          <div className="relative flex-shrink-0">
            <img
              src={faculty.image_url}
              alt={faculty.name}
              className="w-32 h-32 rounded-lg object-cover border"
            />
            <div className="absolute -top-3 -left-3 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
              {faculty.rank}
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {faculty.name}
                </h2>
                <span className="inline-block mt-1 px-3 py-1 bg-green-100 text-green-700 text-sm rounded">
                  {faculty.category.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* AI Reason */}
            <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-semibold text-blue-900 mb-1 flex items-center gap-2">
                💡 AI Recommendation
              </h4>
              <p className="text-blue-800 text-sm leading-relaxed">
                {faculty.reason}
              </p>
            </div>

            {/* Contact Preview */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
              {faculty.email && (
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-500" />
                  {faculty.email}
                </div>
              )}

              {faculty.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-gray-500" />
                  {faculty.phone}
                </div>
              )}

              {faculty.address && (
                <div className="flex items-center gap-2 col-span-2">
                  <MapPin size={16} className="text-gray-500" />
                  {faculty.address}
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="mt-5">
              <button
                onClick={() =>
                  onNavigate('faculty', String(faculty.faculty_id), 'results')
                }
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition font-medium"
              >
                View Full Profile
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

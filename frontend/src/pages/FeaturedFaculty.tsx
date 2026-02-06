import { useEffect, useState } from 'react';

interface Faculty {
  faculty_id: number;
  name: string;
  image_url: string;
  specialization?: string;
  faculty_category: string;
}

function getTodayKey() {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
}

export default function FeaturedFaculty({
  onNavigate,
}: {
  onNavigate: (page: string, id?: string) => void;
}) {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = getTodayKey();
    const cached = localStorage.getItem('featuredFaculty');

    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.date === today) {
        setFaculty(parsed.data);
        setLoading(false);
        return;
      }
    }

    // Fetch once per day
    fetch('https://9a6c-2409-40c1-6435-24b8-647c-528d-71ac-3dd7.ngrok-free.app/faculty/category/regular_faculty')
      .then(res => res.json())
      .then((data: Faculty[]) => {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4);

        localStorage.setItem(
          'featuredFaculty',
          JSON.stringify({
            date: today,
            data: selected,
          })
        );

        setFaculty(selected);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || faculty.length === 0) return null;

  return (
    <section id = "featured-faculty" className="max-w-7xl mx-auto px-4 py-14">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Featured Faculty</h2>

        <button
          onClick={() => onNavigate('faculty-list')}
          className="text-green-600 font-medium hover:underline"
        >
          View All →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {faculty.map(f => (
          <div
            key={f.faculty_id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-5"
          >
            <img
              src={f.image_url}
              alt={f.name}
              className="w-full h-44 object-cover rounded-lg mb-4"
            />

            <h3 className="text-lg font-semibold">{f.name}</h3>

            <span className="inline-block mt-1 mb-2 px-3 py-1 text-xs bg-green-100 text-green-700 rounded">
              Regular Faculty
            </span>

            {f.specialization && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {f.specialization}
              </p>
            )}

            <button
              onClick={() => onNavigate('faculty', String(f.faculty_id), 'home')}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

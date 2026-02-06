import { useEffect, useState } from 'react';

interface Faculty {
  faculty_id: number;
  name: string;
  faculty_category: string;
  image_url: string;
  education: string;
  phone: string;
  address: string;
  email: string;
  specialization: string;
}

export default function FacultyList({
  onNavigate
}: {
  onNavigate: (page: string, id?: string, from?: string) => void;
}) {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [category, setCategory] = useState('regular_faculty');

  useEffect(() => {
    fetch(`https://9a6c-2409-40c1-6435-24b8-647c-528d-71ac-3dd7.ngrok-free.app/faculty/category/${category}`)
      .then(res => res.json())
      .then(setFaculty);
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Faculty Directory</h1>

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="regular_faculty">Regular Faculty</option>
          <option value="adjunct_faculty">Adjunct Faculty</option>
          <option value="adjunct_faculty_international">International Adjunct</option>
          <option value="distinguished_professor">Distinguished Professor</option>
          <option value="professor_of_practice">Professor of Practice</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faculty.map(f => (
          <div key={f.faculty_id} className="bg-white rounded-lg shadow-md p-5">
            <img
              src={f.image_url}
              alt={f.name}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />

            <h2 className="text-xl font-semibold">{f.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{f.education}</p>

            <p className="text-sm text-gray-700">
              <strong>Specialization:</strong> {f.specialization}
            </p>

            <p className="text-sm mt-2">📞 {f.phone}</p>
            <p className="text-sm">✉️ {f.email}</p>

            <button
              onClick={() =>
                onNavigate('faculty', String(f.faculty_id), 'faculty-list')
              }
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            >
              View Full Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

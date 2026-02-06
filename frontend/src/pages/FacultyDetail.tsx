import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface Props {
  facultyId: string;
  onNavigate: (page: string) => void;
}

export default function FacultyDetail({ facultyId, onNavigate }: Props) {
  const [faculty, setFaculty] = useState<any>(null);

  useEffect(() => {
    fetch(`https://9a6c-2409-40c1-6435-24b8-647c-528d-71ac-3dd7.ngrok-free.app/faculty/${facultyId}`)
      .then(res => res.json())
      .then(setFaculty);
  }, [facultyId]);

  if (!faculty) return <div className="p-10 text-center">Loading...</div>;

  const handleBack = () => {
    const from = window.history.state?.from;

    if (from === 'faculty-list') {
      onNavigate('faculty-list');
    } 
    else if (from === 'results') {
      onNavigate('results');
    } 
    else {
      // default → home (featured)
      onNavigate('home');

      // 👇 scroll back to featured section
      setTimeout(() => {
        document
          .getElementById('featured-faculty')
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={handleBack}
        className="text-green-600 font-medium mb-6"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <aside className="bg-white p-6 rounded shadow">
          <img src={faculty.image_url} className="rounded mb-4" />
          <h2 className="text-xl font-bold">{faculty.name}</h2>
          <p className="text-sm text-gray-600">{faculty.faculty_category}</p>

          <div className="mt-4 space-y-2 text-sm">
            <p className="flex gap-2"><Mail size={14}/> {faculty.email}</p>
            <p className="flex gap-2"><Phone size={14}/> {faculty.phone}</p>
            <p className="flex gap-2"><MapPin size={14}/> {faculty.address}</p>
          </div>
        </aside>

        <main className="md:col-span-2 space-y-4">
          <Section title="Biography" content={faculty.biography} />
          <Section title="Education" content={faculty.education} />
          <Section title="Specialization" content={faculty.specialization} />
          <Section title="Teaching" content={faculty.teaching} />
          <Section title="Publications" content={faculty.publications} />
          <Section title="Research" content={faculty.research} />
        </main>
      </div>
    </div>
  );
}

function Section({ title, content }: any) {
  if (!content) return null;
  return (
    <div className="bg-white p-5 rounded shadow">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 whitespace-pre-line">{content}</p>
    </div>
  );
}

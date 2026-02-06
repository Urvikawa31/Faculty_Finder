import { useState } from 'react';
import { Search, ArrowRight, Database, Brain, TrendingUp, Users } from 'lucide-react';
import FeaturedFaculty from './FeaturedFaculty';

interface HomeProps {
  onNavigate: (page: string, query?: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    onNavigate('results', searchQuery);
  };

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="bg-gradient-to-r from-green-700 via-green-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Find the Right Faculty for Your Research — Using AI
            </h1>
            <p className="text-xl text-green-50 mb-8">
              Discover faculty expertise beyond titles using intelligent semantic search.
            </p>

            <div className="bg-white rounded-lg shadow-xl p-3 flex gap-2 max-w-3xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search research interests (e.g. Natural Language Processing, Computer Vision)"
                className="flex-1 px-4 py-3 text-gray-800 outline-none"
              />
              <button
                onClick={handleSearch}
                className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
              >
                <Search size={20} />
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatCard icon={<Users size={32} />} value={"111"} label="Total Faculty Indexed" />
            <StatCard icon={<Users size={32} />} value={"68"} label="Regular Faculty" />
            <StatCard icon={<Users size={32} />} value={"26"} label="Adjunct Faculty" />
            <StatCard icon={<Users size={32} />} value={"11"} label="International Adjunct Faculty" />
            <StatCard icon={<Users size={32} />} value={"4"} label="Professor of Practice" />
            <StatCard icon={<Users size={32} />} value={"2"} label="Distinguished Professor" />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <HowCard
              icon={<Database size={40} />}
              title="1. Data Engineering"
              text="Crawling and cleaning faculty profiles from institutional databases."
            />
            <HowCard
              icon={<Brain size={40} />}
              title="2. AI Retrieval"
              text="Semantic + keyword search using embeddings for intelligent discovery."
            />
            <HowCard
              icon={<TrendingUp size={40} />}
              title="3. Intelligent Ranking"
              text="AI explains why each faculty member is recommended."
            />
          </div>
        </div>
      </section>

      {/* ⭐ FEATURED FACULTY (FINAL) */}
      <FeaturedFaculty onNavigate={onNavigate} />

      {/* WHY THIS SYSTEM */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why This System</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <WhyItem title="Research-Aware Retrieval" text="Understands research context, not just keywords." />
            <WhyItem title="Field-Weighted Relevance" text="Prioritizes domain expertise and publications." />
            <WhyItem title="LLM-Based Explanations" text="Clear reasoning for each recommendation." />
            <WhyItem title="Real Institutional Data" text="Built from actual university faculty profiles." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-green-700 to-teal-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Research Mentor?</h2>
          <p className="text-xl text-green-50 mb-8">
            Start searching for faculty members who match your research interests
          </p>
          <button
            onClick={() => onNavigate('search')}
            className="bg-white text-green-700 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-medium text-lg"
          >
            Start Searching
          </button>
        </div>
      </section>
    </div>
  );
}

/* ---------- SMALL REUSABLE COMPONENTS ---------- */

function StatCard({ icon, value, label }: any) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
        {icon}
      </div>
      <div className="text-3xl font-bold text-gray-800 mb-2">{value}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}

function HowCard({ icon, title, text }: any) {
  return (
    <div className="text-center">
      <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}

function WhyItem({ title, text }: any) {
  return (
    <div className="flex gap-4 items-start">
      <div className="bg-green-100 p-2 rounded">
        <ArrowRight className="text-green-600" size={24} />
      </div>
      <div>
        <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
        <p className="text-gray-600 text-sm">{text}</p>
      </div>
    </div>
  );
}

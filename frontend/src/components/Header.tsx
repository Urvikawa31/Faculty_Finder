import { Search } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'faculty-list', label: 'Faculty' }, // ✅ FIXED
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'insights', label: 'Data Insights' },
    { id: 'about', label: 'About' }
  ];

  return (
    <>

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center gap-4">
                <img src="/src/assets/infraglyph.webp" alt="Infraglyph Logo" className="w-[60px] h-[60px] rounded-full object-cover"/>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Faculty Finder</h1>
                <p className="text-sm text-gray-600">
                  AI Research Collaboration Platform
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'text-green-600 border-b-2 border-green-600 pb-1'
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* 🔥 AI Recommendation Button — KEEP SAME */}
              <button
                onClick={() => onNavigate('search')}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors font-medium"
              >
                Find Faculty
              </button>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import FacultyDetail from './pages/FacultyDetail';
import DataInsights from './pages/DataInsights';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import FacultyList from './pages/FacultyList';

type Page =
  | 'home'
  | 'search'
  | 'results'
  | 'faculty'
  | 'faculty-list'
  | 'how-it-works'
  | 'insights'
  | 'about';

type SearchResult = any;

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [facultyId, setFacultyId] = useState<string | null>(null);

  // 🔥 Cache recommendation results
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);

  const handleNavigate = (page: Page, param?: string, from?: Page) => {
    if (page === 'results' && param) {
      setSearchQuery(param);
      setSearchResults(null);
      setCurrentPage('results');
    } 
    else if (page === 'faculty' && param) {
      setFacultyId(param);
      setCurrentPage('faculty');

      // ✅ store source page safely
      window.history.replaceState({ from }, '');
    } 
    else {
      setCurrentPage(page);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'results':
        return (
          <SearchResults
            query={searchQuery}
            cachedResults={searchResults}
            setCachedResults={setSearchResults}
            onNavigate={handleNavigate}
          />
        );

      case 'faculty':
        return (
          facultyId && (
            <FacultyDetail
              facultyId={facultyId}
              onNavigate={handleNavigate}
            />
          )
        );

      case 'faculty-list':
        return <FacultyList onNavigate={handleNavigate} />;

      case 'how-it-works':
        return <HowItWorks />;

      case 'insights':
        return <DataInsights />;

      case 'about':
        return <About />;

      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;

import { BookOpen, Code, Database, Brain, Users, Shield } from 'lucide-react';

export default function About() {
  const technologies = [
    { name: 'FastAPI', description: 'High-performance backend framework', icon: Code },
    { name: 'SQLite', description: 'Lightweight database for faculty data', icon: Database },
    { name: 'BM25', description: 'Keyword-based retrieval algorithm', icon: BookOpen },
    { name: 'Vector Search', description: 'Semantic similarity matching', icon: Brain },
    { name: 'LLMs', description: 'AI-powered explanations', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-700 to-teal-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">About Faculty Finder</h1>
          <p className="text-xl text-green-50">
            AI-Powered Research Collaboration Platform
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Overview</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Faculty Finder is an intelligent research collaboration platform designed to bridge the gap between students and faculty members. Using advanced AI techniques, the system helps students discover faculty expertise that goes beyond simple keyword matching, enabling more meaningful research partnerships.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This platform addresses the challenge of finding the right research mentor by analyzing faculty profiles, publications, and research interests using state-of-the-art information retrieval and natural language processing techniques.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Problem Statement</h2>
          <div className="space-y-4 text-gray-700">
            <div className="flex gap-3">
              <span className="text-green-600 font-bold">•</span>
              <p>
                <strong>Information Overload:</strong> Students struggle to navigate through numerous faculty profiles to find relevant research mentors.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-green-600 font-bold">•</span>
              <p>
                <strong>Limited Discovery:</strong> Traditional search methods rely on exact keyword matching, missing semantically related expertise.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-green-600 font-bold">•</span>
              <p>
                <strong>Lack of Transparency:</strong> Existing systems don't explain why a particular faculty member is recommended for specific research interests.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-green-600 font-bold">•</span>
              <p>
                <strong>Inefficient Matching:</strong> Students may miss opportunities to collaborate with faculty whose expertise aligns with their interests but uses different terminology.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">System Architecture</h2>

          <div className="space-y-6">
            <div className="border-l-4 border-green-600 pl-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">1. Data Engineering Layer</h3>
              <p className="text-gray-700">
                Automated web scraping and data cleaning pipelines extract faculty information from institutional databases. The system processes unstructured data into a structured format suitable for retrieval.
              </p>
            </div>

            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">2. Retrieval Layer</h3>
              <p className="text-gray-700">
                Hybrid search combining BM25 (keyword-based) and vector embeddings (semantic) ensures comprehensive coverage. This approach captures both exact matches and conceptually similar content.
              </p>
            </div>

            <div className="border-l-4 border-teal-600 pl-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">3. AI Reasoning Layer</h3>
              <p className="text-gray-700">
                Large Language Models analyze the match between student queries and faculty profiles, generating human-readable explanations with confidence scores for each recommendation.
              </p>
            </div>

            <div className="border-l-4 border-orange-600 pl-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">4. Presentation Layer</h3>
              <p className="text-gray-700">
                Clean, intuitive web interface built with modern frameworks provides seamless user experience with responsive design and fast performance.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Technologies Used</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:border-green-500 transition-colors">
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-green-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{tech.name}</h3>
                  <p className="text-sm text-gray-600">{tech.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold text-gray-800 mb-3">Additional Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Python', 'Sentence Transformers', 'OpenAI API', 'REST API'].map((tech, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="bg-green-100 w-8 h-8 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Semantic Search</h4>
                  <p className="text-sm text-gray-600">Find faculty based on meaning, not just keywords</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-green-100 w-8 h-8 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">AI Explanations</h4>
                  <p className="text-sm text-gray-600">Understand why each faculty is recommended</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-green-100 w-8 h-8 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Confidence Scores</h4>
                  <p className="text-sm text-gray-600">Quantified relevance for each match</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="bg-green-100 w-8 h-8 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Comprehensive Profiles</h4>
                  <p className="text-sm text-gray-600">Complete faculty information in one place</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-green-100 w-8 h-8 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Data Analytics</h4>
                  <p className="text-sm text-gray-600">Insights into research landscape</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-green-100 w-8 h-8 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Responsive Design</h4>
                  <p className="text-sm text-gray-600">Works seamlessly on all devices</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="text-yellow-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">Academic Disclaimer</h3>
              <p className="text-yellow-800 text-sm leading-relaxed">
                This is an academic project developed for educational and research purposes. The system demonstrates the application of information retrieval and AI techniques in educational technology. All faculty data used is either publicly available or simulated for demonstration purposes. This platform is not officially affiliated with any institution and should be used as a proof of concept.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Urvi Kava</h3>
              <p className="text-gray-600 text-sm">Data Engieer & Data Scientist</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Harsh Patel</h3>
              <p className="text-gray-600 text-sm">Data Engieer & Data Scientist</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t flex items-center justify-center gap-3">
            <img src = "/src/assets/infraglyph.webp" sizes=""alt= "Infraglyph Logo" className="h-[60px] w-[60px] rounded-full object-cover"/>
            <p className="text-gray-700 font-large text-2xl font-bold">Group: Infraglyph</p>
          </div>
        </div>
      </div>
    </div>
  );
}

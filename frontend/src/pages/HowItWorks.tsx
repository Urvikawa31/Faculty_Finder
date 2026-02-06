import {
  Globe,
  Link2,
  FileCode,
  Database,
  Filter,
  Server,
  Brain,
  Search,
  Sparkles
} from 'lucide-react';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <section className="bg-gradient-to-r from-green-700 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">How the System Works</h1>
          <p className="text-green-50 max-w-3xl text-lg">
            An end-to-end data engineering and AI pipeline that transforms raw faculty web pages
            into explainable, research-aware recommendations.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-14">

        {/* ================= ETL PIPELINE ================= */}
        <SectionTitle
          icon={<Database className="text-green-600" />}
          title="Data Engineering Pipeline (ETL)"
          subtitle="From messy university websites to clean, queryable faculty data"
        />

        <PipelineStep
          icon={<Globe />}
          title="1. Web Crawling (Ingestion)"
          description={[
            'The pipeline crawls multiple official faculty directories across categories.',
            'Profile URLs are discovered dynamically instead of being hard-coded.',
            'Retry logic and URL normalization handle real-world website inconsistencies.'
          ]}
          why="University websites are not APIs — crawling is the only reliable ingestion strategy."
        />

        <PipelineStep
          icon={<Link2 />}
          title="2. Faculty URL Discovery"
          description={[
            'Extracts faculty profile links from category pages.',
            'Handles absolute and relative URLs automatically.',
            'Prevents duplicates using unique constraints.'
          ]}
          why="Ensures the pipeline adapts to site structure changes without manual intervention."
        />

        <PipelineStep
          icon={<FileCode />}
          title="3. Profile-Level Extraction"
          description={[
            'Each faculty profile page is parsed individually.',
            'Both structured and semi-structured fields are extracted.',
            'Raw HTML is preserved for future NLP and reprocessing.'
          ]}
          why="Raw HTML acts as a Bronze Layer — enabling re-cleaning without re-crawling."
        />

        <PipelineStep
          icon={<Filter />}
          title="4. Cleaning & Transformation"
          description={[
            'HTML tags and noisy markup are removed.',
            'Text is normalized for whitespace, encoding, and formatting.',
            'Missing and irregular fields are handled gracefully.'
          ]}
          why="Clean text is critical for high-quality embeddings and semantic retrieval."
        />

        <PipelineStep
          icon={<Database />}
          title="5. Storage (SQLite)"
          description={[
            'Lightweight SQLite database for persistence.',
            'Schema-driven design ensures data consistency.',
            'Supports safe re-runs with unique constraints.'
          ]}
          why="Balances simplicity and reliability for academic-scale datasets."
        />

        <PipelineStep
          icon={<Server />}
          title="6. API Layer (FastAPI)"
          description={[
            'Read-only APIs expose faculty data.',
            'Supports filtering by faculty ID and category.',
            'Swagger UI enables instant exploration.'
          ]}
          why="Decouples data storage from AI and frontend consumers."
        />

        {/* ================= RAG PIPELINE ================= */}
        <SectionTitle
          icon={<Brain className="text-purple-600" />}
          title="AI Recommendation Pipeline (RAG)"
          subtitle="From clean faculty data to explainable recommendations"
        />

        <PipelineStep
          icon={<Search />}
          title="7. Hybrid Retrieval"
          description={[
            'Keyword-based filtering ensures precision.',
            'Semantic embeddings capture research intent.',
            'Both signals are combined for robust candidate selection.'
          ]}
          why="Pure semantic search fails on sparse data — hybrid retrieval improves recall and precision."
          accent="purple"
        />

        <PipelineStep
          icon={<Brain />}
          title="8. LLM-Based Reasoning & Reranking"
          description={[
            'Top candidates are passed to an LLM.',
            'The model explains alignment in student-friendly language.',
            'Rankings are justified, not just scored.'
          ]}
          why="Students need reasoning, not just rankings."
          accent="purple"
        />

        <PipelineStep
          icon={<Sparkles />}
          title="9. Explainable Recommendations"
          description={[
            'Each recommendation includes a natural-language explanation.',
            'Limitations (availability, adjunct role) are explicitly stated.',
            'Results are transparent and interpretable.'
          ]}
          why="Explainability builds trust in AI-assisted academic decisions."
          accent="purple"
        />

        {/* ================= SUMMARY ================= */}
        <section className="bg-white rounded-xl shadow p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Why This Architecture Matters
          </h2>

          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Handles real-world messy academic data</li>
            <li>Preserves raw data for future NLP upgrades</li>
            <li>Separates data engineering from AI reasoning</li>
            <li>Produces explainable, student-centric results</li>
            <li>Scales naturally to larger universities and datasets</li>
          </ul>
        </section>

      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SectionTitle({ icon, title, subtitle }: any) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );
}

function PipelineStep({ icon, title, description, why, accent = 'green' }: any) {
  const accentColor =
    accent === 'purple' ? 'border-purple-500' : 'border-green-500';

  return (
    <div className={`bg-white rounded-xl shadow p-6 border-l-4 ${accentColor}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gray-100 p-2 rounded">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>

      <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
        {description.map((d: string, i: number) => (
          <li key={i}>{d}</li>
        ))}
      </ul>

      <div className="bg-gray-50 p-4 rounded text-sm text-gray-600">
        <strong>Why it matters:</strong> {why}
      </div>
    </div>
  );
}

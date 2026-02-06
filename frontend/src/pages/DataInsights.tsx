import {
  Layers,
  ShieldAlert,
  Brain,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';

export default function DataInsights() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-green-700 to-teal-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-3">Faculty Data Insights</h1>
          <p className="text-green-50 max-w-3xl">
            How faculty composition, data completeness, and text richness
            influence semantic retrieval and AI-driven recommendations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">

        {/* 1️⃣ FACULTY COMPOSITION */}
        <section className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="text-green-600" />
            <h2 className="text-xl font-bold text-gray-800">
              Faculty Composition Landscape
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InsightCard
              title="Core Academic Backbone"
              color="from-green-500 to-green-600"
              items={[
                'Regular Faculty',
                'Distinguished Professors'
              ]}
              insight="Primary drivers of long-term research mentorship and high-confidence recommendations."
            />

            <InsightCard
              title="Industry & Visiting Strength"
              color="from-blue-500 to-blue-600"
              items={[
                'Adjunct Faculty',
                'Professor of Practice'
              ]}
              insight="Adds applied expertise but introduces uncertainty in availability and continuity."
            />

            <InsightCard
              title="International Exposure"
              color="from-purple-500 to-purple-600"
              items={[
                'International Adjunct Faculty'
              ]}
              insight="High-value global exposure, but limited data depth impacts semantic matching."
            />
          </div>
        </section>

        {/* 2️⃣ DATA COMPLETENESS & RISK */}
        <section className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-2 mb-6">
            <ShieldAlert className="text-yellow-600" />
            <h2 className="text-xl font-bold text-gray-800">
              Data Completeness & AI Risk
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <RiskCard
              level="High Risk"
              color="red"
              field="Research"
              impact="Weak research fields severely degrade semantic similarity and reasoning accuracy."
            />

            <RiskCard
              level="Medium Risk"
              color="yellow"
              field="Biography & Teaching"
              impact="Affects contextual understanding and student–faculty alignment."
            />

            <RiskCard
              level="Medium Risk"
              color="yellow"
              field="Publications"
              impact="Limits authority signals and topic confidence scoring."
            />

            <RiskCard
              level="Low Risk"
              color="green"
              field="Contact & Education"
              impact="Minimal effect on AI ranking; mainly impacts UX completeness."
            />
          </div>

          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <div className="flex gap-2 items-start">
              <AlertTriangle className="text-yellow-600 mt-0.5" />
              <p className="text-sm text-yellow-800">
                Missing research content is the single biggest bottleneck
                preventing high-precision semantic matching.
              </p>
            </div>
          </div>
        </section>

        {/* 3️⃣ NLP READINESS */}
        <section className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">
              NLP Readiness of Text Fields
            </h2>
          </div>

          <div className="space-y-5">
            <StrengthBar
              label="Publications"
              strength="Very High"
              width="95%"
              note="Rich, long-form academic text — strongest contributor to embeddings."
            />

            <StrengthBar
              label="Biography"
              strength="High"
              width="80%"
              note="Good contextual grounding for research intent matching."
            />

            <StrengthBar
              label="Teaching"
              strength="Medium"
              width="65%"
              note="Helpful for applied interests, weaker for research depth."
            />

            <StrengthBar
              label="Research"
              strength="Low"
              width="25%"
              note="Sparse data severely limits semantic recall."
            />
          </div>
        </section>

        {/* 4️⃣ AI IMPACT SUMMARY */}
        <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl p-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles />
            <h2 className="text-xl font-bold">
              Impact on AI Faculty Recommendation
            </h2>
          </div>

          <ul className="space-y-2 text-green-50 text-sm list-disc list-inside">
            <li>Faculty with strong publication text dominate top rankings</li>
            <li>Missing research sections reduce ranking confidence</li>
            <li>Adjunct-heavy profiles introduce uncertainty in long-term mentorship</li>
            <li>Improving text completeness directly boosts LLM reasoning quality</li>
          </ul>
        </section>

      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function InsightCard({ title, items, insight, color }: any) {
  return (
    <div className="border rounded-lg p-5">
      <div className={`h-2 rounded-full bg-gradient-to-r ${color} mb-4`} />
      <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
      <ul className="text-sm text-gray-600 mb-3 list-disc list-inside">
        {items.map((i: string) => <li key={i}>{i}</li>)}
      </ul>
      <p className="text-sm text-gray-500">{insight}</p>
    </div>
  );
}

function RiskCard({ level, field, impact, color }: any) {
  const colorMap: any = {
    red: 'border-red-400 text-red-600',
    yellow: 'border-yellow-400 text-yellow-600',
    green: 'border-green-400 text-green-600'
  };

  return (
    <div className={`border-l-4 p-4 rounded ${colorMap[color]}`}>
      <h4 className="font-semibold">{field}</h4>
      <span className="text-xs font-medium">{level}</span>
      <p className="text-sm mt-2 text-gray-600">{impact}</p>
    </div>
  );
}

function StrengthBar({ label, strength, width, note }: any) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-gray-500">{strength}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="h-4 rounded-full bg-gradient-to-r from-purple-500 to-purple-600"
          style={{ width }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">{note}</p>
    </div>
  );
}

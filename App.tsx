import React, { useState, useEffect } from 'react';
import { UnitSpec, AnalysisResponse, GenerationStyle } from './types';
import { generateMarketingLabels } from './services/geminiService';
import UnitVisualizer from './components/UnitVisualizer';
import StrategyCard from './components/StrategyCard';

// Initial Data derived from the User Prompt
const INITIAL_UNITS: UnitSpec[] = [
  {
    id: "type1",
    defaultName: "Type 1: Tall-Single-Unit",
    dimensions: { width: 600, depth: 595, height: 2123 },
    features: ["Standard Shelving", "Single Door", "Vertical Storage"],
    description: "Standard storage unit with shelving."
  },
  {
    id: "type2",
    defaultName: "Type 2: Tall-Double-Unit",
    dimensions: { width: 1256, depth: 595, height: 2123 },
    features: ["Pocket Door System", "Internal Workspace", "Barista Station Ready", "Internal Drawers"],
    description: "Extended storage with pocket doors revealing a functional workspace."
  }
];

const App: React.FC = () => {
  const [style, setStyle] = useState<GenerationStyle>(GenerationStyle.TECHNICAL);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await generateMarketingLabels(INITIAL_UNITS, style);
      setResult(response);
    } catch (err) {
      setError("Failed to generate insights. Please check API Key and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Generate on mount
  useEffect(() => {
    if(process.env.API_KEY) {
        handleGenerate();
    } else {
        setError("API Key is missing. Please set the REACT_APP_API_KEY environment variable.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
      <header className="max-w-7xl mx-auto mb-10 border-b border-slate-700 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                <span className="text-indigo-500">Arch</span>Label AI
            </h1>
            <p className="text-slate-400 max-w-xl">
                Automated nomenclature generation for architectural joinery and cabinetry. 
                Analyzing dimension ratios and functional utility to propose market-ready product labels.
            </p>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-mono">POWERED BY GEMINI 2.5</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Input & Visualization */}
        <section className="lg:col-span-4 space-y-8">
          
          {/* Controls */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">
                Configuration
            </h2>
            
            <div className="mb-6">
                <label className="block text-xs text-slate-400 mb-2 font-mono">NAMING AESTHETIC</label>
                <div className="grid grid-cols-1 gap-2">
                    {Object.values(GenerationStyle).map((s) => (
                        <button
                            key={s}
                            onClick={() => setStyle(s)}
                            className={`px-4 py-3 rounded-lg text-sm text-left transition-all duration-200 border ${
                                style === s 
                                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                                : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-700'
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-white text-slate-900 font-bold py-3 px-4 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing Models...
                    </>
                ) : (
                    <>
                        <span>Regenerate Proposals</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                    </>
                )}
            </button>
          </div>

          {/* Visualization */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl">
             <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-6 border-b border-slate-700 pb-2">
                Technical Specifications
            </h2>
            <div className="flex justify-center items-end gap-8 overflow-x-auto py-4">
                <UnitVisualizer unit={INITIAL_UNITS[0]} />
                <UnitVisualizer unit={INITIAL_UNITS[1]} />
            </div>
            <div className="mt-6 space-y-4">
                <div className="bg-slate-900 p-3 rounded text-sm border border-slate-700">
                    <span className="text-indigo-400 font-bold block mb-1">Type 1 (Single)</span>
                    <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
                        <li>600mm Width (Standard)</li>
                        <li>Standard Shelving Storage</li>
                        <li>Hinged Door Entry</li>
                    </ul>
                </div>
                <div className="bg-slate-900 p-3 rounded text-sm border border-slate-700">
                    <span className="text-indigo-400 font-bold block mb-1">Type 2 (Double)</span>
                    <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
                        <li>1256mm Width (~2.1x Single)</li>
                        <li>Pocket Door Mechanism</li>
                        <li>Internal Worktop / Appliance Garage</li>
                    </ul>
                </div>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Results */}
        <section className="lg:col-span-8">
            {error ? (
                <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-xl text-red-200">
                    {error}
                </div>
            ) : !result ? (
                <div className="h-full flex items-center justify-center flex-col text-slate-500 gap-4 min-h-[400px]">
                     <svg className="animate-spin h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p>Initializing AI Models & Analyzing Geometry...</p>
                </div>
            ) : (
                <div className="space-y-6 animate-fade-in">
                     <div className="bg-indigo-900/20 border border-indigo-500/30 p-6 rounded-xl">
                        <h3 className="text-indigo-400 text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            AI Architectural Analysis
                        </h3>
                        <p className="text-slate-300 leading-relaxed font-light">
                            {result.analysis}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {result.strategies.map((strategy, idx) => (
                            <StrategyCard key={idx} strategy={strategy} index={idx} />
                        ))}
                    </div>
                </div>
            )}
        </section>
      </main>
    </div>
  );
};

export default App;
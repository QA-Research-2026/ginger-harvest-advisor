'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Leaf, 
  TrendingUp, 
  CloudRain, 
  MapPin, 
  Sprout, 
  AlertTriangle,
  Scale,
  Calendar,
  DollarSign,
  PackageCheck,
  Activity
} from 'lucide-react';

interface HarvestStage {
  stage: string;
  timelineWindow: string;
  percentageCommercialStock: number;
  volumeKg: number;
  targetMarket: string;
  actionReasoning: string;
}

interface ScheduleData {
  marketAssessment: string;
  seedStockStorageProtocol: string;
  harvestSchedule: HarvestStage[];
  projectedGrossRevenueLkr: number;
}

interface APIResponse {
  status: 'success' | 'fallback';
  fallbackNotice?: string;
  data: ScheduleData;
}

export default function Home() {
  const [plotSize, setPlotSize] = useState<number>(0.5);
  const [estimatedTotalYieldKg, setEstimatedTotalYieldKg] = useState<number>(3500);
  const [currentSpotPriceLkr, setCurrentSpotPriceLkr] = useState<number>(850);
  const [maturityWeek, setMaturityWeek] = useState<number>(38);
  const [weatherRisk, setWeatherRisk] = useState<string>('Dry/Stable');
  
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<APIResponse | null>(null);

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plotSize,
          estimatedTotalYieldKg,
          currentSpotPriceLkr,
          maturityWeek,
          weatherRisk
        })
      });
      const data: APIResponse = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Failed to fetch schedule", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const seedRhizomeRequiredKg = plotSize * 1500;
  const commercialYieldKg = Math.max(0, estimatedTotalYieldKg - seedRhizomeRequiredKg);

  return (
    <div className="min-h-screen bg-[#020817] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/20 via-[#020817] to-[#020817] text-slate-200 selection:bg-emerald-500/30 font-sans pb-24">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[25%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-600/5 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-600/5 blur-[100px]" />
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-10">
        
        {/* Header Section */}
        <header className="mb-12 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-white/5 pb-8">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4"
            >
              <Sprout className="w-4 h-4" />
              <span>Smart Agriculture</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-500 mb-2"
            >
              Ginger Harvest Advisor
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg flex items-center justify-center sm:justify-start gap-2"
            >
              <Activity className="w-5 h-5 text-indigo-400" />
              Client: <span className="text-slate-200 font-medium">Sunil P.</span>
            </motion.p>
          </div>
        </header>

        {/* Fallback Banner */}
        <AnimatePresence>
          {result?.status === 'fallback' && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="bg-amber-950/40 border border-amber-500/30 backdrop-blur-md text-amber-200 px-5 py-4 rounded-2xl flex items-start gap-4 shadow-xl shadow-amber-900/10"
            >
              <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-400 text-lg">Fallback Mode Active</p>
                <p className="text-amber-200/80 mt-1">{result.fallbackNotice}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Inputs & Metrics */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Input Form Panel */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500/20 rounded-xl">
                  <Scale className="w-5 h-5 text-emerald-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">Farm Variables</h2>
              </div>
              
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Plot Area (acres)
                  </label>
                  <input type="number" step="0.1" value={plotSize} onChange={(e) => setPlotSize(parseFloat(e.target.value) || 0)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                    <PackageCheck className="w-4 h-4" /> Est. Yield (kg)
                  </label>
                  <input type="number" value={estimatedTotalYieldKg} onChange={(e) => setEstimatedTotalYieldKg(parseInt(e.target.value) || 0)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> Spot Price (LKR)
                  </label>
                  <input type="number" value={currentSpotPriceLkr} onChange={(e) => setCurrentSpotPriceLkr(parseInt(e.target.value) || 0)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Maturity Week
                  </label>
                  <input type="number" value={maturityWeek} onChange={(e) => setMaturityWeek(parseInt(e.target.value) || 0)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                    <CloudRain className="w-4 h-4" /> Weather Risk
                  </label>
                  <select value={weatherRisk} onChange={(e) => setWeatherRisk(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner appearance-none">
                    <option value="Dry/Stable">☀️ Dry/Stable</option>
                    <option value="Moderate Rain">🌦️ Moderate Rain</option>
                    <option value="Heavy Monsoon Risk">⛈️ Heavy Monsoon Risk</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={fetchSchedule} 
                disabled={loading}
                className="w-full mt-8 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Analyzing Market...
                  </span>
                ) : 'Generate Strategy'}
              </button>
            </motion.div>
          </div>

          {/* Right Column: Results & Visualizations */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Top Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-5 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Leaf className="w-16 h-16 text-indigo-400" />
                </div>
                <p className="text-slate-400 text-sm font-medium mb-2 relative z-10">Seed Retention</p>
                <div className="flex items-baseline gap-2 relative z-10">
                  <p className="text-3xl font-bold text-white">{seedRhizomeRequiredKg.toLocaleString()}</p>
                  <span className="text-indigo-400/80 font-medium">kg</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-5 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <PackageCheck className="w-16 h-16 text-emerald-400" />
                </div>
                <p className="text-slate-400 text-sm font-medium mb-2 relative z-10">Commercial Yield</p>
                <div className="flex items-baseline gap-2 relative z-10">
                  <p className="text-3xl font-bold text-emerald-400">{commercialYieldKg.toLocaleString()}</p>
                  <span className="text-emerald-500/50 font-medium">kg</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 backdrop-blur-md border border-emerald-500/20 rounded-3xl p-5 relative overflow-hidden group"
              >
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-colors" />
                <p className="text-emerald-200/80 text-sm font-medium mb-2 relative z-10">Proj. Gross Revenue</p>
                <div className="flex items-baseline gap-2 relative z-10">
                  <span className="text-xl text-emerald-400/80 font-medium">LKR</span> 
                  <p className="text-3xl font-bold text-white">
                    {result?.data?.projectedGrossRevenueLkr ? result.data.projectedGrossRevenueLkr.toLocaleString() : '---'}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Results Area */}
            {result?.data ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="space-y-6"
              >
                {/* Market Assessment */}
                <div className="bg-slate-900/50 backdrop-blur-lg border border-white/5 rounded-3xl p-6 shadow-xl">
                  <h3 className="flex items-center gap-2 text-indigo-400 font-semibold mb-3">
                    <TrendingUp className="w-5 h-5" /> Market Assessment
                  </h3>
                  <p className="text-slate-300 leading-relaxed">{result.data.marketAssessment}</p>
                </div>

                {/* Dispatch Schedule */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="px-6 py-5 border-b border-white/5 bg-black/20 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <PackageCheck className="w-5 h-5 text-emerald-400" /> Dispatch Schedule
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white/[0.02] text-slate-400 text-sm">
                          <th className="px-6 py-4 font-semibold">Stage</th>
                          <th className="px-6 py-4 font-semibold">Timeline</th>
                          <th className="px-6 py-4 font-semibold">Volume</th>
                          <th className="px-6 py-4 font-semibold">Target Market</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {result.data.harvestSchedule.map((stage, idx) => (
                          <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-6 py-5 align-top">
                              <p className="text-white font-medium mb-1">{stage.stage}</p>
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                {stage.percentageCommercialStock}% of Stock
                              </span>
                            </td>
                            <td className="px-6 py-5 text-slate-300 align-top whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-slate-500" />
                                {stage.timelineWindow}
                              </div>
                            </td>
                            <td className="px-6 py-5 text-white font-medium align-top whitespace-nowrap">
                              {stage.volumeKg?.toLocaleString()} kg
                            </td>
                            <td className="px-6 py-5 align-top">
                              <p className="text-emerald-300 font-medium mb-2">{stage.targetMarket}</p>
                              <p className="text-sm text-slate-400 leading-relaxed bg-black/20 p-3 rounded-lg border border-white/5">
                                {stage.actionReasoning}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Seed Stock Protocol */}
                <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 backdrop-blur-md border border-indigo-500/20 rounded-3xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
                  <h3 className="text-indigo-300 font-semibold mb-3 flex items-center gap-2 relative z-10">
                    <Sprout className="w-5 h-5" /> Seed Stock Storage Protocol
                  </h3>
                  <p className="text-slate-200 leading-relaxed relative z-10">
                    {result.data.seedStockStorageProtocol}
                  </p>
                </div>
              </motion.div>
            ) : (
              /* Empty State when no result */
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-slate-900/30 backdrop-blur-sm border border-white/5 rounded-3xl border-dashed">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                  <Activity className="w-10 h-10 text-emerald-500/50" />
                </div>
                <h3 className="text-xl font-medium text-slate-300 mb-2">Awaiting Analysis</h3>
                <p className="text-slate-500 max-w-md">
                  Enter your farm variables and generate a strategy to see AI-driven market and harvest recommendations.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

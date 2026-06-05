import { useState } from "react";
import { Activity, Trophy } from "lucide-react";
import type { DatasetStats } from "../../lib/ml-engine/mockDatasets";
import { simulateAllModels } from "../../lib/ml-engine/simulator";
import type { ModelResult } from "../../lib/ml-engine/simulator";
import { DatasetUpload } from "./DatasetUpload";

export function ExperimentsView() {
  const [results, setResults] = useState<ModelResult[] | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleDatasetLoaded = async (data: DatasetStats) => {
    setResults(null);
    setIsSimulating(true);
    try {
      const simResults = await simulateAllModels(data, 20); // default hidden ratio for semi-supervised
      setResults(simResults);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl min-h-full p-8 text-slate-900 border border-slate-200">
      <header className="mb-10 max-w-5xl mx-auto flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Automated Experiments</h2>
          <p className="text-slate-500 font-medium text-[15px] leading-relaxed">
            Upload a dataset to instantly train and benchmark every model across all paradigms simultaneously.
          </p>
        </div>
        <div className="hidden md:flex items-center space-x-4">
           <div className="bg-slate-50 rounded-full px-4 py-2 border border-slate-200 shadow-sm text-sm font-semibold text-slate-700 flex items-center">
             <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span> Batch Mode
           </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-8">
        {!isSimulating && !results && (
          <div className="max-w-2xl mx-auto">
            <DatasetUpload onDatasetLoaded={handleDatasetLoaded} />
          </div>
        )}

        {isSimulating && (
          <div className="h-96 rounded-[2rem] border-2 border-slate-100 border-dashed bg-slate-50 flex flex-col items-center justify-center space-y-6 animate-pulse shadow-sm">
            <div className="p-5 bg-blue-50 rounded-full">
              <Activity className="w-12 h-12 text-blue-500 animate-bounce" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Training Every Model</h3>
              <p className="text-slate-500 font-medium">Running 6 models across 3 paradigms synchronously...</p>
            </div>
          </div>
        )}

        {!isSimulating && results && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-slate-900">Leaderboard</h3>
              <button 
                onClick={() => { setResults(null); }}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-xl"
              >
                Run New Experiment
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((model, idx) => {
                const isWinner = idx === 0;
                return (
                  <div key={model.name} className={`relative overflow-hidden p-6 rounded-3xl border ${isWinner ? 'border-blue-400 shadow-xl shadow-blue-500/10 bg-gradient-to-br from-blue-50 to-white' : 'border-slate-100 shadow-sm bg-white'}`}>
                    {isWinner && (
                      <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl shadow-sm flex items-center">
                        <Trophy className="w-3 h-3 mr-1" /> BEST MODEL
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start mb-6">
                      <h4 className="text-lg font-bold text-slate-800">{model.name}</h4>
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Accuracy</p>
                        <p className={`text-3xl font-bold ${isWinner ? 'text-blue-600' : 'text-slate-900'}`}>
                          {(model.metrics.accuracy * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-6 shadow-inner">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${isWinner ? 'multicolor-gradient' : 'bg-slate-300'}`} 
                        style={{ width: `${(model.metrics.accuracy * 100)}%` }}
                      ></div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <p className="text-xs text-slate-400 font-medium mb-1">Precision</p>
                        <p className="text-sm font-bold text-slate-700">{(model.metrics.precision * 100).toFixed(1)}%</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <p className="text-xs text-slate-400 font-medium mb-1">Recall</p>
                        <p className="text-sm font-bold text-slate-700">{(model.metrics.recall * 100).toFixed(1)}%</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <p className="text-xs text-slate-400 font-medium mb-1">F1 Score</p>
                        <p className="text-sm font-bold text-slate-700">{(model.metrics.f1 * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

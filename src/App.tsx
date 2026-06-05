import { useState } from "react";
import { BrainCircuit, Activity, LayoutDashboard, Loader2 } from "lucide-react";
import type { DatasetStats } from "./lib/ml-engine/mockDatasets";
import { simulateModels } from "./lib/ml-engine/simulator";
import type { ModelResult, ParadigmType } from "./lib/ml-engine/simulator";
import { DatasetUpload } from "./components/dashboard/DatasetUpload";
import { ParadigmSelector } from "./components/dashboard/ParadigmSelector";
import { MetricsDashboard } from "./components/dashboard/MetricsDashboard";
import { PredictionTool } from "./components/dashboard/PredictionTool";
import { ExperimentsView } from "./components/dashboard/ExperimentsView";
import { Button } from "./components/ui/Button";

export default function App() {
  const [dataset, setDataset] = useState<DatasetStats | null>(null);
  const [paradigm, setParadigm] = useState<ParadigmType>("Supervised");
  const [selectedModel, setSelectedModel] = useState<string>("Random Forest Classifier");
  const [hiddenRatio, setHiddenRatio] = useState<number>(20);
  const [results, setResults] = useState<ModelResult[] | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "experiments">("dashboard");

  const handleDatasetLoaded = (data: DatasetStats) => {
    setDataset(data);
    setResults(null);
  };

  const handleParadigmChange = (newParadigm: ParadigmType, newModel: string, newHiddenRatio: number) => {
    setParadigm(newParadigm);
    setSelectedModel(newModel);
    setHiddenRatio(newHiddenRatio);
    setResults(null);
  };

  const runSimulation = async () => {
    if (!dataset) return;
    setIsSimulating(true);
    setResults(null);
    try {
      const simResults = await simulateModels(paradigm, selectedModel, dataset, hiddenRatio);
      setResults(simResults);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="min-h-screen navy-pattern-bg text-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 flex-none flex flex-col p-6 pr-4 space-y-8 z-10">
        <div className="flex items-center space-x-3 mb-4 pr-6">
          <div className="p-2 rounded-xl bg-white/10 text-white border border-white/20">
            <BrainCircuit className="w-6 h-6 text-violet-300" />
          </div>
          <h1 className="font-bold text-2xl tracking-tight text-white">CompML</h1>
        </div>
        
        <nav className="space-y-3 flex-1 pt-4">
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab("dashboard")}
            className={`w-full justify-start rounded-2xl py-6 pl-6 font-semibold transition-all ${activeTab === "dashboard" ? "text-white multicolor-gradient hover:opacity-90 shadow-lg shadow-blue-500/20" : "text-slate-400 hover:text-white hover:bg-white/5 font-medium"}`}
          >
            <LayoutDashboard className={`w-5 h-5 mr-3 ${activeTab === "dashboard" ? "text-white" : ""}`} />
            Dashboard
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab("experiments")}
            className={`w-full justify-start rounded-2xl py-6 pl-6 font-semibold transition-all ${activeTab === "experiments" ? "text-white multicolor-gradient hover:opacity-90 shadow-lg shadow-blue-500/20" : "text-slate-400 hover:text-white hover:bg-white/5 font-medium"}`}
          >
            <Activity className={`w-5 h-5 mr-3 ${activeTab === "experiments" ? "text-white" : ""}`} />
            Experiments
          </Button>
        </nav>
        
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 mr-6 mb-4">
          <h4 className="text-sm font-semibold text-white mb-2 flex items-center">
            <span className="w-2 h-2 rounded-full bg-orange-500 mr-2 animate-pulse"></span>
            Simulated Env
          </h4>
          <p className="text-xs text-violet-200/80 leading-relaxed">Running computations securely.</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 relative z-20">
        {activeTab === "experiments" ? (
          <ExperimentsView />
        ) : (
          <div className="bg-white rounded-[2.5rem] shadow-2xl min-h-full p-8 text-slate-900 border border-slate-200">
            <header className="mb-10 relative overflow-hidden rounded-[2.5rem] p-10 md:p-12 text-white navy-pattern-bg shadow-2xl shadow-blue-900/10 border border-slate-800">
              {/* Decorative background elements for the banner */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none"></div>
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-start justify-between">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center space-x-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-3 py-1 mb-6">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span className="text-xs font-semibold text-blue-200 tracking-wider uppercase">System Active</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Welcome to CompML</h2>
                  <p className="text-blue-100 text-lg md:text-xl font-medium leading-relaxed opacity-90">
                    Your intelligent playground for evaluating machine learning algorithms. Upload a dataset to seamlessly benchmark, analyze, and gain real-time insights into model performance across various learning paradigms.
                  </p>
                </div>
              </div>
            </header>

            <div className="max-w-5xl mx-auto space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <DatasetUpload onDatasetLoaded={handleDatasetLoaded} />
                  <ParadigmSelector 
                    disabled={!dataset} 
                    onParadigmChange={handleParadigmChange} 
                  />
                  
                  {dataset && (
                    <Button 
                      size="lg" 
                      className="w-full shadow-lg shadow-blue-500/20 multicolor-gradient hover:opacity-90 rounded-2xl h-14"
                      disabled={isSimulating}
                      onClick={runSimulation}
                    >
                      {isSimulating ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin text-white" />
                          <span className="text-white font-semibold">Training Models...</span>
                        </>
                      ) : (
                        <>
                          <BrainCircuit className="w-5 h-5 mr-2 text-white" />
                          <span className="text-white font-semibold">Execute Pipeline</span>
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-1">
                  <div className="space-y-8">
                    {isSimulating && (
                      <div className="h-96 rounded-[2rem] border-2 border-slate-100 border-dashed bg-slate-50 flex flex-col items-center justify-center space-y-4 animate-pulse shadow-sm">
                        <div className="p-4 bg-blue-50 rounded-full">
                          <Activity className="w-10 h-10 text-blue-500 animate-bounce" />
                        </div>
                        <p className="text-slate-500 font-medium">Training model synchronously...</p>
                      </div>
                    )}
                    
                    {!isSimulating && !results && (
                      <div className="h-96 rounded-[2rem] border-2 border-slate-100 border-dashed bg-slate-50 flex flex-col items-center justify-center space-y-3 opacity-80">
                        <div className="p-4 bg-white shadow-sm border border-slate-100 rounded-full">
                          <BrainCircuit className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="text-slate-400 font-medium text-sm">Upload a dataset to see results here</p>
                      </div>
                    )}
                    
                    {!isSimulating && results && (
                      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
                        <MetricsDashboard results={results} />
                        {dataset && <PredictionTool dataset={dataset} models={results} />}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

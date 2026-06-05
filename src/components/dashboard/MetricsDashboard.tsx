import type { ModelResult } from "../../lib/ml-engine/simulator";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

interface Props {
  results: ModelResult[];
}

export function MetricsDashboard({ results }: Props) {
  if (!results || results.length === 0) return null;
  
  // Since we are now in single model selection mode, we only render the first result
  const model = results[0];

  return (
    <div className="space-y-6">
      <Card className="relative overflow-hidden bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] rounded-[2.5rem] p-4">
        <CardHeader className="pb-4 relative z-10 px-6 pt-6">
          <div className="flex justify-between items-start mb-8">
            <CardTitle className="text-2xl font-bold text-slate-900 leading-tight">
              {model.name}
            </CardTitle>
            <div className={`p-3 rounded-full bg-blue-50 text-blue-600 border border-blue-100`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
            </div>
          </div>
          
          <div className="flex flex-col mt-4">
            <span className="text-sm font-bold mb-2 text-slate-400 uppercase tracking-widest">
              TOTAL ACCURACY
            </span>
            <div className="flex items-baseline space-x-2">
              <span className={`text-[5rem] font-bold tracking-tighter text-slate-900 leading-none`}>
                {(model.metrics.accuracy * 100).toFixed(1)}
              </span>
              <span className={`text-2xl font-bold px-2 py-1 bg-green-50 text-green-600 rounded-lg ml-2`}>
                %
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mt-6 shadow-inner">
              <div 
                className={`h-full rounded-full multicolor-gradient transition-all duration-1000 ease-out`} 
                style={{ width: `${(model.metrics.accuracy * 100)}%` }}
              ></div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10 pt-8 pb-4 px-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <p className="text-sm font-semibold mb-2 text-slate-400 uppercase tracking-wider">Precision</p>
              <p className="text-3xl font-bold text-slate-800">{(model.metrics.precision * 100).toFixed(1)}%</p>
            </div>
            <div className="flex flex-col border-l border-slate-100 pl-6">
              <p className="text-sm font-semibold mb-2 text-slate-400 uppercase tracking-wider">Recall</p>
              <p className="text-3xl font-bold text-slate-800">{(model.metrics.recall * 100).toFixed(1)}%</p>
            </div>
            <div className="flex flex-col border-l border-slate-100 pl-6">
              <p className="text-sm font-semibold mb-2 text-slate-400 uppercase tracking-wider">F1 Score</p>
              <p className="text-3xl font-bold text-slate-800">{(model.metrics.f1 * 100).toFixed(1)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import React, { useState } from "react";
import type { DatasetStats } from "../../lib/ml-engine/mockDatasets";
import { simulatePrediction } from "../../lib/ml-engine/simulator";
import type { ModelResult } from "../../lib/ml-engine/simulator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card";
import { Button } from "../ui/Button";

interface Props {
  dataset: DatasetStats;
  models: ModelResult[];
}

export function PredictionTool({ dataset, models }: Props) {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [predictions, setPredictions] = useState<{ modelName: string; prediction: any }[] | null>(null);
  
  // Exclude target variable from inputs
  const featureCols = dataset.columns.filter(c => c !== dataset.targetVariable);

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    const result = simulatePrediction(inputs, models, dataset);
    setPredictions(result);
  };

  return (
    <Card className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-[2.5rem] overflow-hidden mt-6">
      <CardHeader className="border-b border-slate-50 pb-4 pt-6 px-6">
        <CardTitle className="text-slate-900 font-semibold text-lg flex items-center">
          <span className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center mr-3 border border-cyan-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </span>
          Live Prediction Tool
        </CardTitle>
        <CardDescription className="text-slate-500 font-medium mt-1">Enter feature values to see real-time predictions from your selected model.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 px-6">
        <form onSubmit={handlePredict} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {featureCols.slice(0, 6).map((col) => (
              <div key={col} className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{col}</label>
                <input
                  className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-800 font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors"
                  placeholder="0.0"
                  required
                  onChange={(e) => setInputs({ ...inputs, [col]: e.target.value })}
                />
              </div>
            ))}
          </div>
          {featureCols.length > 6 && (
            <p className="text-xs font-medium text-slate-400">Showing first 6 features for brevity.</p>
          )}
          <Button type="submit" className="w-full multicolor-gradient hover:opacity-90 text-white font-semibold rounded-2xl h-12 shadow-[0_4px_15px_rgba(59,130,246,0.3)] transition-all">Predict</Button>
        </form>

        {predictions && (
          <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <h4 className="font-semibold text-sm text-slate-400 border-b border-slate-100 pb-2 uppercase tracking-wider">Results</h4>
            <div className="grid grid-cols-1 gap-4">
              {predictions.map((p, idx) => {
                return (
                <div key={idx} className={`p-6 rounded-2xl border border-blue-100 flex flex-col items-center justify-center text-center shadow-sm bg-blue-50/50`}>
                  <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">{p.modelName}</p>
                  <p className={`text-4xl font-bold multicolor-text`}>{String(p.prediction)}</p>
                </div>
              )})}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import React from "react";
import type { ParadigmType } from "../../lib/ml-engine/simulator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import { Slider } from "../ui/Slider";

interface Props {
  onParadigmChange: (paradigm: ParadigmType, model: string, hiddenRatio: number) => void;
  disabled: boolean;
}

export function ParadigmSelector({ onParadigmChange, disabled }: Props) {
  const [paradigm, setParadigm] = React.useState<ParadigmType>("Supervised");
  const [selectedModel, setSelectedModel] = React.useState<string>("Random Forest Classifier");
  const [hiddenRatio, setHiddenRatio] = React.useState([20]);

  const handleTabChange = (val: string) => {
    const p = val as ParadigmType;
    setParadigm(p);
    
    let defaultModel = "Random Forest Classifier";
    if (p === "Semi-Supervised") defaultModel = "Label Propagation";
    if (p === "Unsupervised") defaultModel = "K-Means Clustering";
    
    setSelectedModel(defaultModel);
    onParadigmChange(p, defaultModel, p === "Semi-Supervised" ? hiddenRatio[0] : 0);
  };

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    onParadigmChange(paradigm, model, paradigm === "Semi-Supervised" ? hiddenRatio[0] : 0);
  };

  const handleSliderChange = (val: number[]) => {
    setHiddenRatio(val);
    onParadigmChange(paradigm, selectedModel, val[0]);
  };

  const renderModelCard = (modelName: string, desc: string) => {
    const isSelected = selectedModel === modelName;
    return (
      <div 
        onClick={() => handleModelSelect(modelName)}
        className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between h-full ${
          isSelected 
            ? "border-blue-400 bg-blue-50 shadow-[0_0_15px_rgba(59,130,246,0.15)] relative overflow-hidden" 
            : "border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300"
        }`}
      >
        {isSelected && <div className="absolute top-0 left-0 w-full h-1 multicolor-gradient"></div>}
        <div className="flex justify-between items-start mb-2 mt-1">
          <h4 className={`font-semibold ${isSelected ? "text-blue-600" : "text-slate-700"}`}>{modelName}</h4>
          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-blue-500" : "border-slate-300"}`}>
            {isSelected && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
          </div>
        </div>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
    );
  };

  return (
    <Card className={`bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-3xl overflow-hidden mt-6 ${disabled ? "opacity-50 pointer-events-none" : ""}`}>
      <CardHeader className="border-b border-slate-50 pb-4 pt-6 px-6">
        <CardTitle className="text-slate-900 font-semibold text-lg flex items-center">
          <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3 border border-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
          </span>
          Model Selection
        </CardTitle>
        <CardDescription className="text-slate-500 font-medium mt-1">Select a single learning model to benchmark against your dataset.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 px-6">
        <Tabs defaultValue="Supervised" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-slate-100 border border-slate-200 rounded-2xl p-1.5">
            <TabsTrigger className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm text-slate-500 font-medium transition-all" value="Supervised">Supervised</TabsTrigger>
            <TabsTrigger className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm text-slate-500 font-medium transition-all" value="Semi-Supervised">Semi-Supervised</TabsTrigger>
            <TabsTrigger className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm text-slate-500 font-medium transition-all" value="Unsupervised">Unsupervised</TabsTrigger>
          </TabsList>
          
          <TabsContent value="Supervised" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {renderModelCard("Random Forest Classifier", "Ensemble learning method operating by constructing multiple decision trees.")}
              {renderModelCard("Support Vector Machine (SVM)", "Effective in high dimensional spaces for linear and non-linear classification.")}
            </div>
          </TabsContent>
          
          <TabsContent value="Semi-Supervised" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {renderModelCard("Label Propagation", "Graph-based semi-supervised learning algorithm assigning labels to unlabeled data points.")}
              {renderModelCard("Self-Training Classifier", "Iteratively uses confident predictions on unlabeled data to retrain itself.")}
            </div>
            
            <div className="space-y-4 p-5 rounded-2xl border border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">Unlabeled Data Ratio</label>
                <span className="text-sm font-bold text-blue-600 bg-blue-100 border border-blue-200 px-2 py-0.5 rounded-full">{hiddenRatio[0]}%</span>
              </div>
              <Slider 
                defaultValue={[20]} 
                max={80} 
                min={10} 
                step={5} 
                onValueChange={handleSliderChange} 
                className="py-2"
              />
              <p className="text-xs text-slate-500 font-medium">Artificially hides labels for {hiddenRatio[0]}% of the dataset to simulate semi-supervised conditions.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="Unsupervised" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {renderModelCard("K-Means Clustering", "Partitions n observations into k clusters where each observation belongs to the nearest mean.")}
              {renderModelCard("Gaussian Mixture Model (GMM)", "Probabilistic model assuming data points are generated from a mixture of Gaussian distributions.")}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

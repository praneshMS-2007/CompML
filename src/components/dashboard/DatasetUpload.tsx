import React, { useState } from "react";
import { CheckCircle, Database } from "lucide-react";
import { parseDataset } from "../../lib/ml-engine/datasetProcessor";
import { IRIS_DATASET } from "../../lib/ml-engine/mockDatasets";
import type { DatasetStats } from "../../lib/ml-engine/mockDatasets";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/Table";
import { Button } from "../ui/Button";

interface Props {
  onDatasetLoaded: (dataset: DatasetStats) => void;
}

export function DatasetUpload({ onDatasetLoaded }: Props) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentDataset, setCurrentDataset] = useState<DatasetStats | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    setError(null);
    try {
      const stats = await parseDataset(file);
      setCurrentDataset(stats);
      onDatasetLoaded(stats);
    } catch (err) {
      setError(err as string);
    }
  };

  const loadMockData = () => {
    setCurrentDataset(IRIS_DATASET);
    onDatasetLoaded(IRIS_DATASET);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-[2rem] overflow-hidden mt-6 p-2">
        <CardHeader className="pb-4 pt-6 px-6 border-0">
          <CardTitle className="text-slate-900 font-semibold text-xl flex items-center mb-2">
            <span className="w-10 h-10 rounded-full multicolor-gradient flex items-center justify-center mr-4 border border-blue-500/20 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            </span>
            Dataset Upload
          </CardTitle>
          <CardDescription className="text-slate-500 font-medium ml-14 text-[15px]">Upload a CSV file or use our mock dataset to get started.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 px-8 pb-8">
          <div
            className={`relative flex flex-col items-center justify-center w-full h-56 border-2 border-dashed rounded-2xl transition-all ${
              dragActive ? "border-blue-400 bg-blue-50/50" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 bg-white"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".csv"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleChange}
            />
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-500">
              <div className="p-3 bg-blue-50 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
              </div>
              <p className="mb-2 text-lg font-semibold text-slate-800">Drag & Drop your CSV file here</p>
              <p className="text-sm text-slate-400">or click to browse</p>
            </div>
          </div>
          
          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

          <div className="mt-8 flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="flex items-center text-slate-500">
              <Database className="w-5 h-5 mr-3 text-blue-400" />
              <span className="text-sm font-medium text-slate-600">Don't have a dataset? Try our sample data.</span>
            </div>
            <Button variant="outline" onClick={loadMockData} className="font-semibold text-blue-600 border-blue-200 hover:bg-blue-50 bg-white rounded-xl transition-all shadow-sm">
              Load Customer Churn Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {currentDataset && (
        <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-3xl overflow-hidden mt-6">
          <CardHeader className="border-b border-slate-50 pb-4">
            <CardTitle className="flex items-center text-slate-900 font-semibold text-lg">
              <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
              Dataset Ready
            </CardTitle>
            <CardDescription className="text-slate-500 mt-1 font-medium">
              <span className="font-semibold text-slate-800">{currentDataset.rows}</span> rows • <span className="font-semibold text-slate-800">{currentDataset.features}</span> features • Target: <span className="font-mono text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded">{currentDataset.targetVariable}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="rounded-xl border border-slate-100 overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow className="border-b border-slate-100 hover:bg-slate-50">
                    {currentDataset.columns.slice(0, 6).map((col) => (
                      <TableHead key={col} className="text-slate-700 font-semibold">{col}</TableHead>
                    ))}
                    {currentDataset.columns.length > 6 && <TableHead className="text-slate-700">...</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentDataset.data.slice(0, 5).map((row, i) => (
                    <TableRow key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      {currentDataset.columns.slice(0, 6).map((col) => (
                        <TableCell key={col} className="text-slate-600">{String(row[col])}</TableCell>
                      ))}
                      {currentDataset.columns.length > 6 && <TableCell className="text-slate-600">...</TableCell>}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="mt-4 text-xs text-slate-400 text-center font-medium">Showing first 5 rows</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

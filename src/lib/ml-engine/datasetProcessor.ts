import Papa from "papaparse";
import type { DatasetStats } from "./mockDatasets";

export async function parseDataset(file: File): Promise<DatasetStats> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        const data = results.data;
        const columns = results.meta.fields || [];
        
        if (data.length === 0 || columns.length === 0) {
          return reject("Empty or invalid CSV file.");
        }

        // Assume last column is target by default
        const targetVariable = columns[columns.length - 1];

        resolve({
          rows: data.length,
          features: columns.length - 1,
          columns,
          targetVariable,
          data
        });
      },
      error: (error) => {
        reject(error.message);
      }
    });
  });
}

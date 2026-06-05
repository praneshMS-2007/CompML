import type { DatasetStats } from "./mockDatasets";

export type ParadigmType = "Supervised" | "Semi-Supervised" | "Unsupervised";

export interface ModelResult {
  name: string;
  metrics: {
    accuracy: number;
    precision: number;
    recall: number;
    f1: number;
  };
  predictions: any[];
}

// Simulates running a machine learning algorithm realistically.
export async function simulateModels(
  paradigm: ParadigmType,
  modelName: string,
  dataset: DatasetStats,
  hiddenRatio: number = 0
): Promise<ModelResult[]> {
  // Simulate network/compute delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const complexityFactor = Math.min(1, 1000 / dataset.rows) * Math.min(1, 10 / dataset.features);
  
  // Base noise specific to the dataset
  const datasetNoise = Math.random() * 0.1; 

  if (paradigm === "Supervised") {
    const models = [
      {
        name: "Random Forest Classifier",
        metrics: {
          accuracy: Math.min(0.99, 0.85 + Math.random() * 0.1 + complexityFactor * 0.05 - datasetNoise),
          precision: Math.min(0.99, 0.84 + Math.random() * 0.1),
          recall: Math.min(0.99, 0.86 + Math.random() * 0.1),
          f1: Math.min(0.99, 0.85 + Math.random() * 0.1)
        },
        predictions: dataset.data.slice(0, 100).map(d => ({ actual: d[dataset.targetVariable], predicted: d[dataset.targetVariable] }))
      },
      {
        name: "Support Vector Machine (SVM)",
        metrics: {
          accuracy: Math.min(0.99, 0.82 + Math.random() * 0.1 + complexityFactor * 0.05 - datasetNoise),
          precision: Math.min(0.99, 0.81 + Math.random() * 0.1),
          recall: Math.min(0.99, 0.80 + Math.random() * 0.1),
          f1: Math.min(0.99, 0.81 + Math.random() * 0.1)
        },
        predictions: dataset.data.slice(0, 100).map(d => ({ actual: d[dataset.targetVariable], predicted: d[dataset.targetVariable] }))
      }
    ];
    return models.filter(m => m.name === modelName);
  }

  if (paradigm === "Semi-Supervised") {
    // The higher the hidden ratio, the lower the accuracy
    const penalty = (hiddenRatio / 100) * 0.3;
    const models = [
      {
        name: "Label Propagation",
        metrics: {
          accuracy: Math.max(0.4, 0.90 - penalty + Math.random() * 0.05),
          precision: Math.max(0.4, 0.89 - penalty + Math.random() * 0.05),
          recall: Math.max(0.4, 0.88 - penalty + Math.random() * 0.05),
          f1: Math.max(0.4, 0.89 - penalty + Math.random() * 0.05)
        },
        predictions: dataset.data.slice(0, 100).map(d => ({ actual: d[dataset.targetVariable], predicted: d[dataset.targetVariable] }))
      },
      {
        name: "Self-Training Classifier",
        metrics: {
          accuracy: Math.max(0.4, 0.85 - penalty * 1.2 + Math.random() * 0.05),
          precision: Math.max(0.4, 0.84 - penalty * 1.2 + Math.random() * 0.05),
          recall: Math.max(0.4, 0.83 - penalty * 1.2 + Math.random() * 0.05),
          f1: Math.max(0.4, 0.84 - penalty * 1.2 + Math.random() * 0.05)
        },
        predictions: dataset.data.slice(0, 100).map(d => ({ actual: d[dataset.targetVariable], predicted: d[dataset.targetVariable] }))
      }
    ];
    return models.filter(m => m.name === modelName);
  }

  // Unsupervised
  const models = [
    {
      name: "K-Means Clustering",
      metrics: {
        accuracy: Math.min(0.85, 0.70 + Math.random() * 0.15),
        precision: Math.min(0.85, 0.68 + Math.random() * 0.15),
        recall: Math.min(0.85, 0.72 + Math.random() * 0.15),
        f1: Math.min(0.85, 0.70 + Math.random() * 0.15)
      },
      predictions: dataset.data.slice(0, 100).map(d => ({ actual: d[dataset.targetVariable], predicted: d[dataset.targetVariable] }))
    },
    {
      name: "Gaussian Mixture Model (GMM)",
      metrics: {
        accuracy: Math.min(0.88, 0.72 + Math.random() * 0.15),
        precision: Math.min(0.88, 0.71 + Math.random() * 0.15),
        recall: Math.min(0.88, 0.73 + Math.random() * 0.15),
        f1: Math.min(0.88, 0.72 + Math.random() * 0.15)
      },
      predictions: dataset.data.slice(0, 100).map(d => ({ actual: d[dataset.targetVariable], predicted: d[dataset.targetVariable] }))
    }
  ];
  return models.filter(m => m.name === modelName);
}

export function simulatePrediction(inputs: Record<string, any>, models: ModelResult[], dataset: DatasetStats) {
  // Use inputs length to slightly vary the prediction mock
  const inputKeysLength = Object.keys(inputs).length;
  // Just return realistic looking mock predictions based on the target variable
  const possibleTargets = Array.from(new Set(dataset.data.map(d => d[dataset.targetVariable])));
  
  return models.map(m => {
    // 80% chance to match the first value if it exists, otherwise random
    const rand = Math.random();
    const targetIdx = (Math.floor(rand * 100) + inputKeysLength) % possibleTargets.length;
    const prediction = rand > 0.2 ? possibleTargets[0] : possibleTargets[targetIdx];
    return {
      modelName: m.name,
      prediction: prediction || "Class A"
    };
  });
}

// Simulates running all models across all paradigms simultaneously
export async function simulateAllModels(
  dataset: DatasetStats,
  hiddenRatio: number = 20
): Promise<ModelResult[]> {
  // Simulate network/compute delay
  await new Promise(resolve => setTimeout(resolve, 2500));

  const complexityFactor = Math.min(1, 1000 / dataset.rows) * Math.min(1, 10 / dataset.features);
  const datasetNoise = Math.random() * 0.1; 
  const penalty = (hiddenRatio / 100) * 0.3;

  const supervisedModels = [
    {
      name: "Random Forest Classifier",
      metrics: {
        accuracy: Math.min(0.99, 0.85 + Math.random() * 0.1 + complexityFactor * 0.05 - datasetNoise),
        precision: Math.min(0.99, 0.84 + Math.random() * 0.1),
        recall: Math.min(0.99, 0.86 + Math.random() * 0.1),
        f1: Math.min(0.99, 0.85 + Math.random() * 0.1)
      },
      predictions: []
    },
    {
      name: "Support Vector Machine (SVM)",
      metrics: {
        accuracy: Math.min(0.99, 0.82 + Math.random() * 0.1 + complexityFactor * 0.05 - datasetNoise),
        precision: Math.min(0.99, 0.81 + Math.random() * 0.1),
        recall: Math.min(0.99, 0.80 + Math.random() * 0.1),
        f1: Math.min(0.99, 0.81 + Math.random() * 0.1)
      },
      predictions: []
    }
  ];

  const semiSupervisedModels = [
    {
      name: "Label Propagation",
      metrics: {
        accuracy: Math.min(0.99, Math.max(0.4, 0.80 + Math.random() * 0.1 - penalty + complexityFactor * 0.05 - datasetNoise)),
        precision: Math.min(0.99, Math.max(0.4, 0.78 + Math.random() * 0.1 - penalty)),
        recall: Math.min(0.99, Math.max(0.4, 0.77 + Math.random() * 0.1 - penalty)),
        f1: Math.min(0.99, Math.max(0.4, 0.77 + Math.random() * 0.1 - penalty))
      },
      predictions: []
    },
    {
      name: "Self-Training Classifier",
      metrics: {
        accuracy: Math.min(0.99, Math.max(0.4, 0.76 + Math.random() * 0.1 - penalty + complexityFactor * 0.05 - datasetNoise)),
        precision: Math.min(0.99, Math.max(0.4, 0.75 + Math.random() * 0.1 - penalty)),
        recall: Math.min(0.99, Math.max(0.4, 0.74 + Math.random() * 0.1 - penalty)),
        f1: Math.min(0.99, Math.max(0.4, 0.74 + Math.random() * 0.1 - penalty))
      },
      predictions: []
    }
  ];

  const unsupervisedModels = [
    {
      name: "K-Means Clustering",
      metrics: {
        accuracy: Math.min(0.99, 0.65 + Math.random() * 0.15 + complexityFactor * 0.05 - datasetNoise),
        precision: Math.min(0.99, 0.60 + Math.random() * 0.15),
        recall: Math.min(0.99, 0.62 + Math.random() * 0.15),
        f1: Math.min(0.99, 0.61 + Math.random() * 0.15)
      },
      predictions: []
    },
    {
      name: "Gaussian Mixture Model (GMM)",
      metrics: {
        accuracy: Math.min(0.99, 0.68 + Math.random() * 0.15 + complexityFactor * 0.05 - datasetNoise),
        precision: Math.min(0.99, 0.63 + Math.random() * 0.15),
        recall: Math.min(0.99, 0.65 + Math.random() * 0.15),
        f1: Math.min(0.99, 0.64 + Math.random() * 0.15)
      },
      predictions: []
    }
  ];

  const allModels = [...supervisedModels, ...semiSupervisedModels, ...unsupervisedModels];
  
  // Sort by highest accuracy
  return allModels.sort((a, b) => b.metrics.accuracy - a.metrics.accuracy);
}

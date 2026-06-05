export interface DatasetStats {
  rows: number;
  features: number;
  columns: string[];
  targetVariable: string;
  data: any[];
}

export const IRIS_DATASET: DatasetStats = {
  rows: 150,
  features: 4,
  columns: ["sepal_length", "sepal_width", "petal_length", "petal_width", "species"],
  targetVariable: "species",
  data: Array.from({ length: 150 }).map((_, i) => ({
    sepal_length: (Math.random() * 3 + 4).toFixed(1),
    sepal_width: (Math.random() * 2 + 2).toFixed(1),
    petal_length: (Math.random() * 5 + 1).toFixed(1),
    petal_width: (Math.random() * 2 + 0.1).toFixed(1),
    species: i < 50 ? "setosa" : i < 100 ? "versicolor" : "virginica"
  }))
};

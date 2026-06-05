# CompML 🧠

A professional, highly-polished, visually stunning React application for benchmarking machine learning paradigms. CompML provides an intelligent playground for evaluating machine learning algorithms across Supervised, Semi-Supervised, and Unsupervised learning methodologies.

![CompML UI Preview](https://github.com/praneshMS-2007/CompML/assets/placeholder) <!-- Replace with an actual screenshot when available -->

## 🌟 Key Features

- **Intuitive UI/UX**: An immersive "Trendex" style dashboard with deep navy themes, crisp white content areas, and vibrant multicolor gradients.
- **Dataset Integration**: Easily upload your own CSV datasets or utilize built-in mock data (e.g., Customer Churn, Iris Dataset).
- **Single-Model Benchmarking**: Strictly select and simulate individual models within specific learning paradigms.
- **Automated Experiments (Batch Mode)**: Upload a dataset to instantly train and benchmark *every* available model simultaneously, beautifully ranked in a comparative leaderboard.
- **Live Prediction Tool**: Enter feature values manually to retrieve real-time predictions from your selected models.

## 🤖 Supported Paradigms & Models

### 1. Supervised Learning
- Random Forest Classifier
- Support Vector Machine (SVM)

### 2. Semi-Supervised Learning
- Label Propagation
- Self-Training Classifier

### 3. Unsupervised Learning
- K-Means Clustering
- Gaussian Mixture Model (GMM)

## 🛠️ Technology Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: Custom, accessible UI components built from scratch focusing on modern aesthetics (glassmorphism, subtle shadows, vibrant accents).
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/praneshMS-2007/CompML.git
   cd CompML
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

The application will be available at `http://localhost:5173`.

## 📁 Project Structure

- `/src/components/dashboard` - The core functional views including `DatasetUpload`, `MetricsDashboard`, `ParadigmSelector`, and the `ExperimentsView`.
- `/src/components/ui` - Reusable UI elements (Buttons, Cards, Tabs, Sliders).
- `/src/lib/ml-engine` - The mock machine learning simulation engine logic (`simulator.ts`, `datasetProcessor.ts`).
- `index.css` - Global themes, CSS variables, and custom gradient utility classes.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📄 License
This project is licensed under the MIT License.

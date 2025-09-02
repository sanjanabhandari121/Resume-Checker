import { useState } from "react";
import { Hero } from "@/components/Hero";
import { AnalysisDashboard } from "@/components/AnalysisDashboard";

const Index = () => {
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const handleFileAnalyzed = (results: any) => {
    setAnalysisResults(results);
  };

  return (
    <div>
      {!analysisResults ? (
        <Hero onFileAnalyzed={handleFileAnalyzed} />
      ) : (
        <AnalysisDashboard 
          results={analysisResults} 
          onNewAnalysis={() => setAnalysisResults(null)}
        />
      )}
    </div>
  );
};

export default Index;

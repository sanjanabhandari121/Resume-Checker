import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, CheckCircle, TrendingUp } from "lucide-react";
import { FileUpload } from "./FileUpload";

interface HeroProps {
  onFileAnalyzed?: (results: any) => void;
}

export const Hero = ({ onFileAnalyzed }: HeroProps) => {
  return (
    <div className="relative min-h-screen bg-gradient-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 rounded-full bg-gradient-primary shadow-glow">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI Resume Checker
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Get instant feedback on your resume with our AI-powered analysis. 
            Improve ATS compatibility, optimize keywords, and land your dream job.
          </p>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-8 mb-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>ATS Compatible</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span>99% Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4 text-success" />
              <span>Instant Analysis</span>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto">
          <FileUpload onFileAnalyzed={onFileAnalyzed} />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <Card className="p-6 border-0 shadow-card bg-gradient-card hover:shadow-elegant transition-all duration-300">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">ATS Optimization</h3>
              <p className="text-muted-foreground text-sm">
                Ensure your resume passes through Applicant Tracking Systems with our advanced compatibility check.
              </p>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-card bg-gradient-card hover:shadow-elegant transition-all duration-300">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Scoring</h3>
              <p className="text-muted-foreground text-sm">
                Get detailed scores across multiple dimensions including formatting, content, and keywords.
              </p>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-card bg-gradient-card hover:shadow-elegant transition-all duration-300">
            <div className="text-center">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Actionable Insights</h3>
              <p className="text-muted-foreground text-sm">
                Receive specific recommendations to improve your resume's impact and effectiveness.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
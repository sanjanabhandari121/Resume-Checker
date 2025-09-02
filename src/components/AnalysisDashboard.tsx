import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScoreCard } from "./ScoreCard";
import { 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Eye, 
  Target,
  Lightbulb,
  Shield,
  ArrowLeft,
  Download,
  Share
} from "lucide-react";

interface AnalysisResults {
  overallScore: number;
  atsScore: number;
  contentScore: number;
  formattingScore: number;
  keywordMatch: number;
  recommendations: string[];
  strengths: string[];
  improvements: string[];
}

interface AnalysisDashboardProps {
  results: AnalysisResults;
  onNewAnalysis?: () => void;
}

export const AnalysisDashboard = ({ results, onNewAnalysis }: AnalysisDashboardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "success";
    if (score >= 60) return "warning";
    return "destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Fair";
    return "Needs Improvement";
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="outline" 
              onClick={onNewAnalysis}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Analyze New Resume
            </Button>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share Results
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 rounded-full bg-gradient-primary shadow-glow">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Resume Analysis Results
          </h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive AI-powered analysis of your resume
          </p>
        </div>

        {/* Overall Score */}
        <div className="mb-12">
          <Card className="p-8 border-0 shadow-elegant bg-gradient-card text-center">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-primary shadow-glow mb-6 relative">
              <span className="text-4xl font-bold text-white">{results.overallScore}</span>
              <div className="absolute -top-2 -right-2">
                <Badge variant="secondary" className="bg-white text-primary font-semibold">
                  {getScoreLabel(results.overallScore)}
                </Badge>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Overall Resume Score</h2>
            <p className="text-muted-foreground">
              Your resume scored {results.overallScore}/100 based on industry best practices
            </p>
          </Card>
        </div>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <ScoreCard
            title="ATS Compatibility"
            score={results.atsScore}
            icon={Shield}
            description="How well your resume works with applicant tracking systems"
          />
          <ScoreCard
            title="Content Quality"
            score={results.contentScore}
            icon={Eye}
            description="Relevance and impact of your resume content"
          />
          <ScoreCard
            title="Formatting"
            score={results.formattingScore}
            icon={FileText}
            description="Professional layout and visual presentation"
          />
          <ScoreCard
            title="Keyword Match"
            score={results.keywordMatch}
            icon={Target}
            description="Industry-relevant keywords and phrases"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recommendations */}
          <Card className="border-0 shadow-card bg-gradient-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-primary/10">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Key Recommendations</h3>
            </div>
            <div className="space-y-3">
              {results.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-primary">{index + 1}</span>
                  </div>
                  <p className="text-sm text-foreground">{recommendation}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Strengths */}
          <Card className="border-0 shadow-card bg-gradient-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-success/10">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <h3 className="text-xl font-semibold">Strengths</h3>
            </div>
            <div className="space-y-3">
              {results.strengths.map((strength, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-success/5 rounded-lg border border-success/20">
                  <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                  <p className="text-sm text-foreground">{strength}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Areas for Improvement */}
          <Card className="border-0 shadow-card bg-gradient-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-warning/10">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <h3 className="text-xl font-semibold">Areas to Improve</h3>
            </div>
            <div className="space-y-3">
              {results.improvements.map((improvement, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-warning/5 rounded-lg border border-warning/20">
                  <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0" />
                  <p className="text-sm text-foreground">{improvement}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Progress Summary */}
        <Card className="mt-12 p-8 border-0 shadow-elegant bg-gradient-card">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="h-6 w-6 text-accent" />
            <h3 className="text-2xl font-semibold">Score Breakdown</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">ATS Compatibility</span>
                  <span className={`font-semibold text-${getScoreColor(results.atsScore)}`}>
                    {results.atsScore}%
                  </span>
                </div>
                <Progress value={results.atsScore} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Content Quality</span>
                  <span className={`font-semibold text-${getScoreColor(results.contentScore)}`}>
                    {results.contentScore}%
                  </span>
                </div>
                <Progress value={results.contentScore} className="h-2" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Formatting</span>
                  <span className={`font-semibold text-${getScoreColor(results.formattingScore)}`}>
                    {results.formattingScore}%
                  </span>
                </div>
                <Progress value={results.formattingScore} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Keyword Match</span>
                  <span className={`font-semibold text-${getScoreColor(results.keywordMatch)}`}>
                    {results.keywordMatch}%
                  </span>
                </div>
                <Progress value={results.keywordMatch} className="h-2" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
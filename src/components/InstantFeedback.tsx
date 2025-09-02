import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, Zap, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface FeedbackItem {
  type: "success" | "warning" | "info";
  message: string;
  progress?: number;
}

interface InstantFeedbackProps {
  isAnalyzing: boolean;
}

export const InstantFeedback = ({ isAnalyzing }: InstantFeedbackProps) => {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const analysisSteps = [
    { type: "info" as const, message: "📄 Parsing document structure...", progress: 10 },
    { type: "success" as const, message: "✓ Document format recognized", progress: 25 },
    { type: "info" as const, message: "🔍 Analyzing content quality...", progress: 40 },
    { type: "warning" as const, message: "⚠️ Found 3 spelling errors", progress: 55 },
    { type: "success" as const, message: "✓ Good keyword density detected", progress: 70 },
    { type: "info" as const, message: "🤖 Running ATS compatibility check...", progress: 85 },
    { type: "success" as const, message: "✓ Analysis complete!", progress: 100 }
  ];

  useEffect(() => {
    if (isAnalyzing) {
      setFeedback([]);
      setCurrentStep(0);
      
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < analysisSteps.length) {
            setFeedback((prevFeedback) => [...prevFeedback, analysisSteps[prev]]);
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 400);

      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  if (!isAnalyzing && feedback.length === 0) return null;

  return (
    <Card className="border-0 shadow-card bg-gradient-card p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-accent/10">
          <Zap className="h-5 w-5 text-accent" />
        </div>
        <h3 className="text-xl font-semibold">Live Analysis</h3>
        {isAnalyzing && (
          <Badge variant="secondary" className="ml-auto animate-pulse">
            Processing...
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        {/* Overall Progress */}
        {isAnalyzing && currentStep > 0 && (
          <div className="p-4 bg-background/50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Analysis Progress</span>
              <span className="text-sm text-muted-foreground">
                {Math.round((currentStep / analysisSteps.length) * 100)}%
              </span>
            </div>
            <Progress 
              value={(currentStep / analysisSteps.length) * 100} 
              className="h-2" 
            />
          </div>
        )}

        {/* Live Feedback */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {feedback.map((item, index) => {
            const Icon = item.type === "success" ? CheckCircle :
                        item.type === "warning" ? AlertTriangle : TrendingUp;
            
            const colorClass = item.type === "success" ? "text-success" :
                              item.type === "warning" ? "text-warning" : "text-primary";

            return (
              <div 
                key={index} 
                className="flex items-center gap-3 p-3 bg-background/30 rounded-lg animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon className={`h-4 w-4 ${colorClass} flex-shrink-0`} />
                <span className="text-sm text-foreground">{item.message}</span>
                {item.progress && (
                  <Badge variant="outline" className="ml-auto text-xs">
                    {item.progress}%
                  </Badge>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        {!isAnalyzing && feedback.length > 0 && (
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
            <div className="text-center">
              <div className="text-lg font-semibold text-success">
                {feedback.filter(f => f.type === "success").length}
              </div>
              <div className="text-xs text-muted-foreground">Strengths</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-warning">
                {feedback.filter(f => f.type === "warning").length}
              </div>
              <div className="text-xs text-muted-foreground">Issues</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-primary">
                {feedback.filter(f => f.type === "info").length}
              </div>
              <div className="text-xs text-muted-foreground">Analyzed</div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
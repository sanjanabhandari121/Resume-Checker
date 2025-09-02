import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, FileText, Eye } from "lucide-react";

interface FormatIssue {
  category: "structure" | "formatting" | "content" | "ats";
  issue: string;
  impact: "high" | "medium" | "low";
  recommendation: string;
  fixed: boolean;
}

interface FormatCheckProps {
  issues: FormatIssue[];
  overallScore: number;
}

export const FormatCheck = ({ issues, overallScore }: FormatCheckProps) => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "destructive";
      case "medium": return "warning";
      default: return "secondary";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "structure": return FileText;
      case "ats": return Eye;
      default: return AlertTriangle;
    }
  };

  const fixedIssues = issues.filter(issue => issue.fixed).length;
  const totalIssues = issues.length;

  return (
    <Card className="border-0 shadow-card bg-gradient-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-primary/10">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">Structure & Formatting</h3>
        <Badge variant="secondary" className="ml-auto">
          Score: {overallScore}%
        </Badge>
      </div>

      {/* Overall Progress */}
      <div className="mb-6 p-4 bg-background/50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Formatting Quality</span>
          <span className="text-sm text-muted-foreground">{overallScore}/100</span>
        </div>
        <Progress value={overallScore} className="h-2 mb-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{fixedIssues}/{totalIssues} issues resolved</span>
          <span className={overallScore >= 80 ? "text-success" : overallScore >= 60 ? "text-warning" : "text-destructive"}>
            {overallScore >= 80 ? "Excellent" : overallScore >= 60 ? "Good" : "Needs Work"}
          </span>
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {issues.map((issue, index) => {
          const Icon = getCategoryIcon(issue.category);
          return (
            <div key={index} className={`p-4 rounded-lg border ${issue.fixed ? 'bg-success/5 border-success/20' : 'bg-background/50 border-border/50'}`}>
              <div className="flex items-start gap-3">
                <div className={`p-1.5 rounded-full ${issue.fixed ? 'bg-success/20' : 'bg-primary/20'}`}>
                  {issue.fixed ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : (
                    <Icon className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs capitalize">
                      {issue.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {issue.impact} impact
                    </Badge>
                    {issue.fixed && (
                      <Badge variant="secondary" className="text-xs bg-success/20 text-success">
                        ✓ Fixed
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm font-medium mb-2">{issue.issue}</p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Recommendation:</span> {issue.recommendation}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      {totalIssues === 0 && (
        <div className="flex items-center gap-3 p-4 bg-success/5 rounded-lg border border-success/20">
          <CheckCircle className="h-5 w-5 text-success" />
          <p className="text-foreground">Perfect formatting! Your resume structure looks professional.</p>
        </div>
      )}
    </Card>
  );
};
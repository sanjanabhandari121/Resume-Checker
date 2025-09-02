import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, Edit3 } from "lucide-react";

interface GrammarIssue {
  type: "grammar" | "spelling" | "style";
  text: string;
  suggestion: string;
  context: string;
  severity: "high" | "medium" | "low";
}

interface GrammarCheckProps {
  issues: GrammarIssue[];
}

export const GrammarCheck = ({ issues }: GrammarCheckProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "warning";
      default: return "secondary";
    }
  };

  const getSeverityIcon = (severity: string) => {
    return severity === "high" ? AlertTriangle : Edit3;
  };

  return (
    <Card className="border-0 shadow-card bg-gradient-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-primary/10">
          <Edit3 className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">Grammar & Spelling</h3>
        <Badge variant="secondary" className="ml-auto">
          {issues.length} {issues.length === 1 ? 'issue' : 'issues'} found
        </Badge>
      </div>

      <div className="space-y-4">
        {issues.length === 0 ? (
          <div className="flex items-center gap-3 p-4 bg-success/5 rounded-lg border border-success/20">
            <CheckCircle className="h-5 w-5 text-success" />
            <p className="text-foreground">No grammar or spelling issues detected!</p>
          </div>
        ) : (
          issues.map((issue, index) => {
            const Icon = getSeverityIcon(issue.severity);
            return (
              <div key={index} className="p-4 bg-background/50 rounded-lg border border-border/50">
                <div className="flex items-start gap-3 mb-3">
                  <Icon className="h-4 w-4 text-warning flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {issue.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {issue.severity}
                    </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Found in: "{issue.context}"
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium text-destructive">Issue:</span> {issue.text}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium text-success">Suggestion:</span> {issue.suggestion}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    Fix
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};
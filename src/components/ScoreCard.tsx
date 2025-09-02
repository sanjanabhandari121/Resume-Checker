import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface ScoreCardProps {
  title: string;
  score: number;
  icon: LucideIcon;
  description: string;
}

export const ScoreCard = ({ title, score, icon: Icon, description }: ScoreCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "success";
    if (score >= 60) return "warning";
    return "destructive";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return "from-success/20 to-success/10";
    if (score >= 60) return "from-warning/20 to-warning/10";
    return "from-destructive/20 to-destructive/10";
  };

  const getIconColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <Card className={`border-0 shadow-card bg-gradient-to-br ${getScoreGradient(score)} hover:shadow-elegant transition-all duration-300 p-6`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-full bg-white/50 backdrop-blur-sm">
          <Icon className={`h-5 w-5 ${getIconColor(score)}`} />
        </div>
        <Badge variant="secondary" className={`${score >= 80 ? 'bg-success/20 text-success' : score >= 60 ? 'bg-warning/20 text-warning' : 'bg-destructive/20 text-destructive'} font-semibold`}>
          {score}%
        </Badge>
      </div>
      
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      
      <div className="space-y-2">
        <Progress value={score} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span className="font-medium">Score: {score}/100</span>
          <span>100</span>
        </div>
      </div>
    </Card>
  );
};
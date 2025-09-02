import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, Plus, TrendingUp, Star } from "lucide-react";

interface Skill {
  name: string;
  category: "technical" | "soft" | "industry";
  demand: "high" | "medium" | "rising";
  relevance: number;
}

interface SkillsSuggestionProps {
  currentSkills: string[];
  suggestedSkills: Skill[];
  missingCritical: Skill[];
}

export const SkillsSuggestion = ({ currentSkills, suggestedSkills, missingCritical }: SkillsSuggestionProps) => {
  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "high": return "destructive";
      case "rising": return "warning";
      default: return "secondary";
    }
  };

  const getDemandIcon = (demand: string) => {
    return demand === "rising" ? TrendingUp : Star;
  };

  return (
    <Card className="border-0 shadow-card bg-gradient-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-accent/10">
          <Lightbulb className="h-5 w-5 text-accent" />
        </div>
        <h3 className="text-xl font-semibold">Skills Enhancement</h3>
      </div>

      <div className="space-y-6">
        {/* Current Skills */}
        <div>
          <h4 className="font-medium mb-3 text-success">✓ Current Skills</h4>
          <div className="flex flex-wrap gap-2">
            {currentSkills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-success/10 text-success border-success/20">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Critical Missing Skills */}
        {missingCritical.length > 0 && (
          <div>
            <h4 className="font-medium mb-3 text-destructive flex items-center gap-2">
              <Star className="h-4 w-4" />
              Critical Missing Skills
            </h4>
            <div className="space-y-3">
              {missingCritical.map((skill, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      {skill.category}
                    </Badge>
                    <span className="font-medium">{skill.name}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-warning" />
                      <span className="text-xs text-muted-foreground">{skill.relevance}% match</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Skills */}
        <div>
          <h4 className="font-medium mb-3 text-primary">💡 Recommended Skills</h4>
          <div className="space-y-2">
            {suggestedSkills.map((skill, index) => {
              const Icon = getDemandIcon(skill.demand);
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      {skill.category}
                    </Badge>
                    <span className="font-medium">{skill.name}</span>
                    <div className="flex items-center gap-1">
                      <Icon className="h-3 w-3 text-accent" />
                      <span className="text-xs text-muted-foreground capitalize">{skill.demand} demand</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-xs">
                    <Plus className="h-3 w-3 mr-1" />
                    Consider
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};
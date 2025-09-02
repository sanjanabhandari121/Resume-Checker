import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, File, X, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { InstantFeedback } from "./InstantFeedback";

interface FileUploadProps {
  onFileAnalyzed?: (results: any) => void;
}

export const FileUpload = ({ onFileAnalyzed }: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  }, []);

  const handleFiles = (files: File[]) => {
    const file = files[0];
    
    if (!file) return;
    
    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    toast({
      title: "File uploaded successfully",
      description: "Click 'Analyze Resume' to start the analysis.",
    });
  };

  const analyzeResume = async () => {
    if (!uploadedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults = {
        overallScore: 85,
        atsScore: 78,
        contentScore: 92,
        formattingScore: 81,
        keywordMatch: 73,
        recommendations: [
          "Add more industry-specific keywords",
          "Improve bullet point formatting",
          "Include quantified achievements",
          "Optimize section headers for ATS"
        ],
        strengths: [
          "Strong professional summary",
          "Relevant work experience",
          "Good use of action verbs"
        ],
        improvements: [
          "Missing contact information",
          "Inconsistent date formatting",
          "Could use more technical skills"
        ],
        grammarIssues: [
          {
            type: "spelling" as const,
            text: "experiance",
            suggestion: "experience",
            context: "Over 5 years of experiance in software development",
            severity: "high" as const
          },
          {
            type: "grammar" as const,
            text: "I have worked",
            suggestion: "Worked",
            context: "I have worked on multiple projects",
            severity: "medium" as const
          }
        ],
        skillsData: {
          currentSkills: ["JavaScript", "React", "Node.js", "Python"],
          suggestedSkills: [
            {
              name: "TypeScript",
              category: "technical" as const,
              demand: "high" as const,
              relevance: 92
            },
            {
              name: "AWS",
              category: "technical" as const,
              demand: "rising" as const,
              relevance: 88
            }
          ],
          missingCritical: [
            {
              name: "Machine Learning",
              category: "technical" as const,
              demand: "high" as const,
              relevance: 95
            }
          ]
        },
        formatIssues: [
          {
            category: "structure" as const,
            issue: "Missing professional summary section",
            impact: "high" as const,
            recommendation: "Add a 2-3 line professional summary at the top",
            fixed: false
          },
          {
            category: "formatting" as const,
            issue: "Inconsistent bullet point style",
            impact: "medium" as const,
            recommendation: "Use consistent bullet points throughout",
            fixed: true
          }
        ]
      };
      
      setIsAnalyzing(false);
      onFileAnalyzed?.(mockResults);
      
      toast({
        title: "Analysis complete!",
        description: "Your resume has been analyzed successfully.",
      });
    }, 3000);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <InstantFeedback isAnalyzing={isAnalyzing} />
      
      <Card className={cn(
        "border-2 border-dashed border-border bg-gradient-card p-8 text-center transition-all duration-300",
        isDragOver && "border-primary bg-primary/5 shadow-glow",
        uploadedFile && "border-success bg-success/5"
      )}>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="space-y-4"
        >
          {!uploadedFile ? (
            <>
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-primary/10">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Upload Your Resume</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop your resume here, or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports PDF, DOC, DOCX • Max file size: 10MB
                </p>
              </div>

              <input
                type="file"
                id="file-upload"
                className="sr-only"
                accept=".pdf,.doc,.docx"
                onChange={handleFileInput}
              />
              
              <Button asChild variant="outline" size="lg">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="mr-2 h-4 w-4" />
                  Choose File
                </label>
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 className="h-12 w-12 text-success" />
              </div>
              
              <div className="flex items-center justify-center gap-3 p-4 bg-success/10 rounded-lg">
                <File className="h-5 w-5 text-success" />
                <span className="font-medium">{uploadedFile.name}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={removeFile}
                  className="ml-auto"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={analyzeResume}
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Analyzing Resume...
                    </>
                  ) : (
                    <>
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Analyze Resume
                    </>
                  )}
                </Button>
                
                {isAnalyzing && (
                  <div className="text-sm text-muted-foreground">
                    Our AI is analyzing your resume for ATS compatibility, 
                    keyword optimization, and formatting best practices...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
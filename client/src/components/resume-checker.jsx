import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FileText, Upload, CheckCircle2, XCircle, AlertTriangle, Download, Star, Target } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// TODO: Remove mock data
const resumeAnalysis = {
  overallScore: 78,
  atsCompatibility: 85,
  sections: [
    { name: "Contact Information", score: 95, status: "good", feedback: "Complete and properly formatted" },
    { name: "Professional Summary", score: 70, status: "warning", feedback: "Could be more specific to target role" },
    { name: "Work Experience", score: 85, status: "good", feedback: "Good detail with quantified achievements" },
    { name: "Technical Skills", score: 90, status: "good", feedback: "Comprehensive and relevant skills listed" },
    { name: "Education", score: 80, status: "good", feedback: "Education details are complete" },
    { name: "Projects", score: 60, status: "warning", feedback: "Add more technical project details" },
    { name: "Certifications", score: 45, status: "error", feedback: "Missing relevant certifications" },
  ],
  keywords: {
    found: 12,
    recommended: 18,
    missing: ["cloud computing", "microservices", "agile methodology", "CI/CD", "docker", "kubernetes"]
  },
  recommendations: [
    {
      category: "Skills Enhancement",
      priority: "high",
      items: [
        "Add AWS/Azure cloud certifications",
        "Include Docker/Kubernetes experience",
        "Showcase DevOps practices knowledge"
      ]
    },
    {
      category: "Project Additions",
      priority: "medium",
      items: [
        "Full-stack web application with modern stack",
        "Microservices architecture project",
        "Mobile app development project"
      ]
    },
    {
      category: "Certification Recommendations",
      priority: "medium",
      items: [
        "AWS Certified Solutions Architect",
        "Google Cloud Professional Developer",
        "Certified Kubernetes Administrator (CKA)"
      ]
    }
  ]
}

export function ResumeChecker() {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setIsAnalyzing(true)
      // Simulate analysis delay
      setTimeout(() => {
        setIsAnalyzing(false)
        setShowAnalysis(true)
        console.log('Resume analysis completed')
      }, 2000)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "text-chart-2"
    if (score >= 60) return "text-chart-3"
    return "text-destructive"
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "good": return <CheckCircle2 className="h-4 w-4 text-chart-2" />
      case "warning": return <AlertTriangle className="h-4 w-4 text-chart-3" />
      case "error": return <XCircle className="h-4 w-4 text-destructive" />
      default: return <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "destructive"
      case "medium": return "default"
      case "low": return "secondary"
      default: return "secondary"
    }
  }

  return (
    <div className="space-y-6" data-testid="resume-checker">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Resume Checker</h2>
        <p className="text-muted-foreground">Analyze your resume for ATS compatibility and get improvement suggestions</p>
      </div>

      {!showAnalysis ? (
        <>
          {/* Upload Section */}
          <Card className="border-dashed border-2 hover-elevate">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Upload Your Resume</h3>
                  <p className="text-muted-foreground">Support for PDF, DOC, and DOCX files (max 10MB)</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      data-testid="input-resume-upload"
                    />
                    <Button className="w-full sm:w-auto" data-testid="button-upload-resume">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                  </label>
                  <span className="text-sm text-muted-foreground">or drag and drop</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {uploadedFile && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Uploaded Resume</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  {isAnalyzing ? (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                      <p className="text-sm text-muted-foreground mt-2">Analyzing...</p>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <>
          {/* Analysis Results */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="hover-elevate">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getScoreColor(resumeAnalysis.overallScore)}`}>
                  {resumeAnalysis.overallScore}/100
                </div>
                <div className="mt-2">
                  <Progress value={resumeAnalysis.overallScore} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Good foundation, room for improvement</p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ATS Compatibility</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-chart-2" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getScoreColor(resumeAnalysis.atsCompatibility)}`}>
                  {resumeAnalysis.atsCompatibility}%
                </div>
                <div className="mt-2">
                  <Progress value={resumeAnalysis.atsCompatibility} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Highly compatible with ATS systems</p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Keywords Match</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {resumeAnalysis.keywords.found}/{resumeAnalysis.keywords.recommended}
                </div>
                <div className="mt-2">
                  <Progress value={(resumeAnalysis.keywords.found / resumeAnalysis.keywords.recommended) * 100} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {resumeAnalysis.keywords.missing.length} keywords missing
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Section Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Section Analysis</CardTitle>
              <CardDescription>Detailed breakdown of each resume section</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resumeAnalysis.sections.map((section, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover-elevate">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(section.status)}
                      <div>
                        <p className="font-medium">{section.name}</p>
                        <p className="text-sm text-muted-foreground">{section.feedback}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getScoreColor(section.score)}`}>
                        {section.score}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Missing Keywords */}
          <Card>
            <CardHeader>
              <CardTitle>Missing Keywords</CardTitle>
              <CardDescription>Add these keywords to improve your resume's visibility</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {resumeAnalysis.keywords.missing.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="cursor-pointer hover-elevate">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Improvement Recommendations</h3>
            
            {resumeAnalysis.recommendations.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                    <Badge variant={getPriorityColor(category.priority)}>
                      {category.priority} priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <p className="text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => console.log('Downloading improved resume')}
              data-testid="button-download-improved"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Improved Resume
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setShowAnalysis(false)
                setUploadedFile(null)
              }}
              data-testid="button-analyze-new"
            >
              Analyze New Resume
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" data-testid="button-get-help">
                  Get Professional Help
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Professional Resume Services</DialogTitle>
                  <DialogDescription>
                    Connect with career experts for personalized resume optimization
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm">
                    Our professional resume writers can help you create an ATS-optimized resume 
                    that stands out to hiring managers and lands you more interviews.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline">
                      View Packages
                    </Button>
                    <Button>
                      Book Consultation
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </>
      )}
    </div>
  )
}
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Play, Lock, Clock, Star, BookOpen, Video, FileText } from "lucide-react"

// TODO: Remove mock data
const learningPaths = [
  {
    id: 1,
    title: "Full-Stack Web Developer",
    description: "Complete journey from frontend to backend development",
    difficulty: "Intermediate",
    duration: "6 months",
    progress: 65,
    totalModules: 12,
    completedModules: 8,
    enrolled: true,
    skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "HTML/CSS"]
  },
  {
    id: 2,
    title: "Data Science & Machine Learning",
    description: "From data analysis to ML model deployment",
    difficulty: "Advanced",
    duration: "8 months",
    progress: 20,
    totalModules: 15,
    completedModules: 3,
    enrolled: false,
    skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Statistics"]
  },
  {
    id: 3,
    title: "Mobile App Development",
    description: "Build native and cross-platform mobile applications",
    difficulty: "Intermediate",
    duration: "4 months",
    progress: 0,
    totalModules: 10,
    completedModules: 0,
    enrolled: false,
    skills: ["React Native", "Flutter", "JavaScript", "Dart", "Firebase", "API Integration"]
  }
]

const currentPathModules = [
  {
    id: 1,
    title: "HTML & CSS Fundamentals",
    description: "Master the building blocks of web development",
    status: "completed",
    duration: "2 weeks",
    type: "course",
    resources: [
      { type: "video", title: "HTML Basics", duration: "45 min", completed: true },
      { type: "article", title: "CSS Grid Guide", duration: "15 min", completed: true },
      { type: "project", title: "Portfolio Landing Page", duration: "3 hours", completed: true }
    ]
  },
  {
    id: 2,
    title: "JavaScript Essentials",
    description: "Learn modern JavaScript programming concepts",
    status: "completed",
    duration: "3 weeks",
    type: "course",
    resources: [
      { type: "video", title: "ES6 Features", duration: "60 min", completed: true },
      { type: "article", title: "Async/Await Guide", duration: "20 min", completed: true },
      { type: "project", title: "Todo App", duration: "4 hours", completed: true }
    ]
  },
  {
    id: 3,
    title: "React Development",
    description: "Build interactive user interfaces with React",
    status: "current",
    duration: "4 weeks",
    type: "course",
    resources: [
      { type: "video", title: "React Fundamentals", duration: "90 min", completed: true },
      { type: "article", title: "Hooks Deep Dive", duration: "25 min", completed: true },
      { type: "project", title: "E-commerce Store", duration: "8 hours", completed: false }
    ]
  },
  {
    id: 4,
    title: "Node.js & Express",
    description: "Server-side development with Node.js",
    status: "locked",
    duration: "3 weeks",
    type: "course",
    resources: []
  },
  {
    id: 5,
    title: "Database Design & MongoDB",
    description: "Data modeling and database operations",
    status: "locked",
    duration: "2 weeks",
    type: "course",
    resources: []
  },
  {
    id: 6,
    title: "Full-Stack Integration",
    description: "Connect frontend and backend systems",
    status: "locked",
    duration: "3 weeks",
    type: "project",
    resources: []
  }
]

export function LearningPath() {
  const [selectedPath, setSelectedPath] = useState(1)
  const [showAllPaths, setShowAllPaths] = useState(false)

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="h-5 w-5 text-chart-2" />
      case "current": return <Play className="h-5 w-5 text-chart-1" />
      case "locked": return <Lock className="h-5 w-5 text-muted-foreground" />
      default: return <Circle className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getResourceIcon = (type) => {
    switch (type) {
      case "video": return <Video className="h-4 w-4" />
      case "article": return <FileText className="h-4 w-4" />
      case "project": return <Star className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner": return "secondary"
      case "Intermediate": return "default"
      case "Advanced": return "destructive"
      default: return "secondary"
    }
  }

  const currentPath = learningPaths.find(path => path.id === selectedPath)

  return (
    <div className="space-y-6" data-testid="learning-path">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Learning Paths</h2>
          <p className="text-muted-foreground">Structured learning journeys to achieve your career goals</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setShowAllPaths(!showAllPaths)}
          data-testid="button-toggle-paths"
        >
          {showAllPaths ? "Show Current Path" : "Browse All Paths"}
        </Button>
      </div>

      {showAllPaths ? (
        /* All Learning Paths */
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {learningPaths.map((path) => (
            <Card key={path.id} className="hover-elevate" data-testid={`path-card-${path.id}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant={getDifficultyColor(path.difficulty)}>
                    {path.difficulty}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {path.duration}
                  </div>
                </div>
                <CardTitle className="text-xl">{path.title}</CardTitle>
                <CardDescription>{path.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                {path.enrolled && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{path.completedModules}/{path.totalModules} modules</span>
                    </div>
                    <Progress value={path.progress} className="h-2" />
                  </div>
                )}

                {/* Skills */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Skills you'll learn:</p>
                  <div className="flex flex-wrap gap-1">
                    {path.skills.slice(0, 4).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {path.skills.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{path.skills.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full"
                  variant={path.enrolled ? "outline" : "default"}
                  onClick={() => {
                    if (path.enrolled) {
                      setSelectedPath(path.id)
                      setShowAllPaths(false)
                    } else {
                      console.log(`Enrolling in path ${path.id}`)
                    }
                  }}
                  data-testid={`button-path-${path.id}`}
                >
                  {path.enrolled ? "Continue Learning" : "Enroll Now"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Current Learning Path Detail */
        <div className="space-y-6">
          {/* Path Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-chart-1 to-chart-2 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{currentPath?.title}</CardTitle>
                    <CardDescription className="text-base mt-1">
                      {currentPath?.description}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={getDifficultyColor(currentPath?.difficulty || "")}>
                  {currentPath?.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-chart-1">{currentPath?.progress}%</div>
                  <p className="text-sm text-muted-foreground">Overall Progress</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{currentPath?.completedModules}/{currentPath?.totalModules}</div>
                  <p className="text-sm text-muted-foreground">Modules Completed</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{currentPath?.duration}</div>
                  <p className="text-sm text-muted-foreground">Estimated Duration</p>
                </div>
              </div>
              <div className="mt-4">
                <Progress value={currentPath?.progress} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Module Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Modules</CardTitle>
              <CardDescription>Follow the structured path to master each skill</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {currentPathModules.map((module, index) => (
                  <div key={module.id} className="relative" data-testid={`module-${module.id}`}>
                    {/* Timeline Line */}
                    {index < currentPathModules.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-16 bg-border"></div>
                    )}
                    
                    <div className="flex items-start space-x-4">
                      {/* Status Icon */}
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(module.status)}
                      </div>

                      {/* Module Content */}
                      <div className="flex-1 min-w-0">
                        <Card className={`hover-elevate ${module.status === 'current' ? 'ring-2 ring-chart-1' : ''}`}>
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{module.title}</CardTitle>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">{module.type}</Badge>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {module.duration}
                                </div>
                              </div>
                            </div>
                            <CardDescription>{module.description}</CardDescription>
                          </CardHeader>
                          
                          {module.resources.length > 0 && (
                            <CardContent className="pt-0">
                              <div className="space-y-2">
                                <p className="text-sm font-medium">Resources:</p>
                                {module.resources.map((resource, resourceIndex) => (
                                  <div 
                                    key={resourceIndex} 
                                    className="flex items-center justify-between p-2 rounded-md hover-elevate"
                                  >
                                    <div className="flex items-center space-x-2">
                                      {getResourceIcon(resource.type)}
                                      <span className="text-sm">{resource.title}</span>
                                      <Badge variant="outline" className="text-xs">
                                        {resource.duration}
                                      </Badge>
                                    </div>
                                    {resource.completed ? (
                                      <CheckCircle2 className="h-4 w-4 text-chart-2" />
                                    ) : (
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        onClick={() => console.log(`Starting resource: ${resource.title}`)}
                                      >
                                        Start
                                      </Button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skills Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Skills Development</CardTitle>
              <CardDescription>Track your progress in key skills for this path</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {currentPath?.skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{skill}</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.floor(Math.random() * 40) + 60}%
                      </span>
                    </div>
                    <Progress value={Math.floor(Math.random() * 40) + 60} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
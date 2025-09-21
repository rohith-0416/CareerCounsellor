import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, Search, Filter, Play, Clock, Users, BookOpen, Video, ExternalLink } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// TODO: Remove mock data
const courseCategories = [
  { id: 'all', name: 'All Courses' },
  { id: 'programming', name: 'Programming' },
  { id: 'web-dev', name: 'Web Development' },
  { id: 'data-science', name: 'Data Science' },
  { id: 'mobile', name: 'Mobile Development' },
  { id: 'cloud', name: 'Cloud Computing' },
  { id: 'ai-ml', name: 'AI/ML' },
]

const courses = [
  {
    id: 1,
    title: "Complete React Developer Course",
    instructor: "John Smith",
    platform: "YouTube",
    category: "web-dev",
    duration: "12 hours",
    rating: 4.8,
    students: 45000,
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
    description: "Master React from basics to advanced concepts including hooks, context, and modern patterns.",
    tags: ["React", "JavaScript", "Frontend", "Hooks"],
    url: "https://youtube.com/watch?v=example",
    progress: 65,
    enrolled: true,
    free: true
  },
  {
    id: 2,
    title: "Python Data Science Fundamentals",
    instructor: "Dr. Sarah Johnson",
    platform: "Coursera",
    category: "data-science",
    duration: "8 weeks",
    rating: 4.9,
    students: 32000,
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    description: "Learn Python for data analysis, visualization, and machine learning applications.",
    tags: ["Python", "Data Science", "Pandas", "NumPy"],
    url: "https://coursera.org/learn/example",
    progress: 0,
    enrolled: false,
    free: false,
    price: "$49"
  },
  {
    id: 3,
    title: "AWS Cloud Practitioner Certification",
    instructor: "Cloud Academy",
    platform: "YouTube",
    category: "cloud",
    duration: "15 hours",
    rating: 4.7,
    students: 28000,
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
    description: "Prepare for AWS Cloud Practitioner certification with hands-on practice.",
    tags: ["AWS", "Cloud", "DevOps", "Certification"],
    url: "https://youtube.com/watch?v=example2",
    progress: 25,
    enrolled: true,
    free: true
  },
  {
    id: 4,
    title: "Machine Learning with TensorFlow",
    instructor: "AI Institute",
    platform: "edX",
    category: "ai-ml",
    duration: "10 weeks",
    rating: 4.6,
    students: 18000,
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400",
    description: "Deep dive into machine learning algorithms and neural networks using TensorFlow.",
    tags: ["TensorFlow", "Machine Learning", "AI", "Neural Networks"],
    url: "https://edx.org/course/example",
    progress: 0,
    enrolled: false,
    free: false,
    price: "$99"
  },
  {
    id: 5,
    title: "Mobile App Development with React Native",
    instructor: "Mobile Masters",
    platform: "YouTube",
    category: "mobile",
    duration: "18 hours",
    rating: 4.5,
    students: 22000,
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
    description: "Build cross-platform mobile apps using React Native and modern development practices.",
    tags: ["React Native", "Mobile", "JavaScript", "Cross-platform"],
    url: "https://youtube.com/watch?v=example3",
    progress: 40,
    enrolled: true,
    free: true
  },
  {
    id: 6,
    title: "Full-Stack JavaScript Bootcamp",
    instructor: "Code Academy Pro",
    platform: "Udemy",
    category: "web-dev",
    duration: "40 hours",
    rating: 4.8,
    students: 65000,
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?w=400",
    description: "Complete full-stack development course covering frontend, backend, and deployment.",
    tags: ["JavaScript", "Node.js", "MongoDB", "Full-Stack"],
    url: "https://udemy.com/course/example",
    progress: 0,
    enrolled: false,
    free: false,
    price: "$79"
  }
]

export function CourseLibrary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [showOnlyFree, setShowOnlyFree] = useState(false)

  const filteredCourses = courses.filter(course => {
    const searchMatch = searchTerm === "" || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const categoryMatch = selectedCategory === "all" || course.category === selectedCategory
    const levelMatch = selectedLevel === "all" || course.level === selectedLevel
    const freeMatch = !showOnlyFree || course.free
    
    return searchMatch && categoryMatch && levelMatch && freeMatch
  })

  const enrolledCourses = courses.filter(course => course.enrolled)
  const completionRate = enrolledCourses.length > 0 
    ? enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length 
    : 0

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner": return "secondary"
      case "Intermediate": return "default"
      case "Advanced": return "destructive"
      default: return "secondary"
    }
  }

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "YouTube": return <Video className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6" data-testid="course-library">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Course Library</h2>
        <p className="text-muted-foreground">Discover free and premium courses to enhance your skills</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enrolledCourses.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active learning
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(completionRate)}%</div>
            <div className="mt-2">
              <Progress value={completionRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Free Courses</CardTitle>
            <Video className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.filter(c => c.free).length}</div>
            <p className="text-xs text-chart-2 mt-1">
              Available now
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">160h</div>
            <p className="text-xs text-muted-foreground mt-1">
              Learning content
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses, instructors, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                  data-testid="input-search-courses"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {courseCategories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant={showOnlyFree ? "default" : "outline"}
                size="sm"
                onClick={() => setShowOnlyFree(!showOnlyFree)}
                data-testid="button-filter-free"
              >
                Free Only
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Course Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover-elevate group" data-testid={`course-card-${course.id}`}>
            <div className="aspect-video overflow-hidden rounded-t-lg relative">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute top-2 left-2">
                <Badge variant={course.free ? "secondary" : "default"} className="bg-background/80">
                  {course.free ? "Free" : course.price}
                </Badge>
              </div>
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="bg-background/80">
                  {getPlatformIcon(course.platform)}
                  <span className="ml-1">{course.platform}</span>
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge variant={getLevelColor(course.level)} className="text-xs">
                  {course.level}
                </Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {course.duration}
                </div>
              </div>
              
              <CardTitle className="text-lg leading-tight">
                {course.title}
              </CardTitle>
              
              <CardDescription className="text-sm">
                by {course.instructor}
              </CardDescription>
              
              <p className="text-sm text-muted-foreground line-clamp-2">
                {course.description}
              </p>
            </CardHeader>
            
            <CardContent className="pt-0 space-y-4">
              {/* Course Stats */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-current text-yellow-400 mr-1" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{(course.students / 1000).toFixed(0)}k students</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {course.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {course.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{course.tags.length - 3}
                  </Badge>
                )}
              </div>

              {/* Progress (if enrolled) */}
              {course.enrolled && course.progress > 0 && (
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              )}

              {/* Action Button */}
              <Button 
                className="w-full"
                variant={course.enrolled ? "outline" : "default"}
                onClick={() => {
                  if (course.enrolled) {
                    console.log(`Continuing course ${course.id}`)
                  } else {
                    console.log(`Enrolling in course ${course.id}`)
                  }
                }}
                data-testid={`button-course-${course.id}`}
              >
                {course.enrolled ? (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Continue Learning
                  </>
                ) : (
                  <>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {course.free ? "Start Free" : "Enroll Now"}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredCourses.length === 0 && (
        <Card className="text-center py-8">
          <CardContent>
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters
            </p>
            <div className="flex justify-center gap-2">
              <Button 
                variant="outline" 
                onClick={() => setSearchTerm("")}
                disabled={searchTerm === ""}
              >
                Clear Search
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedCategory("all")
                  setSelectedLevel("all")
                  setShowOnlyFree(false)
                }}
              >
                Reset Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Load More */}
      {filteredCourses.length > 0 && (
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => console.log('Loading more courses')}
            data-testid="button-load-more-courses"
          >
            Load More Courses
          </Button>
        </div>
      )}
    </div>
  )
}
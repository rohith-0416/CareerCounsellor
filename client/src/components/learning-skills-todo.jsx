import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Clock, CheckCircle2, Star, Target, Filter } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// TODO: Remove mock data
const skillCategories = [
  { id: 'technical', name: 'Technical Skills', color: 'bg-chart-1' },
  { id: 'soft', name: 'Soft Skills', color: 'bg-chart-2' },
  { id: 'career', name: 'Career Development', color: 'bg-chart-3' },
  { id: 'certification', name: 'Certifications', color: 'bg-chart-4' },
]

const initialTasks = [
  {
    id: 1,
    title: "Complete React Advanced Patterns Course",
    description: "Learn advanced React concepts including context, hooks, and performance optimization",
    category: "technical",
    priority: "high",
    estimatedHours: 40,
    completed: false,
    progress: 65,
    dueDate: "2024-01-15",
    skills: ["React", "JavaScript", "Frontend"]
  },
  {
    id: 2,
    title: "Practice Data Structures & Algorithms",
    description: "Solve 50 DSA problems on LeetCode focusing on arrays, linked lists, and trees",
    category: "technical",
    priority: "high",
    estimatedHours: 60,
    completed: false,
    progress: 32,
    dueDate: "2024-01-20",
    skills: ["DSA", "Problem Solving", "Coding"]
  },
  {
    id: 3,
    title: "Improve Communication Skills",
    description: "Practice public speaking and presentation skills for technical interviews",
    category: "soft",
    priority: "medium",
    estimatedHours: 20,
    completed: true,
    progress: 100,
    dueDate: "2023-12-30",
    skills: ["Communication", "Presentation", "Leadership"]
  },
  {
    id: 4,
    title: "Build Full-Stack Portfolio Project",
    description: "Create a complete web application showcasing both frontend and backend skills",
    category: "career",
    priority: "high",
    estimatedHours: 80,
    completed: false,
    progress: 25,
    dueDate: "2024-02-01",
    skills: ["Full-Stack", "Portfolio", "Project Management"]
  },
  {
    id: 5,
    title: "AWS Cloud Practitioner Certification",
    description: "Study and pass the AWS Cloud Practitioner exam",
    category: "certification",
    priority: "medium",
    estimatedHours: 30,
    completed: false,
    progress: 10,
    dueDate: "2024-01-25",
    skills: ["AWS", "Cloud Computing", "DevOps"]
  },
]

export function LearningSkillsTodo() {
  const [tasks, setTasks] = useState(initialTasks)
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")

  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, progress: !task.completed ? 100 : task.progress }
        : task
    ))
    console.log(`Task ${taskId} toggled`)
  }

  const filteredTasks = tasks.filter(task => {
    const categoryMatch = filterCategory === "all" || task.category === filterCategory
    const priorityMatch = filterPriority === "all" || task.priority === filterPriority
    return categoryMatch && priorityMatch
  })

  const completedTasks = tasks.filter(task => task.completed).length
  const totalProgress = tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'destructive'
      case 'medium': return 'default'
      case 'low': return 'secondary'
      default: return 'secondary'
    }
  }

  const getCategoryInfo = (categoryId) => {
    return skillCategories.find(cat => cat.id === categoryId) || skillCategories[0]
  }

  return (
    <div className="space-y-6" data-testid="learning-skills-todo">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Learning objectives
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks}</div>
            <p className="text-xs text-chart-2 mt-1">
              {Math.round((completedTasks / tasks.length) * 100)}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(totalProgress)}%</div>
            <div className="mt-2">
              <Progress value={totalProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Invested</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tasks.reduce((sum, task) => sum + (task.estimatedHours * task.progress / 100), 0).toFixed(0)}h
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Of {tasks.reduce((sum, task) => sum + task.estimatedHours, 0)}h total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Learning Skills To-Do</h2>
          <p className="text-muted-foreground">Track your skill development journey</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Filters */}
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {skillCategories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
            <DialogTrigger asChild>
              <Button data-testid="button-add-task">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Learning Task</DialogTitle>
                <DialogDescription>Create a new skill development goal</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="task-title">Task Title</Label>
                  <Input 
                    id="task-title" 
                    placeholder="e.g., Learn TypeScript fundamentals"
                    data-testid="input-task-title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task-description">Description</Label>
                  <Input 
                    id="task-description" 
                    placeholder="Brief description of the learning goal"
                    data-testid="input-task-description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="task-category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {skillCategories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="task-priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task-hours">Estimated Hours</Label>
                  <Input 
                    id="task-hours" 
                    type="number" 
                    placeholder="e.g., 20"
                    data-testid="input-task-hours"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingTask(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  console.log('Adding new task')
                  setIsAddingTask(false)
                }} data-testid="button-save-task">
                  Add Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tasks List */}
      <div className="grid gap-4 lg:grid-cols-2">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="hover-elevate" data-testid={`task-card-${task.id}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    data-testid={`checkbox-task-${task.id}`}
                  />
                  <div>
                    <CardTitle className={`text-lg ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {task.description}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{task.progress}%</span>
                </div>
                <Progress value={task.progress} className="h-2" />
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1">
                {task.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              {/* Category and Time */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getCategoryInfo(task.category).color}`}></div>
                  <span>{getCategoryInfo(task.category).name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{task.estimatedHours}h</span>
                </div>
              </div>

              {/* Due Date */}
              {task.dueDate && (
                <div className="text-sm text-muted-foreground">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <Card className="text-center py-8">
          <CardContent>
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
            <p className="text-muted-foreground mb-4">
              {filterCategory !== "all" || filterPriority !== "all" 
                ? "Try adjusting your filters or add a new task"
                : "Start your learning journey by adding your first skill development goal"
              }
            </p>
            <Button onClick={() => setIsAddingTask(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Task
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
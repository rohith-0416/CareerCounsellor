import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, TrendingUp, Target, BookOpen, FileText } from "lucide-react"

// TODO: Remove mock data
const sgpaData = [
  { semester: 'Sem 1', sgpa: 10 },
  { semester: 'Sem 2', sgpa: 10 },
  { semester: 'Sem 3', sgpa: 10 },
  { semester: 'Sem 4', sgpa: 10 },
  { semester: 'Sem 5', sgpa: 10 },
  { semester: 'Sem 6', sgpa: 10 },
]

const recentTasks = [
  { id: 1, title: "Complete React.js Certification", priority: "high", completed: false },
  { id: 2, title: "Practice DSA Problems", priority: "medium", completed: true },
  { id: 3, title: "Update LinkedIn Profile", priority: "low", completed: false },
  { id: 4, title: "Build Portfolio Project", priority: "high", completed: false },
]

const quickStats = [
  { title: "Current SGPA", value: "9.3", change: "+0.4", icon: TrendingUp },
  { title: "Target SGPA", value: "9.5", progress: 93, icon: Target },
  { title: "Skills Completed", value: "12/18", progress: 67, icon: BookOpen },
  { title: "Resume Score", value: "85%", change: "+5%", icon: FileText },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6" data-testid="dashboard-overview">
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="hover-elevate">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change && (
                <p className="text-xs text-chart-2 mt-1">
                  {stat.change} from last semester
                </p>
              )}
              {stat.progress && (
                <div className="mt-2">
                  <Progress value={stat.progress} className="h-1" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* SGPA Trend Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>SGPA Trend</CardTitle>
            <CardDescription>Your academic performance over semesters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sgpaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="semester" />
                  <YAxis domain={[7, 10]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="sgpa" 
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={3} 
                    dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Tasks */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Learning Tasks</CardTitle>
              <CardDescription>Your current skill development progress</CardDescription>
            </div>
            <Button variant="outline" size="sm" data-testid="button-view-all-tasks">
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTasks.map((task) => (
              <div 
                key={task.id} 
                className="flex items-center space-x-3 p-3 rounded-lg hover-elevate"
                data-testid={`task-${task.id}`}
              >
                <div className="flex-shrink-0">
                  {task.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-chart-2" />
                  ) : (
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.title}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {task.priority} priority
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to boost your career progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto flex-col space-y-2 p-4" data-testid="button-add-marks">
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">Add Internal Marks</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col space-y-2 p-4" data-testid="button-check-resume">
              <FileText className="h-6 w-6" />
              <span className="text-sm">Check Resume</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col space-y-2 p-4" data-testid="button-ai-guidance">
              <Target className="h-6 w-6" />
              <span className="text-sm">Get AI Guidance</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col space-y-2 p-4" data-testid="button-find-courses">
              <BookOpen className="h-6 w-6" />
              <span className="text-sm">Find Courses</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
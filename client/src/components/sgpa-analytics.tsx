import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Target, Calendar } from "lucide-react"

// TODO: Remove mock data
const detailedSgpaData = [
  { semester: 'Sem 1', sgpa: 8.2, cgpa: 8.2, totalCredits: 20 },
  { semester: 'Sem 2', sgpa: 8.5, cgpa: 8.35, totalCredits: 40 },
  { semester: 'Sem 3', sgpa: 8.8, cgpa: 8.5, totalCredits: 60 },
  { semester: 'Sem 4', sgpa: 9.1, cgpa: 8.65, totalCredits: 80 },
  { semester: 'Sem 5', sgpa: 8.9, cgpa: 8.7, totalCredits: 100 },
  { semester: 'Sem 6', sgpa: 9.3, cgpa: 8.8, totalCredits: 120 },
]

const subjectPerformance = [
  { subject: 'Data Structures', marks: 92, grade: 'A+' },
  { subject: 'Algorithms', marks: 88, grade: 'A' },
  { subject: 'Database Systems', marks: 94, grade: 'A+' },
  { subject: 'Computer Networks', marks: 86, grade: 'A' },
  { subject: 'Software Engineering', marks: 90, grade: 'A+' },
]

const semesterStats = [
  { label: 'Current SGPA', value: '9.3', trend: 'up', change: '+0.4' },
  { label: 'Current CGPA', value: '8.8', trend: 'up', change: '+0.1' },
  { label: 'Total Credits', value: '120', trend: 'up', change: '+20' },
  { label: 'Target CGPA', value: '9.2', progress: 76 },
]

export function SGPAAnalytics() {
  return (
    <div className="space-y-6" data-testid="sgpa-analytics">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {semesterStats.map((stat, index) => (
          <Card key={index} className="hover-elevate">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              {stat.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-chart-2" />
              ) : stat.trend === 'down' ? (
                <TrendingDown className="h-4 w-4 text-destructive" />
              ) : (
                <Target className="h-4 w-4 text-primary" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change && (
                <p className={`text-xs mt-1 ${stat.trend === 'up' ? 'text-chart-2' : 'text-destructive'}`}>
                  {stat.change} from last semester
                </p>
              )}
              {stat.progress && (
                <div className="mt-2">
                  <Progress value={stat.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">{stat.progress}% of target</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Detailed SGPA/CGPA Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Academic Performance Trend</CardTitle>
            <CardDescription>SGPA and CGPA progression over semesters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={detailedSgpaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="semester" />
                  <YAxis domain={[7, 10]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="sgpa" 
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={3} 
                    name="SGPA"
                    dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cgpa" 
                    stroke="hsl(var(--chart-2))" 
                    strokeWidth={3} 
                    name="CGPA"
                    dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Current Semester</CardTitle>
            <CardDescription>Subject-wise performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {subjectPerformance.map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{subject.subject}</p>
                  <Badge variant={subject.grade === 'A+' ? 'default' : 'secondary'}>
                    {subject.grade}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={subject.marks} className="h-2 flex-1" />
                  <span className="text-sm font-medium">{subject.marks}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Insights and Predictions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
            <CardDescription>AI-powered analysis of your academic progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-chart-2/10 border border-chart-2/20">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-chart-2" />
                <p className="text-sm font-medium text-chart-2">Positive Trend</p>
              </div>
              <p className="text-sm">Your SGPA has improved by 13% over the last 3 semesters. Keep up the excellent work!</p>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium text-primary">Goal Progress</p>
              </div>
              <p className="text-sm">You're 76% of the way to your target CGPA of 9.2. Maintain current performance to achieve it.</p>
            </div>
            <div className="p-4 rounded-lg bg-chart-3/10 border border-chart-3/20">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-4 w-4 text-chart-3" />
                <p className="text-sm font-medium text-chart-3">Semester Prediction</p>
              </div>
              <p className="text-sm">Based on current trends, your next semester SGPA is predicted to be around 9.4-9.6.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Credit Distribution</CardTitle>
            <CardDescription>Credits completed by semester</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={detailedSgpaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="semester" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="totalCredits" fill="hsl(var(--chart-1))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
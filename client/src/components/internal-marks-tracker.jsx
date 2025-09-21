import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Calculator, Target } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// TODO: Remove mock data
const currentSubjects = [
  { 
    id: 1, 
    name: "Data Structures & Algorithms", 
    internal1: 18, 
    internal2: 16, 
    internal3: 19, 
    assignment: 9,
    bestTwo: [18, 19],
    total: 46,
    grade: "A+"
  },
  { 
    id: 2, 
    name: "Database Management Systems", 
    internal1: 15, 
    internal2: 17, 
    internal3: 16, 
    assignment: 8,
    bestTwo: [17, 16],
    total: 41,
    grade: "A"
  },
  { 
    id: 3, 
    name: "Computer Networks", 
    internal1: 19, 
    internal2: 18, 
    internal3: 20, 
    assignment: 10,
    bestTwo: [19, 20],
    total: 49,
    grade: "A+"
  },
]

export function InternalMarksTracker() {
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [isAddingNew, setIsAddingNew] = useState(false)

  const calculateTotal = (internal1, internal2, internal3, assignment) => {
    const internals = [internal1, internal2, internal3].sort((a, b) => b - a)
    return internals[0] + internals[1] + assignment
  }

  const getGrade = (total) => {
    if (total >= 45) return "A+"
    if (total >= 40) return "A"
    if (total >= 35) return "B+"
    if (total >= 30) return "B"
    return "C"
  }

  const averageMarks = currentSubjects.reduce((sum, subject) => sum + subject.total, 0) / currentSubjects.length

  return (
    <div className="space-y-6" data-testid="marks-tracker">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Marks</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageMarks.toFixed(1)}/50</div>
            <div className="mt-2">
              <Progress value={(averageMarks / 50) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subjects Tracked</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentSubjects.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Current semester
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">A+ Grades</CardTitle>
            <Badge variant="default" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {currentSubjects.filter(s => s.grade === 'A+').length}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((currentSubjects.filter(s => s.grade === 'A+').length / currentSubjects.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Success rate
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Target Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <div className="mt-2">
              <Progress value={92} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Towards dream grade
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Subjects List */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Internal Marks</h2>
          <p className="text-muted-foreground">Track your internal assessment performance</p>
        </div>
        <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-subject">
              <Plus className="h-4 w-4 mr-2" />
              Add Subject
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Subject</DialogTitle>
              <DialogDescription>Enter the internal marks for a new subject</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="subject-name">Subject Name</Label>
                <Input 
                  id="subject-name" 
                  placeholder="e.g., Machine Learning"
                  data-testid="input-subject-name"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="internal1">Internal 1 (20)</Label>
                  <Input 
                    id="internal1" 
                    type="number" 
                    max="20" 
                    placeholder="0-20"
                    data-testid="input-internal1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="internal2">Internal 2 (20)</Label>
                  <Input 
                    id="internal2" 
                    type="number" 
                    max="20" 
                    placeholder="0-20"
                    data-testid="input-internal2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="internal3">Internal 3 (20)</Label>
                  <Input 
                    id="internal3" 
                    type="number" 
                    max="20" 
                    placeholder="0-20"
                    data-testid="input-internal3"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignment">Assignment (10)</Label>
                <Input 
                  id="assignment" 
                  type="number" 
                  max="10" 
                  placeholder="0-10"
                  data-testid="input-assignment"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                console.log('Adding new subject')
                setIsAddingNew(false)
              }} data-testid="button-save-subject">
                Save Subject
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Subjects Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {currentSubjects.map((subject) => (
          <Card key={subject.id} className="hover-elevate" data-testid={`subject-card-${subject.id}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{subject.name}</CardTitle>
                <Badge variant={subject.grade === 'A+' ? 'default' : 'secondary'}>
                  {subject.grade}
                </Badge>
              </div>
              <CardDescription>Internal assessment breakdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Individual Marks */}
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="text-center p-2 rounded-md bg-muted/50">
                  <p className="text-xs text-muted-foreground">Int 1</p>
                  <p className="font-semibold">{subject.internal1}/20</p>
                </div>
                <div className="text-center p-2 rounded-md bg-muted/50">
                  <p className="text-xs text-muted-foreground">Int 2</p>
                  <p className="font-semibold">{subject.internal2}/20</p>
                </div>
                <div className="text-center p-2 rounded-md bg-muted/50">
                  <p className="text-xs text-muted-foreground">Int 3</p>
                  <p className="font-semibold">{subject.internal3}/20</p>
                </div>
              </div>

              {/* Assignment & Total */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Assignment:</span>
                  <span className="font-semibold">{subject.assignment}/10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Best 2 Internals:</span>
                  <span className="text-xs text-muted-foreground">
                    {subject.bestTwo.join(' + ')} = {subject.bestTwo.reduce((a, b) => a + b, 0)}
                  </span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Score:</span>
                    <span className="text-lg">{subject.total}/50</span>
                  </div>
                  <Progress value={(subject.total / 50) * 100} className="h-2 mt-2" />
                </div>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  console.log(`Editing subject ${subject.id}`)
                  setSelectedSubject(subject)
                }}
                data-testid={`button-edit-${subject.id}`}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Marks
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Calculation Info */}
      <Card>
        <CardHeader>
          <CardTitle>How Internal Marks are Calculated</CardTitle>
          <CardDescription>Understanding the grading system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold">Calculation Method:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• 3 Internal Assessments (20 marks each)</li>
                <li>• Best 2 out of 3 internal marks are selected</li>
                <li>• 1 Assignment (10 marks)</li>
                <li>• Total = Best 2 Internals + Assignment (Max: 50)</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Grade Scale:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span>A+:</span>
                  <span>45-50</span>
                </div>
                <div className="flex justify-between">
                  <span>A:</span>
                  <span>40-44</span>
                </div>
                <div className="flex justify-between">
                  <span>B+:</span>
                  <span>35-39</span>
                </div>
                <div className="flex justify-between">
                  <span>B:</span>
                  <span>30-34</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
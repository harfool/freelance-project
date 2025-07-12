"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  Download,
  Eye,
  Calendar,
  Award,
  TrendingUp,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";

const results = [
  {
    id: 1,
    examTitle: "RS-CIT Final Examination",
    examDate: "2024-01-15",
    course: "RS-CIT",
    score: 85,
    totalMarks: 100,
    percentage: 85,
    grade: "A",
    status: "Pass",
    resultFile: "/results/rs-cit-final.pdf",
    subjects: [
      { name: "Computer Basics", score: 18, total: 20 },
      { name: "MS Office", score: 35, total: 40 },
      { name: "Internet & Email", score: 17, total: 20 },
      { name: "Digital Services", score: 15, total: 20 },
    ],
  },
  {
    id: 2,
    examTitle: "RS-CIT Mid-term Test",
    examDate: "2024-01-08",
    course: "RS-CIT",
    score: 78,
    totalMarks: 100,
    percentage: 78,
    grade: "B+",
    status: "Pass",
    resultFile: "/results/rs-cit-midterm.pdf",
    subjects: [
      { name: "Computer Basics", score: 16, total: 20 },
      { name: "MS Office", score: 32, total: 40 },
      { name: "Internet & Email", score: 15, total: 20 },
      { name: "Digital Services", score: 15, total: 20 },
    ],
  },
  {
    id: 3,
    examTitle: "NIOS Mathematics Final",
    examDate: "2024-01-20",
    course: "NIOS",
    score: 92,
    totalMarks: 100,
    percentage: 92,
    grade: "A+",
    status: "Pass",
    resultFile: "/results/nios-math.pdf",
    subjects: [
      { name: "Algebra", score: 23, total: 25 },
      { name: "Geometry", score: 22, total: 25 },
      { name: "Trigonometry", score: 24, total: 25 },
      { name: "Statistics", score: 23, total: 25 },
    ],
  },
  {
    id: 4,
    examTitle: "CBSE Physics Mock Test",
    examDate: "2024-01-12",
    course: "CBSE",
    score: 88,
    totalMarks: 100,
    percentage: 88,
    grade: "A",
    status: "Pass",
    resultFile: "/results/cbse-physics.pdf",
    subjects: [
      { name: "Mechanics", score: 22, total: 25 },
      { name: "Thermodynamics", score: 21, total: 25 },
      { name: "Optics", score: 23, total: 25 },
      { name: "Modern Physics", score: 22, total: 25 },
    ],
  },
  {
    id: 5,
    examTitle: "ITI Electrician Theory",
    examDate: "2024-01-18",
    course: "ITI",
    score: 72,
    totalMarks: 100,
    percentage: 72,
    grade: "B",
    status: "Pass",
    resultFile: "/results/iti-electrician.pdf",
    subjects: [
      { name: "Basic Electrical", score: 18, total: 25 },
      { name: "Circuit Analysis", score: 17, total: 25 },
      { name: "Power Systems", score: 19, total: 25 },
      { name: "Safety Practices", score: 18, total: 25 },
    ],
  },
  {
    id: 6,
    examTitle: "NIOS English Literature",
    examDate: "2024-01-25",
    course: "NIOS",
    score: 95,
    totalMarks: 100,
    percentage: 95,
    grade: "A+",
    status: "Pass",
    resultFile: "/results/nios-english.pdf",
    subjects: [
      { name: "Poetry", score: 24, total: 25 },
      { name: "Prose", score: 23, total: 25 },
      { name: "Drama", score: 24, total: 25 },
      { name: "Grammar", score: 24, total: 25 },
    ],
  },
  {
    id: 7,
    examTitle: "CBSE Chemistry Final",
    examDate: "2024-01-22",
    course: "CBSE",
    score: 45,
    totalMarks: 100,
    percentage: 45,
    grade: "F",
    status: "Fail",
    resultFile: "/results/cbse-chemistry.pdf",
    subjects: [
      { name: "Organic Chemistry", score: 10, total: 25 },
      { name: "Inorganic Chemistry", score: 12, total: 25 },
      { name: "Physical Chemistry", score: 11, total: 25 },
      { name: "Practical", score: 12, total: 25 },
    ],
  },
  {
    id: 8,
    examTitle: "RS-CIT Computer Fundamentals",
    examDate: "2024-01-28",
    course: "RS-CIT",
    score: 91,
    totalMarks: 100,
    percentage: 91,
    grade: "A+",
    status: "Pass",
    resultFile: "/results/rs-cit-fundamentals.pdf",
    subjects: [
      { name: "Hardware Concepts", score: 23, total: 25 },
      { name: "Software Basics", score: 22, total: 25 },
      { name: "Operating Systems", score: 23, total: 25 },
      { name: "Computer Networks", score: 23, total: 25 },
    ],
  },
];

const overallStats = {
  totalExams: 8,
  averageScore: 80.6,
  highestScore: 95,
  passRate: 87.5,
};

export default function StudentResultsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/40">
        <div className="container flex h-16 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Results</h1>
            <p className="text-sm text-muted-foreground">
              View your examination results and performance
            </p>
          </div>
          <Button asChild>
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>

      <div className="container py-6">
        {/* Overall Performance Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Exams
                  </p>
                  <p className="text-2xl font-bold">
                    {overallStats.totalExams}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Average Score
                  </p>
                  <p className="text-2xl font-bold">
                    {overallStats.averageScore}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Highest Score
                  </p>
                  <p className="text-2xl font-bold">
                    {overallStats.highestScore}%
                  </p>
                </div>
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Pass Rate
                  </p>
                  <p className="text-2xl font-bold">{overallStats.passRate}%</p>
                </div>
                <Award className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results List */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Examination Results</h2>

          {results.map((result) => (
            <Card key={result.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      {result.examTitle}
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(result.examDate).toLocaleDateString()}
                      </div>
                      <Badge variant="outline">{result.course}</Badge>
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      result.status === "Pass" ? "default" : "destructive"
                    }
                    className="text-lg px-4 py-2"
                  >
                    {result.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Overall Score */}
                <div className="grid md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">
                        {result.score}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Marks Obtained
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold">
                        {result.totalMarks}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total Marks
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {result.percentage}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Percentage
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {result.grade}
                      </div>
                      <div className="text-sm text-muted-foreground">Grade</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Subject-wise Performance */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Subject-wise Performance</h4>
                  <div className="space-y-3">
                    {result.subjects.map((subject, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{subject.name}</span>
                          <span>
                            {subject.score}/{subject.total} (
                            {Math.round((subject.score / subject.total) * 100)}
                            %)
                          </span>
                        </div>
                        <Progress
                          value={(subject.score / subject.total) * 100}
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t">
                  <Button className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificate
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    View Detailed Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Chart Placeholder */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
            <CardDescription>Your performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Performance chart will be displayed here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

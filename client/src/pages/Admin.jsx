import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Users,
  BookOpen,
  FileText,
  Award,
  Calendar,
  Upload,
  Settings,
  BarChart3,
  Plus,
  Eye,
  Download,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const adminStats = {
  totalStudents: 1250,
  activeCourses: 5,
  totalTests: 45,
  pendingResults: 12,
  todayAttendance: 89,
  monthlyRevenue: 125000,
};

const recentStudents = [
  {
    id: "STU001",
    name: "John Doe",
    course: "RS-CIT",
    status: "Active",
    joinDate: "2024-01-01",
  },
  {
    id: "STU002",
    name: "Jane Smith",
    course: "NIOS",
    status: "Active",
    joinDate: "2024-01-02",
  },
  {
    id: "STU003",
    name: "Mike Johnson",
    course: "CBSE",
    status: "Inactive",
    joinDate: "2024-01-03",
  },
];

const recentTests = [
  {
    id: 1,
    title: "RS-CIT Chapter 5",
    course: "RS-CIT",
    attempts: 45,
    avgScore: 78,
  },
  {
    id: 2,
    title: "NIOS Math Test",
    course: "NIOS",
    attempts: 32,
    avgScore: 82,
  },
  { id: 3, title: "CBSE Physics", course: "CBSE", attempts: 28, avgScore: 75 },
];

const attendanceData = [
  { date: "2024-01-05", present: 89, total: 100, percentage: 89 },
  { date: "2024-01-04", present: 92, total: 100, percentage: 92 },
  { date: "2024-01-03", present: 87, total: 100, percentage: 87 },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/40">
        <div className="container max-w-6xl mx-auto px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between h-auto sm:h-16 py-4 sm:py-0 gap-2 sm:gap-0">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              Admin Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your institute efficiently
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button size="sm" className="w-full sm:w-auto cursor-pointer">
              <Plus className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto cursor-pointer"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8 max-w-6xl mx-auto px-4">
        {/* Stats Overview */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Students
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {adminStats.totalStudents}
                  </p>
                </div>
                <Users className="h-10 w-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Courses
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    {adminStats.activeCourses}
                  </p>
                </div>
                <BookOpen className="h-10 w-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Tests
                  </p>
                  <p className="text-3xl font-bold text-purple-600">
                    {adminStats.totalTests}
                  </p>
                </div>
                <FileText className="h-10 w-10 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Pending Results
                  </p>
                  <p className="text-3xl font-bold text-orange-600">
                    {adminStats.pendingResults}
                  </p>
                </div>
                <Award className="h-10 w-10 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Today's Attendance
                  </p>
                  <p className="text-3xl font-bold text-red-600">
                    {adminStats.todayAttendance}%
                  </p>
                </div>
                <Calendar className="h-10 w-10 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Monthly Revenue
                  </p>
                  <p className="text-3xl font-bold text-indigo-600">
                    ₹{adminStats.monthlyRevenue.toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="h-10 w-10 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="tests">Tests</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              {/* Recent Students */}
              <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Recent Students
                  </CardTitle>
                  <CardDescription>
                    Latest student registrations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentStudents.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div>
                          <p className="font-semibold text-base">
                            {student.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {student.id} • {student.course}
                          </p>
                        </div>
                        <Badge
                          variant={
                            student.status === "Active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {student.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-6 cursor-pointer"
                    asChild
                  >
                    <Link to="/admin/students">View All Students</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Tests */}
              <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Test Performance
                  </CardTitle>
                  <CardDescription>Recent test statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTests.map((test) => (
                      <div
                        key={test.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div>
                          <p className="font-semibold text-base">
                            {test.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {test.course} • {test.attempts} attempts
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg text-green-600">
                            {test.avgScore}%
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Avg Score
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-6 cursor-pointer"
                    asChild
                  >
                    <Link to="/admin/tests">Manage Tests</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Student Management
                    </CardTitle>
                    <CardDescription>
                      Manage student information and enrollment
                    </CardDescription>
                  </div>
                  <Button className="w-full md:w-auto cursor-pointer">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                  <Button
                    variant="outline"
                    className="h-24 flex-col gap-2 cursor-pointer"
                  >
                    <Users className="h-6 w-6" />
                    <span className="text-sm">View All Students</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col gap-2 cursor-pointer"
                  >
                    <Plus className="h-6 w-6" />
                    <span className="text-sm">Add New Student</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col gap-2 cursor-pointer"
                  >
                    <Upload className="h-6 w-6" />
                    <span className="text-sm">Bulk Import</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col gap-2 cursor-pointer"
                  >
                    <Download className="h-6 w-6" />
                    <span className="text-sm">Export Data</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Course Management
                    </CardTitle>
                    <CardDescription>
                      Manage courses and study materials
                    </CardDescription>
                  </div>
                  <Button className="w-full md:w-auto cursor-pointer">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Course
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                  <Button
                    variant="outline"
                    className="h-24 flex-col gap-2 cursor-pointer"
                  >
                    <BookOpen className="h-6 w-6" />
                    <span className="text-sm">Manage Courses</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col gap-2 cursor-pointer"
                  >
                    <Upload className="h-6 w-6" />
                    <span className="text-sm">Upload Materials</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col gap-2 cursor-pointer"
                  >
                    <FileText className="h-6 w-6" />
                    <span className="text-sm">Assignments</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col gap-2 cursor-pointer"
                  >
                    <Award className="h-6 w-6" />
                    <span className="text-sm">Certificates</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests" className="space-y-6">
            <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Test Management
                    </CardTitle>
                    <CardDescription>
                      Create and manage online tests
                    </CardDescription>
                  </div>
                  <Button className="w-full md:w-auto cursor-pointer">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Test
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                  <Button
                    variant="outline"
                    className="h-24 flex-col gap-2 cursor-pointer"
                  >
                    <FileText className="h-6 w-6" />
                    <span className="text-sm">All Tests</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col gap-2 cursor-pointer"
                  >
                    <Plus className="h-6 w-6" />
                    <span className="text-sm">Create Test</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col gap-2 cursor-pointer"
                  >
                    <Eye className="h-6 w-6" />
                    <span className="text-sm">View Results</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col gap-2 cursor-pointer"
                  >
                    <BarChart3 className="h-6 w-6" />
                    <span className="text-sm">Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Attendance Management
                    </CardTitle>
                    <CardDescription>
                      Track and manage student attendance
                    </CardDescription>
                  </div>
                  <Button className="w-full md:w-auto cursor-pointer">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    <Button
                      variant="outline"
                      className="h-24 flex-col gap-2 cursor-pointer"
                    >
                      <Calendar className="h-6 w-6" />
                      <span className="text-sm">Daily Attendance</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-24 flex-col gap-2 cursor-pointer"
                    >
                      <Users className="h-6 w-6" />
                      <span className="text-sm">Student-wise Report</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-24 flex-col gap-2 cursor-pointer"
                    >
                      <BarChart3 className="h-6 w-6" />
                      <span className="text-sm">Attendance Analytics</span>
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Recent Attendance</h4>
                    {attendanceData.map((day, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div>
                          <p className="font-semibold text-base">
                            {new Date(day.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {day.present}/{day.total} students present
                          </p>
                        </div>
                        <Badge
                          variant={
                            day.percentage >= 90
                              ? "default"
                              : day.percentage >= 75
                              ? "secondary"
                              : "destructive"
                          }
                          className="text-sm px-3 py-1"
                        >
                          {day.percentage}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

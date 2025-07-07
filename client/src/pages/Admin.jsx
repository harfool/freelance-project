"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
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
} from "lucide-react"
import Link from "next/link"

// Mock data
const adminStats = {
  totalStudents: 1250,
  activeCourses: 5,
  totalTests: 45,
  pendingResults: 12,
  todayAttendance: 89,
  monthlyRevenue: 125000,
}

const recentStudents = [
  { id: "STU001", name: "John Doe", course: "RS-CIT", status: "Active", joinDate: "2024-01-01" },
  { id: "STU002", name: "Jane Smith", course: "NIOS", status: "Active", joinDate: "2024-01-02" },
  { id: "STU003", name: "Mike Johnson", course: "CBSE", status: "Inactive", joinDate: "2024-01-03" },
]

const recentTests = [
  { id: 1, title: "RS-CIT Chapter 5", course: "RS-CIT", attempts: 45, avgScore: 78 },
  { id: 2, title: "NIOS Math Test", course: "NIOS", attempts: 32, avgScore: 82 },
  { id: 3, title: "CBSE Physics", course: "CBSE", attempts: 28, avgScore: 75 },
]

const attendanceData = [
  { date: "2024-01-05", present: 89, total: 100, percentage: 89 },
  { date: "2024-01-04", present: 92, total: 100, percentage: 92 },
  { date: "2024-01-03", present: 87, total: 100, percentage: 87 },
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/40">
        <div className="container flex h-16 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your institute efficiently</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-6">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{adminStats.totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
                  <p className="text-2xl font-bold">{adminStats.activeCourses}</p>
                </div>
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Tests</p>
                  <p className="text-2xl font-bold">{adminStats.totalTests}</p>
                </div>
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Results</p>
                  <p className="text-2xl font-bold">{adminStats.pendingResults}</p>
                </div>
                <Award className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Today's Attendance</p>
                  <p className="text-2xl font-bold">{adminStats.todayAttendance}%</p>
                </div>
                <Calendar className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                  <p className="text-2xl font-bold">₹{adminStats.monthlyRevenue.toLocaleString()}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="tests">Tests</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Recent Students */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Students</CardTitle>
                  <CardDescription>Latest student registrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentStudents.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {student.id} • {student.course}
                          </p>
                        </div>
                        <Badge variant={student.status === "Active" ? "default" : "secondary"}>{student.status}</Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                    <Link href="/admin/students">View All Students</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Tests */}
              <Card>
                <CardHeader>
                  <CardTitle>Test Performance</CardTitle>
                  <CardDescription>Recent test statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentTests.map((test) => (
                      <div key={test.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{test.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {test.course} • {test.attempts} attempts
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{test.avgScore}%</p>
                          <p className="text-xs text-muted-foreground">Avg Score</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                    <Link href="/admin/tests">Manage Tests</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Student Management</CardTitle>
                    <CardDescription>Manage student information and enrollment</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <Users className="h-6 w-6 mb-2" />
                    View All Students
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <Plus className="h-6 w-6 mb-2" />
                    Add New Student
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <Upload className="h-6 w-6 mb-2" />
                    Bulk Import
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <Download className="h-6 w-6 mb-2" />
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Course Management</CardTitle>
                    <CardDescription>Manage courses and study materials</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Course
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <BookOpen className="h-6 w-6 mb-2" />
                    Manage Courses
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <Upload className="h-6 w-6 mb-2" />
                    Upload Materials
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <FileText className="h-6 w-6 mb-2" />
                    Assignments
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <Award className="h-6 w-6 mb-2" />
                    Certificates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Test Management</CardTitle>
                    <CardDescription>Create and manage online tests</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Test
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <FileText className="h-6 w-6 mb-2" />
                    All Tests
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <Plus className="h-6 w-6 mb-2" />
                    Create Test
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <Eye className="h-6 w-6 mb-2" />
                    View Results
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <BarChart3 className="h-6 w-6 mb-2" />
                    Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Attendance Management</CardTitle>
                    <CardDescription>Track and manage student attendance</CardDescription>
                  </div>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <Calendar className="h-6 w-6 mb-2" />
                      Daily Attendance
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <Users className="h-6 w-6 mb-2" />
                      Student-wise Report
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <BarChart3 className="h-6 w-6 mb-2" />
                      Attendance Analytics
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Recent Attendance</h4>
                    {attendanceData.map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{new Date(day.date).toLocaleDateString()}</p>
                          <p className="text-sm text-muted-foreground">
                            {day.present}/{day.total} students present
                          </p>
                        </div>
                        <Badge
                          variant={
                            day.percentage >= 90 ? "default" : day.percentage >= 75 ? "secondary" : "destructive"
                          }
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
  )
}

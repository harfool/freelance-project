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
  BookOpen,
  FileText,
  Award,
  Calendar,
  Download,
  MapPin,
  Clock,
  TrendingUp,
  Bell,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data - in real app, this would come from API
const studentData = {
  name: "John Doe",
  studentId: "STU001",
  course: "RS-CIT",
  enrollmentDate: "2024-01-01",
  completionPercentage: 75,
  attendancePercentage: 85,
  testsCompleted: 8,
  totalTests: 12,
  lastAttendance: "2024-01-05 09:30 AM",
};

const quickStats = [
  {
    title: "Course Progress",
    value: `${studentData.completionPercentage}%`,
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    title: "Attendance",
    value: `${studentData.attendancePercentage}%`,
    icon: Calendar,
    color: "text-blue-600",
  },
  {
    title: "Tests Completed",
    value: `${studentData.testsCompleted}/${studentData.totalTests}`,
    icon: FileText,
    color: "text-purple-600",
  },
  {
    title: "Certificates",
    value: "2",
    icon: Award,
    color: "text-orange-600",
  },
];

const recentActivities = [
  {
    id: 1,
    type: "test",
    title: "Completed Chapter 5 Test",
    description: "Scored 85% in MS Office Test",
    time: "2 hours ago",
    icon: FileText,
  },
  {
    id: 2,
    type: "attendance",
    title: "Attendance Marked",
    description: "Present for today's class",
    time: "5 hours ago",
    icon: Calendar,
  },
  {
    id: 3,
    type: "download",
    title: "Downloaded Notes",
    description: "Chapter 6 - Internet Basics",
    time: "1 day ago",
    icon: Download,
  },
];

export default function StudentDashboard() {
  const handleMarkAttendance = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Location:", latitude, longitude);
          // Here you would send the location and timestamp to your backend
          alert(
            `Attendance marked successfully!\nTime: ${new Date().toLocaleString()}\nLocation: ${latitude.toFixed(
              6
            )}, ${longitude.toFixed(6)}`
          );
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Please enable location access to mark attendance");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/40">
        <div className="container flex h-16 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Student Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, {studentData.name}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{studentData.course}</Badge>
            <Badge variant="outline">ID: {studentData.studentId}</Badge>
          </div>
        </div>
      </div>

      <div className="container py-6">
        {/* Quick Stats */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {quickStats.map((stat, index) => (
            <Card
              key={index}
              className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200 rounded-xl"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-start">
          {/* Course Progress */}
          <Card className="md:col-span-2 shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200 rounded-xl">
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
              <CardDescription>
                Your learning journey in {studentData.course}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>{studentData.completionPercentage}%</span>
                </div>
                <Progress
                  value={studentData.completionPercentage}
                  className="h-2"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Attendance</span>
                  <span>{studentData.attendancePercentage}%</span>
                </div>
                <Progress
                  value={studentData.attendancePercentage}
                  className="h-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <Button
                  asChild
                  className="bg-black text-white hover:bg-neutral-900 cursor-pointer"
                >
                  <Link href="/dashboard/notes">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Notes
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="border-black text-black hover:bg-gray-100 cursor-pointer"
                >
                  <Link href="/dashboard/tests">
                    <FileText className="h-4 w-4 mr-2" />
                    Take Test
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200 rounded-xl">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={handleMarkAttendance}
                className="w-full justify-start bg-black text-white hover:bg-neutral-900 cursor-pointer"
                variant="default"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Mark Attendance
              </Button>
              <Button
                asChild
                className="w-full justify-start border-black text-black hover:bg-gray-100 cursor-pointer"
                variant="outline"
              >
                <Link href="/dashboard/results">
                  <Award className="h-4 w-4 mr-2" />
                  View Results
                </Link>
              </Button>
              <Button
                asChild
                className="w-full justify-start border-black text-black hover:bg-gray-100 cursor-pointer"
                variant="outline"
              >
                <Link href="/dashboard/certificates">
                  <Download className="h-4 w-4 mr-2" />
                  Certificates
                </Link>
              </Button>
              <Button
                asChild
                className="w-full justify-start border-black text-black hover:bg-gray-100 cursor-pointer"
                variant="outline"
              >
                <Link href="/dashboard/profile">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="md:col-span-2 lg:col-span-3 shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200 rounded-xl mt-8 lg:mt-0">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 rounded-lg border bg-muted/50"
                  >
                    <activity.icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Info */}
        <Card className="mt-8 shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200 rounded-xl">
          <CardHeader>
            <CardTitle>Attendance Information</CardTitle>
            <CardDescription>
              Track your attendance and location history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <p className="text-sm font-medium">Last Attendance</p>
                <p className="text-sm text-muted-foreground">
                  {studentData.lastAttendance}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Today's Status</p>
                <Badge variant="secondary">Present</Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Monthly Attendance</p>
                <p className="text-sm text-muted-foreground">
                  {studentData.attendancePercentage}% (18/21 days)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

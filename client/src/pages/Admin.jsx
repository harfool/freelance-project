import React, { useState } from "react";
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
  X,
  Edit,
  Trash2,
  Star,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

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

// Mock Highlights Data
const initialHighlights = [
  {
    id: 1,
    title: "New Course Launch",
    description: "Advanced Data Science course now available for enrollment",
    type: "announcement",
    priority: "high",
    createdAt: "2024-01-05",
    isActive: true,
  },
  {
    id: 2,
    title: "Scholarship Program",
    description: "Apply for merit-based scholarships before January 31st",
    type: "scholarship",
    priority: "medium",
    createdAt: "2024-01-04",
    isActive: true,
  },
  {
    id: 3,
    title: "Exam Schedule Released",
    description: "Final exam timetable is now available on the portal",
    type: "exam",
    priority: "high",
    createdAt: "2024-01-03",
    isActive: true,
  },
  {
    id: 4,
    title: "Library Hours Extended",
    description: "Library will remain open until 10 PM during exam week",
    type: "facility",
    priority: "low",
    createdAt: "2024-01-02",
    isActive: false,
  },
];

// Mock API functions with async behavior
const mockAPI = {
  getHighlights: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...initialHighlights]), 500);
    });
  },

  createHighlight: (highlight) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newHighlight = {
          ...highlight,
          id: Date.now(),
          createdAt: new Date().toISOString().split("T")[0],
        };
        resolve(newHighlight);
      }, 300);
    });
  },

  updateHighlight: (id, updates) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id, ...updates });
      }, 300);
    });
  },

  deleteHighlight: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(id);
      }, 200);
    });
  },
};

export default function AdminDashboard() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Highlights CRUD state
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [highlightModal, setHighlightModal] = useState({
    open: false,
    mode: "create",
    data: null,
  });
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "announcement",
    priority: "medium",
    isActive: true,
  });

  // Load highlights on component mount
  React.useEffect(() => {
    loadHighlights();
  }, []);

  const loadHighlights = async () => {
    setLoading(true);
    try {
      const data = await mockAPI.getHighlights();
      setHighlights(data);
    } catch (error) {
      console.error("Failed to load highlights:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateHighlight = async () => {
    setLoading(true);
    try {
      const newHighlight = await mockAPI.createHighlight(formData);
      setHighlights((prev) => [newHighlight, ...prev]);
      closeHighlightModal();
    } catch (error) {
      console.error("Failed to create highlight:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateHighlight = async () => {
    setLoading(true);
    try {
      const updatedHighlight = await mockAPI.updateHighlight(
        highlightModal.data.id,
        formData
      );
      setHighlights((prev) =>
        prev.map((h) => (h.id === updatedHighlight.id ? updatedHighlight : h))
      );
      closeHighlightModal();
    } catch (error) {
      console.error("Failed to update highlight:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHighlight = async () => {
    setLoading(true);
    try {
      await mockAPI.deleteHighlight(deleteModal.id);
      setHighlights((prev) => prev.filter((h) => h.id !== deleteModal.id));
      setDeleteModal({ open: false, id: null });
    } catch (error) {
      console.error("Failed to delete highlight:", error);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setFormData({
      title: "",
      description: "",
      type: "announcement",
      priority: "medium",
      isActive: true,
    });
    setHighlightModal({ open: true, mode: "create", data: null });
  };

  const openEditModal = (highlight) => {
    setFormData({
      title: highlight.title,
      description: highlight.description,
      type: highlight.type,
      priority: highlight.priority,
      isActive: highlight.isActive,
    });
    setHighlightModal({ open: true, mode: "edit", data: highlight });
  };

  const closeHighlightModal = () => {
    setHighlightModal({ open: false, mode: "create", data: null });
    setFormData({
      title: "",
      description: "",
      type: "announcement",
      priority: "medium",
      isActive: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (highlightModal.mode === "create") {
      await handleCreateHighlight();
    } else {
      await handleUpdateHighlight();
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "announcement":
        return <AlertCircle className="h-4 w-4" />;
      case "scholarship":
        return <Award className="h-4 w-4" />;
      case "exam":
        return <FileText className="h-4 w-4" />;
      case "facility":
        return <Calendar className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

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
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto cursor-pointer"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="max-w-md w-full p-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Settings
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Generic application settings
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800">
                Enable Notifications
              </span>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800">Dark Mode</span>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-900 focus:ring-gray-800 border-gray-300 rounded transition"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800">Auto Backup</span>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded transition"
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <Button
              onClick={() => setSettingsOpen(false)}
              className="bg-black text-white hover:bg-neutral-900 rounded-lg px-6 py-2 shadow"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="tests">Tests</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="highlights">Highlights</TabsTrigger>
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
                    <Link to="/students">View All Students</Link>
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
                    <Link to="/tests">Manage Tests</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <Link to="/students">
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
          </Link>

          <Link to="/courses">
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
          </Link>

          <Link to="/createTest">
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
          </Link>

          <Link to="/attendance">
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
                      <h4 className="font-semibold text-lg">
                        Recent Attendance
                      </h4>
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
          </Link>

          <TabsContent value="highlights" className="space-y-6">
            <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Star className="h-5 w-5 text-primary" />
                      Highlights Management
                    </CardTitle>
                    <CardDescription>
                      Create and manage important announcements and highlights
                    </CardDescription>
                  </div>
                  <Button
                    className="w-full md:w-auto cursor-pointer"
                    onClick={openCreateModal}
                    disabled={loading}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Highlight
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading && highlights.length === 0 ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                      <p className="text-sm text-muted-foreground">
                        Loading highlights...
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {highlights.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Star className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No highlights found. Create your first highlight!</p>
                      </div>
                    ) : (
                      highlights.map((highlight) => (
                        <div
                          key={highlight.id}
                          className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {getTypeIcon(highlight.type)}
                              <h3 className="font-semibold text-base">
                                {highlight.title}
                              </h3>
                              <Badge
                                className={`text-xs px-2 py-1 ${getPriorityColor(
                                  highlight.priority
                                )}`}
                              >
                                {highlight.priority}
                              </Badge>
                              <Badge
                                variant={
                                  highlight.isActive ? "default" : "secondary"
                                }
                                className="text-xs"
                              >
                                {highlight.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {highlight.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Type: {highlight.type}</span>
                              <span>
                                Created:{" "}
                                {new Date(
                                  highlight.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditModal(highlight)}
                              disabled={loading}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setDeleteModal({ open: true, id: highlight.id })
                              }
                              disabled={loading}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Create/Edit Highlight Modal */}
        <Dialog open={highlightModal.open} onOpenChange={closeHighlightModal}>
          <DialogContent className="max-w-lg w-full p-6 bg-white rounded-2xl shadow-2xl border border-gray-100">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-900">
                {highlightModal.mode === "create"
                  ? "Create New Highlight"
                  : "Edit Highlight"}
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                {highlightModal.mode === "create"
                  ? "Add a new highlight or announcement for students"
                  : "Update the highlight information"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter highlight title"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Enter highlight description"
                  rows={3}
                  required
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="scholarship">Scholarship</SelectItem>
                      <SelectItem value="exam">Exam</SelectItem>
                      <SelectItem value="facility">Facility</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, priority: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive: e.target.checked,
                    }))
                  }
                  className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="isActive"
                  className="text-sm font-medium text-gray-700"
                >
                  Set as active
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeHighlightModal}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-black text-white hover:bg-neutral-900"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      {highlightModal.mode === "create"
                        ? "Creating..."
                        : "Updating..."}
                    </div>
                  ) : highlightModal.mode === "create" ? (
                    "Create Highlight"
                  ) : (
                    "Update Highlight"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog
          open={deleteModal.open}
          onOpenChange={() => setDeleteModal({ open: false, id: null })}
        >
          <DialogContent className="max-w-md w-full p-6 bg-white rounded-2xl shadow-2xl border border-gray-100">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-900">
                Delete Highlight
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                Are you sure you want to delete this highlight? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setDeleteModal({ open: false, id: null })}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteHighlight}
                disabled={loading}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Deleting...
                  </div>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

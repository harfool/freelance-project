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
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Clock,
  Users,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Calendar,
  Target,
  BarChart3,
  Play,
  Pause,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock Tests Data (5 tests)
const initialTests = [
  {
    id: "TEST001",
    title: "RS-CIT Final Assessment",
    description:
      "Comprehensive test covering all RS-CIT modules including MS Office, Internet usage, and basic computer operations.",
    course: "RS-CIT",
    duration: 90,
    totalQuestions: 50,
    passingMarks: 35,
    totalMarks: 50,
    difficulty: "Medium",
    status: "Active",
    createdDate: "2024-01-15",
    attempts: 45,
    avgScore: 38.5,
    passRate: 82,
    topics: [
      "MS Word",
      "MS Excel",
      "MS PowerPoint",
      "Internet & Email",
      "Computer Basics",
    ],
    instructions:
      "Read all questions carefully. Each question carries 1 mark. No negative marking.",
    timeLimit: "1 hour 30 minutes",
    questionTypes: ["Multiple Choice", "True/False"],
  },
  {
    id: "TEST002",
    title: "NIOS Mathematics - Algebra",
    description:
      "Mathematics test focusing on algebraic concepts, equations, and problem-solving for NIOS students.",
    course: "NIOS",
    duration: 120,
    totalQuestions: 40,
    passingMarks: 24,
    totalMarks: 60,
    difficulty: "Hard",
    status: "Active",
    createdDate: "2024-02-01",
    attempts: 32,
    avgScore: 42.8,
    passRate: 75,
    topics: [
      "Linear Equations",
      "Quadratic Equations",
      "Polynomials",
      "Factorization",
      "Graphs",
    ],
    instructions:
      "Show all working steps. Partial marks will be awarded for correct methodology.",
    timeLimit: "2 hours",
    questionTypes: ["Subjective", "Multiple Choice"],
  },
  {
    id: "TEST003",
    title: "CBSE Physics - Mechanics",
    description:
      "Physics test covering mechanics concepts including motion, force, energy, and momentum for CBSE students.",
    course: "CBSE",
    duration: 180,
    totalQuestions: 35,
    passingMarks: 21,
    totalMarks: 70,
    difficulty: "Hard",
    status: "Active",
    createdDate: "2024-02-10",
    attempts: 28,
    avgScore: 48.2,
    passRate: 79,
    topics: [
      "Motion in Straight Line",
      "Laws of Motion",
      "Work Energy Power",
      "Rotational Motion",
      "Gravitation",
    ],
    instructions:
      "Use standard SI units. Draw diagrams where necessary. Calculator allowed.",
    timeLimit: "3 hours",
    questionTypes: ["Numerical", "Theory", "Multiple Choice"],
  },
  {
    id: "TEST004",
    title: "ITI Electrician Theory",
    description:
      "Theory test for ITI Electrician trade covering electrical fundamentals, safety, and basic circuits.",
    course: "ITI",
    duration: 60,
    totalQuestions: 30,
    passingMarks: 18,
    totalMarks: 30,
    difficulty: "Easy",
    status: "Draft",
    createdDate: "2024-02-15",
    attempts: 0,
    avgScore: 0,
    passRate: 0,
    topics: [
      "Electrical Safety",
      "Basic Circuits",
      "Ohm's Law",
      "AC/DC Current",
      "Electrical Tools",
    ],
    instructions:
      "Safety protocols must be followed. Practical knowledge will be tested separately.",
    timeLimit: "1 hour",
    questionTypes: ["Multiple Choice", "True/False"],
  },
  {
    id: "TEST005",
    title: "Competitive Exam - General Knowledge",
    description:
      "General knowledge test for competitive exam preparation covering current affairs, history, and general science.",
    course: "Competitive",
    duration: 45,
    totalQuestions: 100,
    passingMarks: 60,
    totalMarks: 100,
    difficulty: "Medium",
    status: "Inactive",
    createdDate: "2024-01-30",
    attempts: 67,
    avgScore: 64.3,
    passRate: 68,
    topics: [
      "Current Affairs",
      "Indian History",
      "Geography",
      "General Science",
      "Politics",
    ],
    instructions:
      "Negative marking: -0.25 for wrong answers. Time management is crucial.",
    timeLimit: "45 minutes",
    questionTypes: ["Multiple Choice"],
  },
];

// Mock API functions
const mockAPI = {
  getTests: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...initialTests]), 500);
    });
  },

  createTest: (test) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTest = {
          ...test,
          id: `TEST${String(Date.now()).slice(-3)}`,
          createdDate: new Date().toISOString().split("T")[0],
          attempts: 0,
          avgScore: 0,
          passRate: 0,
        };
        resolve(newTest);
      }, 300);
    });
  },

  updateTest: (id, updates) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id, ...updates });
      }, 300);
    });
  },

  deleteTest: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(id);
      }, 200);
    });
  },
};

export default function CreateTest() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [testModal, setTestModal] = useState({
    open: false,
    mode: "create",
    data: null,
  });
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [viewModal, setViewModal] = useState({ open: false, data: null });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    course: "RS-CIT",
    duration: "",
    totalQuestions: "",
    passingMarks: "",
    totalMarks: "",
    difficulty: "Medium",
    status: "Draft",
    topics: "",
    instructions: "",
    timeLimit: "",
    questionTypes: "Multiple Choice",
  });

  // Load tests on component mount
  React.useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    setLoading(true);
    try {
      const data = await mockAPI.getTests();
      setTests(data);
    } catch (error) {
      console.error("Failed to load tests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTest = async () => {
    setLoading(true);
    try {
      const testData = {
        ...formData,
        duration: parseInt(formData.duration),
        totalQuestions: parseInt(formData.totalQuestions),
        passingMarks: parseInt(formData.passingMarks),
        totalMarks: parseInt(formData.totalMarks),
        topics: formData.topics.split(",").map((t) => t.trim()),
        questionTypes: [formData.questionTypes],
      };
      const newTest = await mockAPI.createTest(testData);
      setTests((prev) => [newTest, ...prev]);
      closeTestModal();
    } catch (error) {
      console.error("Failed to create test:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTest = async () => {
    setLoading(true);
    try {
      const testData = {
        ...formData,
        duration: parseInt(formData.duration),
        totalQuestions: parseInt(formData.totalQuestions),
        passingMarks: parseInt(formData.passingMarks),
        totalMarks: parseInt(formData.totalMarks),
        topics: formData.topics.split(",").map((t) => t.trim()),
        questionTypes: [formData.questionTypes],
      };
      const updatedTest = await mockAPI.updateTest(testModal.data.id, testData);
      setTests((prev) =>
        prev.map((t) =>
          t.id === updatedTest.id ? { ...testModal.data, ...updatedTest } : t
        )
      );
      closeTestModal();
    } catch (error) {
      console.error("Failed to update test:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTest = async () => {
    setLoading(true);
    try {
      await mockAPI.deleteTest(deleteModal.id);
      setTests((prev) => prev.filter((t) => t.id !== deleteModal.id));
      setDeleteModal({ open: false, id: null });
    } catch (error) {
      console.error("Failed to delete test:", error);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setFormData({
      title: "",
      description: "",
      course: "RS-CIT",
      duration: "",
      totalQuestions: "",
      passingMarks: "",
      totalMarks: "",
      difficulty: "Medium",
      status: "Draft",
      topics: "",
      instructions: "",
      timeLimit: "",
      questionTypes: "Multiple Choice",
    });
    setTestModal({ open: true, mode: "create", data: null });
  };

  const openEditModal = (test) => {
    setFormData({
      title: test.title,
      description: test.description,
      course: test.course,
      duration: test.duration.toString(),
      totalQuestions: test.totalQuestions.toString(),
      passingMarks: test.passingMarks.toString(),
      totalMarks: test.totalMarks.toString(),
      difficulty: test.difficulty,
      status: test.status,
      topics: test.topics.join(", "),
      instructions: test.instructions,
      timeLimit: test.timeLimit,
      questionTypes: test.questionTypes[0],
    });
    setTestModal({ open: true, mode: "edit", data: test });
  };

  const closeTestModal = () => {
    setTestModal({ open: false, mode: "create", data: null });
    setFormData({
      title: "",
      description: "",
      course: "RS-CIT",
      duration: "",
      totalQuestions: "",
      passingMarks: "",
      totalMarks: "",
      difficulty: "Medium",
      status: "Draft",
      topics: "",
      instructions: "",
      timeLimit: "",
      questionTypes: "Multiple Choice",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (testModal.mode === "create") {
      await handleCreateTest();
    } else {
      await handleUpdateTest();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Inactive":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCourseColor = (course) => {
    switch (course) {
      case "RS-CIT":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "NIOS":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "CBSE":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "ITI":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "Competitive":
        return "bg-pink-100 text-pink-800 border-pink-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <Play className="h-4 w-4 text-green-600" />;
      case "Draft":
        return <Pause className="h-4 w-4 text-yellow-600" />;
      case "Inactive":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  // Filter tests based on search and filters
  const filteredTests = tests.filter((test) => {
    const matchesSearch =
      test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse =
      filterCourse === "all" || test.course === filterCourse;
    const matchesStatus =
      filterStatus === "all" || test.status === filterStatus;

    return matchesSearch && matchesCourse && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/40">
        <div className="container max-w-7xl mx-auto px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between h-auto sm:h-16 py-4 sm:py-0 gap-2 sm:gap-0">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Admin
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Test Management
              </h1>
              <p className="text-sm text-muted-foreground">
                Create and manage online tests and assessments
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm" className="cursor-pointer">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm" className="cursor-pointer">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              size="sm"
              onClick={openCreateModal}
              className="cursor-pointer"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Test
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8 max-w-7xl mx-auto px-4">
        {/* Stats Overview */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Tests
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    {tests.length}
                  </p>
                </div>
                <FileText className="h-10 w-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Tests
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    {tests.filter((t) => t.status === "Active").length}
                  </p>
                </div>
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Attempts
                  </p>
                  <p className="text-3xl font-bold text-orange-600">
                    {tests.reduce((sum, t) => sum + t.attempts, 0)}
                  </p>
                </div>
                <Users className="h-10 w-10 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Avg Pass Rate
                  </p>
                  <p className="text-3xl font-bold text-purple-600">
                    {Math.round(
                      tests.reduce((sum, t) => sum + t.passRate, 0) /
                        tests.length || 0
                    )}
                    %
                  </p>
                </div>
                <Target className="h-10 w-10 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-lg border border-gray-200 rounded-xl mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search tests by title, ID, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <Select value={filterCourse} onValueChange={setFilterCourse}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Courses</SelectItem>
                      <SelectItem value="RS-CIT">RS-CIT</SelectItem>
                      <SelectItem value="NIOS">NIOS</SelectItem>
                      <SelectItem value="CBSE">CBSE</SelectItem>
                      <SelectItem value="ITI">ITI</SelectItem>
                      <SelectItem value="Competitive">Competitive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tests List */}
        <Card className="shadow-lg border border-gray-200 rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Tests List ({filteredTests.length})
            </CardTitle>
            <CardDescription>
              Manage test information and track performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading && tests.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-sm text-muted-foreground">
                    Loading tests...
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTests.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No tests found matching your criteria.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {filteredTests.map((test) => (
                      <div
                        key={test.id}
                        className="flex items-start justify-between p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white"
                      >
                        <div className="flex-1 space-y-4">
                          {/* Header Row */}
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                {getStatusIcon(test.status)}
                                <h3 className="font-semibold text-lg">
                                  {test.title}
                                </h3>
                                <Badge
                                  className={`text-xs px-2 py-1 ${getCourseColor(
                                    test.course
                                  )}`}
                                >
                                  {test.course}
                                </Badge>
                                <Badge
                                  className={`text-xs px-2 py-1 ${getStatusColor(
                                    test.status
                                  )}`}
                                >
                                  {test.status}
                                </Badge>
                                <Badge
                                  className={`text-xs px-2 py-1 ${getDifficultyColor(
                                    test.difficulty
                                  )}`}
                                >
                                  {test.difficulty}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3 max-w-2xl">
                                {test.description}
                              </p>
                            </div>
                          </div>

                          {/* Test Details Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <div>
                                <span className="text-muted-foreground">
                                  Duration:
                                </span>
                                <p className="font-medium">
                                  {test.duration} min
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-gray-400" />
                              <div>
                                <span className="text-muted-foreground">
                                  Questions:
                                </span>
                                <p className="font-medium">
                                  {test.totalQuestions}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-gray-400" />
                              <div>
                                <span className="text-muted-foreground">
                                  Pass Marks:
                                </span>
                                <p className="font-medium">
                                  {test.passingMarks}/{test.totalMarks}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-gray-400" />
                              <div>
                                <span className="text-muted-foreground">
                                  Attempts:
                                </span>
                                <p className="font-medium">{test.attempts}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <BarChart3 className="h-4 w-4 text-gray-400" />
                              <div>
                                <span className="text-muted-foreground">
                                  Avg Score:
                                </span>
                                <p className="font-medium">
                                  {test.avgScore.toFixed(1)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-gray-400" />
                              <div>
                                <span className="text-muted-foreground">
                                  Pass Rate:
                                </span>
                                <p className="font-medium text-green-600">
                                  {test.passRate}%
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Topics */}
                          <div className="flex flex-wrap gap-2">
                            <span className="text-sm text-muted-foreground">
                              Topics:
                            </span>
                            {test.topics.slice(0, 3).map((topic, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {topic}
                              </Badge>
                            ))}
                            {test.topics.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{test.topics.length - 3} more
                              </Badge>
                            )}
                          </div>

                          {/* Meta Info */}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>
                                Created:{" "}
                                {new Date(
                                  test.createdDate
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <span>ID: {test.id}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 ml-6">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setViewModal({ open: true, data: test })
                            }
                            disabled={loading}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditModal(test)}
                            disabled={loading}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setDeleteModal({ open: true, id: test.id })
                            }
                            disabled={loading}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create/Edit Test Modal */}
      <Dialog open={testModal.open} onOpenChange={closeTestModal}>
        <DialogContent className="max-w-3xl w-full p-6 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              {testModal.mode === "create" ? "Create New Test" : "Edit Test"}
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              {testModal.mode === "create"
                ? "Enter test information to create a new assessment"
                : "Update test information and settings"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Test Title *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter test title"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Enter test description"
                  rows={3}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course *
                </label>
                <Select
                  value={formData.course}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, course: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RS-CIT">RS-CIT</SelectItem>
                    <SelectItem value="NIOS">NIOS</SelectItem>
                    <SelectItem value="CBSE">CBSE</SelectItem>
                    <SelectItem value="ITI">ITI</SelectItem>
                    <SelectItem value="Competitive">Competitive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, difficulty: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes) *
                </label>
                <Input
                  type="number"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      duration: e.target.value,
                    }))
                  }
                  placeholder="90"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Questions *
                </label>
                <Input
                  type="number"
                  value={formData.totalQuestions}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      totalQuestions: e.target.value,
                    }))
                  }
                  placeholder="50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Marks *
                </label>
                <Input
                  type="number"
                  value={formData.totalMarks}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      totalMarks: e.target.value,
                    }))
                  }
                  placeholder="50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Passing Marks *
                </label>
                <Input
                  type="number"
                  value={formData.passingMarks}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      passingMarks: e.target.value,
                    }))
                  }
                  placeholder="35"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Topics (comma-separated)
                </label>
                <Input
                  value={formData.topics}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, topics: e.target.value }))
                  }
                  placeholder="Topic 1, Topic 2, Topic 3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Types
                </label>
                <Select
                  value={formData.questionTypes}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, questionTypes: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Multiple Choice">
                      Multiple Choice
                    </SelectItem>
                    <SelectItem value="True/False">True/False</SelectItem>
                    <SelectItem value="Subjective">Subjective</SelectItem>
                    <SelectItem value="Numerical">Numerical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Limit
                </label>
                <Input
                  value={formData.timeLimit}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      timeLimit: e.target.value,
                    }))
                  }
                  placeholder="1 hour 30 minutes"
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instructions
                </label>
                <Textarea
                  value={formData.instructions}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      instructions: e.target.value,
                    }))
                  }
                  placeholder="Test instructions for students"
                  rows={2}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={closeTestModal}
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
                    {testModal.mode === "create"
                      ? "Creating..."
                      : "Updating..."}
                  </div>
                ) : testModal.mode === "create" ? (
                  "Create Test"
                ) : (
                  "Update Test"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Test Modal */}
      <Dialog
        open={viewModal.open}
        onOpenChange={() => setViewModal({ open: false, data: null })}
      >
        <DialogContent className="max-w-4xl w-full p-6 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Test Details
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Complete information about the test
            </DialogDescription>
          </DialogHeader>

          {viewModal.data && (
            <div className="space-y-6 mt-4">
              {/* Header */}
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(viewModal.data.status)}
                    <h3 className="text-xl font-semibold">
                      {viewModal.data.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-3">
                    {viewModal.data.description}
                  </p>
                  <div className="flex gap-2">
                    <Badge
                      className={`text-xs ${getCourseColor(
                        viewModal.data.course
                      )}`}
                    >
                      {viewModal.data.course}
                    </Badge>
                    <Badge
                      className={`text-xs ${getStatusColor(
                        viewModal.data.status
                      )}`}
                    >
                      {viewModal.data.status}
                    </Badge>
                    <Badge
                      className={`text-xs ${getDifficultyColor(
                        viewModal.data.difficulty
                      )}`}
                    >
                      {viewModal.data.difficulty}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Test ID</p>
                  <p className="font-mono font-semibold">{viewModal.data.id}</p>
                </div>
              </div>

              {/* Test Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">
                    Test Configuration
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Duration:</span>
                      <span className="text-sm font-medium">
                        {viewModal.data.duration} minutes
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Total Questions:
                      </span>
                      <span className="text-sm font-medium">
                        {viewModal.data.totalQuestions}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Total Marks:
                      </span>
                      <span className="text-sm font-medium">
                        {viewModal.data.totalMarks}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Passing Marks:
                      </span>
                      <span className="text-sm font-medium">
                        {viewModal.data.passingMarks}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Time Limit:</span>
                      <span className="text-sm font-medium">
                        {viewModal.data.timeLimit}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">
                    Performance Metrics
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Total Attempts:
                      </span>
                      <span className="text-sm font-medium">
                        {viewModal.data.attempts}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Average Score:
                      </span>
                      <span className="text-sm font-medium">
                        {viewModal.data.avgScore.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Pass Rate:</span>
                      <span className="text-sm font-medium text-green-600">
                        {viewModal.data.passRate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Created:</span>
                      <span className="text-sm font-medium">
                        {new Date(
                          viewModal.data.createdDate
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">
                    Question Types
                  </h4>
                  <div className="space-y-2">
                    {viewModal.data.questionTypes.map((type, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Topics */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Topics Covered</h4>
                <div className="flex flex-wrap gap-2">
                  {viewModal.data.topics.map((topic, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Instructions</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {viewModal.data.instructions}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end mt-6">
            <Button
              onClick={() => setViewModal({ open: false, data: null })}
              className="bg-black text-white hover:bg-neutral-900"
            >
              Close
            </Button>
          </div>
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
              Delete Test
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Are you sure you want to delete this test? This action cannot be
              undone and will remove all associated data including student
              attempts.
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
              onClick={handleDeleteTest}
              disabled={loading}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Deleting...
                </div>
              ) : (
                "Delete Test"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

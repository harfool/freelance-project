import React, { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Calendar,
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
  User,
  BookOpen,
  BarChart3,
  CalendarDays,
  UserCheck,
  UserX,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Link } from "react-router-dom";

// Initial dummy attendance records
const initialAttendanceRecords = [
  {
    id: "ATT001",
    studentId: "STU001",
    studentName: "Aarav Sharma",
    course: "RS-CIT",
    batch: "2024-A",
    date: "2024-07-08",
    status: "Present",
    timeIn: "09:00",
    timeOut: "12:00",
    remarks: "",
    markedBy: "Admin",
    markedAt: "2024-07-08T09:05:00",
  },
  {
    id: "ATT002",
    studentId: "STU002",
    studentName: "Priya Patel",
    course: "NIOS",
    batch: "2024-B",
    date: "2024-07-08",
    status: "Absent",
    timeIn: "",
    timeOut: "",
    remarks: "Sick leave",
    markedBy: "Admin",
    markedAt: "2024-07-08T09:05:00",
  },
  {
    id: "ATT003",
    studentId: "STU003",
    studentName: "Rohit Kumar",
    course: "CBSE",
    batch: "2024-A",
    date: "2024-07-08",
    status: "Present",
    timeIn: "08:55",
    timeOut: "12:10",
    remarks: "",
    markedBy: "Admin",
    markedAt: "2024-07-08T08:55:00",
  },
  {
    id: "ATT004",
    studentId: "STU004",
    studentName: "Ananya Singh",
    course: "RS-CIT",
    batch: "2024-B",
    date: "2024-07-08",
    status: "Late",
    timeIn: "09:30",
    timeOut: "12:00",
    remarks: "Traffic jam",
    markedBy: "Admin",
    markedAt: "2024-07-08T09:30:00",
  },
  {
    id: "ATT005",
    studentId: "STU005",
    studentName: "Arjun Reddy",
    course: "NIOS",
    batch: "2024-A",
    date: "2024-07-08",
    status: "Present",
    timeIn: "09:10",
    timeOut: "12:05",
    remarks: "",
    markedBy: "Admin",
    markedAt: "2024-07-08T09:10:00",
  },
  {
    id: "ATT006",
    studentId: "STU006",
    studentName: "Sneha Gupta",
    course: "CBSE",
    batch: "2024-B",
    date: "2024-07-08",
    status: "Present",
    timeIn: "08:50",
    timeOut: "12:15",
    remarks: "",
    markedBy: "Admin",
    markedAt: "2024-07-08T08:50:00",
  },
  {
    id: "ATT007",
    studentId: "STU007",
    studentName: "Karan Joshi",
    course: "RS-CIT",
    batch: "2024-A",
    date: "2024-07-08",
    status: "Absent",
    timeIn: "",
    timeOut: "",
    remarks: "Family emergency",
    markedBy: "Admin",
    markedAt: "2024-07-08T09:05:00",
  },
  {
    id: "ATT008",
    studentId: "STU008",
    studentName: "Meera Nair",
    course: "NIOS",
    batch: "2024-B",
    date: "2024-07-08",
    status: "Present",
    timeIn: "09:05",
    timeOut: "12:00",
    remarks: "",
    markedBy: "Admin",
    markedAt: "2024-07-08T09:05:00",
  },
  {
    id: "ATT009",
    studentId: "STU009",
    studentName: "Varun Agarwal",
    course: "CBSE",
    batch: "2024-A",
    date: "2024-07-08",
    status: "Present",
    timeIn: "08:45",
    timeOut: "12:20",
    remarks: "",
    markedBy: "Admin",
    markedAt: "2024-07-08T08:45:00",
  },
  {
    id: "ATT010",
    studentId: "STU010",
    studentName: "Ishita Rao",
    course: "RS-CIT",
    batch: "2024-B",
    date: "2024-07-08",
    status: "Late",
    timeIn: "09:45",
    timeOut: "12:00",
    remarks: "Public transport delay",
    markedBy: "Admin",
    markedAt: "2024-07-08T09:45:00",
  },
  {
    id: "ATT011",
    studentId: "STU011",
    studentName: "Aditya Verma",
    course: "NIOS",
    batch: "2024-A",
    date: "2024-07-07",
    status: "Present",
    timeIn: "09:00",
    timeOut: "12:00",
    remarks: "",
    markedBy: "Admin",
    markedAt: "2024-07-07T09:00:00",
  },
  {
    id: "ATT012",
    studentId: "STU012",
    studentName: "Kavya Iyer",
    course: "CBSE",
    batch: "2024-B",
    date: "2024-07-07",
    status: "Present",
    timeIn: "08:55",
    timeOut: "12:10",
    remarks: "",
    markedBy: "Admin",
    markedAt: "2024-07-07T08:55:00",
  },
  {
    id: "ATT013",
    studentId: "STU013",
    studentName: "Siddharth Mishra",
    course: "RS-CIT",
    batch: "2024-A",
    date: "2024-07-07",
    status: "Absent",
    timeIn: "",
    timeOut: "",
    remarks: "Medical appointment",
    markedBy: "Admin",
    markedAt: "2024-07-07T09:05:00",
  },
  {
    id: "ATT014",
    studentId: "STU014",
    studentName: "Riya Saxena",
    course: "NIOS",
    batch: "2024-B",
    date: "2024-07-07",
    status: "Present",
    timeIn: "09:08",
    timeOut: "12:05",
    remarks: "",
    markedBy: "Admin",
    markedAt: "2024-07-07T09:08:00",
  },
  {
    id: "ATT015",
    studentId: "STU015",
    studentName: "Akash Pandey",
    course: "CBSE",
    batch: "2024-A",
    date: "2024-07-07",
    status: "Present",
    timeIn: "08:50",
    timeOut: "12:15",
    remarks: "",
    markedBy: "Admin",
    markedAt: "2024-07-07T08:50:00",
  },
  {
    id: "ATT016",
    studentId: "STU016",
    studentName: "Pooja Sharma",
    course: "RS-CIT",
    batch: "2024-B",
    date: "2024-07-07",
    status: "Late",
    timeIn: "09:25",
    timeOut: "12:00",
    remarks: "Vehicle breakdown",
    markedBy: "Admin",
    markedAt: "2024-07-07T09:25:00",
  },
  {
    id: "ATT017",
    studentId: "STU017",
    studentName: "Harsh Agrawal",
    course: "NIOS",
    batch: "2024-A",
    date: "2024-07-07",
    status: "Present",
    timeIn: "09:02",
    timeOut: "12:03",
    remarks: "",
    markedBy: "Admin",
    markedAt: "2024-07-07T09:02:00",
  },
  {
    id: "ATT018",
    studentId: "STU018",
    studentName: "Nisha Kapoor",
    course: "CBSE",
    batch: "2024-B",
    date: "2024-07-07",
    status: "Present",
    timeIn: "08:58",
    timeOut: "12:12",
    remarks: "",
    markedBy: "Admin",
    markedAt: "2024-07-07T08:58:00",
  },
  {
    id: "ATT019",
    studentId: "STU019",
    studentName: "Abhishek Tiwari",
    course: "RS-CIT",
    batch: "2024-A",
    date: "2024-07-07",
    status: "Absent",
    timeIn: "",
    timeOut: "",
    remarks: "Personal work",
    markedBy: "Admin",
    markedAt: "2024-07-07T09:05:00",
  },
  {
    id: "ATT020",
    studentId: "STU020",
    studentName: "Tanvi Shah",
    course: "NIOS",
    batch: "2024-B",
    date: "2024-07-07",
    status: "Present",
    timeIn: "09:12",
    timeOut: "12:08",
    remarks: "",
    markedBy: "Admin",
    markedAt: "2024-07-07T09:12:00",
  },
];

// Students list for creating new attendance records
const students = [
  { id: "STU001", name: "Aarav Sharma", course: "RS-CIT", batch: "2024-A" },
  { id: "STU002", name: "Priya Patel", course: "NIOS", batch: "2024-B" },
  { id: "STU003", name: "Rohit Kumar", course: "CBSE", batch: "2024-A" },
  { id: "STU004", name: "Ananya Singh", course: "RS-CIT", batch: "2024-B" },
  { id: "STU005", name: "Arjun Reddy", course: "NIOS", batch: "2024-A" },
  { id: "STU006", name: "Sneha Gupta", course: "CBSE", batch: "2024-B" },
  { id: "STU007", name: "Karan Joshi", course: "RS-CIT", batch: "2024-A" },
  { id: "STU008", name: "Meera Nair", course: "NIOS", batch: "2024-B" },
  { id: "STU009", name: "Varun Agarwal", course: "CBSE", batch: "2024-A" },
  { id: "STU010", name: "Ishita Rao", course: "RS-CIT", batch: "2024-B" },
  { id: "STU011", name: "Aditya Verma", course: "NIOS", batch: "2024-A" },
  { id: "STU012", name: "Kavya Iyer", course: "CBSE", batch: "2024-B" },
  { id: "STU013", name: "Siddharth Mishra", course: "RS-CIT", batch: "2024-A" },
  { id: "STU014", name: "Riya Saxena", course: "NIOS", batch: "2024-B" },
  { id: "STU015", name: "Akash Pandey", course: "CBSE", batch: "2024-A" },
  { id: "STU016", name: "Pooja Sharma", course: "RS-CIT", batch: "2024-B" },
  { id: "STU017", name: "Harsh Agrawal", course: "NIOS", batch: "2024-A" },
  { id: "STU018", name: "Nisha Kapoor", course: "CBSE", batch: "2024-B" },
  { id: "STU019", name: "Abhishek Tiwari", course: "RS-CIT", batch: "2024-A" },
  { id: "STU020", name: "Tanvi Shah", course: "NIOS", batch: "2024-B" },
];

// localStorage key
const STORAGE_KEY = "attendance_records";

// Helper functions for localStorage
const getAttendanceFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialAttendanceRecords;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return initialAttendanceRecords;
  }
};

const saveAttendanceToStorage = (records) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export default function Attendance() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [attendanceModal, setAttendanceModal] = useState({
    open: false,
    mode: "create",
    data: null,
  });
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [viewModal, setViewModal] = useState({ open: false, data: null });
  const [bulkMarkModal, setBulkMarkModal] = useState({ open: false });
  const [formData, setFormData] = useState({
    studentId: "",
    date: new Date().toISOString().split("T")[0],
    status: "Present",
    timeIn: "",
    timeOut: "",
    remarks: "",
  });

  // Load attendance records on component mount
  useEffect(() => {
    loadAttendance();
  }, []);

  // Save to localStorage whenever attendanceRecords changes
  useEffect(() => {
    if (attendanceRecords.length > 0) {
      saveAttendanceToStorage(attendanceRecords);
    }
  }, [attendanceRecords]);

  const loadAttendance = () => {
    setLoading(true);
    try {
      const records = getAttendanceFromStorage();
      setAttendanceRecords(records);
    } catch (error) {
      console.error("Failed to load attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAttendance = () => {
    setLoading(true);
    try {
      const student = students.find((s) => s.id === formData.studentId);
      if (!student) {
        console.error("Student not found");
        return;
      }

      const newRecord = {
        id: `ATT${Date.now()}`,
        studentId: formData.studentId,
        studentName: student.name,
        course: student.course,
        batch: student.batch,
        date: formData.date,
        status: formData.status,
        timeIn: formData.timeIn,
        timeOut: formData.timeOut,
        remarks: formData.remarks,
        markedBy: "Admin",
        markedAt: new Date().toISOString(),
      };

      setAttendanceRecords((prev) => [newRecord, ...prev]);
      closeAttendanceModal();
    } catch (error) {
      console.error("Failed to create attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAttendance = () => {
    setLoading(true);
    try {
      const student = students.find((s) => s.id === formData.studentId);
      if (!student) {
        console.error("Student not found");
        return;
      }

      const updatedRecord = {
        ...attendanceModal.data,
        studentId: formData.studentId,
        studentName: student.name,
        course: student.course,
        batch: student.batch,
        date: formData.date,
        status: formData.status,
        timeIn: formData.timeIn,
        timeOut: formData.timeOut,
        remarks: formData.remarks,
        markedBy: "Admin",
        markedAt: new Date().toISOString(),
      };

      setAttendanceRecords((prev) =>
        prev.map((r) => (r.id === updatedRecord.id ? updatedRecord : r))
      );
      closeAttendanceModal();
    } catch (error) {
      console.error("Failed to update attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAttendance = () => {
    setLoading(true);
    try {
      setAttendanceRecords((prev) =>
        prev.filter((r) => r.id !== deleteModal.id)
      );
      setDeleteModal({ open: false, id: null });
    } catch (error) {
      console.error("Failed to delete attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkMarkAttendance = (status) => {
    setLoading(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      const existingToday = attendanceRecords
        .filter((r) => r.date === today)
        .map((r) => r.studentId);
      const studentsToMark = students.filter(
        (s) => !existingToday.includes(s.id)
      );

      const newRecords = studentsToMark.map((student) => ({
        id: `ATT${Date.now()}_${student.id}`,
        studentId: student.id,
        studentName: student.name,
        course: student.course,
        batch: student.batch,
        date: today,
        status: status,
        timeIn: status === "Present" ? "09:00" : "",
        timeOut: status === "Present" ? "12:00" : "",
        remarks: `Bulk marked as ${status}`,
        markedBy: "Admin",
        markedAt: new Date().toISOString(),
      }));

      setAttendanceRecords((prev) => [...newRecords, ...prev]);
      setBulkMarkModal({ open: false });
    } catch (error) {
      console.error("Failed to bulk mark attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setFormData({
      studentId: "",
      date: new Date().toISOString().split("T")[0],
      status: "Present",
      timeIn: "",
      timeOut: "",
      remarks: "",
    });
    setAttendanceModal({ open: true, mode: "create", data: null });
  };

  const openEditModal = (record) => {
    setFormData({
      studentId: record.studentId,
      date: record.date,
      status: record.status,
      timeIn: record.timeIn,
      timeOut: record.timeOut,
      remarks: record.remarks,
    });
    setAttendanceModal({ open: true, mode: "edit", data: record });
  };

  const closeAttendanceModal = () => {
    setAttendanceModal({ open: false, mode: "create", data: null });
    setFormData({
      studentId: "",
      date: new Date().toISOString().split("T")[0],
      status: "Present",
      timeIn: "",
      timeOut: "",
      remarks: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (attendanceModal.mode === "create") {
      handleCreateAttendance();
    } else {
      handleUpdateAttendance();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-800 border-green-200";
      case "Absent":
        return "bg-red-100 text-red-800 border-red-200";
      case "Late":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
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
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Present":
        return <UserCheck className="h-4 w-4 text-green-600" />;
      case "Absent":
        return <UserX className="h-4 w-4 text-red-600" />;
      case "Late":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  // Calculate statistics
  const totalRecords = attendanceRecords.length;
  const presentCount = attendanceRecords.filter(
    (r) => r.status === "Present"
  ).length;
  const absentCount = attendanceRecords.filter(
    (r) => r.status === "Absent"
  ).length;
  const lateCount = attendanceRecords.filter((r) => r.status === "Late").length;
  const attendanceRate =
    totalRecords > 0
      ? Math.round(((presentCount + lateCount) / totalRecords) * 100)
      : 0;

  // Get today's attendance
  const today = new Date().toISOString().split("T")[0];
  const todayRecords = attendanceRecords.filter((r) => r.date === today);
  const todayPresent = todayRecords.filter(
    (r) => r.status === "Present" || r.status === "Late"
  ).length;
  const todayTotal = todayRecords.length;
  const todayRate =
    todayTotal > 0 ? Math.round((todayPresent / todayTotal) * 100) : 0;

  // Filter records based on search and filters
  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse =
      filterCourse === "all" || record.course === filterCourse;
    const matchesStatus =
      filterStatus === "all" || record.status === filterStatus;
    const matchesDate = !filterDate || record.date === filterDate;

    return matchesSearch && matchesCourse && matchesStatus && matchesDate;
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
                <Calendar className="h-6 w-6 text-primary" />
                Attendance Management
              </h1>
              <p className="text-sm text-muted-foreground">
                Track and manage student attendance records
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={() => setBulkMarkModal({ open: true })}
            >
              <Users className="h-4 w-4 mr-2" />
              Bulk Mark
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
              Mark Attendance
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8 max-w-7xl mx-auto px-4">
        {/* Stats Overview */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-5 mb-8">
          <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Records
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    {totalRecords}
                  </p>
                </div>
                <CalendarDays className="h-10 w-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Present
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    {presentCount}
                  </p>
                </div>
                <UserCheck className="h-10 w-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Absent
                  </p>
                  <p className="text-3xl font-bold text-red-600">
                    {absentCount}
                  </p>
                </div>
                <UserX className="h-10 w-10 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Late
                  </p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {lateCount}
                  </p>
                </div>
                <Clock className="h-10 w-10 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Attendance Rate
                  </p>
                  <p className="text-3xl font-bold text-purple-600">
                    {attendanceRate}%
                  </p>
                </div>
                <BarChart3 className="h-10 w-10 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Summary */}
        <Card className="shadow-lg border border-gray-200 rounded-xl mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Today's Attendance Summary ({today})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{todayTotal}</p>
                <p className="text-sm text-muted-foreground">Total Marked</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {todayPresent}
                </p>
                <p className="text-sm text-muted-foreground">Present/Late</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">
                  {todayTotal - todayPresent}
                </p>
                <p className="text-sm text-muted-foreground">Absent</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">
                  {todayRate}%
                </p>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <Card className="shadow-lg border border-gray-200 rounded-xl mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by student name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <div className="flex gap-4 items-center flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <Select value={filterCourse} onValueChange={setFilterCourse}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Courses</SelectItem>
                      <SelectItem value="RS-CIT">RS-CIT</SelectItem>
                      <SelectItem value="NIOS">NIOS</SelectItem>
                      <SelectItem value="CBSE">CBSE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Present">Present</SelectItem>
                    <SelectItem value="Absent">Absent</SelectItem>
                    <SelectItem value="Late">Late</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-40"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Records List */}
        <Card className="shadow-lg border border-gray-200 rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Attendance Records ({filteredRecords.length})
            </CardTitle>
            <CardDescription>
              Track student attendance and manage records
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading && attendanceRecords.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-sm text-muted-foreground">
                    Loading attendance...
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRecords.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No attendance records found matching your criteria.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {filteredRecords.map((record) => (
                      <div
                        key={record.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white"
                      >
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-7 gap-4 items-center">
                          {/* Student Info */}
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                              {record.studentName.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-base">
                                {record.studentName}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {record.studentId}
                              </p>
                            </div>
                          </div>

                          {/* Course & Batch */}
                          <div className="flex flex-col gap-1">
                            <Badge
                              className={`text-xs px-2 py-1 w-fit ${getCourseColor(
                                record.course
                              )}`}
                            >
                              {record.course}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              Batch: {record.batch}
                            </span>
                          </div>

                          {/* Date */}
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium">
                              {new Date(record.date).toLocaleDateString()}
                            </span>
                          </div>

                          {/* Status */}
                          <div className="flex items-center gap-2">
                            {getStatusIcon(record.status)}
                            <Badge
                              className={`text-xs px-2 py-1 ${getStatusColor(
                                record.status
                              )}`}
                            >
                              {record.status}
                            </Badge>
                          </div>

                          {/* Time */}
                          <div className="flex flex-col gap-1">
                            {record.timeIn && (
                              <div className="flex items-center gap-1 text-sm">
                                <span className="text-green-600">In:</span>
                                <span>{record.timeIn}</span>
                              </div>
                            )}
                            {record.timeOut && (
                              <div className="flex items-center gap-1 text-sm">
                                <span className="text-red-600">Out:</span>
                                <span>{record.timeOut}</span>
                              </div>
                            )}
                          </div>

                          {/* Remarks */}
                          <div className="flex flex-col gap-1">
                            {record.remarks && (
                              <p className="text-sm text-muted-foreground italic">
                                {record.remarks}
                              </p>
                            )}
                            <span className="text-xs text-muted-foreground">
                              By: {record.markedBy}
                            </span>
                          </div>

                          {/* Marked Time */}
                          <div className="text-xs text-muted-foreground">
                            {new Date(record.markedAt).toLocaleString()}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setViewModal({ open: true, data: record })
                            }
                            disabled={loading}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditModal(record)}
                            disabled={loading}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setDeleteModal({ open: true, id: record.id })
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

      {/* Create/Edit Attendance Modal */}
      <Dialog open={attendanceModal.open} onOpenChange={closeAttendanceModal}>
        <DialogContent className="max-w-2xl w-full p-6 bg-white rounded-2xl shadow-2xl border border-gray-100">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              {attendanceModal.mode === "create"
                ? "Mark Attendance"
                : "Edit Attendance"}
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              {attendanceModal.mode === "create"
                ? "Mark attendance for a student"
                : "Update attendance record"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student *
                </label>
                <Select
                  value={formData.studentId}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, studentId: value }))
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} ({student.id}) - {student.course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, date: e.target.value }))
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
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
                    <SelectItem value="Present">Present</SelectItem>
                    <SelectItem value="Absent">Absent</SelectItem>
                    <SelectItem value="Late">Late</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time In
                </label>
                <Input
                  type="time"
                  value={formData.timeIn}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, timeIn: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Out
                </label>
                <Input
                  type="time"
                  value={formData.timeOut}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      timeOut: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Remarks
              </label>
              <Input
                value={formData.remarks}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, remarks: e.target.value }))
                }
                placeholder="Optional remarks..."
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={closeAttendanceModal}
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
                    {attendanceModal.mode === "create"
                      ? "Marking..."
                      : "Updating..."}
                  </div>
                ) : attendanceModal.mode === "create" ? (
                  "Mark Attendance"
                ) : (
                  "Update Attendance"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Bulk Mark Modal */}
      <Dialog
        open={bulkMarkModal.open}
        onOpenChange={() => setBulkMarkModal({ open: false })}
      >
        <DialogContent className="max-w-md w-full p-6 bg-white rounded-2xl shadow-2xl border border-gray-100">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Bulk Mark Attendance
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Mark attendance for all students who haven't been marked today
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <p className="text-sm text-gray-600">
              This will mark all unmarked students for today ({today}) with the
              selected status.
            </p>

            <div className="flex gap-3">
              <Button
                onClick={() => handleBulkMarkAttendance("Present")}
                disabled={loading}
                className="flex-1 bg-green-600 text-white hover:bg-green-700"
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Mark All Present
              </Button>
              <Button
                onClick={() => handleBulkMarkAttendance("Absent")}
                disabled={loading}
                className="flex-1 bg-red-600 text-white hover:bg-red-700"
              >
                <UserX className="h-4 w-4 mr-2" />
                Mark All Absent
              </Button>
            </div>

            <Button
              variant="outline"
              onClick={() => setBulkMarkModal({ open: false })}
              disabled={loading}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Attendance Modal */}
      <Dialog
        open={viewModal.open}
        onOpenChange={() => setViewModal({ open: false, data: null })}
      >
        <DialogContent className="max-w-2xl w-full p-6 bg-white rounded-2xl shadow-2xl border border-gray-100">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Attendance Details
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Complete attendance record information
            </DialogDescription>
          </DialogHeader>

          {viewModal.data && (
            <div className="space-y-6 mt-4">
              {/* Student Info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  {viewModal.data.studentName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {viewModal.data.studentName}
                  </h3>
                  <p className="text-gray-600">{viewModal.data.studentId}</p>
                  <div className="flex gap-2 mt-1">
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
                  </div>
                </div>
              </div>

              {/* Attendance Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">
                    Attendance Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Date:</span>
                      <span className="text-sm font-medium">
                        {new Date(viewModal.data.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <Badge
                        className={`text-xs ${getStatusColor(
                          viewModal.data.status
                        )}`}
                      >
                        {viewModal.data.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Course:</span>
                      <span className="text-sm font-medium">
                        {viewModal.data.course}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Batch:</span>
                      <span className="text-sm font-medium">
                        {viewModal.data.batch}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">
                    Time Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Time In:</span>
                      <span className="text-sm font-medium">
                        {viewModal.data.timeIn || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Time Out:</span>
                      <span className="text-sm font-medium">
                        {viewModal.data.timeOut || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Marked By:</span>
                      <span className="text-sm font-medium">
                        {viewModal.data.markedBy}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Marked At:</span>
                      <span className="text-sm font-medium">
                        {new Date(viewModal.data.markedAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Remarks */}
              {viewModal.data.remarks && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Remarks</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {viewModal.data.remarks}
                  </p>
                </div>
              )}
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
              Delete Attendance Record
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Are you sure you want to delete this attendance record? This
              action cannot be undone.
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
              onClick={handleDeleteAttendance}
              disabled={loading}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Deleting...
                </div>
              ) : (
                "Delete Record"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

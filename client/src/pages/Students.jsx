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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Phone,
  Mail,
  Calendar,
  BookOpen,
  ArrowLeft,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock Students Data (20 students)
const initialStudents = [
  {
    id: "STU001",
    name: "Aarav Sharma",
    email: "aarav.sharma@email.com",
    phone: "+91 98765 43210",
    course: "RS-CIT",
    batch: "2024-A",
    enrollmentDate: "2024-01-15",
    status: "Active",
    fees: 15000,
    feesPaid: 15000,
    grade: "A",
    attendance: 92,
    parentName: "Rajesh Sharma",
    parentPhone: "+91 98765 43211",
    address: "123 MG Road, Mumbai",
  },
  {
    id: "STU002",
    name: "Priya Patel",
    email: "priya.patel@email.com",
    phone: "+91 98765 43212",
    course: "NIOS",
    batch: "2024-B",
    enrollmentDate: "2024-01-20",
    status: "Active",
    fees: 12000,
    feesPaid: 8000,
    grade: "B+",
    attendance: 88,
    parentName: "Kishan Patel",
    parentPhone: "+91 98765 43213",
    address: "456 Ring Road, Ahmedabad",
  },
  {
    id: "STU003",
    name: "Rohit Kumar",
    email: "rohit.kumar@email.com",
    phone: "+91 98765 43214",
    course: "CBSE",
    batch: "2024-A",
    enrollmentDate: "2024-02-01",
    status: "Active",
    fees: 18000,
    feesPaid: 18000,
    grade: "A+",
    attendance: 95,
    parentName: "Suresh Kumar",
    parentPhone: "+91 98765 43215",
    address: "789 CP, New Delhi",
  },
  {
    id: "STU004",
    name: "Ananya Singh",
    email: "ananya.singh@email.com",
    phone: "+91 98765 43216",
    course: "RS-CIT",
    batch: "2024-B",
    enrollmentDate: "2024-02-10",
    status: "Active",
    fees: 15000,
    feesPaid: 10000,
    grade: "B",
    attendance: 85,
    parentName: "Vikram Singh",
    parentPhone: "+91 98765 43217",
    address: "321 Mall Road, Jaipur",
  },
  {
    id: "STU005",
    name: "Arjun Reddy",
    email: "arjun.reddy@email.com",
    phone: "+91 98765 43218",
    course: "NIOS",
    batch: "2024-A",
    enrollmentDate: "2024-02-15",
    status: "Inactive",
    fees: 12000,
    feesPaid: 12000,
    grade: "C+",
    attendance: 70,
    parentName: "Ravi Reddy",
    parentPhone: "+91 98765 43219",
    address: "654 Tech City, Hyderabad",
  },
  {
    id: "STU006",
    name: "Sneha Gupta",
    email: "sneha.gupta@email.com",
    phone: "+91 98765 43220",
    course: "CBSE",
    batch: "2024-B",
    enrollmentDate: "2024-03-01",
    status: "Active",
    fees: 18000,
    feesPaid: 9000,
    grade: "A-",
    attendance: 90,
    parentName: "Amit Gupta",
    parentPhone: "+91 98765 43221",
    address: "987 Sector 5, Noida",
  },
  {
    id: "STU007",
    name: "Karan Joshi",
    email: "karan.joshi@email.com",
    phone: "+91 98765 43222",
    course: "RS-CIT",
    batch: "2024-A",
    enrollmentDate: "2024-03-10",
    status: "Active",
    fees: 15000,
    feesPaid: 15000,
    grade: "B+",
    attendance: 87,
    parentName: "Mahesh Joshi",
    parentPhone: "+91 98765 43223",
    address: "147 FC Road, Pune",
  },
  {
    id: "STU008",
    name: "Meera Nair",
    email: "meera.nair@email.com",
    phone: "+91 98765 43224",
    course: "NIOS",
    batch: "2024-B",
    enrollmentDate: "2024-03-15",
    status: "Active",
    fees: 12000,
    feesPaid: 6000,
    grade: "A",
    attendance: 93,
    parentName: "Sunil Nair",
    parentPhone: "+91 98765 43225",
    address: "258 Marine Drive, Kochi",
  },
  {
    id: "STU009",
    name: "Varun Agarwal",
    email: "varun.agarwal@email.com",
    phone: "+91 98765 43226",
    course: "CBSE",
    batch: "2024-A",
    enrollmentDate: "2024-04-01",
    status: "Active",
    fees: 18000,
    feesPaid: 18000,
    grade: "A+",
    attendance: 96,
    parentName: "Deepak Agarwal",
    parentPhone: "+91 98765 43227",
    address: "369 City Center, Indore",
  },
  {
    id: "STU010",
    name: "Ishita Rao",
    email: "ishita.rao@email.com",
    phone: "+91 98765 43228",
    course: "RS-CIT",
    batch: "2024-B",
    enrollmentDate: "2024-04-10",
    status: "Active",
    fees: 15000,
    feesPaid: 7500,
    grade: "B",
    attendance: 82,
    parentName: "Prakash Rao",
    parentPhone: "+91 98765 43229",
    address: "741 IT Hub, Bangalore",
  },
  {
    id: "STU011",
    name: "Aditya Verma",
    email: "aditya.verma@email.com",
    phone: "+91 98765 43230",
    course: "NIOS",
    batch: "2024-A",
    enrollmentDate: "2024-04-15",
    status: "Active",
    fees: 12000,
    feesPaid: 12000,
    grade: "A-",
    attendance: 89,
    parentName: "Ramesh Verma",
    parentPhone: "+91 98765 43231",
    address: "852 Civil Lines, Lucknow",
  },
  {
    id: "STU012",
    name: "Kavya Iyer",
    email: "kavya.iyer@email.com",
    phone: "+91 98765 43232",
    course: "CBSE",
    batch: "2024-B",
    enrollmentDate: "2024-05-01",
    status: "Active",
    fees: 18000,
    feesPaid: 12000,
    grade: "A",
    attendance: 91,
    parentName: "Venkat Iyer",
    parentPhone: "+91 98765 43233",
    address: "963 T Nagar, Chennai",
  },
  {
    id: "STU013",
    name: "Siddharth Mishra",
    email: "siddharth.mishra@email.com",
    phone: "+91 98765 43234",
    course: "RS-CIT",
    batch: "2024-A",
    enrollmentDate: "2024-05-10",
    status: "Inactive",
    fees: 15000,
    feesPaid: 5000,
    grade: "C",
    attendance: 65,
    parentName: "Ashok Mishra",
    parentPhone: "+91 98765 43235",
    address: "174 Hazratganj, Lucknow",
  },
  {
    id: "STU014",
    name: "Riya Saxena",
    email: "riya.saxena@email.com",
    phone: "+91 98765 43236",
    course: "NIOS",
    batch: "2024-B",
    enrollmentDate: "2024-05-15",
    status: "Active",
    fees: 12000,
    feesPaid: 9000,
    grade: "B+",
    attendance: 86,
    parentName: "Manoj Saxena",
    parentPhone: "+91 98765 43237",
    address: "285 Malviya Nagar, Bhopal",
  },
  {
    id: "STU015",
    name: "Akash Pandey",
    email: "akash.pandey@email.com",
    phone: "+91 98765 43238",
    course: "CBSE",
    batch: "2024-A",
    enrollmentDate: "2024-06-01",
    status: "Active",
    fees: 18000,
    feesPaid: 18000,
    grade: "A+",
    attendance: 94,
    parentName: "Umesh Pandey",
    parentPhone: "+91 98765 43239",
    address: "396 Gomti Nagar, Lucknow",
  },
  {
    id: "STU016",
    name: "Pooja Sharma",
    email: "pooja.sharma@email.com",
    phone: "+91 98765 43240",
    course: "RS-CIT",
    batch: "2024-B",
    enrollmentDate: "2024-06-10",
    status: "Active",
    fees: 15000,
    feesPaid: 11000,
    grade: "B",
    attendance: 84,
    parentName: "Dinesh Sharma",
    parentPhone: "+91 98765 43241",
    address: "507 Pink City, Jaipur",
  },
  {
    id: "STU017",
    name: "Harsh Agrawal",
    email: "harsh.agrawal@email.com",
    phone: "+91 98765 43242",
    course: "NIOS",
    batch: "2024-A",
    enrollmentDate: "2024-06-15",
    status: "Active",
    fees: 12000,
    feesPaid: 8000,
    grade: "A-",
    attendance: 88,
    parentName: "Sanjay Agrawal",
    parentPhone: "+91 98765 43243",
    address: "618 Sadar Bazar, Agra",
  },
  {
    id: "STU018",
    name: "Nisha Kapoor",
    email: "nisha.kapoor@email.com",
    phone: "+91 98765 43244",
    course: "CBSE",
    batch: "2024-B",
    enrollmentDate: "2024-07-01",
    status: "Active",
    fees: 18000,
    feesPaid: 15000,
    grade: "A",
    attendance: 92,
    parentName: "Rajiv Kapoor",
    parentPhone: "+91 98765 43245",
    address: "729 Lajpat Nagar, Delhi",
  },
  {
    id: "STU019",
    name: "Abhishek Tiwari",
    email: "abhishek.tiwari@email.com",
    phone: "+91 98765 43246",
    course: "RS-CIT",
    batch: "2024-A",
    enrollmentDate: "2024-07-10",
    status: "Active",
    fees: 15000,
    feesPaid: 7500,
    grade: "B+",
    attendance: 87,
    parentName: "Ghanshyam Tiwari",
    parentPhone: "+91 98765 43247",
    address: "830 Cantonment, Varanasi",
  },
  {
    id: "STU020",
    name: "Tanvi Shah",
    email: "tanvi.shah@email.com",
    phone: "+91 98765 43248",
    course: "NIOS",
    batch: "2024-B",
    enrollmentDate: "2024-07-15",
    status: "Active",
    fees: 12000,
    feesPaid: 12000,
    grade: "A",
    attendance: 90,
    parentName: "Kalpesh Shah",
    parentPhone: "+91 98765 43249",
    address: "941 CG Road, Ahmedabad",
  },
];

// Mock API functions
const mockAPI = {
  getStudents: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...initialStudents]), 500);
    });
  },

  createStudent: (student) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newStudent = {
          ...student,
          id: `STU${String(Date.now()).slice(-3)}`,
          enrollmentDate: new Date().toISOString().split("T")[0],
          grade: "N/A",
          attendance: 0,
        };
        resolve(newStudent);
      }, 300);
    });
  },

  updateStudent: (id, updates) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id, ...updates });
      }, 300);
    });
  },

  deleteStudent: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(id);
      }, 200);
    });
  },
};

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [studentModal, setStudentModal] = useState({
    open: false,
    mode: "create",
    data: null,
  });
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [viewModal, setViewModal] = useState({ open: false, data: null });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "RS-CIT",
    batch: "2024-A",
    status: "Active",
    fees: "",
    feesPaid: "",
    parentName: "",
    parentPhone: "",
    address: "",
  });

  // Load students on component mount
  React.useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await mockAPI.getStudents();
      setStudents(data);
    } catch (error) {
      console.error("Failed to load students:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStudent = async () => {
    setLoading(true);
    try {
      const newStudent = await mockAPI.createStudent(formData);
      setStudents((prev) => [newStudent, ...prev]);
      closeStudentModal();
    } catch (error) {
      console.error("Failed to create student:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStudent = async () => {
    setLoading(true);
    try {
      const updatedStudent = await mockAPI.updateStudent(
        studentModal.data.id,
        formData
      );
      setStudents((prev) =>
        prev.map((s) =>
          s.id === updatedStudent.id
            ? { ...studentModal.data, ...updatedStudent }
            : s
        )
      );
      closeStudentModal();
    } catch (error) {
      console.error("Failed to update student:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async () => {
    setLoading(true);
    try {
      await mockAPI.deleteStudent(deleteModal.id);
      setStudents((prev) => prev.filter((s) => s.id !== deleteModal.id));
      setDeleteModal({ open: false, id: null });
    } catch (error) {
      console.error("Failed to delete student:", error);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      course: "RS-CIT",
      batch: "2024-A",
      status: "Active",
      fees: "",
      feesPaid: "",
      parentName: "",
      parentPhone: "",
      address: "",
    });
    setStudentModal({ open: true, mode: "create", data: null });
  };

  const openEditModal = (student) => {
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      course: student.course,
      batch: student.batch,
      status: student.status,
      fees: student.fees.toString(),
      feesPaid: student.feesPaid.toString(),
      parentName: student.parentName,
      parentPhone: student.parentPhone,
      address: student.address,
    });
    setStudentModal({ open: true, mode: "edit", data: student });
  };

  const closeStudentModal = () => {
    setStudentModal({ open: false, mode: "create", data: null });
    setFormData({
      name: "",
      email: "",
      phone: "",
      course: "RS-CIT",
      batch: "2024-A",
      status: "Active",
      fees: "",
      feesPaid: "",
      parentName: "",
      parentPhone: "",
      address: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (studentModal.mode === "create") {
      await handleCreateStudent();
    } else {
      await handleUpdateStudent();
    }
  };

  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
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

  const getAttendanceColor = (attendance) => {
    if (attendance >= 90) return "text-green-600";
    if (attendance >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getFeeStatus = (fees, feesPaid) => {
    if (feesPaid >= fees) return { text: "Paid", color: "text-green-600" };
    if (feesPaid > 0) return { text: "Partial", color: "text-yellow-600" };
    return { text: "Pending", color: "text-red-600" };
  };

  // Filter students based on search and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse =
      filterCourse === "all" || student.course === filterCourse;
    const matchesStatus =
      filterStatus === "all" || student.status === filterStatus;

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
                <Users className="h-6 w-6 text-primary" />
                Students Management
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage student information and enrollment
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
              Add Student
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
                    Total Students
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    {students.length}
                  </p>
                </div>
                <Users className="h-10 w-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Students
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    {students.filter((s) => s.status === "Active").length}
                  </p>
                </div>
                <GraduationCap className="h-10 w-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Fees Due
                  </p>
                  <p className="text-3xl font-bold text-orange-600">
                    ₹
                    {students
                      .reduce((sum, s) => sum + (s.fees - s.feesPaid), 0)
                      .toLocaleString()}
                  </p>
                </div>
                <BookOpen className="h-10 w-10 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Avg Attendance
                  </p>
                  <p className="text-3xl font-bold text-purple-600">
                    {Math.round(
                      students.reduce((sum, s) => sum + s.attendance, 0) /
                        students.length || 0
                    )}
                    %
                  </p>
                </div>
                <Calendar className="h-10 w-10 text-purple-600" />
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
                  placeholder="Search students by name, ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <div className="flex gap-4 items-center">
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
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students List */}
        <Card className="shadow-lg border border-gray-200 rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Students List ({filteredStudents.length})
            </CardTitle>
            <CardDescription>
              Manage student information and track their progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading && students.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-sm text-muted-foreground">
                    Loading students...
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredStudents.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No students found matching your criteria.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {filteredStudents.map((student) => {
                      const feeStatus = getFeeStatus(
                        student.fees,
                        student.feesPaid
                      );
                      return (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white"
                        >
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
                            {/* Student Basic Info */}
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                {student.name.charAt(0)}
                              </div>
                              <div>
                                <h3 className="font-semibold text-base">
                                  {student.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {student.id}
                                </p>
                              </div>
                            </div>

                            {/* Course & Batch */}
                            <div className="flex flex-col gap-1">
                              <Badge
                                className={`text-xs px-2 py-1 w-fit ${getCourseColor(
                                  student.course
                                )}`}
                              >
                                {student.course}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                Batch: {student.batch}
                              </span>
                            </div>

                            {/* Contact Info */}
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1 text-sm">
                                <Mail className="h-3 w-3 text-gray-400" />
                                <span className="truncate">
                                  {student.email}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Phone className="h-3 w-3 text-gray-400" />
                                <span>{student.phone}</span>
                              </div>
                            </div>

                            {/* Performance */}
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">
                                  Grade:
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {student.grade}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                  Attendance:
                                </span>
                                <span
                                  className={`text-sm font-medium ${getAttendanceColor(
                                    student.attendance
                                  )}`}
                                >
                                  {student.attendance}%
                                </span>
                              </div>
                            </div>

                            {/* Status & Fees */}
                            <div className="flex flex-col gap-1">
                              <Badge
                                className={`text-xs px-2 py-1 w-fit ${getStatusColor(
                                  student.status
                                )}`}
                              >
                                {student.status}
                              </Badge>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                  Fees:
                                </span>
                                <span
                                  className={`text-sm font-medium ${feeStatus.color}`}
                                >
                                  {feeStatus.text}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setViewModal({ open: true, data: student })
                              }
                              disabled={loading}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditModal(student)}
                              disabled={loading}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setDeleteModal({ open: true, id: student.id })
                              }
                              disabled={loading}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create/Edit Student Modal */}
      <Dialog open={studentModal.open} onOpenChange={closeStudentModal}>
        <DialogContent className="max-w-2xl w-full p-6 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              {studentModal.mode === "create"
                ? "Add New Student"
                : "Edit Student"}
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              {studentModal.mode === "create"
                ? "Enter student information to create a new enrollment"
                : "Update student information"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Enter student name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

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
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Batch
                </label>
                <Select
                  value={formData.batch}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, batch: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-A">2024-A</SelectItem>
                    <SelectItem value="2024-B">2024-B</SelectItem>
                    <SelectItem value="2025-A">2025-A</SelectItem>
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
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Fees
                </label>
                <Input
                  type="number"
                  value={formData.fees}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, fees: e.target.value }))
                  }
                  placeholder="15000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fees Paid
                </label>
                <Input
                  type="number"
                  value={formData.feesPaid}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      feesPaid: e.target.value,
                    }))
                  }
                  placeholder="10000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parent/Guardian Name
                </label>
                <Input
                  value={formData.parentName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      parentName: e.target.value,
                    }))
                  }
                  placeholder="Enter parent name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parent Phone
                </label>
                <Input
                  value={formData.parentPhone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      parentPhone: e.target.value,
                    }))
                  }
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <Input
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  placeholder="Enter address"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={closeStudentModal}
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
                    {studentModal.mode === "create"
                      ? "Adding..."
                      : "Updating..."}
                  </div>
                ) : studentModal.mode === "create" ? (
                  "Add Student"
                ) : (
                  "Update Student"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Student Modal */}
      <Dialog
        open={viewModal.open}
        onOpenChange={() => setViewModal({ open: false, data: null })}
      >
        <DialogContent className="max-w-2xl w-full p-6 bg-white rounded-2xl shadow-2xl border border-gray-100">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Student Details
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Complete information about the student
            </DialogDescription>
          </DialogHeader>

          {viewModal.data && (
            <div className="space-y-6 mt-4">
              {/* Basic Info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  {viewModal.data.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {viewModal.data.name}
                  </h3>
                  <p className="text-gray-600">{viewModal.data.id}</p>
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

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">
                    Contact Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{viewModal.data.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{viewModal.data.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        Enrolled:{" "}
                        {new Date(
                          viewModal.data.enrollmentDate
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">
                    Academic Information
                  </h4>
                  <div className="space-y-2">
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
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Grade:</span>
                      <span className="text-sm font-medium">
                        {viewModal.data.grade}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Attendance:</span>
                      <span
                        className={`text-sm font-medium ${getAttendanceColor(
                          viewModal.data.attendance
                        )}`}
                      >
                        {viewModal.data.attendance}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fee Information */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Fee Information
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Total Fees</p>
                    <p className="text-lg font-semibold">
                      ₹{viewModal.data.fees.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Paid</p>
                    <p className="text-lg font-semibold text-green-600">
                      ₹{viewModal.data.feesPaid.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Due</p>
                    <p className="text-lg font-semibold text-red-600">
                      ₹
                      {(
                        viewModal.data.fees - viewModal.data.feesPaid
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Parent Information */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">
                  Parent/Guardian Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{viewModal.data.parentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{viewModal.data.parentPhone}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium">{viewModal.data.address}</p>
                </div>
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
              Delete Student
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Are you sure you want to delete this student? This action cannot
              be undone and will remove all associated data.
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
              onClick={handleDeleteStudent}
              disabled={loading}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Deleting...
                </div>
              ) : (
                "Delete Student"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

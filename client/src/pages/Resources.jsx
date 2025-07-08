import React, { useState } from "react";
import Footer from "../components/Footer.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Download,
  FileText,
  Search,
  Filter,
  Calendar,
  Eye,
} from "lucide-react";
import { Outlet } from "react-router-dom";

const studyMaterials = [
  {
    id: 1,
    title: "RS-CIT Complete Notes",
    description: "Comprehensive notes covering all chapters of RS-CIT syllabus",
    course: "RS-CIT",
    type: "Notes",
    size: "2.5 MB",
    downloads: 1250,
    uploadDate: "2024-01-15",
    fileType: "PDF",
    isPublic: true,
  },
  {
    id: 2,
    title: "MS Office Practical Assignments",
    description:
      "Step-by-step practical assignments for Word, Excel, and PowerPoint",
    course: "RS-CIT",
    type: "Assignment",
    size: "1.8 MB",
    downloads: 890,
    uploadDate: "2024-01-10",
    fileType: "ZIP",
    isPublic: true,
  },
  {
    id: 3,
    title: "NIOS Mathematics Chapter 1-5",
    description:
      "Detailed notes for NIOS Mathematics covering algebra and geometry",
    course: "NIOS",
    type: "Notes",
    size: "3.2 MB",
    downloads: 567,
    uploadDate: "2024-01-08",
    fileType: "PDF",
    isPublic: true,
  },
  {
    id: 4,
    title: "CBSE Physics Formula Sheet",
    description: "Important formulas and concepts for CBSE Class 12 Physics",
    course: "CBSE",
    type: "Reference",
    size: "0.8 MB",
    downloads: 1100,
    uploadDate: "2024-01-05",
    fileType: "PDF",
    isPublic: true,
  },
  {
    id: 5,
    title: "Computer Shortcut Keys Guide",
    description:
      "Essential keyboard shortcuts for Windows and MS Office applications",
    course: "General",
    type: "Reference",
    size: "0.5 MB",
    downloads: 2100,
    uploadDate: "2024-01-03",
    fileType: "PDF",
    isPublic: true,
  },
  {
    id: 6,
    title: "ITI Electrician Trade Theory",
    description: "Complete theory notes for ITI Electrician trade",
    course: "ITI",
    type: "Notes",
    size: "4.1 MB",
    downloads: 345,
    uploadDate: "2024-01-01",
    fileType: "PDF",
    isPublic: false,
  },
];

const courses = [
  "All",
  "RS-CIT",
  "NIOS",
  "CBSE",
  "ITI",
  "University",
  "General",
];
const types = ["All", "Notes", "Assignment", "Reference", "Syllabus"];

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const filteredMaterials = studyMaterials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse =
      selectedCourse === "All" || material.course === selectedCourse;
    const matchesType =
      selectedType === "All" || material.type === selectedType;
    return matchesSearch && matchesCourse && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Study Materials
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Access comprehensive notes, assignments, and study resources for
                all courses
              </p>
            </div>
            {/* MVP PDF Download for Testing */}
            <div className="flex justify-center mt-8">
              <a
                href="/PDF-RSCIT-Paper-PDF-27-April-2025.pdf"
                download
                className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg shadow hover:bg-neutral-900 transition-colors text-base font-semibold gap-2"
              >
                <Download className="h-5 w-5 mr-2" />
                Download RS-CIT Paper (27 April 2025)
              </a>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 border-b">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col gap-4 items-center w-full max-w-2xl mx-auto">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search materials..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Course:</span>
                  <select
                    className="border rounded-md px-3 py-1 text-sm"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    {courses.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Type:</span>
                  <select
                    className="border rounded-md px-3 py-1 text-sm"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Materials Grid */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredMaterials.map((material) => (
                <Card
                  key={material.id}
                  className="flex flex-col h-full shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-200 bg-white rounded-xl"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{material.course}</Badge>
                      <Badge variant="secondary">{material.type}</Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2 leading-tight mb-1">
                      {material.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-sm mb-1">
                      {material.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Size:</span>
                        <span className="font-medium">{material.size}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium">{material.fileType}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Downloads:
                        </span>
                        <span className="font-medium">
                          {material.downloads}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium">
                          {new Date(material.uploadDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t space-y-2">
                      {material.isPublic ? (
                        <>
                          <Button className="w-full bg-black text-white hover:bg-neutral-900 cursor-pointer">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full bg-transparent border-black text-black hover:bg-gray-100 cursor-pointer"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full bg-gray-200 text-gray-500 cursor-not-allowed"
                          disabled
                        >
                          Login Required
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredMaterials.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">
                    No materials found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Popular Downloads */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Most Downloaded</h2>
              <p className="text-muted-foreground">
                Popular study materials among students
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {studyMaterials
                .sort((a, b) => b.downloads - a.downloads)
                .slice(0, 5)
                .map((material, index) => (
                  <Card
                    key={material.id}
                    className="flex flex-col h-full shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-200 bg-white rounded-xl"
                  >
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-base mb-1 line-clamp-1">
                            {material.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              {material.course}
                            </Badge>
                            <span>{material.downloads} downloads</span>
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(
                                material.uploadDate
                              ).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="w-full bg-black text-white hover:bg-neutral-900 cursor-pointer mt-2"
                        onClick={() => window.open("#", "_blank")}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>

        {/* Upload Guidelines */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-secondary/10 via-background to-primary/5">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">
                Study Material Guidelines
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Please follow these guidelines to ensure the best quality and
                accessibility of study materials for all students.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-8 text-center flex flex-col items-center">
                  <FileText className="h-14 w-14 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2 text-lg">
                    Quality Content
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    All materials are reviewed by expert faculty before
                    publication. Ensure your uploads are clear, accurate, and
                    relevant to the syllabus.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-8 text-center flex flex-col items-center">
                  <Download className="h-14 w-14 mx-auto mb-4 text-green-600" />
                  <h3 className="font-semibold mb-2 text-lg">Easy Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Download materials in multiple formats (PDF, DOC, ZIP). Make
                    sure files are not password protected and are easy to open
                    on all devices.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-8 text-center flex flex-col items-center">
                  <Calendar className="h-14 w-14 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2 text-lg">
                    Regular Updates
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Materials are updated regularly to match the current
                    syllabus. Outdated or irrelevant content should be replaced
                    promptly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Outlet />
      <Footer />
    </div>
  );
}

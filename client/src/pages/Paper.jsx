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
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Download, Search, Filter, FileText, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data for question papers
const papers = [
  {
    id: 1,
    title: "RS-CIT 2024 Final Paper",
    course: "RS-CIT",
    year: 2024,
    description: "Final exam paper for RS-CIT course, 2024 session.",
    uploadDate: "2024-03-10",
    fileType: "PDF",
    size: "1.5 MB",
    downloaded: false,
  },
  {
    id: 2,
    title: "NIOS Mathematics 2023 Paper",
    course: "NIOS",
    year: 2023,
    description: "Mathematics question paper for NIOS, 2023.",
    uploadDate: "2023-12-15",
    fileType: "PDF",
    size: "1.2 MB",
    downloaded: true,
  },
  {
    id: 3,
    title: "CBSE Physics Mock Paper",
    course: "CBSE",
    year: 2024,
    description: "Mock test paper for CBSE Class 12 Physics.",
    uploadDate: "2024-02-20",
    fileType: "PDF",
    size: "1.8 MB",
    downloaded: false,
  },
];

const courses = ["All", "RS-CIT", "NIOS", "CBSE"];

export default function PaperPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");

  const filteredPapers = papers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse =
      selectedCourse === "All" || paper.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Question Papers
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Download and practice with previous year and mock question
                papers
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 border-b">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search papers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Course:</span>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="border rounded-md px-3 py-1 text-sm"
                  >
                    {courses.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Papers List */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            {filteredPapers.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No papers found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPapers.map((paper) => (
                  <Card key={paper.id} className="flex flex-col h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{paper.course}</Badge>
                        <Badge variant="secondary">{paper.year}</Badge>
                      </div>
                      <CardTitle className="text-lg">{paper.title}</CardTitle>
                      <CardDescription>{paper.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(paper.uploadDate).toLocaleDateString()}
                        </div>
                        <span>{paper.size}</span>
                        <span>{paper.fileType}</span>
                        {paper.downloaded && (
                          <Badge variant="secondary" className="text-xs">
                            Downloaded
                          </Badge>
                        )}
                      </div>
                      <div className="pt-4 border-t flex gap-2">
                        <Button className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 bg-transparent"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

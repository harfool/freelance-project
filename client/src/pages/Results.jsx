"use client";

import React from "react";
import { useState } from "react";
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
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Search, Download, Eye, Calendar, Award } from "lucide-react";
import { useToast } from "../hooks/use-toast";

// Mock results data
const mockResults = [
  {
    id: "RES001",
    studentName: "John Doe",
    rollNumber: "STU001",
    course: "RS-CIT",
    examTitle: "RS-CIT Final Examination",
    examDate: "2024-01-15",
    score: 85,
    totalMarks: 100,
    percentage: 85,
    grade: "A",
    status: "Pass",
    resultFile: "/results/res001.pdf",
  },
  {
    id: "RES002",
    studentName: "Jane Smith",
    rollNumber: "STU002",
    course: "NIOS",
    examTitle: "NIOS Mathematics",
    examDate: "2024-01-10",
    score: 78,
    totalMarks: 100,
    percentage: 78,
    grade: "B+",
    status: "Pass",
    resultFile: "/results/res002.pdf",
  },
  {
    id: "RES003",
    studentName: "Mike Johnson",
    rollNumber: "STU003",
    course: "CBSE",
    examTitle: "CBSE Physics Mock Test",
    examDate: "2024-01-08",
    score: 92,
    totalMarks: 100,
    percentage: 92,
    grade: "A+",
    status: "Pass",
    resultFile: "/results/res003.pdf",
  },
];

export default function ResultsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);

    // Simulate search delay
    setTimeout(() => {
      const result = mockResults.find(
        (r) =>
          r.rollNumber.toLowerCase() === searchTerm.toLowerCase() ||
          r.studentName.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (result) {
        setSearchResult(result);
        toast({
          title: "Result Found!",
          description: `Found result for ${result.studentName}`,
        });
      } else {
        setSearchResult(null);
        toast({
          title: "No Result Found",
          description: "Please check your roll number and try again.",
          variant: "destructive",
        });
      }
      setIsSearching(false);
    }, 1500);
  };

  const handleDownload = (resultFile) => {
    toast({
      title: "Download Started",
      description: "Your result PDF is being downloaded.",
    });
    // In real app, this would trigger actual file download
    // For demonstration, open the PDF in a new tab if resultFile is provided
    if (resultFile) {
      window.open(resultFile, "_blank");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Results
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Search and view your examination results and certificates
              </p>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
              <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-center text-2xl font-bold">
                    Search Your Result
                  </CardTitle>
                  <CardDescription className="text-center">
                    Enter your roll number or name to find your examination
                    results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="search">
                        Roll Number or Student Name
                      </Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="search"
                          placeholder="Enter roll number (e.g., STU001) or student name"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-black text-white hover:bg-neutral-900 cursor-pointer"
                      disabled={isSearching}
                    >
                      {isSearching ? "Searching..." : "Search Result"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Search Result */}
        {searchResult && (
          <section className="py-8">
            <div className="container px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-bold">
                          Examination Result
                        </CardTitle>
                        <CardDescription>
                          Result details for {searchResult.studentName}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={
                          searchResult.status === "Pass"
                            ? "default"
                            : "destructive"
                        }
                        className="text-lg px-4 py-2"
                      >
                        {searchResult.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Student Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">
                          Student Information
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Student Name:
                            </span>
                            <span className="font-medium">
                              {searchResult.studentName}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Roll Number:
                            </span>
                            <span className="font-medium">
                              {searchResult.rollNumber}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Course:
                            </span>
                            <Badge variant="outline">
                              {searchResult.course}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">
                          Examination Details
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Exam Title:
                            </span>
                            <span className="font-medium">
                              {searchResult.examTitle}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Exam Date:
                            </span>
                            <span className="font-medium">
                              {new Date(
                                searchResult.examDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Result ID:
                            </span>
                            <span className="font-medium">
                              {searchResult.id}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Score Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">
                        Score Details
                      </h3>
                      <div className="grid md:grid-cols-4 gap-4">
                        <Card className="shadow border-0 bg-white/90">
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-primary">
                              {searchResult.score}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Marks Obtained
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="shadow border-0 bg-white/90">
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold">
                              {searchResult.totalMarks}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Total Marks
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="shadow border-0 bg-white/90">
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-green-600">
                              {searchResult.percentage}%
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Percentage
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="shadow border-0 bg-white/90">
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-blue-600">
                              {searchResult.grade}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Grade
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-4 border-t">
                      <Button
                        onClick={() => handleDownload(searchResult.resultFile)}
                        className="flex-1 bg-black text-white hover:bg-neutral-900 cursor-pointer"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Result PDF
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent border-black text-black hover:bg-gray-100 cursor-pointer"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Detailed Analysis
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Recent Results */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Recent Results</h2>
              <p className="text-muted-foreground">
                Latest examination results published
              </p>
            </div>

            <div className="grid gap-6 max-w-4xl mx-auto">
              {mockResults.slice(0, 3).map((result) => (
                <Card
                  key={result.id}
                  className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{result.examTitle}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(result.examDate).toLocaleDateString()}
                            </span>
                          </div>
                          <Badge variant="outline">{result.course}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          {result.percentage}%
                        </div>
                        <Badge
                          variant={
                            result.status === "Pass" ? "default" : "destructive"
                          }
                        >
                          {result.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Result Statistics */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Result Statistics</h2>
              <p className="text-muted-foreground">
                Overall performance statistics
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <div className="text-2xl font-bold mb-2">95%</div>
                  <div className="text-sm text-muted-foreground">Pass Rate</div>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold mb-2 text-green-600">
                    82%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Average Score
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold mb-2 text-blue-600">
                    1,250
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Students
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold mb-2 text-purple-600">
                    45
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Exams Conducted
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

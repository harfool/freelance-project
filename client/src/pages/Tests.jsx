"use client";

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
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Clock, Users, FileText, Play, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import DemoTest from "./DemoTest";

const tests = [
  {
    id: 1,
    title: "RS-CIT Basic Computer Test",
    course: "RS-CIT",
    description:
      "Test your knowledge of basic computer operations and MS Office applications",
    duration: 60,
    questions: 50,
    attempts: 245,
    difficulty: "Beginner",
    isDemo: true,
    topics: ["Computer Basics", "MS Word", "MS Excel", "Internet"],
  },
  {
    id: 2,
    title: "NIOS Mathematics Chapter 1-5",
    course: "NIOS",
    description:
      "Comprehensive test covering algebra, geometry, and basic mathematics concepts",
    duration: 90,
    questions: 40,
    attempts: 156,
    difficulty: "Intermediate",
    isDemo: false,
    topics: ["Algebra", "Geometry", "Statistics", "Trigonometry"],
  },
  {
    id: 3,
    title: "CBSE Physics Mock Test",
    course: "CBSE",
    description:
      "Practice test for CBSE Class 12 Physics covering mechanics and thermodynamics",
    duration: 120,
    questions: 35,
    attempts: 189,
    difficulty: "Advanced",
    isDemo: true,
    topics: ["Mechanics", "Thermodynamics", "Optics", "Modern Physics"],
  },
  {
    id: 4,
    title: "ITI Electrician Trade Test",
    course: "ITI",
    description:
      "Technical knowledge test for electrician trade covering electrical basics",
    duration: 75,
    questions: 45,
    attempts: 98,
    difficulty: "Intermediate",
    isDemo: false,
    topics: ["Electrical Basics", "Wiring", "Safety", "Tools & Equipment"],
  },
  {
    id: 5,
    title: "University Entrance Mock Test",
    course: "University",
    description:
      "General aptitude and subject-specific questions for university entrance preparation",
    duration: 180,
    questions: 100,
    attempts: 234,
    difficulty: "Advanced",
    isDemo: true,
    topics: ["General Aptitude", "English", "Mathematics", "Reasoning"],
  },
  {
    id: 6,
    title: "SSC General Knowledge Test",
    course: "Competitive",
    description:
      "Current affairs and general knowledge test for SSC exam preparation",
    duration: 60,
    questions: 50,
    attempts: 312,
    difficulty: "Intermediate",
    isDemo: false,
    topics: ["Current Affairs", "History", "Geography", "Science"],
  },
];

const courses = [
  "All",
  "RS-CIT",
  "NIOS",
  "CBSE",
  "ITI",
  "University",
  "Competitive",
];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

export default function TestsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [showDemo, setShowDemo] = useState(false);

  const filteredTests = tests.filter((test) => {
    const matchesSearch =
      test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse =
      selectedCourse === "All" || test.course === selectedCourse;
    const matchesDifficulty =
      selectedDifficulty === "All" || test.difficulty === selectedDifficulty;

    return matchesSearch && matchesCourse && matchesDifficulty;
  });

  if (showDemo) {
    return <DemoTest />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Online Tests
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Practice with our comprehensive online tests and assess your
                knowledge
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 border-b">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col gap-4 items-center w-full max-w-2xl mx-auto">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-between">
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
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Level:</span>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="border rounded-md px-3 py-1 text-sm"
                  >
                    {difficulties.map((difficulty) => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tests Grid */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            {filteredTests.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No tests found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria
                </p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredTests.map((test) => (
                  <Card
                    key={test.id}
                    className="flex flex-col h-full shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-200 bg-white rounded-xl"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{test.course}</Badge>
                        <div className="flex gap-2">
                          <Badge
                            variant={
                              test.difficulty === "Beginner"
                                ? "secondary"
                                : test.difficulty === "Intermediate"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {test.difficulty}
                          </Badge>
                          {test.isDemo && (
                            <Badge variant="secondary">Demo</Badge>
                          )}
                        </div>
                      </div>
                      <CardTitle className="text-lg line-clamp-2 leading-tight mb-1">
                        {test.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-sm mb-1">
                        {test.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1 space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {test.duration}m
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {test.questions}Q
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {test.attempts}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">
                          Topics Covered:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {test.topics.map((topic, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t space-y-2">
                        {test.isDemo ? (
                          <Button
                            className="w-full bg-black text-white hover:bg-neutral-900 cursor-pointer"
                            onClick={() => setShowDemo(true)}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Start Demo Test
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            className="w-full bg-gray-200 text-gray-500 cursor-not-allowed"
                            asChild
                            disabled
                          >
                            <Link href="/login">Login to Take Test</Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Test Instructions */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Test Instructions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Please read the following instructions carefully before starting
                any test
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-8 text-center flex flex-col items-center">
                  <h3 className="font-semibold mb-3 text-lg">
                    Before Starting
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground text-left">
                    <li>• Ensure stable internet connection</li>
                    <li>• Use a desktop or laptop for better experience</li>
                    <li>• Keep your login credentials ready</li>
                    <li>• Find a quiet place to concentrate</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-8 text-center flex flex-col items-center">
                  <h3 className="font-semibold mb-3 text-lg">
                    During the Test
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground text-left">
                    <li>• Read each question carefully</li>
                    <li>• You can navigate between questions</li>
                    <li>• Mark questions for review if needed</li>
                    <li>• Keep track of remaining time</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-8 text-center flex flex-col items-center">
                  <h3 className="font-semibold mb-3 text-lg">
                    After Completion
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground text-left">
                    <li>• Review your answers before submitting</li>
                    <li>• Results will be available immediately</li>
                    <li>• Download your score report</li>
                    <li>• Check detailed analysis in dashboard</li>
                  </ul>
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

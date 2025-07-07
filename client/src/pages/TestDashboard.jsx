"use client";

import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  Clock,
  FileText,
  Play,
  CheckCircle,
  AlertCircle,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";

const availableTests = [
  {
    id: 1,
    title: "RS-CIT Chapter 1 Test",
    description: "Basic computer concepts and terminology",
    duration: 30,
    questions: 25,
    totalMarks: 25,
    status: "available",
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "MS Word Practical Test",
    description: "Document creation and formatting",
    duration: 45,
    questions: 20,
    totalMarks: 40,
    status: "available",
    difficulty: "Medium",
  },
  {
    id: 3,
    title: "Excel Functions Test",
    description: "Formulas and data analysis",
    duration: 60,
    questions: 30,
    totalMarks: 50,
    status: "locked",
    difficulty: "Hard",
  },
];

const completedTests = [
  {
    id: 1,
    title: "Computer Basics Quiz",
    completedDate: "2024-01-15",
    score: 18,
    totalMarks: 20,
    percentage: 90,
    grade: "A",
    timeTaken: 25,
  },
  {
    id: 2,
    title: "Windows Operating System",
    completedDate: "2024-01-12",
    score: 16,
    totalMarks: 25,
    percentage: 64,
    grade: "B",
    timeTaken: 30,
  },
];

export default function StudentTestsPage() {
  const [activeTab, setActiveTab] = useState("available");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/40">
        <div className="container flex h-16 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Online Tests</h1>
            <p className="text-sm text-muted-foreground">
              Practice tests and assessments
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>

      <div className="container py-6">
        {/* Stats Overview */}
        <div className="grid gap-8 md:grid-cols-4 mb-6">
          <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200 rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Available Tests
                  </p>
                  <p className="text-2xl font-bold">
                    {
                      availableTests.filter((t) => t.status === "available")
                        .length
                    }
                  </p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200 rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Completed
                  </p>
                  <p className="text-2xl font-bold">{completedTests.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200 rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Average Score
                  </p>
                  <p className="text-2xl font-bold">
                    {Math.round(
                      completedTests.reduce(
                        (acc, test) => acc + test.percentage,
                        0
                      ) / completedTests.length
                    )}
                    %
                  </p>
                </div>
                <Trophy className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200 rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Best Score
                  </p>
                  <p className="text-2xl font-bold">
                    {Math.max(...completedTests.map((test) => test.percentage))}
                    %
                  </p>
                </div>
                <Trophy className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg w-fit shadow">
          <button
            onClick={() => setActiveTab("available")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "available"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Available Tests
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "completed"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Completed Tests
          </button>
        </div>

        {/* Available Tests */}
        {activeTab === "available" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Available Tests</h2>
            {availableTests.map((test) => (
              <Card
                key={test.id}
                className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">{test.title}</h3>
                        <Badge
                          variant={
                            test.difficulty === "Easy"
                              ? "secondary"
                              : test.difficulty === "Medium"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {test.difficulty}
                        </Badge>
                        {test.status === "locked" && (
                          <Badge variant="outline">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Locked
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-3">
                        {test.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {test.duration} minutes
                        </div>
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          {test.questions} questions
                        </div>
                        <span>Total: {test.totalMarks} marks</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {test.status === "available" ? (
                        <Button className="bg-black text-white hover:bg-neutral-900 cursor-pointer">
                          <Play className="h-4 w-4 mr-2" />
                          Start Test
                        </Button>
                      ) : (
                        <Button
                          disabled
                          variant="outline"
                          className="bg-gray-200 text-gray-500 cursor-not-allowed"
                        >
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Locked
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Completed Tests */}
        {activeTab === "completed" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Completed Tests</h2>
            {completedTests.map((test) => (
              <Card
                key={test.id}
                className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">{test.title}</h3>
                        <Badge
                          variant={
                            test.grade === "A"
                              ? "default"
                              : test.grade === "B"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          Grade {test.grade}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Score</p>
                          <p className="font-semibold">
                            {test.score}/{test.totalMarks}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Percentage
                          </p>
                          <p className="font-semibold">{test.percentage}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Time Taken
                          </p>
                          <p className="font-semibold">{test.timeTaken} min</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p className="font-semibold">
                            {new Date(test.completedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Performance</span>
                          <span>{test.percentage}%</span>
                        </div>
                        <Progress value={test.percentage} className="h-2" />
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-black text-black hover:bg-gray-100 cursor-pointer"
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-black text-black hover:bg-gray-100 cursor-pointer"
                      >
                        Retake
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

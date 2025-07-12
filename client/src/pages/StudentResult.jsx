import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Calendar, FileText, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const studentResults = [
  {
    id: 1,
    test: "RS-CIT Final Exam",
    date: "2025-04-27",
    score: 92,
    total: 100,
    status: "Passed",
    remarks: "Excellent performance!",
    certificate: true,
  },
  {
    id: 2,
    test: "MS Office Practical",
    date: "2025-03-15",
    score: 85,
    total: 100,
    status: "Passed",
    remarks: "Good practical skills.",
    certificate: false,
  },
  {
    id: 3,
    test: "Internet Basics Quiz",
    date: "2025-02-10",
    score: 78,
    total: 100,
    status: "Passed",
    remarks: "Satisfactory.",
    certificate: false,
  },
  {
    id: 4,
    test: "Chapter 5 Test",
    date: "2025-01-20",
    score: 65,
    total: 100,
    status: "Passed",
    remarks: "Needs improvement in theory.",
    certificate: false,
  },
  {
    id: 5,
    test: "Demo Test",
    date: "2025-01-10",
    score: 55,
    total: 100,
    status: "Failed",
    remarks: "Retake recommended.",
    certificate: false,
  },
];

export default function StudentResultPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-muted/40">
        <div className="container max-w-4xl mx-auto px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between h-auto sm:h-16 py-4 sm:py-0 gap-2 sm:gap-0">
          <div>
            <h1 className="text-2xl font-bold">My Results</h1>
            <p className="text-sm text-muted-foreground">View your test scores, status, and certificates</p>
          </div>
          <Button asChild className="w-full sm:w-auto mt-2 sm:mt-0">
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>

      <div className="container py-8 max-w-4xl mx-auto px-4">
        <div className="grid gap-6 grid-cols-1">
          {studentResults.map((result) => (
            <Card key={result.id} className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
              <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    {result.test}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {new Date(result.date).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex flex-col md:items-end gap-2">
                  <Badge variant={result.status === "Passed" ? "secondary" : "destructive"}>{result.status}</Badge>
                  {result.certificate && (
                    <Badge variant="default" className="flex items-center gap-1">
                      <Award className="h-4 w-4" /> Certificate
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-green-700">{result.score}</span>
                    <span className="text-xs text-muted-foreground">Score</span>
                  </div>
                  <span className="text-lg font-semibold">/</span>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold">{result.total}</span>
                    <span className="text-xs text-muted-foreground">Total</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-1">Remarks:</p>
                  <p className="text-base font-medium">{result.remarks}</p>
                </div>
                <div className="flex flex-col gap-2 min-w-[120px] md:items-end">
                  <Button
                    size="sm"
                    className="flex items-center bg-black text-white hover:bg-neutral-900 w-full md:w-auto cursor-pointer"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analysis
                  </Button>
                  {result.certificate && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center w-full md:w-auto cursor-pointer"
                    >
                      <Award className="h-4 w-4 mr-2" />
                      Download Certificate
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

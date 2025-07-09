"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Download, Eye, Calendar, Award, Share, Printer } from "lucide-react";
import { Link } from "react-router-dom";

const certificates = [
  {
    id: 1,
    title: "RS-CIT Course Completion Certificate",
    course: "RS-CIT",
    issueDate: "2024-01-20",
    certificateNumber: "RSCIT/2024/001",
    status: "Issued",
    grade: "A",
    percentage: 85,
    validUntil: "Lifetime",
    downloadUrl: "/certificates/rscit-001.pdf",
    verificationUrl: "https://verify.SBC.com/RSCIT2024001",
  },
  {
    id: 2,
    title: "Computer Basics Proficiency Certificate",
    course: "RS-CIT",
    issueDate: "2024-01-15",
    certificateNumber: "CB/2024/001",
    status: "Issued",
    grade: "B+",
    percentage: 78,
    validUntil: "Lifetime",
    downloadUrl: "/certificates/cb-001.pdf",
    verificationUrl: "https://verify.SBC.com/CB2024001",
  },
];

const achievements = [
  {
    id: 1,
    title: "Perfect Attendance",
    description: "100% attendance for the entire course duration",
    icon: "🏆",
    earnedDate: "2024-01-20",
  },
  {
    id: 2,
    title: "Quick Learner",
    description: "Completed course 2 weeks ahead of schedule",
    icon: "⚡",
    earnedDate: "2024-01-18",
  },
  {
    id: 3,
    title: "Top Performer",
    description: "Scored in top 10% of the batch",
    icon: "🌟",
    earnedDate: "2024-01-15",
  },
];

export default function StudentCertificatesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/40">
        <div className="container max-w-6xl mx-auto px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between h-auto sm:h-16 py-4 sm:py-0 gap-2 sm:gap-0">
          <div>
            <h1 className="text-2xl font-bold">Certificates & Achievements</h1>
            <p className="text-sm text-muted-foreground">
              Your earned certificates and achievements
            </p>
          </div>
          <Button asChild className="w-full sm:w-auto mt-2 sm:mt-0">
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>

      <div className="container py-8 max-w-6xl mx-auto px-4">
        {/* Stats Overview */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-8">
          <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Certificates
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {certificates.length}
                  </p>
                </div>
                <Award className="h-10 w-10 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Achievements
                  </p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {achievements.length}
                  </p>
                </div>
                <Award className="h-10 w-10 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Average Grade
                  </p>
                  <p className="text-3xl font-bold text-green-600">A-</p>
                </div>
                <Award className="h-10 w-10 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certificates Section */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">My Certificates</h2>

          <div className="grid gap-6 grid-cols-1">
            {certificates.map((certificate) => (
              <Card
                key={certificate.id}
                className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200"
              >
                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Award className="h-6 w-6 text-primary" />
                      {certificate.title}
                    </CardTitle>
                    <CardDescription className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        Issued:{" "}
                        {new Date(certificate.issueDate).toLocaleDateString()}
                      </span>
                      <Badge variant="outline" className="text-xs px-2 py-1">
                        {certificate.course}
                      </Badge>
                    </CardDescription>
                  </div>
                  <div className="flex flex-col md:items-end gap-2">
                    <Badge variant="default" className="text-sm px-3 py-1">
                      {certificate.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">
                        Certificate Details
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-muted-foreground font-medium">
                            Certificate Number:
                          </span>
                          <span className="font-semibold">
                            {certificate.certificateNumber}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-muted-foreground font-medium">
                            Grade Achieved:
                          </span>
                          <Badge
                            variant="secondary"
                            className="text-sm px-3 py-1"
                          >
                            {certificate.grade}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-muted-foreground font-medium">
                            Percentage:
                          </span>
                          <span className="font-semibold text-green-700">
                            {certificate.percentage}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-muted-foreground font-medium">
                            Valid Until:
                          </span>
                          <span className="font-semibold">
                            {certificate.validUntil}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Verification</h4>
                      <div className="p-4 bg-muted/30 rounded-lg border">
                        <p className="text-sm text-muted-foreground mb-2 font-medium">
                          Verification URL:
                        </p>
                        <a
                          href={certificate.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono bg-background p-3 rounded border break-all block hover:underline text-primary transition-colors"
                        >
                          {certificate.verificationUrl}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t">
                    <a
                      href={certificate.downloadUrl}
                      download
                      className="inline-flex"
                    >
                      <Button className="flex items-center bg-black text-white hover:bg-neutral-900 w-full sm:w-auto cursor-pointer">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </a>
                    <a
                      href={certificate.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto cursor-pointer"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </a>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          certificate.verificationUrl
                        );
                        alert("Verification URL copied to clipboard!");
                      }}
                    >
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto cursor-pointer"
                      onClick={() => window.print()}
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Achievements & Badges</h2>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-4">{achievement.icon}</div>
                  <h3 className="font-semibold text-xl mb-3 text-primary">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {achievement.description}
                  </p>
                  <div className="flex items-center justify-center text-xs text-muted-foreground bg-muted/30 rounded-lg py-2 px-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    Earned:{" "}
                    {new Date(achievement.earnedDate).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certificate Verification Info */}
        <Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-xl">Certificate Verification</CardTitle>
            <CardDescription>How to verify your certificates</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    For Employers
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Employers can verify the authenticity of certificates using
                    the verification URL provided with each certificate.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-600" />
                    Digital Security
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    All certificates are digitally signed and secured with
                    blockchain technology for tamper-proof verification.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto cursor-pointer"
                  asChild
                >
                  <Link to="/contact">Need Help with Verification?</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

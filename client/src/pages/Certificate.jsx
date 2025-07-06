"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Download, Eye, Calendar, Award, Share, Printer } from "lucide-react"
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
    verificationUrl: "https://verify.eduinstitute.com/RSCIT2024001",
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
    verificationUrl: "https://verify.eduinstitute.com/CB2024001",
  },
]

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
]

export default function StudentCertificatesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/40">
        <div className="container flex h-16 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Certificates & Achievements</h1>
            <p className="text-sm text-muted-foreground">Your earned certificates and achievements</p>
          </div>
          <Button asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>

      <div className="container py-6">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Certificates</p>
                  <p className="text-2xl font-bold">{certificates.length}</p>
                </div>
                <Award className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Achievements</p>
                  <p className="text-2xl font-bold">{achievements.length}</p>
                </div>
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Grade</p>
                  <p className="text-2xl font-bold">A-</p>
                </div>
                <Award className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certificates Section */}
        <div className="space-y-6 mb-8">
          <h2 className="text-xl font-semibold">My Certificates</h2>

          {certificates.map((certificate) => (
            <Card key={certificate.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{certificate.title}</CardTitle>
                    <CardDescription className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Issued: {new Date(certificate.issueDate).toLocaleDateString()}
                      </div>
                      <Badge variant="outline">{certificate.course}</Badge>
                    </CardDescription>
                  </div>
                  <Badge variant="default" className="text-lg px-4 py-2">
                    {certificate.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Certificate Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Certificate Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Certificate Number:</span>
                        <span className="font-medium">{certificate.certificateNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Grade Achieved:</span>
                        <Badge variant="secondary">{certificate.grade}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Percentage:</span>
                        <span className="font-medium">{certificate.percentage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Valid Until:</span>
                        <span className="font-medium">{certificate.validUntil}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Verification</h4>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Verification URL:</p>
                      <p className="text-xs font-mono bg-background p-2 rounded border break-all">
                        {certificate.verificationUrl}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Achievements & Badges</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                  <div className="flex items-center justify-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    Earned: {new Date(achievement.earnedDate).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certificate Verification Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Certificate Verification</CardTitle>
            <CardDescription>How to verify your certificates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">For Employers</h4>
                  <p className="text-sm text-muted-foreground">
                    Employers can verify the authenticity of certificates using the verification URL provided with each
                    certificate.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Digital Security</h4>
                  <p className="text-sm text-muted-foreground">
                    All certificates are digitally signed and secured with blockchain technology for tamper-proof
                    verification.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <Button variant="outline" className="bg-transparent" asChild>
                  <Link href="/contact">Need Help with Verification?</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

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
import {
  Calendar,
  FileText,
  Users,
  Award,
  CheckCircle,
  AlertCircle,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";

const scholarships = [
  {
    id: 1,
    title: "Merit-Based Scholarship 2024",
    description:
      "Scholarship for students with outstanding academic performance",
    amount: "₹25,000",
    eligibility: [
      "Minimum 85% in previous examination",
      "Family income below ₹3 lakhs",
      "Regular attendance",
    ],
    deadline: "2024-02-15",
    documents: [
      "Academic transcripts",
      "Income certificate",
      "Aadhar card",
      "Bank details",
    ],
    applicationProcess: "Online application through student portal",
    status: "Open",
    category: "Academic Excellence",
  },
  {
    id: 2,
    title: "Need-Based Financial Aid",
    description: "Financial assistance for economically disadvantaged students",
    amount: "₹15,000",
    eligibility: [
      "Family income below ₹2 lakhs",
      "Enrolled in any course",
      "Good academic standing",
    ],
    deadline: "2024-03-01",
    documents: [
      "Income certificate",
      "BPL card (if applicable)",
      "Academic records",
      "Bank details",
    ],
    applicationProcess:
      "Submit application with required documents to admin office",
    status: "Open",
    category: "Financial Aid",
  },
  {
    id: 3,
    title: "Women Empowerment Scholarship",
    description:
      "Special scholarship to encourage women in technical education",
    amount: "₹20,000",
    eligibility: [
      "Female students only",
      "Enrolled in technical courses",
      "Minimum 75% attendance",
    ],
    deadline: "2024-02-28",
    documents: [
      "Academic records",
      "Gender certificate",
      "Course enrollment proof",
      "Bank details",
    ],
    applicationProcess: "Online application with document verification",
    status: "Open",
    category: "Women Empowerment",
  },
  {
    id: 4,
    title: "SC/ST Scholarship Program",
    description: "Government scholarship for SC/ST category students",
    amount: "₹30,000",
    eligibility: [
      "SC/ST category certificate",
      "Enrolled in recognized courses",
      "Family income below ₹2.5 lakhs",
    ],
    deadline: "2024-01-31",
    documents: [
      "Caste certificate",
      "Income certificate",
      "Academic records",
      "Aadhar card",
    ],
    applicationProcess: "Government portal application with document upload",
    status: "Closing Soon",
    category: "Government Scheme",
  },
  {
    id: 5,
    title: "Rural Area Student Support",
    description: "Special support for students from rural backgrounds",
    amount: "₹12,000",
    eligibility: [
      "Rural area residence proof",
      "Any course enrollment",
      "Regular attendance",
    ],
    deadline: "2024-03-15",
    documents: [
      "Residence proof",
      "Academic records",
      "Income certificate",
      "Bank details",
    ],
    applicationProcess: "Submit application at nearest center",
    status: "Open",
    category: "Rural Development",
  },
];

const applicationSteps = [
  {
    step: 1,
    title: "Check Eligibility",
    description:
      "Review the eligibility criteria for your desired scholarship program",
  },
  {
    step: 2,
    title: "Gather Documents",
    description:
      "Collect all required documents as per the scholarship requirements",
  },
  {
    step: 3,
    title: "Submit Application",
    description:
      "Complete the application form and submit with required documents",
  },
  {
    step: 4,
    title: "Wait for Review",
    description:
      "Your application will be reviewed by the scholarship committee",
  },
  {
    step: 5,
    title: "Receive Decision",
    description:
      "You will be notified about the scholarship decision via email/SMS",
  },
];

export default function ScholarshipPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Scholarship Programs
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Financial assistance and scholarships to support your
                educational journey
              </p>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <div className="text-2xl font-bold mb-2">₹1.2 Cr</div>
                  <div className="text-sm text-muted-foreground">
                    Total Scholarships Awarded
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <div className="text-2xl font-bold mb-2">850+</div>
                  <div className="text-sm text-muted-foreground">
                    Students Benefited
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-6 text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <div className="text-2xl font-bold mb-2">15</div>
                  <div className="text-sm text-muted-foreground">
                    Active Programs
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                  <div className="text-2xl font-bold mb-2">5</div>
                  <div className="text-sm text-muted-foreground">
                    Applications Open
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Available Scholarships */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Available Scholarships
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our various scholarship programs designed to support
                students from different backgrounds
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {scholarships.map((scholarship) => (
                <Card
                  key={scholarship.id}
                  className="h-full shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200 p-0"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{scholarship.category}</Badge>
                      <Badge
                        variant={
                          scholarship.status === "Open"
                            ? "default"
                            : scholarship.status === "Closing Soon"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {scholarship.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-base font-semibold line-clamp-2 leading-tight mb-1">
                      {scholarship.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-xs mb-1">
                      {scholarship.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    <div className="flex items-center justify-between bg-primary/5 rounded-lg px-3 py-2">
                      <span className="text-xs font-medium">Amount</span>
                      <span className="text-lg font-bold text-primary">
                        {scholarship.amount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                      <span>Deadline:</span>
                      <span className="font-medium">
                        {new Date(scholarship.deadline).toLocaleDateString()}
                      </span>
                    </div>
                    <Button
                      className="w-full bg-black text-white hover:bg-neutral-900 cursor-pointer mt-2 py-2 text-sm"
                      asChild
                    >
                      <Link to="/login">Apply Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How to Apply</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Follow these simple steps to apply for any scholarship program
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {applicationSteps.map((step, index) => (
                  <div
                    key={step.step}
                    className="flex items-start space-x-4 relative"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                    {index < applicationSteps.length - 1 && (
                      <div className="absolute left-6 mt-12 w-0.5 h-8 bg-border"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Important Information */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Important Information</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-amber-600" />
                    Terms & Conditions
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Scholarships are awarded based on merit and need</li>
                    <li>• False information may lead to disqualification</li>
                    <li>
                      • Scholarship amount will be credited directly to student
                      account
                    </li>
                    <li>
                      • Recipients must maintain minimum academic standards
                    </li>
                    <li>• Scholarship committee's decision is final</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
                    Required Documents
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• All documents must be self-attested</li>
                    <li>• Original documents for verification</li>
                    <li>• Income certificate not older than 6 months</li>
                    <li>• Academic transcripts from recognized boards</li>
                    <li>• Bank account details for scholarship transfer</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-black text-black hover:bg-gray-100 cursor-pointer"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Application Form
              </Button>
            </div>
          </div>
        </section>

        {/* Contact for Help */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <Card className="max-w-2xl mx-auto text-center shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">
                  Need Help with Your Application?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Our scholarship counselors are here to help you with the
                  application process
                </p>
                <div className="space-y-2 mb-6">
                  <p className="text-sm">
                    <strong>Phone:</strong> +91 98765 43210
                  </p>
                  <p className="text-sm">
                    <strong>Email:</strong> scholarships@SBC.com
                  </p>
                  <p className="text-sm">
                    <strong>Office Hours:</strong> Mon-Fri, 9:00 AM - 5:00 PM
                  </p>
                </div>
                <Button
                  className="bg-black text-white hover:bg-neutral-900 cursor-pointer"
                  asChild
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

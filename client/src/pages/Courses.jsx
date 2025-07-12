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
import { Clock, Users, BookOpen, Star, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const courses = [
  {
    id: "rs-cit",
    title: "RS-CIT",
    fullName: "Rajasthan State Certificate Course in Information Technology",
    description:
      "Comprehensive computer literacy program covering basic computer operations, MS Office, and internet usage.",
    duration: "3 Months",
    students: "500+",
    modules: "12",
    level: "Beginner",
    rating: 4.8,
    price: "₹3,500",
    features: [
      "Basic Computer Operations",
      "MS Office Suite (Word, Excel, PowerPoint)",
      "Internet & Email Usage",
      "Digital India Services",
      "Certificate from Rajasthan Government",
    ],
    href: "/courses/rs-cit",
  },
  {
    id: "nios",
    title: "NIOS",
    fullName: "National Institute of Open Schooling",
    description:
      "Flexible schooling system for 10th and 12th standard with multiple subject options.",
    duration: "1-2 Years",
    students: "300+",
    modules: "Subject-wise",
    level: "Intermediate",
    rating: 4.7,
    price: "₹8,000",
    features: [
      "10th & 12th Standard",
      "Flexible Study Schedule",
      "Multiple Subject Options",
      "Recognized by CBSE & UGC",
      "On-Demand Examination",
    ],
    href: "/courses/nios",
  },
  {
    id: "cbse",
    title: "CBSE",
    fullName: "Central Board of Secondary Education",
    description:
      "Complete preparation for CBSE board examinations with expert guidance and practice tests.",
    duration: "1 Year",
    students: "400+",
    modules: "Subject-wise",
    level: "Advanced",
    rating: 4.9,
    price: "₹15,000",
    features: [
      "All CBSE Subjects",
      "Board Exam Preparation",
      "Regular Mock Tests",
      "Doubt Clearing Sessions",
      "Study Material Included",
    ],
    href: "/courses/cbse",
  },
  {
    id: "university",
    title: "University Courses",
    fullName: "Various University Course Preparations",
    description:
      "Preparation and guidance for various university entrance exams and degree courses.",
    duration: "Varies",
    students: "200+",
    modules: "Custom",
    level: "Advanced",
    rating: 4.6,
    price: "₹12,000",
    features: [
      "Entrance Exam Preparation",
      "Degree Course Guidance",
      "Career Counseling",
      "University Selection Help",
      "Application Assistance",
    ],
    href: "/courses/university",
  },
  {
    id: "iti",
    title: "ITI",
    fullName: "Industrial Training Institute",
    description:
      "Technical and vocational training programs for various trades and skill development.",
    duration: "6 Months - 2 Years",
    students: "150+",
    modules: "Trade-specific",
    level: "Intermediate",
    rating: 4.5,
    price: "₹10,000",
    features: [
      "Multiple Trade Options",
      "Practical Training",
      "Industry-Relevant Skills",
      "Job Placement Assistance",
      "Government Recognized",
    ],
    href: "/courses/iti",
  },
  {
    id: "competitive",
    title: "Competitive Exams",
    fullName: "Government Job Preparation",
    description:
      "Comprehensive preparation for various government competitive examinations.",
    duration: "6-12 Months",
    students: "250+",
    modules: "Exam-specific",
    level: "Advanced",
    rating: 4.7,
    price: "₹18,000",
    features: [
      "SSC, Banking, Railway Exams",
      "Current Affairs Updates",
      "Mock Test Series",
      "Interview Preparation",
      "Study Material & Books",
    ],
    href: "/courses/competitive",
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Our Courses
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Comprehensive courses designed to help you achieve your
                educational and career goals
              </p>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="flex flex-col h-full shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{course.level}</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {course.rating}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-sm font-medium text-primary">
                      {course.fullName}
                    </CardDescription>
                    <p className="text-sm text-muted-foreground">
                      {course.description}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {course.duration}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {course.students}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {course.modules}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">
                        Course Features:
                      </h4>
                      <ul className="space-y-1">
                        {course.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center space-x-2 text-sm"
                          >
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span className="text-muted-foreground">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-center pt-4 border-t">
                      <div>
                        <span className="text-2xl font-bold text-primary">
                          {course.price}
                        </span>
                        <span className="text-sm text-muted-foreground ml-1">
                          / course
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Our Courses */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Why Choose Our Courses?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We provide comprehensive education with modern teaching methods
                and industry-relevant curriculum
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200 rounded-xl">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">
                    Comprehensive Curriculum
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Well-structured courses covering all essential topics and
                    practical applications
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200 rounded-xl">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Expert Faculty</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn from experienced professionals with deep subject
                    knowledge
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200 rounded-xl">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Practical Learning</h3>
                  <p className="text-sm text-muted-foreground">
                    Hands-on experience with real-world projects and case
                    studies
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200 rounded-xl">
                <CardContent className="p-6 text-center">
                  <Star className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">High Success Rate</h3>
                  <p className="text-sm text-muted-foreground">
                    95% of our students successfully complete their courses and
                    achieve their goals
                  </p>
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

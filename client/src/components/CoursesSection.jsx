import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Clock, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const courses = [
  {
    id: "rs-cit",
    title: "RS-CIT",
    description: "Rajasthan State Certificate Course in Information Technology",
    duration: "3 Months",
    students: "500+",
    modules: "12",
    level: "Beginner",
    href: "/courses/rs-cit",
  },
  {
    id: "nios",
    title: "NIOS",
    description: "National Institute of Open Schooling - 10th & 12th",
    duration: "1-2 Years",
    students: "300+",
    modules: "Multiple",
    level: "Intermediate",
    href: "/courses/nios",
  },
  {
    id: "cbse",
    title: "CBSE",
    description: "Central Board of Secondary Education preparation",
    duration: "1 Year",
    students: "400+",
    modules: "Subject-wise",
    level: "Advanced",
    href: "/courses/cbse",
  },
  {
    id: "university",
    title: "University",
    description: "Various university course preparations and guidance",
    duration: "Varies",
    students: "200+",
    modules: "Custom",
    level: "Advanced",
    href: "/courses/university",
  },
  {
    id: "iti",
    title: "ITI",
    description: "Industrial Training Institute courses and preparation",
    duration: "6 Months - 2 Years",
    students: "150+",
    modules: "Trade-specific",
    level: "Intermediate",
    href: "/courses/iti",
  },
];

export default function CoursesSection() {
  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Our Courses
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Comprehensive courses designed to help you achieve your
              educational and career goals
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 xl:grid-cols-3 lg:gap-12">
          {courses.map((course) => (
            <Card key={course.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <Badge variant="secondary bg-[#F7F7F7]">{course.level}</Badge>
                </div>
                <CardDescription className="text-sm">
                  {course.description}
                </CardDescription>
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
                <Button asChild={false} className="w-full text-white cursor-pointer bg-black hover:bg-zinc-800">
                  <Link to={course.href}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <Button variant="outline" size="lg" asChild={false}>
            <Link to="/courses">View All Courses</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

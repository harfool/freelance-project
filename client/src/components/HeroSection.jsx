import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { BookOpen, Users, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import CoursesSection from "./CoursesSection.jsx";
import AnnouncementsSection from "./AnnouncementsSection.jsx";
import TestimonialsSection from "./TestimonialsSection.jsx";
import Footer from "./Footer.jsx";

export default function HeroSection() {
  return (
    <>
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Excellence in Education
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Premier coaching institute offering comprehensive courses in
                RS-CIT, NIOS, CBSE, University, and ITI programs with modern
                teaching methods and expert faculty.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mt-2">
              <Button
                asChild
                size="lg"
                className="bg-black text-white hover:bg-neutral-900 cursor-pointer shadow-md w-full sm:w-auto"
              >
                <Link to="/courses">Explore Courses</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-black text-black hover:bg-gray-100 cursor-pointer shadow-md w-full sm:w-auto"
              >
                <Link to="/tests">Take Demo Test</Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl items-center gap-8 py-12 lg:grid-cols-4 lg:gap-12">
            <Card className="pt-4 shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200 rounded-xl">
              <CardContent className="flex flex-col items-center space-y-2 p-6">
                <BookOpen className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">500+</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Study Materials
                </p>
              </CardContent>
            </Card>
            <Card className="pt-4 shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200 rounded-xl">
              <CardContent className="flex flex-col items-center space-y-2 p-6">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">2000+</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Students Enrolled
                </p>
              </CardContent>
            </Card>
            <Card className="pt-4 shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200 rounded-xl">
              <CardContent className="flex flex-col items-center space-y-2 p-6">
                <Award className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">95%</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Success Rate
                </p>
              </CardContent>
            </Card>
            <Card className="pt-4 shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200 rounded-xl">
              <CardContent className="flex flex-col items-center space-y-2 p-6">
                <TrendingUp className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">10+</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Years Experience
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        <CoursesSection />
        <AnnouncementsSection />
        <TestimonialsSection />
      </section>
      <Footer />
    </>
  );
}

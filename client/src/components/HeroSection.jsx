import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { BookOpen, Users, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
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
          <div className="space-x-4 ">
            <Button
              asChild
              size="lg"
              className="bg-black text-white hover:bg-neutral-800"
            >
              <Link to="/courses">Explore Courses</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/tests">Take Demo Test</Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-4 lg:gap-12 ">
          <Card className='p-3'>
            <CardContent className="flex flex-col items-center space-y-2 p-6">
              <BookOpen className="h-12 w-12 text-primary" />
              <h3 className="text-2xl font-bold">500+</h3>
              <p className="text-sm text-muted-foreground text-center">
                Study Materials
              </p>
            </CardContent>
          </Card>
          <Card className='p-3'>
            <CardContent className="flex flex-col items-center space-y-2 p-6">
              <Users className="h-12 w-12 text-primary" />
              <h3 className="text-2xl font-bold">2000+</h3>
              <p className="text-sm text-muted-foreground text-center">
                Students Enrolled
              </p>
            </CardContent>
          </Card>
          <Card className='p-3'>
            <CardContent className="flex flex-col items-center space-y-2 p-6">
              <Award className="h-12 w-12 text-primary" />
              <h3 className="text-2xl font-bold">95%</h3>
              <p className="text-sm text-muted-foreground text-center">
                Success Rate
              </p>
            </CardContent>
          </Card>
          <Card className='p-3'>
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
    </section>
  );
}

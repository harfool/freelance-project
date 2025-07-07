import Footer from "../components/Footer.jsx";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Users, Award, BookOpen, Target, Heart, Star } from "lucide-react";

const stats = [
  { icon: Users, label: "Students Trained", value: "5000+" },
  { icon: Award, label: "Success Rate", value: "95%" },
  { icon: BookOpen, label: "Courses Offered", value: "15+" },
  { icon: Target, label: "Years Experience", value: "10+" },
];

const team = [
  {
    name: "Dr. Rajesh Kumar",
    position: "Director & Founder",
    qualification: "Ph.D in Computer Science",
    experience: "15+ years",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Prof. Sunita Sharma",
    position: "Academic Head",
    qualification: "M.Tech, B.Ed",
    experience: "12+ years",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Mr. Amit Gupta",
    position: "Technical Lead",
    qualification: "MCA, CCNA",
    experience: "10+ years",
    image: "/placeholder.svg?height=200&width=200",
  },
];

const values = [
  {
    icon: Heart,
    title: "Student-Centric Approach",
    description:
      "We prioritize individual student needs and provide personalized attention to ensure success.",
  },
  {
    icon: Star,
    title: "Quality Education",
    description:
      "Our curriculum is designed to meet industry standards and provide practical knowledge.",
  },
  {
    icon: Target,
    title: "Result-Oriented",
    description:
      "We focus on achieving measurable outcomes and helping students reach their goals.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                About EduInstitute
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Empowering students with quality education and modern teaching
                methodologies for over a decade
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="text-center shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200 rounded-xl"
                >
                  <CardContent className="p-6">
                    <stat.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200 rounded-xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide accessible, high-quality education that empowers
                    students to achieve their academic and professional goals.
                    We strive to create an inclusive learning environment that
                    fosters creativity, critical thinking, and lifelong
                    learning.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200 rounded-xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To be the leading educational institution that transforms
                    lives through innovative teaching methods, technology
                    integration, and personalized learning experiences. We
                    envision a future where every student has the opportunity to
                    excel and contribute meaningfully to society.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide our approach to education and student
                development
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200 rounded-xl"
                >
                  <CardContent className="p-6 text-center">
                    <value.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experienced educators and industry professionals dedicated to
                your success
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card
                  key={index}
                  className="shadow-lg border-0 bg-white/90 hover:shadow-xl transition-shadow duration-200 rounded-xl"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-muted overflow-hidden border-4 border-primary/20">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {member.name}
                    </h3>
                    <Badge variant="secondary" className="mb-2">
                      {member.position}
                    </Badge>
                    <p className="text-sm text-muted-foreground mb-1">
                      {member.qualification}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {member.experience}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Why Choose EduInstitute?
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-lg font-bold text-primary shadow">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Expert Faculty</h3>
                    <p className="text-muted-foreground">
                      Learn from experienced professionals with deep industry
                      knowledge and teaching expertise.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-lg font-bold text-primary shadow">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      Modern Infrastructure
                    </h3>
                    <p className="text-muted-foreground">
                      State-of-the-art facilities with latest technology and
                      comfortable learning environment.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-lg font-bold text-primary shadow">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      Personalized Attention
                    </h3>
                    <p className="text-muted-foreground">
                      Small batch sizes ensure individual attention and
                      customized learning approaches.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-lg font-bold text-primary shadow">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      Comprehensive Study Material
                    </h3>
                    <p className="text-muted-foreground">
                      Well-researched notes, assignments, and practice materials
                      for thorough preparation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-lg font-bold text-primary shadow">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Regular Assessment</h3>
                    <p className="text-muted-foreground">
                      Continuous evaluation through tests and assignments to
                      track progress effectively.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-lg font-bold text-primary shadow">
                    6
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Career Guidance</h3>
                    <p className="text-muted-foreground">
                      Professional counseling and career guidance to help
                      students make informed decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

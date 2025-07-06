import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Calendar, Users, Award, BookOpen } from "lucide-react"

const galleryItems = [
  {
    id: 1,
    title: "Annual Function 2023",
    description: "Students and faculty celebrating our annual cultural event",
    image: "/placeholder.svg?height=300&width=400",
    category: "Events",
    date: "2023-12-15",
  },
  {
    id: 2,
    title: "Computer Lab",
    description: "State-of-the-art computer laboratory with latest equipment",
    image: "/placeholder.svg?height=300&width=400",
    category: "Infrastructure",
    date: "2023-11-20",
  },
  {
    id: 3,
    title: "RS-CIT Graduation Ceremony",
    description: "Students receiving their RS-CIT certificates",
    image: "/placeholder.svg?height=300&width=400",
    category: "Graduation",
    date: "2023-10-25",
  },
  {
    id: 4,
    title: "Faculty Training Workshop",
    description: "Professional development session for our teaching staff",
    image: "/placeholder.svg?height=300&width=400",
    category: "Training",
    date: "2023-09-30",
  },
  {
    id: 5,
    title: "Student Achievement Awards",
    description: "Recognizing outstanding academic performance",
    image: "/placeholder.svg?height=300&width=400",
    category: "Awards",
    date: "2023-08-15",
  },
  {
    id: 6,
    title: "Library & Study Area",
    description: "Quiet study spaces with extensive book collection",
    image: "/placeholder.svg?height=300&width=400",
    category: "Infrastructure",
    date: "2023-07-10",
  },
  {
    id: 7,
    title: "NIOS Exam Preparation",
    description: "Students preparing for NIOS examinations",
    image: "/placeholder.svg?height=300&width=400",
    category: "Academics",
    date: "2023-06-20",
  },
  {
    id: 8,
    title: "Sports Day 2023",
    description: "Annual sports competition among students",
    image: "/placeholder.svg?height=300&width=400",
    category: "Sports",
    date: "2023-05-18",
  },
  {
    id: 9,
    title: "Science Exhibition",
    description: "Students showcasing their innovative projects",
    image: "/placeholder.svg?height=300&width=400",
    category: "Exhibition",
    date: "2023-04-22",
  },
]

const categories = [
  "All",
  "Events",
  "Infrastructure",
  "Graduation",
  "Training",
  "Awards",
  "Academics",
  "Sports",
  "Exhibition",
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Gallery</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Explore our campus life, events, and achievements through our photo gallery
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b">
          <div className="container px-4 md:px-6">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {galleryItems.map((item) => (
                <Card key={item.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{item.category}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Our Achievements</h2>
              <p className="text-muted-foreground">Numbers that speak for our success</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <div className="text-2xl font-bold mb-2">2000+</div>
                  <div className="text-sm text-muted-foreground">Students Graduated</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <div className="text-2xl font-bold mb-2">150+</div>
                  <div className="text-sm text-muted-foreground">Awards Won</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <div className="text-2xl font-bold mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Events Organized</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                  <div className="text-2xl font-bold mb-2">10+</div>
                  <div className="text-sm text-muted-foreground">Years of Excellence</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Calendar, Bell, Search, Filter, Pin, Clock } from "lucide-react"

const announcements = [
  {
    id: 1,
    title: "New Batch Starting for RS-CIT Course",
    content:
      "We are excited to announce that a new batch for RS-CIT course will be starting from February 1st, 2024. Limited seats available. Early bird discount of 20% for registrations before January 20th.",
    type: "Course",
    isUrgent: true,
    isPinned: true,
    publishDate: "2024-01-05",
    expiryDate: "2024-01-31",
    targetAudience: "All",
  },
  {
    id: 2,
    title: "NIOS Exam Schedule Released",
    content:
      "The National Institute of Open Schooling has released the examination schedule for April 2024 session. Students can download their admit cards from the official portal starting January 15th.",
    type: "Exam",
    isUrgent: false,
    isPinned: true,
    publishDate: "2024-01-03",
    expiryDate: "2024-04-30",
    targetAudience: "NIOS Students",
  },
  {
    id: 3,
    title: "Scholarship Applications Open",
    content:
      "Merit-based scholarship applications are now open for eligible students. Applications must be submitted with required documents before the deadline. Contact our counseling team for assistance.",
    type: "Scholarship",
    isUrgent: true,
    isPinned: false,
    publishDate: "2024-01-01",
    expiryDate: "2024-02-15",
    targetAudience: "All",
  },
  {
    id: 4,
    title: "Winter Break Schedule",
    content:
      "The institute will remain closed from December 25th to January 2nd for winter break. Regular classes will resume from January 3rd. Online support will be available during the break.",
    type: "General",
    isUrgent: false,
    isPinned: false,
    publishDate: "2023-12-20",
    expiryDate: "2024-01-03",
    targetAudience: "All",
  },
  {
    id: 5,
    title: "New Computer Lab Inauguration",
    content:
      "We are pleased to announce the inauguration of our new state-of-the-art computer laboratory with 50 latest computers. The lab will be operational from January 10th.",
    type: "Infrastructure",
    isUrgent: false,
    isPinned: false,
    publishDate: "2023-12-15",
    expiryDate: "2024-01-31",
    targetAudience: "All",
  },
  {
    id: 6,
    title: "Parent-Teacher Meeting",
    content:
      "Monthly parent-teacher meeting is scheduled for January 20th from 10 AM to 4 PM. Parents can discuss their ward's progress with respective faculty members.",
    type: "Meeting",
    isUrgent: false,
    isPinned: false,
    publishDate: "2023-12-10",
    expiryDate: "2024-01-20",
    targetAudience: "Parents",
  },
]

const categories = ["All", "Course", "Exam", "Scholarship", "General", "Infrastructure", "Meeting"]

export default function AnnouncementsPage() {
  const pinnedAnnouncements = announcements.filter((a) => a.isPinned)
  const regularAnnouncements = announcements.filter((a) => !a.isPinned)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Announcements</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Stay updated with the latest news, events, and important information
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 border-b">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search announcements..." className="pl-10" />
              </div>

              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Category:</span>
                  <select className="border rounded-md px-3 py-1 text-sm">
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pinned Announcements */}
        {pinnedAnnouncements.length > 0 && (
          <section className="py-8 bg-muted/30">
            <div className="container px-4 md:px-6">
              <div className="flex items-center mb-6">
                <Pin className="h-5 w-5 mr-2 text-primary" />
                <h2 className="text-xl font-semibold">Pinned Announcements</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {pinnedAnnouncements.map((announcement) => (
                  <Card key={announcement.id} className="border-primary/20 bg-primary/5">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{announcement.type}</Badge>
                          {announcement.isUrgent && (
                            <Badge variant="destructive" className="animate-pulse">
                              <Bell className="h-3 w-3 mr-1" />
                              Urgent
                            </Badge>
                          )}
                          <Pin className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(announcement.publishDate).toLocaleDateString()}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{announcement.content}</p>
                      <div className="flex items-center justify-between text-sm">
                        <Badge variant="secondary">{announcement.targetAudience}</Badge>
                        {announcement.expiryDate && (
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            Expires: {new Date(announcement.expiryDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Regular Announcements */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-xl font-semibold mb-6">Recent Announcements</h2>
            <div className="space-y-6">
              {regularAnnouncements.map((announcement) => (
                <Card key={announcement.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{announcement.type}</Badge>
                        {announcement.isUrgent && (
                          <Badge variant="destructive">
                            <Bell className="h-3 w-3 mr-1" />
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(announcement.publishDate).toLocaleDateString()}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{announcement.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{announcement.content}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{announcement.targetAudience}</Badge>
                      {announcement.expiryDate && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          Expires: {new Date(announcement.expiryDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Notification Signup */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <Card className="max-w-2xl mx-auto text-center">
              <CardContent className="p-8">
                <Bell className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-4">Never Miss an Update</h3>
                <p className="text-muted-foreground mb-6">
                  Subscribe to get instant notifications about important announcements and updates
                </p>
                <div className="flex gap-2 max-w-md mx-auto">
                  <Input placeholder="Enter your email" type="email" />
                  <Button>Subscribe</Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  You can unsubscribe at any time. We respect your privacy.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

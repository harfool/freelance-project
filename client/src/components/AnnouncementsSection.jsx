import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Calendar, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const announcements = [
  {
    id: 1,
    title: "New Batch Starting for RS-CIT Course",
    description:
      "Registration open for the new RS-CIT batch starting from January 15th, 2024. Limited seats available.",
    date: "2024-01-05",
    type: "Course",
    urgent: true,
  },
  {
    id: 2,
    title: "NIOS Exam Schedule Released",
    description:
      "The examination schedule for NIOS 10th and 12th has been released. Check your exam dates.",
    date: "2024-01-03",
    type: "Exam",
    urgent: false,
  },
  {
    id: 3,
    title: "Scholarship Applications Open",
    description:
      "Merit-based scholarship applications are now open for eligible students. Apply before the deadline.",
    date: "2024-01-01",
    type: "Scholarship",
    urgent: true,
  },
];

export default function AnnouncementsSection() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-[#F9F9FA]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Latest Announcements
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Stay updated with the latest news and important announcements
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge
                    variant={announcement.urgent ? "destructive" : "secondary"}
                  >
                    {announcement.type}
                  </Badge>
                  {announcement.urgent && (
                    <Bell className="h-4 w-4 text-destructive" />
                  )}
                </div>
                <CardTitle className="text-lg">{announcement.title}</CardTitle>
                <CardDescription className="flex items-center space-x-1 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(announcement.date).toLocaleDateString()}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">
                  {announcement.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <Button variant="outline" size="lg" asChild={false}>
            <Link to="/announcements">View All Announcements</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

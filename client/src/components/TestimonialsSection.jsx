import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    course: "RS-CIT",
    rating: 5,
    comment:
      "Excellent teaching methods and comprehensive study materials. I cleared my RS-CIT exam with flying colors!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    course: "NIOS 12th",
    rating: 5,
    comment:
      "The faculty is very supportive and the online test system helped me practice effectively. Highly recommended!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Anjali Gupta",
    course: "CBSE",
    rating: 4,
    comment:
      "Great institute with modern facilities. The notes and assignments are very well structured.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              What Our Students Say
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Real feedback from our successful students
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.course} Student
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

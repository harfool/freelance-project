import Footer from "../components/Footer.jsx";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Calendar, Users, Award, BookOpen } from "lucide-react";
import React, { useState } from "react";

const galleryItems = [
	{
		id: 1,
		title: "Annual Function 2023",
		description: "Students and faculty celebrating our annual cultural event",
		image:
			"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
		category: "Events",
		date: "2023-12-15",
	},
	{
		id: 2,
		title: "Computer Lab",
		description: "State-of-the-art computer laboratory with latest equipment",
		image:
			"https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
		category: "Infrastructure",
		date: "2023-11-20",
	},
	{
		id: 3,
		title: "RS-CIT Graduation Ceremony",
		description: "Students receiving their RS-CIT certificates",
		image:
			"https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
		category: "Graduation",
		date: "2023-10-25",
	},
	{
		id: 4,
		title: "Faculty Training Workshop",
		description: "Professional development session for our teaching staff",
		image:
			"https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80",
		category: "Training",
		date: "2023-09-30",
	},
	{
		id: 5,
		title: "Student Achievement Awards",
		description: "Recognizing outstanding academic performance",
		image:
			"https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
		category: "Awards",
		date: "2023-08-15",
	},
	{
		id: 6,
		title: "Library & Study Area",
		description: "Quiet study spaces with extensive book collection",
		image:
			"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
		category: "Infrastructure",
		date: "2023-07-10",
	},
	{
		id: 7,
		title: "NIOS Exam Preparation",
		description: "Students preparing for NIOS examinations",
		image:
			"https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?auto=format&fit=crop&w=600&q=80",
		category: "Academics",
		date: "2023-06-20",
	},
	{
		id: 8,
		title: "Sports Day 2023",
		description: "Annual sports competition among students",
		image:
			"https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
		category: "Sports",
		date: "2023-05-18",
	},
	{
		id: 9,
		title: "Science Exhibition",
		description: "Students showcasing their innovative projects",
		image:
			"https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
		category: "Exhibition",
		date: "2023-04-22",
	},
];

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
];

export default function GalleryPage() {
	const [selectedCategory, setSelectedCategory] = useState("All");

	const filteredItems =
		selectedCategory === "All"
			? galleryItems
			: galleryItems.filter((item) => item.category === selectedCategory);

	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-1">
				{/* Hero Section */}
				<section className="py-12 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
					<div className="container px-4 md:px-6">
						<div className="text-center space-y-4">
							<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								Gallery
							</h1>
							<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
								Explore our campus life, events, and achievements through our
								photo gallery
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
									variant={
										selectedCategory === category ? "default" : "outline"
									}
									className={
										"cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors" +
										(selectedCategory === category ? " font-bold" : "")
									}
									onClick={() => setSelectedCategory(category)}
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
						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							{filteredItems.map((item) => (
								<Card
									key={item.id}
									className="overflow-hidden group cursor-pointer shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200"
								>
									<div className="aspect-video overflow-hidden">
										<img
											src={item.image || "/placeholder.svg"}
											alt={item.title}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
										/>
									</div>
									<CardContent className="p-6">
										<div className="flex items-center justify-between mb-2">
											<Badge variant="secondary">{item.category}</Badge>
											<div className="flex items-center text-sm text-muted-foreground">
												<Calendar className="h-4 w-4 mr-1" />
												{new Date(item.date).toLocaleDateString()}
											</div>
										</div>
										<h3 className="font-semibold mb-2 text-lg">
											{item.title}
										</h3>
										<p className="text-sm text-muted-foreground">
											{item.description}
										</p>
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
							<p className="text-muted-foreground">
								Numbers that speak for our success
							</p>
						</div>

						<div className="grid md:grid-cols-4 gap-8">
							<Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
								<CardContent className="p-8 text-center min-h-[220px] flex flex-col justify-center">
									<Users className="h-12 w-12 mx-auto mb-4 text-primary" />
									<div className="text-2xl font-bold mb-2">2000+</div>
									<div className="text-sm text-muted-foreground">
										Students Graduated
									</div>
								</CardContent>
							</Card>
							<Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
								<CardContent className="p-8 text-center min-h-[220px] flex flex-col justify-center">
									<Award className="h-12 w-12 mx-auto mb-4 text-green-600" />
									<div className="text-2xl font-bold mb-2">150+</div>
									<div className="text-sm text-muted-foreground">
										Awards Won
									</div>
								</CardContent>
							</Card>
							<Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
								<CardContent className="p-8 text-center min-h-[220px] flex flex-col justify-center">
									<BookOpen className="h-12 w-12 mx-auto mb-4 text-blue-600" />
									<div className="text-2xl font-bold mb-2">50+</div>
									<div className="text-sm text-muted-foreground">
										Events Organized
									</div>
								</CardContent>
							</Card>
							<Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
								<CardContent className="p-8 text-center min-h-[220px] flex flex-col justify-center">
									<Calendar className="h-12 w-12 mx-auto mb-4 text-purple-600" />
									<div className="text-2xl font-bold mb-2">10+</div>
									<div className="text-sm text-muted-foreground">
										Years of Excellence
									</div>
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

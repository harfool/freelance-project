"use client"

import { useState } from "react"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Download, Search, Filter, FileText, Calendar, Eye, BookOpen } from "lucide-react"
import { Link } from "react-router-dom";

const studyMaterials = [
	{
		id: 1,
		title: "RS-CIT Chapter 1: Introduction to Computer",
		description: "Basic computer concepts and terminology",
		course: "RS-CIT",
		type: "Notes",
		size: "1.2 MB",
		uploadDate: "2024-01-15",
		fileType: "PDF",
		downloaded: false,
	},
	{
		id: 2,
		title: "MS Word Practical Assignment",
		description: "Document formatting and advanced features",
		course: "RS-CIT",
		type: "Assignment",
		size: "0.8 MB",
		uploadDate: "2024-01-12",
		fileType: "DOCX",
		downloaded: true,
	},
	{
		id: 3,
		title: "Excel Formulas and Functions",
		description: "Complete guide to Excel formulas",
		course: "RS-CIT",
		type: "Reference",
		size: "2.1 MB",
		uploadDate: "2024-01-10",
		fileType: "PDF",
		downloaded: false,
	},
	{
		id: 4,
		title: "PowerPoint Design Templates",
		description: "Professional presentation templates",
		course: "RS-CIT",
		type: "Template",
		size: "5.3 MB",
		uploadDate: "2024-01-08",
		fileType: "ZIP",
		downloaded: true,
	},
]

export default function StudentNotesPage() {
	const [searchTerm, setSearchTerm] = useState("")
	const [selectedType, setSelectedType] = useState("All")

	const filteredMaterials = studyMaterials.filter((material) => {
		const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase())
		const matchesType = selectedType === "All" || material.type === selectedType
		return matchesSearch && matchesType
	})

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<div className="border-b bg-muted/40">
				<div className="container flex h-16 items-center justify-between">
					<div>
						<h1 className="text-2xl font-bold">Study Materials</h1>
						<p className="text-sm text-muted-foreground">Access your course notes and assignments</p>
					</div>
					<Button asChild>
						<Link href="/dashboard">Back to Dashboard</Link>
					</Button>
				</div>
			</div>

			<div className="container py-6">
				{/* Search and Filter */}
				<div className="flex flex-col md:flex-row gap-4 mb-6">
					<div className="relative flex-1 max-w-md">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search materials..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10"
						/>
					</div>
					<div className="flex items-center gap-2">
						<Filter className="h-4 w-4 text-muted-foreground" />
						<select
							value={selectedType}
							onChange={(e) => setSelectedType(e.target.value)}
							className="border rounded-md px-3 py-2 text-sm"
						>
							<option value="All">All Types</option>
							<option value="Notes">Notes</option>
							<option value="Assignment">Assignment</option>
							<option value="Reference">Reference</option>
							<option value="Template">Template</option>
						</select>
					</div>
				</div>

				{/* Quick Stats */}
				<div className="grid gap-6 md:grid-cols-4 mb-8">
					<Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-muted-foreground">Total Materials</p>
									<p className="text-2xl font-bold">{studyMaterials.length}</p>
								</div>
								<BookOpen className="h-8 w-8 text-primary" />
							</div>
						</CardContent>
					</Card>
					<Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-muted-foreground">Downloaded</p>
									<p className="text-2xl font-bold">{studyMaterials.filter((m) => m.downloaded).length}</p>
								</div>
								<Download className="h-8 w-8 text-green-600" />
							</div>
						</CardContent>
					</Card>
					<Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-muted-foreground">Notes</p>
									<p className="text-2xl font-bold">{studyMaterials.filter((m) => m.type === "Notes").length}</p>
								</div>
								<FileText className="h-8 w-8 text-blue-600" />
							</div>
						</CardContent>
					</Card>
					<Card className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-muted-foreground">Assignments</p>
									<p className="text-2xl font-bold">{studyMaterials.filter((m) => m.type === "Assignment").length}</p>
								</div>
								<FileText className="h-8 w-8 text-purple-600" />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Materials List */}
				<div className="space-y-6">
					{filteredMaterials.map((material) => (
						<Card key={material.id} className="shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
							<CardContent className="p-8">
								<div className="flex items-center justify-between">
									<div className="flex-1">
										<div className="flex items-center space-x-2 mb-2">
											<h3 className="font-semibold text-lg">{material.title}</h3>
											{material.downloaded && (
												<Badge variant="secondary" className="text-xs">
													Downloaded
												</Badge>
											)}
										</div>
										<p className="text-muted-foreground mb-3">{material.description}</p>
										<div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
											<Badge variant="outline">{material.course}</Badge>
											<Badge variant="outline">{material.type}</Badge>
											<div className="flex items-center">
												<Calendar className="h-4 w-4 mr-1" />
												{new Date(material.uploadDate).toLocaleDateString()}
											</div>
											<span>{material.size}</span>
											<span>{material.fileType}</span>
										</div>
									</div>
									<div className="flex flex-col md:flex-row gap-2 ml-4">
										<Button variant="outline" size="sm" className="flex items-center">
											<Eye className="h-4 w-4 mr-2" />
											Preview
										</Button>
										<Button size="sm" className="flex items-center bg-black text-white hover:bg-neutral-900">
											<Download className="h-4 w-4 mr-2" />
											Download
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{filteredMaterials.length === 0 && (
					<div className="text-center py-12">
						<FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
						<h3 className="text-lg font-semibold mb-2">No materials found</h3>
						<p className="text-muted-foreground">Try adjusting your search criteria</p>
					</div>
				)}
			</div>
		</div>
	)
}

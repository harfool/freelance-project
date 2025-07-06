import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Download,
  FileText,
  Search,
  Filter,
  Calendar,
  Eye,
} from "lucide-react";

const studyMaterials = [
  {
    id: 1,
    title: "RS-CIT Complete Notes",
    description: "Comprehensive notes covering all chapters of RS-CIT syllabus",
    course: "RS-CIT",
    type: "Notes",
    size: "2.5 MB",
    downloads: 1250,
    uploadDate: "2024-01-15",
    fileType: "PDF",
    isPublic: true,
  },
  {
    id: 2,
    title: "MS Office Practical Assignments",
    description:
      "Step-by-step practical assignments for Word, Excel, and PowerPoint",
    course: "RS-CIT",
    type: "Assignment",
    size: "1.8 MB",
    downloads: 890,
    uploadDate: "2024-01-10",
    fileType: "ZIP",
    isPublic: true,
  },
  {
    id: 3,
    title: "NIOS Mathematics Chapter 1-5",
    description:
      "Detailed notes for NIOS Mathematics covering algebra and geometry",
    course: "NIOS",
    type: "Notes",
    size: "3.2 MB",
    downloads: 567,
    uploadDate: "2024-01-08",
    fileType: "PDF",
    isPublic: true,
  },
  {
    id: 4,
    title: "CBSE Physics Formula Sheet",
    description: "Important formulas and concepts for CBSE Class 12 Physics",
    course: "CBSE",
    type: "Reference",
    size: "0.8 MB",
    downloads: 1100,
    uploadDate: "2024-01-05",
    fileType: "PDF",
    isPublic: true,
  },
  {
    id: 5,
    title: "Computer Shortcut Keys Guide",
    description:
      "Essential keyboard shortcuts for Windows and MS Office applications",
    course: "General",
    type: "Reference",
    size: "0.5 MB",
    downloads: 2100,
    uploadDate: "2024-01-03",
    fileType: "PDF",
    isPublic: true,
  },
  {
    id: 6,
    title: "ITI Electrician Trade Theory",
    description: "Complete theory notes for ITI Electrician trade",
    course: "ITI",
    type: "Notes",
    size: "4.1 MB",
    downloads: 345,
    uploadDate: "2024-01-01",
    fileType: "PDF",
    isPublic: false,
  },
];

const courses = [
  "All",
  "RS-CIT",
  "NIOS",
  "CBSE",
  "ITI",
  "University",
  "General",
];
const types = ["All", "Notes", "Assignment", "Reference", "Syllabus"];

export default function NotesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Study Materials
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Access comprehensive notes, assignments, and study resources for
                all courses
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
                <Input placeholder="Search materials..." className="pl-10" />
              </div>

              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Course:</span>
                  <select className="border rounded-md px-3 py-1 text-sm">
                    {courses.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Type:</span>
                  <select className="border rounded-md px-3 py-1 text-sm">
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Materials Grid */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {studyMaterials.map((material) => (
                <Card key={material.id} className="flex flex-col h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{material.course}</Badge>
                      <Badge variant="secondary">{material.type}</Badge>
                    </div>
                    <CardTitle className="text-lg">{material.title}</CardTitle>
                    <CardDescription>{material.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Size:</span>
                        <span className="font-medium">{material.size}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium">{material.fileType}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Downloads:
                        </span>
                        <span className="font-medium">
                          {material.downloads}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium">
                          {new Date(material.uploadDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t space-y-2">
                      {material.isPublic ? (
                        <>
                          <Button className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full bg-transparent"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          disabled
                        >
                          Login Required
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Downloads */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Most Downloaded</h2>
              <p className="text-muted-foreground">
                Popular study materials among students
              </p>
            </div>

            <div className="grid gap-4 max-w-4xl mx-auto">
              {studyMaterials
                .sort((a, b) => b.downloads - a.downloads)
                .slice(0, 5)
                .map((material, index) => (
                  <Card key={material.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-semibold">
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold">{material.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <Badge variant="outline" className="text-xs">
                                {material.course}
                              </Badge>
                              <span>{material.downloads} downloads</span>
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(
                                  material.uploadDate
                                ).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>

        {/* Upload Guidelines */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">
                Study Material Guidelines
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6 text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Quality Content</h3>
                  <p className="text-sm text-muted-foreground">
                    All materials are reviewed by expert faculty before
                    publication
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Download className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <h3 className="font-semibold mb-2">Easy Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Download materials in multiple formats (PDF, DOC, ZIP)
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Regular Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Materials are updated regularly to match current syllabus
                  </p>
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

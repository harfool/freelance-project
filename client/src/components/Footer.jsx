import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6" />
              <span className="font-bold text-xl">EduInstitute</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Excellence in education with comprehensive courses and modern
              teaching methods.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/tests"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Online Tests
                </Link>
              </li>
              <li>
                <Link
                  to="/results"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Results
                </Link>
              </li>
              <li>
                <Link
                  to="/scholarship"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Scholarship
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/resources/notes"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Notes & Assignments
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/papers"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Question Papers
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/software"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Software Downloads
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Contact Info</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@eduinstitute.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>123 Education Street, Learning City, State 123456</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} EduInstitute. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

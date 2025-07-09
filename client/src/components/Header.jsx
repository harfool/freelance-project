"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { Menu, GraduationCap, User, LogIn } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-0">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center space-x-2 mr-8">
          <GraduationCap className="h-6 w-6" />
          <span className="font-bold text-xl">SBC</span>
        </Link>
        <nav className="hidden md:flex mx-6 space-x-6">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-black hover:bg-[#F5F5F5] px-4 py-2 rounded"
          >
            Home
          </Link>
          <Link
            to="/resources"
            className="text-sm font-medium transition-colors hover:text-black hover:bg-[#F5F5F5] px-4 py-2 rounded"
          >
            Resources
          </Link>
          <Link
            to="/tests"
            className="text-sm font-medium transition-colors hover:text-black hover:bg-[#F5F5F5] px-4 py-2 rounded"
          >
            Tests
          </Link>
          <Link
            to="/results"
            className="text-sm font-medium transition-colors hover:text-black hover:bg-[#F5F5F5] px-4 py-2 rounded"
          >
            Results
          </Link>
          <Link
            to="/scholarship"
            className="text-sm font-medium transition-colors hover:text-black hover:bg-[#F5F5F5] px-4 py-2 rounded"
          >
            Scholarship
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium transition-colors hover:text-black hover:bg-[#F5F5F5] px-4 py-2 rounded"
          >
            About
          </Link>
          <Link
            to="/gallery"
            className="text-sm font-medium transition-colors hover:text-black hover:bg-[#F5F5F5] px-4 py-2 rounded"
          >
            Gallery
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-2">
          <Button variant="ghost" size="sm" asChild className="hidden md:flex">
            <Link to="/login">
              <LogIn className="h-4 w-4 mr-2" />
              SignIn
            </Link>
          </Button>
          <Button size="sm" asChild className="hidden md:flex">
            <Link to="/register">
              <User className="h-4 w-4 mr-2" />
              SignUp
            </Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden focus:outline-none focus:ring-2 focus:ring-primary">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-xs sm:w-[400px] p-6 bg-white text-black border-l border-gray-200 shadow-xl"
              title="Main Menu"
            >
              <nav className="flex flex-col space-y-4 mt-4">
                <span className="text-2xl font-bold mb-2">Menu</span>
                <Link
                  to="/"
                  className="text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/resources"
                  className="text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Resources
                </Link>
                <Link
                  to="/tests"
                  className="text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Online Tests
                </Link>
                <Link
                  to="/results"
                  className="text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Results
                </Link>
                <Link
                  to="/scholarship"
                  className="text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Scholarship
                </Link>
                <Link
                  to="/about"
                  className="text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/gallery"
                  className="text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Gallery
                </Link>
                <div className="pt-4 space-y-2">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    asChild
                  >
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                      Dashboard
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

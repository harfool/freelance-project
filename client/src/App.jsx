import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import Header from "./components/Header.jsx";
import HeroSection from "./components/HeroSection.jsx";
import LogIn from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Resources from "./pages/Resources.jsx";
import Tests from "./pages/Tests.jsx";
import Results from "./pages/Results.jsx";
import Scholarship from "./pages/Scholarship.jsx";
import About from "./pages/About.jsx";
import Courses from "./pages/Courses.jsx";
import Notes from "./pages/Notes.jsx";
import Paper from "./pages/Paper.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import TestDashboard from "./pages/TestDashboard.jsx";

function AppRoutes() {
  const location = useLocation();
  const hideHeader = ["/login", "/register"].includes(location.pathname);
  return (
    <>
      <ScrollToTop />
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resources" element={<Resources />}>
          <Route path="notes" element={<Notes />} />
          <Route path="papers" element={<Paper />} />
        </Route>
        <Route path="/tests" element={<Tests />} />
        <Route path="/results" element={<Results />} />
        <Route path="/scholarship" element={<Scholarship />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/testDashboard" element={<TestDashboard />} />
      </Routes>
    </>
  );
}

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;

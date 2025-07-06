import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
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

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/results" element={<Results />} />
          <Route path="/scholarship" element={<Scholarship />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

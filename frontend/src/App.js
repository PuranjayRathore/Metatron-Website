import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import ChatBot from "./components/ChatBot";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Solutions from "./pages/Solutions";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  useEffect(() => {
    // Default to dark mode for a high-tech premium aesthetic
    document.body.classList.add("dark-mode");
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Services />
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      <ChatBot />
      <Footer />
    </Router>
  );
}

export default App;



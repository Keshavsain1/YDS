import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import OurTeam from "./pages/OurTeam";
import ContactUs from "./pages/ContactUs";
import About from "./pages/About";
import Services from "./pages/Services";  // ✅ added
import Career from "./pages/Career";      // ✅ added

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navigation onSearch={handleSearch} />

          <main role="main" className="flex-1">
            <Routes>
              {/* Primary routes */}
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/index.html" element={<Navigate to="/" replace />} />

              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/team" element={<OurTeam />} />
              <Route path="/contact" element={<ContactUs />} />

              {/* ✅ Added new pages */}
              <Route path="/services" element={<Services />} />
              <Route path="/career" element={<Career />} />

              {/* 404 fallback */}
              <Route
                path="*"
                element={
                  <div className="p-8 text-center text-gray-600">
                    <h1 className="text-2xl font-bold mb-2">404 - Page Not Found</h1>
                    <p>The page you are looking for doesn’t exist.</p>
                  </div>
                }
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;

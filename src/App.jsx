import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import "./index.css";
import WelcomeScreen from "./Pages/WelcomeScreen";
import Portfolio from "./Pages/Portofolio";
import About from "./Pages/About";
import Navbar from "./components/Navbar";
import AnimatedBackground from "./components/AnimatedBackground";
import Home from "./Pages/Home";
import { AnimatePresence } from 'framer-motion';
import ProjectDetails from "./components/ProjectDetail";
import Footer from "./components/Footer";
import ContactPage from "./Pages/Contact";

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <AnimatedBackground />
          <main className="relative z-10">
            <Home />
            <About />
            <Portfolio />
            <ContactPage />
          </main>
          <Footer />
        </>
      )}
    </>
  );
};
const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <Footer />

  </>
);
function App() {

  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App

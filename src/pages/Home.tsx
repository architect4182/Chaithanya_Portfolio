import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RecruiterHighlights from "../components/RecruiterHighlights";
import About from "../components/About";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import FloatingDock from "../components/FloatingDock";
import Projects from "../components/Projects";
import AdditionalProjects from "../components/AdditionalProjects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="text-white min-h-screen"
    >
      <Navbar />
      <Hero />
      <RecruiterHighlights />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <AdditionalProjects />
      <Contact />
      <FloatingDock />
      <Footer />
    </motion.main>
  );
}

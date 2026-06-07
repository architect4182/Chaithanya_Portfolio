import { Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = ["About", "Experience", "Skills", "Open Source", "Projects", "Contact"];

export default function Navbar() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return !document.documentElement.classList.contains("light");
    }
    return true;
  });

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDark(!document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const handleThemeToggle = (e: React.MouseEvent) => {
    const isDark = !dark;
    
    const updateDOM = () => {
      const root = document.documentElement;
      if (isDark) {
        root.classList.remove("light");
        localStorage.setItem("theme", "dark");
      } else {
        root.classList.add("light");
        localStorage.setItem("theme", "light");
      }
    };

    // Fallback if View Transitions API is not supported or user prefers reduced motion
    // @ts-ignore
    if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      updateDOM();
      return;
    }

    const root = document.documentElement;
    root.style.setProperty("--click-x", `${e.clientX}px`);
    root.style.setProperty("--click-y", `${e.clientY}px`);

    // @ts-ignore
    document.startViewTransition(() => {
      updateDOM();
    });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-[76px] w-full" aria-hidden="true" />
      
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md bg-surface-elevated border-b border-subtle shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="font-bold text-xl tracking-tight">
          <span className="text-content">Chaithanya</span>
          <span className="text-cyan-400">.</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={link === "Open Source" ? "#github" : `#${link.toLowerCase()}`}
              className="text-sm text-content-secondary hover:text-content transition-colors duration-200 relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}

          {/* Theme toggle */}
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-full bg-surface hover:bg-surface-hover transition-colors border border-subtle relative w-9 h-9 flex items-center justify-center overflow-hidden"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {dark ? (
                <motion.div
                  key="dark"
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Sun size={16} className="text-yellow-300" />
                </motion.div>
              ) : (
                <motion.div
                  key="light"
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Moon size={16} className="text-slate-700" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <a
            href="/Chaithanya_Pedhagali_Resume.pdf"
            download
            className="px-4 py-2 text-sm rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition-colors duration-200"
          >
            Resume
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-lg bg-surface"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden backdrop-blur-2xl bg-surface-elevated border-b border-subtle px-6 pb-6">
          <div className="flex flex-col gap-4 pt-2">
            {navLinks.map((link) => (
              <a
                key={link}
                href={link === "Open Source" ? "#github" : `#${link.toLowerCase()}`}
                className="text-content-secondary hover:text-content transition-colors py-1"
                onClick={() => setMobileOpen(false)}
              >
                {link}
              </a>
            ))}
            <button
              onClick={handleThemeToggle}
              className="flex items-center gap-2 text-content-secondary py-1"
            >
              {dark ? <Sun size={16} className="text-yellow-300" /> : <Moon size={16} className="text-slate-700" />}
              {dark ? "Switch to Light" : "Switch to Dark"}
            </button>
            <a
              href="/Chaithanya_Pedhagali_Resume.pdf"
              download
              className="px-4 py-2 text-sm rounded-lg bg-cyan-500 text-black font-semibold text-center"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </nav>
    </>
  );
}

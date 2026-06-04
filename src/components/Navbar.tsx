import { Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = ["About", "Experience", "Skills", "Open Source", "Projects", "Contact"];

export default function Navbar() {
  // Initialise from localStorage; default = dark
  const [dark, setDark] = useState<boolean>(() => {
    return localStorage.getItem("theme") !== "light";
  });

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── Apply theme class to <html> whenever state changes ──────────────
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

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
            ? "backdrop-blur-md bg-black/80 border-b border-white/10 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="font-bold text-xl tracking-tight">
          <span className="text-white">Chaithanya</span>
          <span className="text-cyan-400">.</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={link === "Open Source" ? "#github" : `#${link.toLowerCase()}`}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200 relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}

          {/* Theme toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
            aria-label="Toggle theme"
          >
            {dark
              ? <Sun size={16} className="text-yellow-300" />
              : <Moon size={16} className="text-slate-700" />}
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
          className="lg:hidden p-2 rounded-lg bg-white/10"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden backdrop-blur-2xl bg-black/80 border-b border-white/10 px-6 pb-6">
          <div className="flex flex-col gap-4 pt-2">
            {navLinks.map((link) => (
              <a
                key={link}
                href={link === "Open Source" ? "#github" : `#${link.toLowerCase()}`}
                className="text-gray-400 hover:text-white transition-colors py-1"
                onClick={() => setMobileOpen(false)}
              >
                {link}
              </a>
            ))}
            <button
              onClick={() => setDark(!dark)}
              className="flex items-center gap-2 text-gray-400 py-1"
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

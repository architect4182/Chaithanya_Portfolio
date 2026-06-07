import { motion, useScroll, useMotionValueEvent, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { FileText, Mail } from "lucide-react";

const GithubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.699-2.782.604-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function FloatingDock() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  const links = [
    { name: "GitHub", icon: <GithubIcon />, href: "https://github.com/architect4182" },
    { name: "LinkedIn", icon: <LinkedinIcon />, href: "https://www.linkedin.com/in/chaithanya-pedhagali-4952081ab/" },
    { name: "Resume", icon: <FileText size={20} />, href: "/Chaithanya_Pedhagali_Resume.pdf" },
    { name: "Email", icon: <Mail size={20} />, href: "mailto:chaithanyapedhagali@gmail.com" },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { y: 100, opacity: 0, x: "-50%" }}
          animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1, x: "-50%" }}
          exit={shouldReduceMotion ? { opacity: 0 } : { y: 100, opacity: 0, x: "-50%" }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-8 left-1/2 z-50 hidden md:flex items-center gap-3 px-4 py-3 rounded-full bg-surface-elevated backdrop-blur-xl border border-subtle shadow-2xl shadow-black/20"
        >
          {links.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              target={link.name === "Email" ? "_self" : "_blank"}
              rel="noopener noreferrer"
              whileHover={shouldReduceMotion ? {} : { scale: 1.15, y: -4 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              className="relative group p-3 rounded-full bg-surface hover:bg-surface-hover text-content-secondary hover:text-content transition-colors duration-300"
            >
              {link.icon}
              {/* Tooltip */}
              <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-surface-elevated text-content text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-subtle shadow-xl">
                {link.name}
              </span>
            </motion.a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

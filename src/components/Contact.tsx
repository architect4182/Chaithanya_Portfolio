import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Send } from "lucide-react";

// Inline brand SVGs (lucide-react v1 removed brand icons)
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const socials = [
  {
    icon: <GithubIcon />,
    label: "GitHub",
    handle: "@architect4182",
    href: "https://github.com/architect4182",
    color: "hover:border-white/40 hover:text-white",
  },
  {
    icon: <LinkedinIcon />,
    label: "LinkedIn",
    handle: "pchaithanyareddy",
    href: "https://www.linkedin.com/in/pchaithanyareddy/",
    color: "hover:border-blue-400/50 hover:text-blue-400",
  },
  {
    icon: <Mail size={22} />,
    label: "Email",
    handle: "chaithanya.pr41@gmail.com",
    href: "mailto:chaithanya.pr41@gmail.com",
    color: "hover:border-cyan-400/50 hover:text-cyan-400",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-24" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 md:p-14"
      >
        <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-3">
          Contact
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Let's Connect
        </h2>
        <p className="text-gray-400 max-w-xl leading-relaxed mb-10">
          I'm actively looking for full-time Software Engineering and Business Analyst roles.
          If you'd like to collaborate or have an opportunity — reach out!
        </p>

        {/* Social links */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {socials.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * i + 0.3 }}
              className={`flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 transition-all duration-200 group ${social.color}`}
            >
              <span className="text-gray-400 group-hover:text-inherit transition-colors">
                {social.icon}
              </span>
              <div>
                <div className="text-sm font-semibold text-white">{social.label}</div>
                <div className="text-xs text-gray-500">{social.handle}</div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="mailto:chaithanya@email.com"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 hover:-translate-y-0.5"
        >
          <Send size={18} />
          Send me a message
        </a>
      </motion.div>
    </section>
  );
}

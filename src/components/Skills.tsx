import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const featuredTech = [
  "Java", "Spring Boot", "Angular", "React", "TypeScript", "PostgreSQL", "Next.js", "Tailwind"
];

// Duplicate multiple times to ensure enough width for seamless scrolling on wide screens
const doubledTech = [...featuredTech, ...featuredTech, ...featuredTech, ...featuredTech];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="w-full py-32 overflow-hidden" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-6 mb-20 text-center"
      >
        <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-4">
          Tech Stack
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Featured Technologies.
        </h2>
      </motion.div>

      <div className="relative flex overflow-hidden w-full group">
        {/* Gradient fades for smooth entry/exit */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex whitespace-nowrap gap-6 md:gap-10 pr-6 md:pr-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40,
          }}
        >
          {doubledTech.map((tech, i) => (
            <div
              key={i}
              className="flex items-center justify-center px-8 py-5 md:px-10 md:py-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md text-gray-300 font-bold text-xl md:text-2xl hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              {tech}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

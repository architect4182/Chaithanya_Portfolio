import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Target } from "lucide-react";

const highlights = [
  {
    icon: <Briefcase size={20} className="text-cyan-400" />,
    title: "Full Stack Developer",
    desc: "Building enterprise apps with Java, Spring Boot, Angular & PostgreSQL.",
  },
  {
    icon: <Target size={20} className="text-purple-400" />,
    title: "Performance Optimised",
    desc: "Improved application performance by 25-30% through architectural enhancements.",
  },
  {
    icon: <GraduationCap size={20} className="text-blue-400" />,
    title: "Domain Expertise",
    desc: "Specialised in Insurance and Financial Services with robust workflow solutions.",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-24" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-3">
          About Me
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-14">
          The person behind the code
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5 text-gray-400 leading-8">
            <p>
              Hello! I'm <span className="text-white font-semibold">Chaithanya Pedhagali</span> — a
              results-driven Full Stack Java Developer with 4 years of experience building enterprise-grade applications.
            </p>
            <p>
              I bring deep hands-on expertise with <span className="text-white">Java · Spring Boot · Angular · PostgreSQL</span>,
              and have successfully designed and delivered complex REST APIs and Microservices within Agile environments.
            </p>
            <p>
              Beyond writing clean code, I focus on system optimization and cross-functional collaboration. By working closely with stakeholders, I ensure technical implementations align perfectly with business goals and measurable outcomes.
            </p>
          </div>

          {/* Highlight cards */}
          <div className="space-y-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                className="flex items-start gap-4 p-5 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8 transition-all duration-200"
              >
                <div className="p-2.5 rounded-xl bg-white/10 shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

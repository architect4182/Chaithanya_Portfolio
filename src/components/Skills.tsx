import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    category: "Frontend",
    color: "cyan",
    skills: [
      { name: "Angular", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "JavaScript", level: 85 },
    ],
  },
  {
    category: "Backend",
    color: "purple",
    skills: [
      { name: "Java 11", level: 90 },
      { name: "Spring Boot", level: 88 },
      { name: "Hibernate", level: 80 },
    ],
  },
  {
    category: "Database & DevOps",
    color: "blue",
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "Oracle DB", level: 80 },
      { name: "Jenkins", level: 75 },
    ],
  },
];

const colorMap: Record<string, string> = {
  cyan: "from-cyan-500 to-blue-500",
  purple: "from-purple-500 to-pink-500",
  blue: "from-blue-500 to-indigo-500",
};

const tagColors: Record<string, string> = {
  cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-24" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-3">
          Skills
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-14">
          Tech I work with
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIdx * 0.15 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all duration-300"
            >
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${tagColors[cat.color]} mb-5`}
              >
                {cat.category}
              </span>

              <div className="space-y-5">
                {cat.skills.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-white">{skill.name}</span>
                      <span className="text-xs text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${colorMap[cat.color]}`}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: catIdx * 0.15 + i * 0.1 + 0.3, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Extra tech tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          {["Spring MVC", "Spring Security", "Spring Data JPA", "MySQL", "JUnit", "Mockito", "Postman", "SOAP UI", "Git", "Maven", "JIRA", "Confluence", "HTML5", "CSS3"].map(
            (tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full text-sm bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/25 transition-colors"
              >
                {tag}
              </span>
            )
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}

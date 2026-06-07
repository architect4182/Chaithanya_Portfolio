import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experienceData = [
  {
    role: "Information Technology Analyst / Full Stack Developer",
    company: "NTT DATA Services",
    client: "The Hanover Insurance Group (USA)",
    duration: "July 2022 – Present",
    location: "Bangalore, India",
    domain: "Property & Casualty Insurance",
    description: "Policy & Claims Management Portal",
    achievements: [
      "Developed RESTful APIs and microservices using Java 11 and Spring Boot.",
      "Implemented Spring Security RBAC authentication and authorization.",
      "Built insurance workflow modules including policy creation, endorsements, renewals, cancellations, and claims processing.",
      "Optimized Oracle and PostgreSQL queries reducing retrieval times by 20%.",
      "Integrated SOAP and REST services with external systems.",
      "Developed Angular applications using TypeScript, HTML5, CSS3, and reusable component architecture.",
      "Improved frontend development efficiency by 25% through reusable UI components.",
      "Implemented lazy loading and route optimization reducing load times by 30%.",
      "Participated in Agile ceremonies, UAT, CI/CD, and cross-functional collaboration."
    ],
    keyMetrics: [
      "25% Performance Improvement",
      "30% Faster Page Loads",
      "80%+ Test Coverage",
      "40+ Critical Defects Resolved",
      "25% Faster UI Development"
    ],
    techStack: [
      "Java", "Spring Boot", "Angular", "TypeScript", "Oracle", "PostgreSQL", "Jenkins", "Git", "JIRA"
    ]
  }
];

export default function Experience() { // Main Experience Component
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-24" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-3">
          Experience
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-14">
          Professional Experience
        </h2>

        <div className="space-y-12">
          {experienceData.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-4 gap-8">
                {/* Timeline Line & Dot (Mobile Only) */}
                <div className="md:hidden absolute left-0 top-2 bottom-0 w-px bg-white/10">
                  <div className="absolute top-0 -left-1.5 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                </div>

                {/* Left Column: Date & Location */}
                <div className="md:col-span-1 pt-1 md:text-right mb-4 md:mb-0">
                  <div className="flex items-center md:justify-end gap-2 text-cyan-400 font-semibold mb-2">
                    <Calendar size={16} />
                    <span>{job.duration}</span>
                  </div>
                  <div className="flex items-center md:justify-end gap-2 text-gray-500 text-sm">
                    <MapPin size={14} />
                    <span>{job.location}</span>
                  </div>
                </div>

                {/* Right Column: Details */}
                <div className="md:col-span-3 relative">
                  {/* Timeline Line & Dot (Desktop) */}
                  <div className="hidden md:block absolute -left-4 top-2 bottom-[-3rem] w-px bg-white/10">
                    <div className="absolute top-0 -left-[5px] w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                  </div>

                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 hover:border-white/20 transition-all duration-300">
                    <h3 className="text-2xl font-bold text-white mb-2">{job.role}</h3>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        {job.company}
                      </span>
                      <span className="text-gray-600 hidden sm:inline">•</span>
                      <span className="text-gray-400 text-sm">Client: {job.client}</span>
                    </div>
                    
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6">
                      Domain: {job.domain}
                    </div>

                    <ul className="space-y-3 text-gray-400 text-sm md:text-base leading-relaxed mb-8">
                      {job.achievements.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-cyan-500 mt-1.5 shrink-0">
                            <Briefcase size={14} />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* ── Key Achievements Badges ── */}
                    {job.keyMetrics && (
                      <div className="mb-8">
                        <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          Key Achievements
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {job.keyMetrics.map((metric, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium backdrop-blur-md"
                            >
                              {metric}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ── Tech Stack Badges ── */}
                    {job.techStack && (
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {job.techStack.map((tech, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium backdrop-blur-md hover:bg-cyan-500/20 transition-colors cursor-default"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

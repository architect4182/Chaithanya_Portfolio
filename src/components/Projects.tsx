import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import BrowserMockup from "./BrowserMockup";

const projects = [
  {
    id: "policy-portal",
    title: "Policy & Claims Management Portal",
    client: "Client: The Hanover Insurance Group (USA)",
    domain: "Domain: Property & Casualty Insurance",
    role: "Role: Information Technology Analyst / Full Stack Developer",
    shortDesc: "Developed and maintained enterprise insurance applications for The Hanover Insurance Group (USA), supporting policy management, claims processing, premium audits, billing operations, policy renewals, endorsements, and customer self-service workflows.",
    problem: "Legacy insurance systems suffered from high latency, rigid monolithic architectures, and manual claim processing bottlenecks causing slow turnaround times.",
    solution: "Architected a scalable microservices ecosystem, implementing automated workflows, robust RBAC security, and optimized data retrieval pipelines.",
    techStackText: "Java 11 • Spring Boot • Angular • TypeScript • Oracle • PostgreSQL",
    outcome: "Reduced database retrieval times by 20%, improved frontend efficiency by 25% via reusable components, and successfully resolved 40+ critical production defects.",
    metrics: [
      "💼 4+ Years Enterprise Experience",
      "↑ 25% Performance Improvement",
      "⚡ 30% Faster Page Loads",
      "✓ 40+ Production Issues Resolved"
    ],
    tech: ["Java 11", "Spring Boot", "Angular", "TypeScript", "Oracle", "PostgreSQL"],
    image: "/hanover-screenshot.png",
    url: "https://www.hanover.com/",
    accentGradient: "from-blue-500/15 to-cyan-500/15",
    glow: "hover:shadow-blue-500/20",
    techColor: "bg-blue-500/10 text-blue-400",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-24" ref={ref}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65 }}
      >
        <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-3">
          Case Studies
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-14">
          Featured Work
        </h2>
      </motion.div>

      {/* Cards grid */}
      <div className="grid gap-7 items-start max-w-4xl mx-auto">
        {projects.map((project, i) => {
          const isExpanded = expandedId === project.id;

          return (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                opacity: { duration: 0.55, delay: i * 0.1 },
                y: { duration: 0.55, delay: i * 0.1 },
                layout: { duration: 0.4, type: "spring", bounce: 0.2 }
              }}
              className={`
                group flex flex-col
                backdrop-blur-xl bg-white/5 border border-white/10
                rounded-3xl overflow-hidden
                shadow-xl shadow-black/30
                ${project.glow}
                hover:border-white/20
                hover:shadow-2xl
                transition-shadow duration-300
              `}
            >
              {/* ── Browser mockup thumbnail ── */}
              <motion.div layout="position" className="p-3 pb-0">
                <BrowserMockup
                  url={project.url}
                  imageSrc={project.image}
                  imageAlt={`${project.title} screenshot`}
                  accentGradient={project.accentGradient}
                />
              </motion.div>

              {/* ── Card body ── */}
              <motion.div layout="position" className="flex flex-col flex-1 p-6 pt-3">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    {project.client && (
                      <p className="text-sm font-medium text-cyan-400 mt-1">{project.client}</p>
                    )}
                    {(project as any).domain && (
                      <p className="text-sm font-medium text-purple-400 mt-0.5">{(project as any).domain}</p>
                    )}
                    {(project as any).role && (
                      <p className="text-sm font-medium text-emerald-400/70 mt-0.5">{(project as any).role}</p>
                    )}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                    <ArrowUpRight size={16} className="text-white" />
                  </div>
                </div>

                <AnimatePresence initial={false} mode="wait">
                  {isExpanded ? (
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-4 my-4 text-sm md:text-base text-gray-300 leading-relaxed border-t border-white/10 pt-4">
                        <div>
                          <strong className="block text-white mb-1 text-xs uppercase tracking-widest text-purple-400">Problem</strong>
                          <p>{project.problem}</p>
                        </div>
                        <div>
                          <strong className="block text-white mb-1 text-xs uppercase tracking-widest text-cyan-400">Solution</strong>
                          <p>{project.solution}</p>
                        </div>
                        <div>
                          <strong className="block text-white mb-1 text-xs uppercase tracking-widest text-blue-400">Tech Stack</strong>
                          <p>{project.techStackText}</p>
                        </div>
                        <div>
                          <strong className="block text-white mb-1 text-xs uppercase tracking-widest text-emerald-400">Outcome</strong>
                          <p>{project.outcome}</p>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-gray-400 text-sm md:text-base mb-6 line-clamp-2">
                        {project.shortDesc}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${project.techColor}`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {project.metrics && (
                        <div className="flex flex-col gap-2 mt-4 mb-2 text-sm text-gray-300">
                          {project.metrics.map((m) => (
                            <span key={m}>{m}</span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-auto pt-2 border-t border-white/5">
                  <button
                    onClick={() => toggleExpand(project.id)}
                    className="flex items-center justify-center w-full gap-2 py-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        Close Case Study <ChevronUp size={16} />
                      </>
                    ) : (
                      <>
                        View Case Study <ChevronDown size={16} />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

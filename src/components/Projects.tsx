import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowUpRight, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import { projectsData } from "../data/projects";

const featuredIds = ["travel-os", "moments-os"];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 py-32" ref={ref}>
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65 }}
        className="mb-32 text-center"
      >
        <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-4">
          Case Studies
        </p>
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-content">
          Featured Work.
        </h2>
      </motion.div>

      <div className="space-y-32">
        {featuredIds.map((id, index) => {
          const project = projectsData[id];
          return (
            <motion.div
              key={id}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: index * 0.2 } },
                hover: {}
              }}
              className="flex flex-col gap-8 rounded-[40px] bg-surface border border-subtle p-4 md:p-8 hover:bg-surface-hover transition-colors duration-500"
            >
              {/* Large immersive screenshot */}
              <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[32px] overflow-hidden bg-background border border-subtle">
                <motion.img
                  src={project.heroImage}
                  alt={project.name}
                  variants={{
                    hidden: shouldReduceMotion ? {} : { scale: 0.98 },
                    visible: shouldReduceMotion ? {} : { scale: 1, transition: { duration: 1, ease: "easeOut" } },
                    hover: shouldReduceMotion ? {} : { scale: 1.02, transition: { duration: 0.7, ease: "easeOut" } }
                  }}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                
                {/* Overlay details */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">{project.name}</h3>
                    <p className="text-xl md:text-2xl text-gray-300 font-medium mb-6">{project.tagline}</p>
                    <div className="flex flex-wrap gap-3">
                      {project.techStack.slice(0, 4).map(tech => (
                        <span key={tech} className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-white">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-wrap gap-4 shrink-0">
                    <Link to={`/projects/${project.id}`} className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 hover:scale-105 transition-all shadow-xl">
                      View Case Study <ArrowRight size={18} />
                    </Link>
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
                        <ArrowUpRight size={20} />
                      </a>
                    )}
                    {project.githubUrl && project.githubUrl !== "#" && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
                        <Code2 size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Code2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const additionalProjects = [
  {
    id: "glassbeat",
    title: "GlassBeat",
    tagline: "Immersive audio playback",
    tech: ["React", "TypeScript", "Vite", "Framer"],
    github: "https://github.com/architect4182/GlassBeat",
    url: "https://glass-beat.vercel.app/",
    image: "/glassbeat-screenshot.png",
    colorHover: "group-hover:shadow-purple-500/20",
    gradientHover: "from-purple-500/50 to-pink-500/10"
  },
  {
    id: "atmosverse",
    title: "AtmosVerse",
    tagline: "Cinematic movie discovery platform",
    tech: ["React", "TMDB API", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/architect4182/atmos-verse",
    url: "https://atmos-verse.vercel.app/",
    image: "/atmosverse.png",
    colorHover: "group-hover:shadow-cyan-500/20",
    gradientHover: "from-cyan-500/50 to-blue-500/10"
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    tagline: "Dynamic developer portfolio",
    tech: ["React", "TypeScript", "Tailwind", "Framer"],
    github: "https://github.com/architect4182/Chaithanya_Portfolio",
    url: "https://chaithanya-portfolio-six.vercel.app/",
    image: "/portfolio.png",
    colorHover: "group-hover:shadow-emerald-500/20",
    gradientHover: "from-emerald-500/50 to-teal-500/10"
  }
];

export default function AdditionalProjects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="additional-projects" className="max-w-6xl mx-auto px-6 py-24" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65 }}
        className="mb-14"
      >
        <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-3">
          More Work
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Other Projects.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {additionalProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative p-[1px] rounded-[24px] bg-white/5 transition-all duration-500 group shadow-lg hover:-translate-y-2 ${project.colorHover}`}
          >
            {/* Animated Gradient Border Layer */}
            <div className={`absolute inset-0 rounded-[24px] bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${project.gradientHover}`} />

            {/* Main Card Content */}
            <div className="relative flex flex-col h-full bg-[#0a0a0a] backdrop-blur-xl rounded-[23px] overflow-hidden z-10">
              {/* Image Container taking 60-70% aspect */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#111] border-b border-white/5">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>

              {/* Content Box */}
              <div className="flex flex-col flex-1 p-6">
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-white mb-1.5 tracking-tight group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm font-medium">
                    {project.tagline}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-md bg-white/5 text-[11px] font-semibold tracking-wide text-gray-300">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/5">
                  {/* View Case Study Button */}
                  {project.id === "portfolio" ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-semibold text-white hover:text-gray-300 transition-colors">
                      Live Demo <ArrowUpRight size={16} />
                    </a>
                  ) : (
                    <Link to={`/projects/${project.id}`} className="flex items-center gap-1.5 text-sm font-semibold text-white hover:text-gray-300 transition-colors group-hover:translate-x-0.5 duration-300">
                      View Case Study <ArrowRight size={16} />
                    </Link>
                  )}

                  {/* Icon Links */}
                  <div className="flex items-center gap-3">
                    {project.github && project.github !== "#" && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="GitHub">
                        <Code2 size={18} />
                      </a>
                    )}
                    {project.id !== "portfolio" && project.url && project.url !== "#" && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="Live Demo">
                        <ArrowUpRight size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

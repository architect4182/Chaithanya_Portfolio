import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Code2 } from "lucide-react";
import { projectsData } from "../data/projects";

// A utility to get dynamic shadow/glow colors based on accent Color
const colorStyles: Record<string, string> = {
  emerald: "shadow-emerald-500/20 text-emerald-400 group-hover:shadow-emerald-500/40",
  orange: "shadow-orange-500/20 text-orange-400 group-hover:shadow-orange-500/40",
  cyan: "shadow-cyan-500/20 text-cyan-400 group-hover:shadow-cyan-500/40",
  purple: "shadow-purple-500/20 text-purple-400 group-hover:shadow-purple-500/40",
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = id ? projectsData[id] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl font-bold mb-4">Project not found</h1>
        <Link to="/" className="text-cyan-400 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen text-white bg-black pt-20"
    >
      {/* Navigation Bar for Case Study */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link to="/#projects" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
          <span className="font-medium tracking-wide">Back to Projects</span>
        </Link>
        <div className="font-bold tracking-widest uppercase text-sm opacity-50">
          Case Study
        </div>
      </nav>

      {/* SECTION 1 — Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            {project.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className={`text-2xl md:text-3xl font-medium ${colorStyles[project.accentColor].split(' ')[1]}`}
          >
            {project.tagline}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
          className={`relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[32px] overflow-hidden border border-white/10 bg-black shadow-2xl ${colorStyles[project.accentColor].split(' ')[0]}`}
        >
          <img src={project.heroImage} alt={project.name} className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 rounded-[32px] ring-1 ring-inset ring-white/10 pointer-events-none" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="flex justify-center gap-4 mt-10"
        >
          {project.liveUrl && project.liveUrl !== "#" && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
              View Live Demo <ArrowUpRight size={18} />
            </a>
          )}
          {project.githubUrl && project.githubUrl !== "#" && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 border border-white/10 transition-colors">
              <Code2 size={18} /> GitHub
            </a>
          )}
        </motion.div>
      </section>

      {/* SECTION 2 — Overview */}
      <section className="bg-white/5 py-24 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-sm font-semibold tracking-widest text-white/50 uppercase mb-4">The Project</h3>
            <p className="text-2xl font-medium leading-relaxed">{project.overview.what}</p>
          </div>
          <div className="space-y-12">
            <div>
              <h3 className="text-sm font-semibold tracking-widest text-white/50 uppercase mb-4">The Problem</h3>
              <p className="text-lg text-gray-400 leading-relaxed">{project.overview.problem}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-widest text-white/50 uppercase mb-4">The Goal</h3>
              <p className="text-lg text-gray-400 leading-relaxed">{project.overview.goal}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Features */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Key Features.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {project.features.map((feature, idx) => (
            <div key={idx} className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl">
              <h3 className={`text-2xl font-bold mb-3 ${colorStyles[project.accentColor].split(' ')[1]}`}>{feature.title}</h3>
              <p className="text-gray-400 text-lg leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — Screenshots Gallery */}
      <section className="bg-black py-32 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Gallery.</h2>
        </div>
        <div className="flex gap-8 px-6 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar">
          {project.screenshots.map((img, idx) => (
            <div key={idx} className="min-w-[80vw] md:min-w-[60vw] snap-center relative rounded-[32px] overflow-hidden border border-white/10 group">
              <img src={img} alt={`Screenshot ${idx + 1}`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — Tech Stack */}
      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16">Built With.</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {project.techStack.map((tech, idx) => (
            <span key={idx} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xl font-medium text-gray-300">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* SECTION 6 — Challenges & Learnings */}
      <section className="bg-white/5 py-32 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Challenges & Learnings.</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {project.challenges.map((challenge, idx) => (
              <div key={idx} className="p-8 rounded-[32px] bg-black border border-white/10">
                <h3 className="text-xl font-bold mb-4 text-white">{challenge.title}</h3>
                <p className="text-gray-400 leading-relaxed">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — Project Links */}
      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-10">Ready to explore?</h2>
        <div className="flex justify-center gap-6">
          <Link to="/#projects" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 border border-white/10 transition-colors">
            <ArrowLeft size={18} /> Back to Projects
          </Link>
          {project.liveUrl && project.liveUrl !== "#" && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
              Live Demo <ArrowUpRight size={18} />
            </a>
          )}
        </div>
      </section>
      
    </motion.main>
  );
}

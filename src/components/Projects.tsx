import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Parallax for Travel OS
  const travelRef = useRef(null);
  const { scrollYProgress: travelScroll } = useScroll({
    target: travelRef,
    offset: ["start end", "end start"]
  });
  const travelY = useTransform(travelScroll, [0, 1], ["-5%", "5%"]);

  // Parallax for Moments OS
  const momentsRef = useRef(null);
  const { scrollYProgress: momentsScroll } = useScroll({
    target: momentsRef,
    offset: ["start end", "end start"]
  });
  const momentsY = useTransform(momentsScroll, [0, 1], ["-5%", "5%"]);

  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 py-32" ref={ref}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65 }}
        className="mb-32 text-center"
      >
        <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-4">
          Case Studies
        </p>
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
          Featured Work.
        </h2>
      </motion.div>

      <div className="space-y-40">
        {/* ================= PROJECT 1: TRAVEL OS ================= */}
        <div className="flex flex-col gap-12" ref={travelRef}>
          {/* Top Screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[32px] overflow-hidden border border-white/10 bg-black group shadow-2xl shadow-emerald-500/10"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10 mix-blend-screen" />
            <motion.img
              style={{ y: travelY }}
              src="/travel-os.png"
              alt="Travel OS"
              className="w-full h-[110%] object-cover object-top scale-[1.02]"
            />
            {/* Glass border reflection */}
            <div className="absolute inset-0 rounded-[32px] ring-1 ring-inset ring-white/10 pointer-events-none z-20" />
          </motion.div>

          {/* Bottom Content */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            {/* Left Col: Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">Travel OS</h3>
              <p className="text-xl md:text-2xl font-medium text-emerald-400 mb-6">
                The ultimate companion for modern explorers.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                A comprehensive travel management operating system designed to streamline bookings, itineraries, and expenses. Developed an all-in-one travel platform that aggregates bookings, automates itinerary generation, and provides real-time updates.
              </p>
            </motion.div>

            {/* Right Col: Metadata & Links */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-5 flex flex-col gap-8 lg:pl-12"
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">Platform</h4>
                  <p className="text-white font-medium">Web / Cross-Platform</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">Tech Stack</h4>
                  <p className="text-white font-medium">React, Next.js, TS, Tailwind</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                <a href="https://apple-travel-os.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
                  View Live Demo <ArrowUpRight size={18} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 border border-white/10 transition-colors">
                  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.699-2.782.604-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </motion.div>
          </div>

          {/* Travel OS Features Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
          >
            {["15+ Screens Designed", "25+ Components", "Cross Platform"].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-colors">
                <span className="text-emerald-400 font-semibold mb-1 group-hover:scale-110 transition-transform">{`0${i + 1}`}</span>
                <span className="text-gray-300 font-medium">{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>


        {/* ================= PROJECT 2: MOMENTS OS ================= */}
        <div className="grid lg:grid-cols-12 gap-16 items-center" ref={momentsRef}>
          
          {/* Left Col: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col order-2 lg:order-1"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">Moments OS</h3>
            <p className="text-xl md:text-2xl font-medium text-orange-400 mb-6">
              Capture your life's best chapters.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              An intuitive social platform focused on capturing, organizing, and sharing life's most important memories in a distraction-free environment. Built a minimalist social network dedicated exclusively to personal milestones and meaningful connections.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">Platform</h4>
                <p className="text-white font-medium">Web / Mobile Web</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">Tech Stack</h4>
                <p className="text-white font-medium">React Native, Firebase, TS</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a href="https://moments-os.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
                View Live Demo <ArrowUpRight size={18} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 border border-white/10 transition-colors">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.699-2.782.604-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </a>
            </div>

            {/* Moments OS Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["Timeline System", "Memory Archive", "Responsive UI"].map((feature, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-start justify-center group hover:bg-white/10 transition-colors">
                  <span className="text-orange-400 font-semibold mb-2 group-hover:translate-x-1 transition-transform">{`0${i + 1}`}</span>
                  <span className="text-gray-300 font-medium text-sm leading-tight">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Col: Screenshot */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 order-1 lg:order-2 relative w-full aspect-[4/3] rounded-[32px] overflow-hidden border border-white/10 bg-black group shadow-2xl shadow-orange-500/10"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10 mix-blend-screen" />
            <motion.img
              style={{ y: momentsY }}
              src="/moments-os.png"
              alt="Moments OS"
              className="w-full h-[115%] object-cover object-top scale-[1.02]"
            />
            {/* Glass border reflection */}
            <div className="absolute inset-0 rounded-[32px] ring-1 ring-inset ring-white/10 pointer-events-none z-20" />
          </motion.div>

        </div>

      </div>
    </section>
  );
}

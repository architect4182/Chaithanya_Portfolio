import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { useState } from "react";
import type { MouseEvent } from "react";

/* ── Animation helpers ─────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: "easeOut" as const },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

/* ── Floating tech badges around the photo ─────────────────── */
const floatingBadges = [
  { label: "React", emoji: "⚛️", pos: "top-6 -left-5", delay: 0.8 },
  { label: "TypeScript", emoji: "🔷", pos: "top-6 -right-5", delay: 1.0 },
  { label: "Java", emoji: "☕", pos: "bottom-28 -left-5", delay: 1.2 },
  { label: "AI / ML", emoji: "🤖", pos: "bottom-28 -right-5", delay: 1.4 },
];

/* ── Tech stack chips shown in the left column ─────────────── */
const techStack = ["Java", "Spring Boot", "Angular", "PostgreSQL", "REST APIs", "Microservices"];

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Premium smooth spring physics for the spotlight
  const springX = useSpring(mouseX, { stiffness: 40, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 15 });

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent<HTMLElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Cyan to purple radial gradient that interpolates toward cursor
  const spotlightBackground = useMotionTemplate`radial-gradient(800px circle at ${springX}px ${springY}px, rgba(6, 182, 212, 0.12), rgba(168, 85, 247, 0.04) 40%, transparent 80%)`;

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Interactive Spotlight (hidden on mobile) ── */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 hidden md:block spotlight-effect"
        style={{ background: spotlightBackground }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      <div className="max-w-6xl mx-auto w-full py-20 relative z-10">

        {/* ── Two-column grid ─────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ══════════════ LEFT — Content ══════════════ */}
          <div className="flex flex-col order-2 lg:order-1">

            {/* Availability badge */}
            <motion.div {...fadeUp(0.05)} className="mb-7">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
                4+ Years Experience · Full Stack Java Developer
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              {...fadeUp(0.15)}
              className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-5"
            >
              <span className="block text-white">Chaithanya</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent pb-3">
                Pedhagali
              </span>
            </motion.h1>

            {/* Role */}
            <motion.p {...fadeUp(0.25)} className="text-lg text-gray-400 mb-3">
              <span className="text-white font-semibold">Information Technology Analyst</span>
              {" · "}
              <span className="text-purple-400 font-medium">Full Stack Java Developer</span>
            </motion.p>

            {/* Description */}
            <motion.p {...fadeUp(0.32)} className="text-gray-400 leading-relaxed max-w-lg mb-7">
              Building{" "}
              <span className="text-white font-medium">enterprise-grade applications</span> in the{" "}
              <span className="text-white font-medium">Insurance and Financial Services</span> domains with a focus on performance, scalability, and robust architecture.
            </motion.p>

            {/* Tech stack chips */}
            <motion.div
              {...fadeUp(0.4)}
              className="flex flex-wrap gap-2 mb-9"
            >
              {techStack.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-400"
                >
                  {t}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-4 mb-12">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:-translate-y-0.5"
              >
                View Projects
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/Chaithanya_Pedhagali_Resume.pdf"
                download
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 font-semibold transition-all duration-200 hover:-translate-y-0.5 text-white"
              >
                <Download size={17} />
                Resume
              </a>
            </motion.div>


          </div>

          {/* ══════════════ RIGHT — Profile photo ══════════════ */}
          <motion.div
            {...fadeLeft(0.3)}
            className="relative flex justify-center order-1 lg:order-2"
          >
            {/* Animated gradient glow behind image */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-[-12%] rounded-3xl bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-purple-500/30 blur-3xl"
              aria-hidden="true"
            />

            {/* Secondary shimmer ring */}
            <motion.div
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-[-4%] rounded-3xl border border-cyan-400/20"
              aria-hidden="true"
            />

            {/* Glass card */}
            <motion.div
              whileHover={{ scale: 1.025, y: -4 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-sm lg:max-w-none backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-3 shadow-2xl shadow-black/40 cursor-default"
            >
              {/* Inner gradient overlay on the image frame */}
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/profile.jpg"
                  alt="Chaithanya Pedhagali — Full Stack Java Developer"
                  className="w-full object-cover object-top rounded-2xl"
                  style={{ maxHeight: "480px" }}
                  loading="eager"
                  decoding="async"
                />

                {/* Subtle bottom fade so image blends into card */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Name chip at bottom of image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(0,0,0,0.5)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] text-sm text-[#ffffff] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Available for opportunities
                  </div>
                </div>
              </div>

              {/* Card footer */}
              <div className="px-3 py-3 flex items-center justify-between">
                <span className="text-xs text-gray-500">IT Analyst / Full Stack Dev</span>
                <span className="text-xs text-cyan-400 font-medium">4+ Yrs Exp ✦</span>
              </div>
            </motion.div>

            {/* ── Floating tech badges ── */}
            {floatingBadges.map((badge) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: badge.delay, ease: "easeOut" }}
                whileHover={{ scale: 1.1, y: -2 }}
                className={`absolute ${badge.pos} hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-xl bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] text-xs font-semibold text-[#ffffff] shadow-lg z-10`}
              >
                <span>{badge.emoji}</span>
                {badge.label}
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600"
      >
        <ChevronDown size={15} className="animate-bounce" />
      </motion.div>
    </section>
  );
}

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { Clock, Zap, Timer, CheckCircle, ShieldAlert, Code2 } from "lucide-react";

interface CounterProps {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  delay?: number;
}

function AnimatedCounter({ value, suffix, label, icon, delay = 0 }: CounterProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => {
        animate(count, value, { duration: 2, ease: "easeOut" });
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [inView, value, count, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center justify-center p-6 text-center backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl hover:border-white/20 transition-all duration-300"
    >
      <div className="mb-4 p-3 rounded-2xl bg-white/5 text-cyan-400">
        {icon}
      </div>
      <div className="flex items-baseline justify-center gap-1 mb-2">
        <motion.span className="text-4xl md:text-5xl font-black text-white tracking-tight">
          {rounded}
        </motion.span>
        <span className="text-2xl md:text-3xl font-bold text-cyan-400">
          {suffix}
        </span>
      </div>
      <p className="text-sm font-medium text-gray-400 max-w-[140px] leading-snug">
        {label}
      </p>
    </motion.div>
  );
}

export default function RecruiterHighlights() {
  const metrics = [
    { value: 4, suffix: "+", label: "Years Experience", icon: <Clock size={24} />, delay: 0 },
    { value: 25, suffix: "%", label: "Performance Improved", icon: <Zap size={24} className="text-purple-400" />, delay: 0.1 },
    { value: 30, suffix: "%", label: "Faster Page Loads", icon: <Timer size={24} className="text-blue-400" />, delay: 0.2 },
    { value: 80, suffix: "%+", label: "Test Coverage", icon: <CheckCircle size={24} className="text-emerald-400" />, delay: 0.3 },
    { value: 40, suffix: "+", label: "Defects Resolved", icon: <ShieldAlert size={24} className="text-red-400" />, delay: 0.4 },
    { value: 25, suffix: "%", label: "UI Development Time Reduced", icon: <Code2 size={24} className="text-pink-400" />, delay: 0.5 },
  ];

  return (
    <section id="highlights" className="w-full relative z-20 -mt-24 mb-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-gray-400 font-medium tracking-wide max-w-2xl mx-auto">
            4 years of building enterprise applications used by insurance professionals across the United States.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {metrics.map((metric, idx) => (
            <AnimatedCounter
              key={idx}
              value={metric.value}
              suffix={metric.suffix}
              label={metric.label}
              icon={metric.icon}
              delay={metric.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

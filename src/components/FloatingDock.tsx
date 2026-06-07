import { motion, useScroll, useMotionValueEvent, AnimatePresence, useReducedMotion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { FileText, Home, Sun, Moon } from "lucide-react";

const GithubIcon = ({ isLight }: { isLight: boolean }) => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill={isLight ? "#000000" : "#ffffff"}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.699-2.782.604-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="#0A66C2">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GmailIcon = () => (
  <svg className="w-full h-full" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.58,19.1068l-12.69-8.0757A3,3,0,0,1,7.1109,5.97l9.31,5.9243L24.78,6.0428A3,3,0,0,1,28.22,10.9579Z" fill="#ea4435"/>
    <path d="M25.5,5.5h4a0,0,0,0,1,0,0v18a3,3,0,0,1-3,3h0a3,3,0,0,1-3-3V7.5a2,2,0,0,1,2-2Z" fill="#00ac47" transform="translate(53.0001 32.0007) rotate(180)"/>
    <path d="M29.4562,8.0656c-.0088-.06-.0081-.1213-.0206-.1812-.0192-.0918-.0549-.1766-.0823-.2652a2.9312,2.9312,0,0,0-.0958-.2993c-.02-.0475-.0508-.0892-.0735-.1354A2.9838,2.9838,0,0,0,28.9686,6.8c-.04-.0581-.09-.1076-.1342-.1626a3.0282,3.0282,0,0,0-.2455-.2849c-.0665-.0647-.1423-.1188-.2146-.1771a3.02,3.02,0,0,0-.24-.1857c-.0793-.0518-.1661-.0917-.25-.1359-.0884-.0461-.175-.0963-.267-.1331-.0889-.0358-.1837-.0586-.2766-.0859s-.1853-.06-.2807-.0777a3.0543,3.0543,0,0,0-.357-.036c-.0759-.0053-.1511-.0186-.2273-.018a2.9778,2.9778,0,0,0-.4219.0425c-.0563.0084-.113.0077-.1689.0193a33.211,33.211,0,0,0-.5645.178c-.0515.022-.0966.0547-.1465.0795A2.901,2.901,0,0,0,23.5,8.5v5.762l4.72-3.3043a2.8878,2.8878,0,0,0,1.2359-2.8923Z" fill="#ffba00"/>
    <path d="M5.5,5.5h0a3,3,0,0,1,3,3v18a0,0,0,0,1,0,0h-4a2,2,0,0,1-2-2V8.5a3,3,0,0,1,3-3Z" fill="#4285f4"/>
  </svg>
);

function DockItem({ item, mouseX, isLightMode, shouldReduceMotion }: any) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Base size is 48px. Max size is 72px.
  const sizeSync = useTransform(distance, [-150, 0, 150], [48, 72, 48]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const finalSize = shouldReduceMotion ? 48 : size;

  const innerContent = (
    <>
      <span className="w-1/2 h-1/2 flex items-center justify-center pointer-events-none">
        {typeof item.icon === "function" ? item.icon(isLightMode) : item.icon}
      </span>
      {/* Tooltip */}
      <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-surface-elevated text-content text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-subtle shadow-xl z-50">
        {item.name}
      </span>
    </>
  );

  const className = "relative group flex items-center justify-center rounded-full bg-surface border border-transparent hover:bg-surface-hover hover:border-subtle hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-colors duration-300";

  if (item.onClick) {
    return (
      <motion.button
        ref={ref as any}
        onClick={item.onClick}
        style={{ width: finalSize, height: finalSize }}
        whileHover={shouldReduceMotion ? {} : { y: -8 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
        className={className}
        aria-label={item.name}
      >
        {innerContent}
      </motion.button>
    );
  }

  return (
    <motion.a
      ref={ref as any}
      href={item.href}
      target={item.name === "Email" || item.name === "Home" ? "_self" : "_blank"}
      rel="noopener noreferrer"
      style={{ width: finalSize, height: finalSize }}
      whileHover={shouldReduceMotion ? {} : { y: -8 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
      className={className}
      aria-label={item.name}
    >
      {innerContent}
    </motion.a>
  );
}

export default function FloatingDock() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(Infinity);

  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    setIsLightMode(document.documentElement.classList.contains("light"));
    const observer = new MutationObserver(() => {
      setIsLightMode(document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = (e: React.MouseEvent) => {
    const isLight = !isLightMode;
    
    const updateDOM = () => {
      if (!isLight) {
        document.documentElement.classList.remove("light");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.add("light");
        localStorage.setItem("theme", "light");
      }
    };

    // @ts-ignore
    if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      updateDOM();
      return;
    }

    const root = document.documentElement;
    root.style.setProperty("--click-x", `${e.clientX}px`);
    root.style.setProperty("--click-y", `${e.clientY}px`);

    // @ts-ignore
    document.startViewTransition(() => {
      updateDOM();
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  const items = [
    { name: "Home", icon: <Home className="w-full h-full text-content" />, onClick: scrollToTop },
    { name: "GitHub", icon: (isLight: boolean) => <GithubIcon isLight={isLight} />, href: "https://github.com/architect4182" },
    { name: "LinkedIn", icon: <LinkedinIcon />, href: "https://www.linkedin.com/in/chaithanya-pedhagali-4952081ab/" },
    { name: "Resume", icon: <FileText className="w-full h-full text-cyan-400" />, href: "/Chaithanya_Pedhagali_Resume.pdf" },
    { name: "Email", icon: <GmailIcon />, href: "mailto:chaithanyapedhagali@gmail.com" },
    { 
      name: "Toggle Theme", 
      icon: (
        <AnimatePresence mode="wait">
          {isLightMode ? (
            <motion.div
              key="light"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center p-3"
            >
              <Moon className="w-full h-full text-content" />
            </motion.div>
          ) : (
            <motion.div
              key="dark"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center p-3"
            >
              <Sun className="w-full h-full text-content" />
            </motion.div>
          )}
        </AnimatePresence>
      ), 
      onClick: toggleTheme 
    },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { y: 100, opacity: 0, x: "-50%" }}
          animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1, x: "-50%" }}
          exit={shouldReduceMotion ? { opacity: 0 } : { y: 100, opacity: 0, x: "-50%" }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="fixed bottom-6 left-1/2 z-50 flex items-end gap-2 px-3 py-2 rounded-full bg-surface-elevated/80 backdrop-blur-2xl border border-subtle shadow-2xl shadow-black/20"
        >
          {items.map((item) => (
            <DockItem 
              key={item.name} 
              item={item} 
              mouseX={mouseX} 
              isLightMode={isLightMode} 
              shouldReduceMotion={shouldReduceMotion} 
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}


interface BrowserMockupProps {
  /** URL shown in the address bar */
  url: string;
  /** Screenshot/image to display in the browser viewport */
  imageSrc: string;
  /** Alt text for the screenshot */
  imageAlt: string;
  /** Accent colour class for the URL bar gradient (e.g. "from-cyan-500/20 to-blue-500/20") */
  accentGradient?: string;
}

export default function BrowserMockup({
  url,
  imageSrc,
  imageAlt,
  accentGradient = "from-cyan-500/10 to-blue-500/10",
}: BrowserMockupProps) {
  return (
    /* Outer glass shell */
    <div className="w-full rounded-2xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl shadow-black/30">

      {/* ── Browser chrome top bar ── */}
      <div className={`flex items-center gap-2 px-3 py-2 bg-gradient-to-r ${accentGradient} border-b border-white/10`}>

        {/* Traffic-light dots */}
        <div className="flex items-center gap-1 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80   hover:bg-red-400   transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80  hover:bg-green-400  transition-colors" />
        </div>

        {/* URL bar */}
        <div className="flex-1 flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 min-w-0">
          {/* Lock icon (inline SVG — no extra deps) */}
          <svg className="w-3 h-3 text-green-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1C8.676 1 6 3.676 6 7v1H4a1 1 0 00-1 1v13a1 1 0 001 1h16a1 1 0 001-1V9a1 1 0 00-1-1h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v1H8V7c0-2.276 1.724-4 4-4zm0 9a2 2 0 110 4 2 2 0 010-4z" />
          </svg>
          <span className="text-[11px] text-gray-400 truncate font-mono">{url}</span>
        </div>

        {/* Reload icon */}
        <svg className="w-3 h-3 text-gray-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M23 4v6h-6M1 20v-6h6" />
          <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
        </svg>
      </div>

      {/* ── Viewport — the actual screenshot ── */}
      <div className="relative overflow-hidden bg-[#0d1117] border-b border-white/5">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-[370px] sm:h-[410px] md:h-[450px] object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
          loading="lazy"
          decoding="async"
        />
        {/* Subtle bottom fade into card body */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0d1117] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

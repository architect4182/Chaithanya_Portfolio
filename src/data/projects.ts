export type ProjectFeature = {
  title: string;
  description: string;
};

export type ProjectChallenge = {
  title: string;
  description: string;
};

export type ProjectData = {
  id: string;
  name: string;
  tagline: string;
  heroImage: string;
  liveUrl: string;
  githubUrl: string;
  overview: {
    what: string;
    problem: string;
    goal: string;
  };
  features: ProjectFeature[];
  screenshots: string[];
  techStack: string[];
  challenges: ProjectChallenge[];
  accentColor: "emerald" | "orange" | "cyan" | "purple";
};

export const projectsData: Record<string, ProjectData> = {
  "travel-os": {
    id: "travel-os",
    name: "Travel OS",
    tagline: "The ultimate companion for modern explorers.",
    heroImage: "/travel-os.png",
    liveUrl: "https://apple-travel-os.vercel.app/",
    githubUrl: "https://github.com/architect4182",
    overview: {
      what: "A comprehensive travel management operating system designed to streamline bookings, itineraries, and expenses.",
      problem: "Travelers struggle with scattered bookings, fragmented itineraries, and managing expenses across multiple apps.",
      goal: "Provide a unified, all-in-one platform to orchestrate every aspect of travel seamlessly."
    },
    features: [
      { title: "Smart Itineraries", description: "Automatically generated and optimized travel schedules." },
      { title: "Expense Tracking", description: "Real-time currency conversion and budget management." },
      { title: "Cross-Platform Sync", description: "Access your trips on web, tablet, and mobile instantly." },
      { title: "Collaborative Planning", description: "Invite friends and plan trips together in real-time." }
    ],
    screenshots: [
      "/travel-os.png"
    ],
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    challenges: [
      { title: "Technical Challenge", description: "Managing complex global state for itineraries that can change dynamically across multiple users simultaneously." },
      { title: "Design Decision", description: "Opted for a dark, premium interface to reduce eye strain during late-night travel planning sessions." },
      { title: "Optimization", description: "Implemented aggressive caching and lazy loading to ensure the app loads instantly even on slow hotel Wi-Fi." }
    ],
    accentColor: "emerald"
  },
  "moments-os": {
    id: "moments-os",
    name: "Moments OS",
    tagline: "Capture your life's best chapters.",
    heroImage: "/moments-os.png",
    liveUrl: "https://moments-os.vercel.app/",
    githubUrl: "https://github.com/architect4182/moments-os",
    overview: {
      what: "An intuitive social platform focused on capturing, organizing, and sharing life's most important memories.",
      problem: "Traditional social media is cluttered with noise, making it difficult to find and cherish personal milestones.",
      goal: "Create a distraction-free, privacy-first timeline dedicated exclusively to meaningful life events."
    },
    features: [
      { title: "Timeline System", description: "Chronological, beautiful visualization of your life story." },
      { title: "Memory Archive", description: "Secure, structured storage for photos, videos, and journal entries." },
      { title: "Granular Privacy", description: "Total control over who sees which specific memories." },
      { title: "AI Organization", description: "Smart tagging and categorization of your uploads." }
    ],
    screenshots: [
      "/moments-os.png"
    ],
    techStack: ["React Native", "Firebase", "TypeScript", "Node.js", "Redux"],
    challenges: [
      { title: "Technical Challenge", description: "Building a performant infinite-scrolling timeline that handles hundreds of high-resolution images." },
      { title: "Design Decision", description: "Chose a minimalist, content-first layout where UI elements fade away when viewing memories." },
      { title: "Optimization", description: "Leveraged lazy-loaded image thumbnails and edge-caching to reduce data payload by 60%." }
    ],
    accentColor: "orange"
  },
  "atmosverse": {
    id: "atmosverse",
    name: "AtmosVerse",
    tagline: "Cinematic movie discovery platform.",
    heroImage: "/atmosverse.png",
    liveUrl: "https://atmos-verse.vercel.app/",
    githubUrl: "https://github.com/architect4182/atmos-verse",
    overview: {
      what: "A deeply immersive movie discovery engine tailored for cinephiles.",
      problem: "Standard movie platforms feel like boring databases rather than cinematic experiences.",
      goal: "Elevate movie discovery to feel as premium and engaging as the films themselves."
    },
    features: [
      { title: "Immersive UI", description: "Full-bleed backdrops and dynamic color extraction." },
      { title: "Deep Search", description: "Lightning-fast filtering by genre, year, and rating." },
      { title: "Watchlists", description: "Curate your personal collection of must-watch films." },
      { title: "Real-time Data", description: "Powered by the robust TMDB API." }
    ],
    screenshots: [
      "/atmosverse.png"
    ],
    techStack: ["React", "TMDB API", "Tailwind CSS", "TypeScript", "Framer Motion"],
    challenges: [
      { title: "Technical Challenge", description: "Handling rate limits and complex data relationships from the TMDB API." },
      { title: "Design Decision", description: "Utilized heavy blur effects and dynamic gradients based on movie posters." },
      { title: "Optimization", description: "Implemented stale-while-revalidate data fetching for instant UI updates." }
    ],
    accentColor: "cyan"
  },
  "glassbeat": {
    id: "glassbeat",
    name: "GlassBeat",
    tagline: "Immersive audio playback.",
    heroImage: "/glassbeat-screenshot.png",
    liveUrl: "https://glass-beat.vercel.app/",
    githubUrl: "https://github.com/architect4182/GlassBeat",
    overview: {
      what: "A premium glassmorphism-inspired music streaming interface.",
      problem: "Music apps often look generic and lack a strong visual identity that complements the audio.",
      goal: "Design a visually stunning, highly interactive music player focused on aesthetics and smooth playback."
    },
    features: [
      { title: "Glass UI", description: "Beautiful frosted glass panels that react to the background." },
      { title: "Audio Visualizer", description: "Real-time frequency visualization syncing with the beat." },
      { title: "Responsive Player", description: "Seamless transition between desktop and mobile layouts." },
      { title: "Custom Themes", description: "Dynamic color palettes based on album art." }
    ],
    screenshots: [
      "/glassbeat-screenshot.png"
    ],
    techStack: ["React", "TypeScript", "Vite", "Framer Motion", "Web Audio API"],
    challenges: [
      { title: "Technical Challenge", description: "Synchronizing the Web Audio API visualizer smoothly with React state without dropping frames." },
      { title: "Design Decision", description: "Used heavy backdrop filters (glassmorphism) to create depth and visual hierarchy." },
      { title: "Optimization", description: "Offloaded visualizer rendering to a separate animation frame loop to prevent main thread blocking." }
    ],
    accentColor: "purple"
  }
};

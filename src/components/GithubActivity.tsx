import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { GitPullRequest, Users, UserPlus, BookOpen, ExternalLink, Star, AlertCircle } from "lucide-react";

const GITHUB_USERNAME = "architect4182"; // Configurable variable

interface GithubStats {
  followers: number;
  following: number;
  public_repos: number;
  totalStars: number;
  topLanguages: { name: string; count: number }[];
}

export default function GithubActivity() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchGithubStats() {
      try {
        setLoading(true);
        setError(false);
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!userRes.ok) throw new Error("Failed to fetch user");
        const userData = await userRes.json();
        
        const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
        if (!reposRes.ok) throw new Error("Failed to fetch repos");
        const reposData = await reposRes.json();
        
        let stars = 0;
        const langMap: Record<string, number> = {};
        
        if (Array.isArray(reposData)) {
          reposData.forEach((repo: any) => {
            stars += repo.stargazers_count;
            if (repo.language) {
              langMap[repo.language] = (langMap[repo.language] || 0) + 1;
            }
          });
        }
        
        const topLanguages = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([name, count]) => ({ name, count }));
          
        setStats({
          followers: userData.followers || 0,
          following: userData.following || 0,
          public_repos: userData.public_repos || 0,
          totalStars: stars,
          topLanguages
        });
      } catch (err) {
        console.error("Error fetching GitHub stats", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchGithubStats();
  }, []);

  return (
    <section id="github" className="max-w-6xl mx-auto px-6 py-24" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-3">
              Open Source
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">
              GitHub Activity
            </h2>
          </div>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-sm font-semibold text-white shadow-lg shadow-black/20"
          >
            <GithubIcon size={16} />
            @{GITHUB_USERNAME}
            <ExternalLink size={14} className="ml-1 text-gray-400" />
          </a>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ── Calendar Card ── */}
          <div className="lg:col-span-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 hover:border-white/20 transition-all duration-300 overflow-hidden">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <GitPullRequest className="text-cyan-400" size={20} />
              Contribution Graph
            </h3>
            {/* Horizontal scroll wrapper for mobile */}
            <div className="overflow-x-auto pb-4 -mx-2 px-2 custom-scrollbar">
              <div className="min-w-[750px]">
                <GitHubCalendar 
                  username={GITHUB_USERNAME} 
                  colorScheme="dark"
                  theme={{
                    dark: ['rgba(255,255,255,0.04)', 'rgba(34,211,238,0.4)', 'rgba(34,211,238,0.6)', 'rgba(34,211,238,0.8)', 'rgba(34,211,238,1)'],
                  }}
                />
              </div>
            </div>
          </div>

          {/* ── Stats Card ── */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 hover:border-white/20 transition-all duration-300 flex flex-col min-h-[350px]">
            <h3 className="text-xl font-bold text-white mb-6">Profile Stats</h3>
            
            {error ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                <AlertCircle size={32} className="text-red-400 mb-3" />
                <p className="text-gray-400 text-sm">Failed to load GitHub stats. The API might be rate-limited.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <StatBox icon={<BookOpen size={14} />} label="Repos" value={stats?.public_repos} loading={loading} />
                  <StatBox icon={<Star size={14} />} label="Stars" value={stats?.totalStars} loading={loading} />
                  <StatBox icon={<Users size={14} />} label="Followers" value={stats?.followers} loading={loading} />
                  <StatBox icon={<UserPlus size={14} />} label="Following" value={stats?.following} loading={loading} />
                </div>

                <div className="flex-1">
                  <h4 className="text-xs font-medium text-gray-400 mb-4 uppercase tracking-widest border-b border-white/10 pb-2">
                    Top Languages
                  </h4>
                  <div className="space-y-4 pt-2">
                    {loading ? (
                      Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <div className="w-24 h-4 bg-white/10 rounded-md animate-pulse" />
                          <div className="w-12 h-3 bg-white/5 rounded-md animate-pulse" />
                        </div>
                      ))
                    ) : stats?.topLanguages.length === 0 ? (
                      <div className="text-gray-500 text-sm">No language data found.</div>
                    ) : (
                      stats?.topLanguages.map((lang, idx) => (
                        <div key={lang.name} className="flex items-center justify-between">
                          <span className="text-white font-medium flex items-center gap-2.5">
                            <span className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : idx === 1 ? 'bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]' : 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]'}`} />
                            {lang.name}
                          </span>
                          <span className="text-gray-500 text-sm">{lang.count} repos</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
            
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="md:hidden mt-8 flex justify-center items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 transition-all font-semibold text-white"
            >
              <GithubIcon size={16} />
              View GitHub Profile
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function StatBox({ icon, label, value, loading }: { icon: React.ReactNode; label: string; value?: number; loading: boolean }) {
  return (
    <div className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
      <div className="text-gray-400 mb-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider">
        {icon} {label}
      </div>
      <div className="text-2xl font-bold text-white min-h-[32px]">
        {loading ? (
          <div className="w-12 h-6 mt-1 bg-white/10 rounded-md animate-pulse" />
        ) : (
          value !== undefined ? value : "-"
        )}
      </div>
    </div>
  );
}

// Inline Github Icon
const GithubIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

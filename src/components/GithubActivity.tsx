import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { 
  GitPullRequest, BookOpen, ExternalLink, 
  Star, AlertCircle, GitCommit, GitBranch, Clock, ArrowRight,
  Terminal
} from "lucide-react";

const GITHUB_USERNAME = "architect4182";

interface GithubUser {
  avatar_url: string;
  name: string;
  login: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  bio: string;
  created_at: string;
}

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url: string;
  size: number;
}

interface GithubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: any;
}

interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  "TypeScript": "bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]",
  "JavaScript": "bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]",
  "Java": "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]",
  "HTML/CSS": "bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]",
  "SQL": "bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]",
  "Python": "bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]",
};

const DEFAULT_COLOR = "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]";

export default function GithubActivity() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const [user, setUser] = useState<GithubUser | null>(null);
  const [events, setEvents] = useState<GithubEvent[]>([]);
  const [languages, setLanguages] = useState<LanguageStat[]>([]);
  const [featuredRepos, setFeaturedRepos] = useState<GithubRepo[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [totalStars, setTotalStars] = useState<number>(0);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchGithubData() {
      try {
        setLoading(true);
        setError(false);
        
        const [userRes, reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`)
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error("Failed to fetch GitHub data");

        const userData = await userRes.json();
        const reposData = await reposRes.json();
        let eventsData: GithubEvent[] = [];
        if (eventsRes.ok) {
          eventsData = await eventsRes.json();
        }

        setUser(userData);
        setEvents(eventsData.filter((e: any) => ["PushEvent", "PullRequestEvent", "CreateEvent"].includes(e.type)).slice(0, 4));

        // Process Languages
        const langMap: Record<string, number> = {};
        if (Array.isArray(reposData)) {
          reposData.forEach((repo: GithubRepo) => {
            if (repo.language) {
              langMap[repo.language] = (langMap[repo.language] || 0) + repo.size;
            }
          });
        }
        
        // Combine HTML/CSS
        const htmlCssSize = (langMap['HTML'] || 0) + (langMap['CSS'] || 0);
        delete langMap['HTML'];
        delete langMap['CSS'];
        if (htmlCssSize > 0) langMap['HTML/CSS'] = htmlCssSize;

        const totalSize = Object.values(langMap).reduce((a, b) => a + b, 0);
        const topLangs = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, size]) => ({
            name,
            percentage: Math.max(1, Math.round((size / totalSize) * 100)), // Real percentage
            color: LANGUAGE_COLORS[name] || DEFAULT_COLOR
          }));
          
        setLanguages(topLangs);

        // Process Recently Updated Repos
        // The API request already uses ?sort=updated
        const recentRepos = reposData
          .filter((r: GithubRepo) => !r.name.toLowerCase().includes('github.io')) // Optional: hide github pages repo if preferred, but we'll just take the top 4
          .slice(0, 4);
          
        setFeaturedRepos(recentRepos);

        // Calculate Total Stars
        const stars = reposData.reduce((acc: number, r: GithubRepo) => acc + r.stargazers_count, 0);
        setTotalStars(stars);

      } catch (err) {
        console.error("Error fetching GitHub stats", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchGithubData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  return (
    <section id="github" className="max-w-7xl mx-auto px-6 py-16" ref={ref}>
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-3 flex items-center gap-2">
              <Terminal size={16} /> Open Source
            </p>
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              GitHub & Open Source
            </h2>
          </div>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 transition-all text-sm font-semibold text-cyan-50 shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]"
          >
            <GithubIcon size={18} />
            View Full Profile
            <ArrowRight size={16} className="ml-1" />
          </a>
        </div>

        {error ? (
          <div className="backdrop-blur-xl bg-white/5 border border-red-500/20 rounded-3xl p-12 text-center flex flex-col items-center">
            <AlertCircle size={48} className="text-red-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Failed to load GitHub stats</h3>
            <p className="text-gray-400 max-w-md">The GitHub API might be rate-limited. Please try again later or check the console for details.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            
            {/* ROW 1: Profile & Contribution Map */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Profile Card */}
              <div className="lg:col-span-4 h-full">
                <motion.div variants={itemVariants} className="h-full backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-6 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden group flex flex-col justify-center">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                  
                  {loading ? (
                    <div className="animate-pulse flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-white/10" />
                        <div className="flex-1 space-y-2">
                          <div className="h-6 bg-white/10 rounded w-3/4" />
                          <div className="h-4 bg-white/10 rounded w-1/2" />
                        </div>
                      </div>
                      <div className="h-20 bg-white/10 rounded mt-4" />
                    </div>
                  ) : user && (
                    <div className="flex flex-col">
                      <div className="flex items-center gap-4 mb-5">
                        <div className="relative">
                          <img 
                            src={user.avatar_url} 
                            alt={user.name} 
                            className="w-20 h-20 rounded-full border-2 border-white/20 p-1 object-cover shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                          />
                          <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#121212]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white leading-tight">{user.name || "Chaithanya Pedhagali"}</h3>
                          <p className="text-xs text-cyan-400 font-medium mt-1 mb-1 leading-snug">
                            Information Technology Analyst <br />
                            Full Stack Developer
                          </p>
                          <a href={user.html_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white text-xs flex items-center gap-1 transition-colors">
                            @{user.login} <ExternalLink size={10} />
                          </a>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-5 mt-2">
                        <div className="text-center flex flex-col justify-center">
                          <p className="text-xl font-bold text-white">{user.public_repos}</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mt-1">Public Repos</p>
                        </div>
                        <div className="text-center border-l border-white/10 flex flex-col justify-center">
                          <p className="text-xl font-bold text-white">
                            {totalContributions > 0 ? totalContributions : totalStars}
                          </p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mt-1">
                            {totalContributions > 0 ? "Contributions" : "Total Stars"}
                          </p>
                        </div>
                        <div className="text-center border-l border-white/10 flex flex-col justify-center">
                          <p className="text-xl font-bold text-white">
                            {user.created_at ? new Date(user.created_at).getFullYear() : "-"}
                          </p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mt-1">Joined GitHub</p>
                        </div>
                      </div>

                      {user.followers >= 50 && (
                        <div className="flex justify-center gap-6 border-t border-white/10 pt-4 mt-5">
                           <span className="text-xs text-gray-400"><strong className="text-white">{user.followers}</strong> followers</span>
                           <span className="text-xs text-gray-400"><strong className="text-white">{user.following}</strong> following</span>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Contribution Activity */}
              <div className="lg:col-span-8 h-full">
                <motion.div variants={itemVariants} className="h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all duration-300 flex flex-col justify-center">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <GitPullRequest className="text-cyan-400" size={18} />
                      Contribution Activity
                    </h3>
                  </div>
                  
                  <div className="overflow-x-auto pb-2 custom-scrollbar bg-black/20 rounded-2xl p-4 border border-white/5">
                    <div className="min-w-[750px]">
                      <GitHubCalendar 
                        username={GITHUB_USERNAME} 
                        colorScheme="dark"
                        blockMargin={5}
                        blockSize={12}
                        fontSize={12}
                        theme={{
                          dark: ['rgba(255,255,255,0.05)', 'rgba(34,211,238,0.3)', 'rgba(34,211,238,0.5)', 'rgba(34,211,238,0.8)', 'rgba(34,211,238,1)'],
                        }}
                        transformData={(data) => {
                          const total = data.reduce((acc, curr) => acc + curr.count, 0);
                          if (total > 0 && totalContributions === 0) {
                            setTimeout(() => setTotalContributions(total), 0);
                          }
                          return data;
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ROW 2: Languages & Repositories */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Top Languages / Professional Tech Stack */}
              <div className="lg:col-span-4 h-full">
                <motion.div variants={itemVariants} className="h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all duration-300">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <BookOpen className="text-cyan-400" size={18} />
                    {(!loading && user && (languages.length < 3 || (user?.public_repos ?? 0) < 5)) ? "Professional Tech Stack" : "Top Languages"}
                  </h3>
                  
                  {loading ? (
                    <div className="space-y-5">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className="animate-pulse">
                          <div className="flex justify-between mb-2">
                            <div className="w-20 h-4 bg-white/10 rounded" />
                            <div className="w-8 h-4 bg-white/10 rounded" />
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full" />
                        </div>
                      ))}
                    </div>
                  ) : (languages.length < 3 || (user?.public_repos ?? 0) < 5) ? (
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      {["Java", "Spring Boot", "TypeScript", "React", "SQL", "Power BI", "Git"].map((tech, idx) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ delay: 0.1 * idx, duration: 0.3 }}
                          className="px-3.5 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-300 text-xs font-semibold shadow-[0_0_10px_rgba(34,211,238,0.1)] hover:bg-cyan-500/20 transition-colors"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {languages.map((lang, idx) => (
                        <div key={lang.name} className="group">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-300 font-medium">{lang.name}</span>
                            <span className="text-gray-500">{lang.percentage}%</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={inView ? { width: `${lang.percentage}%` } : { width: 0 }}
                              transition={{ duration: 1, delay: 0.2 + (idx * 0.1), ease: "easeOut" }}
                              className={`h-full rounded-full ${lang.color}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Recently Updated Repositories */}
              <div className="lg:col-span-8 h-full">
                <motion.div variants={itemVariants} className="h-full">
                  <h3 className="text-xl font-bold text-white mb-5 mt-2 lg:mt-0 flex items-center gap-2">
                    <Clock className="text-cyan-400" size={20} />
                    Recently Updated Repositories
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 h-[calc(100%-48px)]">
                    {loading ? (
                      Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 h-full min-h-[140px] animate-pulse" />
                      ))
                    ) : (
                      featuredRepos.map((repo) => (
                        <motion.a
                          key={repo.id}
                          href={repo.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="group block bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300 relative overflow-hidden h-full flex flex-col"
                          whileHover={{ y: -3 }}
                        >
                          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:via-purple-500/5 group-hover:to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl z-0" />
                          
                          <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="text-lg font-bold text-cyan-50 group-hover:text-cyan-300 transition-colors truncate pr-4">
                                {repo.name}
                              </h4>
                              <ExternalLink size={16} className="text-gray-500 group-hover:text-cyan-400 flex-shrink-0 transition-colors" />
                            </div>
                            
                            <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-1">
                              {repo.description || "No description provided."}
                            </p>
                            
                            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-medium mt-auto">
                              {repo.language && (
                                <span className="flex items-center gap-1.5">
                                  <span className={`w-2 h-2 rounded-full ${LANGUAGE_COLORS[repo.language] || DEFAULT_COLOR}`} />
                                  {repo.language}
                                </span>
                              )}
                              <span className="flex items-center gap-1 group-hover:text-gray-300 transition-colors">
                                <Star size={14} /> {repo.stargazers_count}
                              </span>
                              <span className="flex items-center gap-1 group-hover:text-gray-300 transition-colors">
                                <Clock size={14} /> {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(repo.updated_at))}
                              </span>
                            </div>
                          </div>
                        </motion.a>
                      ))
                    )}
                  </div>
                </motion.div>
              </div>
              
            </div>

            {/* ROW 3: Recent Activity Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-12 mt-2">
              <div className="lg:col-span-12">
                <motion.div variants={itemVariants} className="backdrop-blur-xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-3xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                    <Clock className="text-cyan-400" size={20} />
                    Recent Activity
                  </h3>
                  
                  {loading ? (
                    <div className="space-y-6">
                      {[1,2,3].map(i => (
                        <div key={i} className="flex gap-4 animate-pulse">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex-shrink-0" />
                          <div className="space-y-2 flex-1 pt-2">
                            <div className="h-4 bg-white/10 rounded w-1/4" />
                            <div className="h-3 bg-white/5 rounded w-1/2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : events.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No recent activity found.</div>
                  ) : (
                    <div className="relative border-l border-white/10 ml-5 space-y-8 pb-4">
                      {events.map((event, i) => {
                        let Icon = GitCommit;
                        let actionText = "performed an action";
                        let iconColor = "text-gray-400";
                        let bgColor = "bg-gray-800";
                        
                        if (event.type === "PushEvent") {
                          Icon = GitCommit;
                          actionText = `pushed to ${event.repo.name}`;
                          iconColor = "text-cyan-400";
                          bgColor = "bg-cyan-900/30";
                        } else if (event.type === "PullRequestEvent") {
                          Icon = GitPullRequest;
                          actionText = `${event.payload.action} a pull request in ${event.repo.name}`;
                          iconColor = "text-purple-400";
                          bgColor = "bg-purple-900/30";
                        } else if (event.type === "CreateEvent") {
                          Icon = GitBranch;
                          actionText = `created ${event.payload.ref_type} in ${event.repo.name}`;
                          iconColor = "text-green-400";
                          bgColor = "bg-green-900/30";
                        }

                        const date = new Date(event.created_at);
                        const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);

                        return (
                          <motion.div 
                            key={event.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
                            className="relative pl-8"
                          >
                            <div className={`absolute -left-[21px] top-1 p-2 rounded-full border border-white/10 ${bgColor}`}>
                              <Icon size={14} className={iconColor} />
                            </div>
                            
                            <div className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-2xl p-4 transition-all duration-300 group">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                <h4 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                                  {actionText}
                                </h4>
                                <span className="text-xs text-gray-500 whitespace-nowrap bg-black/20 px-2.5 py-1 rounded-full">
                                  {formattedDate}
                                </span>
                              </div>
                              
                              {event.type === "PushEvent" && event.payload.commits && event.payload.commits.length > 0 && (
                                <div className="mt-3 space-y-2">
                                  {event.payload.commits.slice(0, 2).map((commit: any) => (
                                    <div key={commit.sha} className="flex items-start gap-2 text-sm">
                                      <span className="text-cyan-500/70 font-mono text-xs mt-0.5">{commit.sha.substring(0, 7)}</span>
                                      <span className="text-gray-400 truncate flex-1">{commit.message}</span>
                                    </div>
                                  ))}
                                  {event.payload.commits.length > 2 && (
                                    <div className="text-xs text-gray-500 italic pl-[42px]">
                                      + {event.payload.commits.length - 2} more commits
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              </div>
            </div>

          </div>
        )}

        <div className="mt-8 flex justify-center md:hidden">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all font-semibold text-cyan-50 w-full justify-center"
          >
            <GithubIcon size={18} />
            View Full Profile on GitHub
          </a>
        </div>

      </motion.div>
    </section>
  );
}

// Inline Github Icon
const GithubIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

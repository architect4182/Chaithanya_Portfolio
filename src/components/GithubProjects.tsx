import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Code2 } from "lucide-react";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  updated_at: string;
  fork: boolean;
}

export default function GithubProjects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch("https://api.github.com/users/architect4182/repos?per_page=100");
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Repo[] = await res.json();
        
        const filtered = data
          .filter((repo) => !repo.fork && repo.description)
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          .slice(0, 6);
          
        setRepos(filtered);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  if (error) return null; // Fallback or hide section on error

  return (
    <section id="github" className="max-w-6xl mx-auto px-6 py-24" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65 }}
      >
        <p className="text-purple-400 text-sm font-medium tracking-widest uppercase mb-3">
          Open Source
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-14">
          GitHub Projects
        </h2>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, i) => (
            <motion.a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              key={repo.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col justify-between backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                    {repo.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.699-2.782.604-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {repo.description}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-medium text-gray-500 pt-4 border-t border-white/5">
                {repo.language && (
                  <div className="flex items-center gap-1.5 text-purple-400/80">
                    <Code2 size={14} />
                    <span>{repo.language}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Clock size={14} />
                  <span>
                    {new Date(repo.updated_at).toLocaleDateString(undefined, {
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
}

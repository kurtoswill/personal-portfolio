"use client";

import Contacts from "@/components/Contacts";
import { GridBackground } from "@/components/Grid";
import Projects from "@/components/HeroProjects";
import TechnologyList from "@/components/Technologies";
import { useEffect, useState } from "react";

// ================= GitHub Stats =================
interface GitHubUser {
  login: string;
  public_repos: number;
  followers: number;
}

interface GitHubRepository {
  stargazers_count: number;
  forks_count: number;
}

interface GitHubStatsType {
  repos: number;
  followers: number;
  stars: number;
  forks: number;
}

const GitHubStats = () => {
  const [stats, setStats] = useState<GitHubStatsType>({
    repos: 0,
    followers: 0,
    stars: 0,
    forks: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const username = "kurtoswill";

        const userResponse = await fetch(
          `https://api.github.com/users/${username}`
        );
        const userData: GitHubUser = await userResponse.json();

        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`
        );
        const reposData: GitHubRepository[] = await reposResponse.json();

        const totalStars = reposData.reduce(
          (sum, repo) => sum + repo.stargazers_count,
          0
        );
        const totalForks = reposData.reduce(
          (sum, repo) => sum + repo.forks_count,
          0
        );

        setStats({
          repos: userData.public_repos,
          followers: userData.followers,
          stars: totalStars,
          forks: totalForks,
        });
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 md:mt-12 max-w-4xl mx-auto">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="text-center animate-pulse">
            <div className="h-12 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-20 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 md:mt-12 max-w-4xl mx-auto cursor-pointer">
      {[
        { value: stats.repos, label: "Repositories" },
        { value: stats.followers, label: "Followers" },
        { value: stats.stars, label: "Stars" },
        { value: stats.forks, label: "Forks" },
      ].map((item, idx) => (
        <div key={idx} className="text-center group">
          <div className="flex flex-col items-center mb-2">
            <div className="text-4xl md:text-5xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
              {item.value.toLocaleString()}
            </div>
          </div>
          <div className="text-gray-400 text-sm uppercase tracking-wider">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  return (
    <div className="text-white">
      {/* Hero Section */}
      <section>
        <GridBackground
          gridSize={100}
          gridColor="#e4e4e7"
          darkGridColor="#262626"
          showFade={true}
          fadeIntensity={10}
          className="min-h-screen"
        >
          <div className="text-center pb-10 md:pb-20">
           <h1 className="text-[72px] md:text-[120px] font-bold tracking-tight leading-none mb-5">
                Kurt Oswill McCarver
            </h1>

            <p className="text-xl md:text-2xl max-w-5xl mx-auto opacity-75">
              A developer focused on building innovative projects and exploring
              new tech through hackathons and events, based in the Philippines.
            </p>
            <GitHubStats />
          </div>
        </GridBackground>
      </section>

      {/* About Section */}
      <section className="bg-[#080c14] py-12 md:py-20 text-center">
        <div className="max-w-4xl mx-auto font-medium">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me.</h2>
          <p className="text-lg md:text-xl text-white/75 leading-relaxed">
            I’m a <span className="text-white">Front-End Developer</span> moving
            into <span className="text-white">Full-Stack Development</span>{" "}
            through <span className="text-white">hackathons</span>. I mainly
            work with <span className="text-white">Next.js</span> and{" "}
            <span className="text-white">Supabase</span>, creating projects that{" "}
            <span className="text-white">make an impact</span>.
          </p>
          <p className="text-lg md:text-xl text-white/75 leading-relaxed mt-4">
            I’m a <span className="text-white">Student Developer</span> at{" "}
            <span className="text-white">AWS Spade</span> and had my first
            internship at <span className="text-white">Bitskwela</span>. I enjoy{" "}
            <span className="text-white">gaming</span>,{" "}
            <span className="text-white">traveling</span>, movies, and{" "}
            <span className="text-white">F1</span>.
          </p>
          <p className="text-lg md:text-xl text-white/75 leading-relaxed mt-4">
            My goal is to{" "}
            <span className="text-white">learn as much as I can </span>
            in college while exploring{" "}
            <span className="text-white">business </span>
            and <span className="text-white">startups</span>.
          </p>
        </div>
      </section>

      {/* Projects */}
      <Projects />

      {/* Technologies */}
      <TechnologyList />

      {/* Contacts */}
      <Contacts />
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Star, GitFork, Clock, ExternalLink } from 'lucide-react';
import { GitHubRepo, GitHubUser, GitHubStats } from '../../types/githubTypes';

const GitHubIntegration: React.FC = () => {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const USERNAME = 'A-Akhil'; // From rough_note.md

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const fetchGitHubData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${USERNAME}`);
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userDataResponse = await userResponse.json();
      setUserData(userDataResponse);

      // Fetch repositories
      const reposResponse = await fetch(
        `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=6`
      );
      if (!reposResponse.ok) {
        throw new Error('Failed to fetch repositories');
      }
      const reposData = await reposResponse.json();
      setRepos(reposData);

      // Calculate stats
      calculateStats(reposData);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch GitHub data');
      console.error('GitHub API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (repositories: GitHubRepo[]) => {
    const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repositories.reduce((sum, repo) => sum + repo.forks_count, 0);
    
    // Count languages
    const languageMap: { [key: string]: number } = {};
    repositories.forEach(repo => {
      if (repo.language) {
        languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
      }
    });

    const totalRepos = repositories.length;
    const mostUsedLanguages = Object.entries(languageMap)
      .map(([language, count]) => ({
        language,
        count,
        percentage: Math.round((count / totalRepos) * 100)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    setStats({
      totalCommits: 0, // Would need additional API calls
      totalStars,
      totalForks,
      totalRepos,
      mostUsedLanguages
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getLanguageColor = (language: string): string => {
    const colors: { [key: string]: string } = {
      JavaScript: '#f1e05a',
      TypeScript: '#2b7489',
      Python: '#3572A5',
      Java: '#b07219',
      'C++': '#f34b7d',
      C: '#555555',
      HTML: '#e34c26',
      CSS: '#1572B6',
      Shell: '#89e051',
      Jupyter: '#DA5B0B'
    };
    return colors[language] || '#8B949E';
  };

  if (isLoading) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm border border-ai-purple/30 rounded-xl p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-4 bg-gray-700 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm border border-red-500/30 rounded-xl p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-red-400 mb-2">GitHub Integration</h3>
          <p className="text-gray-400 text-sm">
            Unable to load GitHub data. API may be rate limited.
          </p>
          <button
            onClick={fetchGitHubData}
            className="mt-3 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900/50 backdrop-blur-sm border border-ai-purple/30 rounded-xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-ai-cyan flex items-center gap-2">
          <GitBranch size={20} />
          Live GitHub Activity
        </h3>
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ai-purple hover:text-ai-cyan transition-colors"
        >
          <ExternalLink size={16} />
        </a>
      </div>

      {/* User Stats */}
      {userData && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-ai-cyan">{userData.public_repos}</div>
            <div className="text-sm text-gray-400">Repositories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-ai-green">{stats?.totalStars || 0}</div>
            <div className="text-sm text-gray-400">Total Stars</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-ai-purple">{stats?.totalForks || 0}</div>
            <div className="text-sm text-gray-400">Total Forks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{userData.followers}</div>
            <div className="text-sm text-gray-400">Followers</div>
          </div>
        </div>
      )}

      {/* Most Used Languages */}
      {stats && stats.mostUsedLanguages.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-300 mb-3">Most Used Languages</h4>
          <div className="space-y-2">
            {stats.mostUsedLanguages.map(({ language, count, percentage }) => (
              <div key={language} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getLanguageColor(language) }}
                />
                <span className="text-sm text-gray-300 flex-1">{language}</span>
                <span className="text-sm text-gray-500">{count} repos</span>
                <span className="text-sm text-ai-cyan">{percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Repositories */}
      <div>
        <h4 className="text-sm font-semibold text-gray-300 mb-3">Recent Repositories</h4>
        <div className="space-y-3">
          {repos.slice(0, 4).map((repo) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start justify-between mb-2">
                <h5 className="font-medium text-ai-cyan group-hover:text-ai-green transition-colors">
                  {repo.name}
                </h5>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  {repo.stargazers_count > 0 && (
                    <div className="flex items-center gap-1">
                      <Star size={12} />
                      {repo.stargazers_count}
                    </div>
                  )}
                  {repo.forks_count > 0 && (
                    <div className="flex items-center gap-1">
                      <GitFork size={12} />
                      {repo.forks_count}
                    </div>
                  )}
                </div>
              </div>
              {repo.description && (
                <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                  {repo.description}
                </p>
              )}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {repo.language && (
                    <div className="flex items-center gap-1">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />
                      <span className="text-gray-400">{repo.language}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock size={12} />
                  {formatDate(repo.updated_at)}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="text-center">
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-ai-purple hover:text-ai-cyan transition-colors"
          >
            View all repositories on GitHub →
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default GitHubIntegration;

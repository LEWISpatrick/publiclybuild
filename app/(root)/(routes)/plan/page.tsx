'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useCurrentUser } from '@/hooks/use-current-user';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

const exampleRepos = ["facebook/react", "vercel/next.js", "tailwindlabs/tailwindcss"];
const exampleTweets = ["Tweet 1", "Tweet 2", "Tweet 3"];

const Page: React.FC = () => {
  const session = useCurrentUser();

  if (!session) {
    if (typeof window !== 'undefined') {
      window.location.href = '/register';
    }
    return null;
  }

  const [repoName, setRepoName] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [repos, setRepos] = useState<string[]>(exampleRepos);
  const [commits, setCommits] = useState<any[]>([]);
  const [tweets, setTweets] = useState<string[]>(exampleTweets);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRepos = async () => {
    if (!repoName) {
      toast.error('Please enter a repository name');
      return;
    }

    setLoading(true);
    toast.loading('⏳ Fetching repositories!');
    
    try {
      const response = await axios.post('/api/repos', { repoName });
      setRepos([response.data.full_name]);
      toast.dismiss();
      toast.success('Repositories fetched successfully!');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to fetch repository');
    } finally {
      setLoading(false);
    }
  };

  const fetchCommits = async (repo: string) => {
    // Implement fetching commits logic here
  };

  const generateTweets = async (commit: any) => {
    // Implement generating tweets logic here
  };

  const Describe = async () => {
    toast.success('🔥 Describe Your Project Well!?');
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      <h2 className="text-lg font-bold mt-4">Describe Your Product</h2>
      <Input
        type="text"
        className="p-4 border rounded-lg h-32"
        placeholder="Describe Your Project"
        size={50}
        value={projectDescription}
        onClick={Describe}
        onChange={(e) => setProjectDescription(e.target.value)}
      />
      <h2 className="text-lg font-bold mt-4">Repository name</h2>
      <Input
        type="text"
        placeholder="Enter repository name"
        className="p-4 border rounded-lg"
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
      />
      <p className="text-gray-500">Repository must be public</p>
      <Button className="p-4 mt-10 rounded-xl" onClick={fetchRepos}>
        Fetch Repository
      </Button>

      <div>
        <h2 className="text-lg font-bold mt-4">Choose GitHub Repository</h2>
        {loading ? (
          <p className="text-gray-500 italic">Loading...</p>
        ) : (
          <ul className="list-disc pl-5">
            {repos.length > 0 ? (
              repos.map((repo, index) => (
                <li
                  key={index}
                  onClick={() => fetchCommits(repo)}
                  className="cursor-pointer hover:underline"
                >
                  {repo}
                </li>
              ))
            ) : (
              <p className="text-gray-500 italic">No repositories available</p>
            )}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-lg font-bold mt-4">Choose GitHub Commit</h2>
        {loading ? (
          <p className="text-gray-500 italic">Loading...</p>
        ) : (
          <ul className="list-disc pl-5">
            {commits.length > 0 ? (
              commits.map((commit, index) => (
                <li
                  key={index}
                  onClick={() => generateTweets(commit)}
                  className="cursor-pointer hover:underline"
                >
                  {commit.message}
                </li>
              ))
            ) : (
              <p className="text-gray-500 italic">No commits available</p>
            )}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-lg font-bold mt-4">Generated Tweets</h2>
        <div className="space-y-4">
          {tweets.length > 0 ? (
            tweets.map((tweet, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg flex justify-between items-center"
              >
                <p>{tweet}</p>
                <Button>Post</Button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No tweets generated</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;

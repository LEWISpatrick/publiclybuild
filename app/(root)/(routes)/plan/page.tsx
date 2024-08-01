'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCurrentUser } from '@/hooks/use-current-user';
import { toast } from 'react-hot-toast';

const exampleRepos = ["No repositories available"];
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
  const [selectedCommit, setSelectedCommit] = useState<any>(null);
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
      const response = await fetch('/api/repos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repoName }),
      });
      const data = await response.json();

      if (response.ok) {
        setRepos([data.full_name]);
        toast.dismiss();
        toast.success('Repositories fetched successfully!');
        await fetchCommits(data.full_name);
      } else {
        throw new Error(data.error || 'Failed to fetch repository');
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || 'Failed to fetch repository');
    } finally {
      setLoading(false);
    }
  };

  const fetchCommits = async (repoFullName: string) => {
    setLoading(true);
    toast.loading('⏳ Fetching commits!');

    try {
      const response = await fetch('/api/commits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repoFullName }),
      });
      const data = await response.json();

      if (response.ok) {
        setCommits(data);
        toast.dismiss();
        toast.success('Commits fetched successfully!');
      } else {
        throw new Error(data.error || 'Failed to fetch commits');
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || 'Failed to fetch commits');
    } finally {
      setLoading(false);
    }
  };

  const generateTweets = async () => {
    if (!selectedCommit) {
      toast.error('Please select a commit');
      return;
    }

    const payload = {
      projectDescription,
      commitMessage: selectedCommit.commit.message,
      commitDate: selectedCommit.commit.author.date,
    };

    setLoading(true);
    toast.loading('⏳ Generating tweets!');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (response.ok) {
        setTweets(data.tweets);
        toast.dismiss();
        toast.success('Tweets generated successfully!');
      } else {
        throw new Error(data.error || 'Failed to generate tweets');
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || 'Failed to generate tweets');
    } finally {
      setLoading(false);
    }
  };

  const Describe = async () => {
    toast.success('🔥 Describe Your Project Well!?');
  };

  return (
    <div className='flex flex-col space-y-4 p-4'>
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
                  onClick={() => setSelectedCommit(commit)}
                  className="cursor-pointer hover:underline"
                >
                  <p>Message: {commit.commit.message}</p>
                  <p>Date: {new Date(commit.commit.author.date).toLocaleString()}</p>
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
        <Button className="p-4 mt-10 rounded-xl" onClick={generateTweets}>
          Generate Tweets
        </Button>
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

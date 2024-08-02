'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCurrentUser } from '@/hooks/use-current-user';
import { toast } from 'react-hot-toast';

const exampleRepos = ["No repositories available"];

const Page: React.FC = () => {
  const session = useCurrentUser();
  const [repoName, setRepoName] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [repos, setRepos] = useState<string[]>(exampleRepos);
  const [commits, setCommits] = useState<any[]>([]);
  const [selectedCommit, setSelectedCommit] = useState<any>(null);
  const [tweet, setTweet] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [freeTweetsUsed, setFreeTweetsUsed] = useState<number>(0);
  const [hasSubscription, setHasSubscription] = useState<boolean>(false);

  useEffect(() => {
    const fetchFreeTweetsCount = async () => {
      try {
        const response = await fetch('/api/freetweets');
        if (!response.ok) throw new Error('Failed to fetch free tweets count');
        const data = await response.json();
        setFreeTweetsUsed(data.freeTweetsUsed);
        setHasSubscription(data.hasSubscription); // Check if the user has a subscription
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch free tweets count');
        console.log(error.message || 'Failed to fetch free tweets count');
      }
    };

    fetchFreeTweetsCount();
  }, []);

  if (!session) {
    if (typeof window !== 'undefined') {
      window.location.href = '/register';
    }
    return null;
  }

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
      if (!response.ok) throw new Error('Failed to fetch repository');
      const data = await response.json();
      setRepos([data.full_name]);
      toast.dismiss();
      toast.success('Repositories fetched successfully!');
      await fetchCommits(data.full_name);
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
      if (!response.ok) throw new Error('Failed to fetch commits');
      const data = await response.json();
      setCommits(data);
      toast.dismiss();
      toast.success('Commits fetched successfully!');
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || 'Failed to fetch commits');
    } finally {
      setLoading(false);
    }
  };

  const generateTweet = async () => {
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
    toast.loading('⏳ Generating tweet!');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Failed to generate tweet');
      const data = await response.json();
      if (data.url) {
        toast.dismiss();
        toast('Must have a Subscription', { icon: '💳' });
        window.location.href = data.url;
      } else {
        setTweet(data.tweet);
        toast.dismiss();
        toast.success('Tweet generated successfully!');
        if (!hasSubscription) {
          setFreeTweetsUsed((prev) => prev + 1);
        }
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || 'Failed to generate tweet');
    } finally {
      setLoading(false);
    }
  };

  const Describe = async () => {
    toast.success('🔥 Describe Your Project Well!?');
  };

  const createTweetLink = (tweet: string) => {
    return `https://x.com/intent/post?text=${encodeURIComponent(tweet)}`;
  };

  return (
    <div className='flex flex-col space-y-4 p-4'>
      <h2 className="text-lg font-bold mt-4">Describe Your Project/Commit</h2>
      <Input
        type="text"
        className="p-4 border rounded-lg h-32"
        placeholder="Project is about how to drink water"
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
        <h2 className="text-lg font-bold mt-4">Generated Tweet</h2>
        <Button className="p-4 mt-10 rounded-xl" onClick={generateTweet}>
          Generate Tweet
        </Button>
        {!hasSubscription && (
          <p className="text-gray-500 mt-2">{`You have generated ${freeTweetsUsed}/3 free tweets`}</p>
        )}
        <div className="space-y-4">
          {tweet ? (
            <div
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <p>{tweet}</p>
              <a href={createTweetLink(tweet)} target="_blank" rel="noopener noreferrer">
                <Button>Post</Button>
              </a>
            </div>
          ) : (
            <p className="text-gray-500 italic">No tweet generated</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;

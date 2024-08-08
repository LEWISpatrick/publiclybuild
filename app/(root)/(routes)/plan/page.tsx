// always add use client
'use client'
import React, { useState, useEffect } from 'react';
import { useCurrentUser } from '@/hooks/use-current-user';
import { toast } from 'react-hot-toast';
import RepositorySelector from '@/components/plan/RepositorySelector';
import CommitSelector from '@/components/plan/CommitSelector';
import TweetTemplateSelector from '@/components/plan/TweetTemplateSelector';
import GeneratedTweet from '@/components/plan/GeneratedTweet';
import { string } from 'zod';

const Page: React.FC = () => {
  const session = useCurrentUser();
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [repos, setRepos] = useState<any[]>([]);
  const [currentRepoIndex, setCurrentRepoIndex] = useState<number>(0);
  const [commits, setCommits] = useState<any[]>([]);
  const [selectedCommit, setSelectedCommit] = useState<any>(null);
  const [tweet, setTweet] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [freeTweetsUsed, setFreeTweetsUsed] = useState<number>(0);
  const [hasSubscription, setHasSubscription] = useState<boolean>(false);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      toast.loading('⏳ Fetching repositories!');

      try {
        const response = await fetch('/api/repos');
        if (!response.ok) throw new Error('Failed to fetch repositories');
        const data = await response.json();
        setRepos(data);
        toast.dismiss();
        toast.success('Repositories fetched successfully!');
      } catch (error: any) {
        toast.dismiss();
        toast.error(error.message || 'Failed to fetch repositories');
      } finally {
        setLoading(false);
      }
    };

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

    fetchRepos();
    fetchFreeTweetsCount();
  }, []);

  if (!session) {
    if (typeof window !== 'undefined') {
      window.location.href = '/register';
    }
    return null;
  }

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

  const tweetTemplates = [
    "🚀 Just pushed new updates to my project! Check out the latest progress on [repoName]. #dev #coding",
    "🛠️ Made some significant improvements to [repoName] today. Stay tuned for more updates! #programming #openSource",
    "💻 Excited to share the latest commit for [repoName]. Can't wait to see where this project goes! #tech #GitHub"
  ];

  const generateTweet = async () => {
    if (!selectedCommit) {
      toast.error('Please select a commit');
      return;
    }

    if (selectedTemplate === null) {
      toast.error('Please select a tweet template');
      return;
    }

    const payload = {
      projectDescription,
      commitMessage: selectedCommit.commit.message,
      commitDate: selectedCommit.commit.author.date,
      template: tweetTemplates[selectedTemplate],
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

  const createTweetLink = (tweet: string) => {
    return `https://x.com/intent/post?text=${encodeURIComponent(tweet)}`;
  };

  const Describe = async () => {
    toast.success('🔥 Describe Your Project Well!?');
  };

  return (
    <div className='flex flex-col space-y-4 min-w-xl p-4'>
     
      <h1 className="text-xlg text-center font-bold mt-4">Describe Your Project/Commit</h1>
      <textarea
        className="p-4 border rounded-lg resize-none h-32"
        placeholder="Project is about how to drink water"
        value={projectDescription}
        onClick={Describe}
        onChange={(e) => setProjectDescription(e.target.value)}
        rows={4}
      />
   <div className='flex items-center justify-center'>
    
   </div>

      <RepositorySelector
        repos={repos}
        currentRepoIndex={currentRepoIndex}
        setCurrentRepoIndex={setCurrentRepoIndex}
        fetchCommits={fetchCommits}
        loading={loading}
      />

      <CommitSelector
        commits={commits}
        selectedCommit={selectedCommit}
        setSelectedCommit={setSelectedCommit}
        loading={loading}
      />
 
      <TweetTemplateSelector
        tweetTemplates={tweetTemplates}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
      />

   <div className='flex items-center justify-center'>

       <GeneratedTweet
        tweet={tweet}
        createTweetLink={createTweetLink}
        generateTweet={generateTweet}
        freeTweetsUsed={freeTweetsUsed}
        hasSubscription={hasSubscription}
        selectedTemplate={selectedTemplate}
      />
   </div>
   

      <div className='flex items-center justify-center mt-36'> <a
        href="https://www.producthunt.com/products/publiclybuild/reviews?utm_source=badge-product_review&utm_medium=badge&utm_souce=badge-publiclybuild"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=598172&theme=light"
          alt="PubliclyBuild - Transforms GitHub commits into Twitter/X Post | Product Hunt"
          style={{ width: '250px', height: '54px' }}
        />
      </a></div>

      
          </div>
  );
};

export default Page;

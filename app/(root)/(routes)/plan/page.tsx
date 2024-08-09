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

  const tweetTemplates = {
    Funny: [
      "😂 Just wrote some code that works on the first try... I must be dreaming! #codinglife #devhumor",
      "🤖 My code just passed all the tests. I think it might be sentient now... #AI #techjokes",
      "😅 Just realized I spent 2 hours debugging a typo. #programming #developerproblems",
    ],
    Mean: [
      "🙄 If I had a dollar for every time someone said 'It's just a small change', I'd be rich. #developerlife #devrant",
      "😤 Another day, another 'urgent' feature request... #programming #productivity",
      "😡 Nothing like a last-minute change request to ruin a perfectly good day. #devlife #programming",
    ],
    Romantic: [
      "❤️ My code and I? It's a love-hate relationship. #programming #developerlife",
      "💌 Just sent my latest commit into the world. Hope it finds its true love in production. #devlife #romantic",
      "💕 Coding late into the night, it's just me, my code, and some romantic synthwave. #developerlife #coding",
    ],
    Business: [
      "💼 Excited to announce the latest feature in [repoName]! It's a game changer. #business #startup",
      "📈 Our latest update just went live. Check out the new and improved [repoName]! #sales #growth",
      "🤑 Just added a new feature to [repoName] that will boost your productivity by 200%. #business #tech",
    ],
    Inspirational: [
      "🌟 Success is not just about code, it's about persistence. Keep pushing those commits! #motivation #developerlife",
      "🚀 Every line of code is a step closer to greatness. Keep going! #inspiration #coding",
      "💪 Progress is progress, no matter how small. Keep coding, keep creating. #motivation #devlife",
    ],
    Sarcastic: [
      "🙃 Just spent 3 hours fixing a bug that could have been avoided with a simple comment. #sarcasm #devlife",
      "🤷‍♂️ 'Just add this small feature,' they said. 'It won't take long,' they said. #sarcasm #developerproblems",
      "😏 Another day, another 'quick fix'. Sure, let's pretend that's a thing. #sarcasm #programming",
    ],
    Informative: [
      "📚 Did you know? [repoName] now supports [feature]. Here's how it works... #education #programming",
      "📝 Just published a new blog post about [repoName]. Check it out to learn more! #dev #opensource",
      "🎓 Just implemented [feature] in [repoName]. Here's a quick breakdown of how it works... #coding #learning",
    ],
    Encouraging: [
      "👏 Just wrapped up a big milestone for [repoName]. Keep pushing forward! #encouragement #devlife",
      "🙌 We're all in this together. Keep coding and stay inspired! #encouragement #programming",
      "💥 Another successful commit in the books! You're doing great. Keep it up! #encouragement #devlife",
    ],
    Reflective: [
      "🤔 Looking back at the progress I've made on [repoName]... It's been quite the journey. #reflection #devlife",
      "💭 Sometimes it's good to pause and appreciate how far your project has come. #reflection #programming",
      "🛤️ The path to creating [repoName] wasn't easy, but it was worth every step. #reflection #coding",
    ],
    ProductPromotion: [
      "🎉 Big news! [repoName] now has [feature]. Check it out and let us know what you think! #productupdate #tech",
      "🚀 Just released a major update for [repoName]. New features, better performance, same great experience. #update #dev",
      "🔔 New in [repoName]: [feature]! Upgrade now to take advantage of the latest and greatest. #productlaunch #tech",
    ],
    Question: [
      "🤔 What's the most challenging part of your coding journey? Let's discuss! #developerlife #coding",
      "💬 Just added a new feature to [repoName]. How do you like to use it? #engagement #tech",
      "🗨️ Curious to hear your thoughts on [feature] in [repoName]. What do you think? #feedback #dev",
    ],
    Teaser: [
      "👀 Something big is coming to [repoName]... Stay tuned! #teaser #devlife",
      "🛠️ Working on something special for [repoName]. Can't wait to share it with you! #comingsoon #tech",
      "🎯 Focused on the next big feature for [repoName]. Any guesses? #teaser #programming",
    ],
    ThankYou: [
      "🙏 Huge thanks to everyone contributing to [repoName]. Your support means the world! #thankyou #opensource",
      "🙌 Big shoutout to the community for making [repoName] even better. Thank you! #appreciation #dev",
      "👏 Couldn't have done it without the support of amazing developers like you. Thanks for helping with [repoName]! #gratitude #tech",
    ],
    Celebratory: [
      "🎉 Just hit a major milestone with [repoName]! Thanks to everyone who made it possible. #celebration #dev",
      "🍾 Cheers to another successful update for [repoName]. Onward and upward! #celebrate #coding",
      "🥳 Time to celebrate! [repoName] just crossed [milestone]. Couldn't be more excited! #achievement #tech",
    ],
    FriendlyReminder: [
      "🛡️ Don't forget to update [repoName] to the latest version for all the new features and fixes! #reminder #tech",
      "🔄 Reminder: Regular updates keep your projects secure and running smoothly. Update [repoName] today! #tech #update",
      "🚨 Have you updated [repoName] yet? Now's the time! #reminder #devlife",
    ],
    Personal: [
      "🌱 Reflecting on the journey of building [repoName]. It's been an incredible experience. #personal #devlife",
      "📝 Every line of code tells a story. [repoName] is a part of mine. #personal #programming",
      "💡 Building [repoName] has taught me so much. Here's to the lessons learned along the way. #personal #reflection",
    ],
    Technical: [
      "🔍 Just optimized the performance of [repoName] by refactoring [feature]. Feels good! #tech #programming",
      "⚙️ Implemented [feature] in [repoName] today. Here’s a breakdown of the technical details... #dev #opensource",
      "🔧 Just completed a deep dive into [repoName]’s [feature]. Here’s what I found... #tech #coding",
    ],
    Casual: [
      "😎 Just another day in the life of [repoName]. Keepin' it cool and casual. #devlife #tech",
      "☕️ Code, coffee, and [repoName]. The perfect trio for a productive day. #casual #coding",
      "🎶 Coding to some chill beats while working on [repoName]. Life is good. #casual #programming",
    ],
  };
  

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
  const handleTemplateSelection = (index: number) => {
    setSelectedTemplate(index);
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
 
 <TweetTemplateSelector tweetTemplates={tweetTemplates} onTemplateSelect={handleTemplateSelection} />



       <GeneratedTweet
        tweet={tweet}
        createTweetLink={createTweetLink}
        generateTweet={generateTweet}
        freeTweetsUsed={freeTweetsUsed}
        hasSubscription={hasSubscription}
        selectedTemplate={selectedTemplate}
      />
   

<a
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

      
          
  );
};

export default Page;

import React from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  tweet: string | null;
  createTweetLink: (tweet: string) => string;
  generateTweet: () => void;
  freeTweetsUsed: number;
  hasSubscription: boolean;
  selectedTemplate: number | null;
}

const GeneratedTweet: React.FC<Props> = ({
  tweet,
  createTweetLink,
  generateTweet,
  freeTweetsUsed,
  hasSubscription,
  selectedTemplate,
}) => {
  return (
    <div>
      <h2 className="text-lg font-bold mt-4">Generated Tweet</h2>
      <Button className="p-4 mt-10 rounded-xl" onClick={generateTweet} disabled={selectedTemplate === null}>
        Generate Tweet
      </Button>
      {!hasSubscription && (
        <p className="mt-2">{`You have generated ${freeTweetsUsed}/3 free tweets`}</p>
      )}
      <div className="space-y-4">
        {tweet ? (
          <div className="p-4 border rounded-lg flex justify-between items-center">
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
  );
};

export default GeneratedTweet;

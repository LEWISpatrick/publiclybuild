'use client'
import React from 'react';
import { Button } from './ui/button';

interface Tweet {
  id: number;
  title: string;
  text: string;
  link: string;
}

const tweets: Tweet[] = [
  {
    id: 1,
    title: 'Tweet #1',
    text: `🎥 Just revamped the video section! 🎉\nLoving how PubliclyBuild transforms every GitHub commit into a tweet. 📈\nNo more fussing over scheduling; it’s all automated! 🔄\nPerfect for staying active on Twitter without the hassle. 😎`,
    link: 'https://x.com/intent/post?text=%F0%9F%8E%A5+Just+revamped+the+video+section%21+%F0%9F%8E%89+\nLoving+how+PubliclyBuild+transforms+every+GitHub+commit+into+a+tweet.+%F0%9F%93%88+No+more+fussing+over+scheduling%3B+it%E2%80%99s+all+automated%21+\n%F0%9F%94%84+Perfect+for+staying+active+on+Twitter+without+the+hassle.+%F0%9F%98%8E',
  },
  {
    id: 2,
    title: 'Tweet #2',
    text: `Ever wished your GitHub commits could speak for themselves? 🗣️\nPubliclyBuild does just that!\nSet it up, and every commit becomes a scheduled tweet. 📅\nToday, I tweaked the video section, and it's looking sharp! 🎬`,
    link: 'https://x.com/intent/post?text=Ever+wished+your+GitHub+commits+could+speak+for+themselves%3F+%F0%9F%97%A3%EF%B8%8F+PubliclyBuild+does+just+that%21+\nSet+it+up%2C+and+every+commit+becomes+a+scheduled+tweet.+%F0%9F%93%85+Today%2C+I+tweaked+the+video+section%2C+and+it%27s+looking+sharp%21+%F0%9F%8E%AC',
  },
  {
    id: 3,
    title: 'Tweet #3',
    text: `✨ New feature alert! Our video section just got a sweet upgrade.\nThanks to PubliclyBuild, every GitHub commit you make gets tweeted automatically!\nNo more manual posting, it’s all done for you. 🚀\nCode smarter, not harder. 💡\n#TechLife #DevCommunity`,
    link: 'https://x.com/intent/post?text=%E2%9C%A8+New+feature+alert%21+Our+video+section+just+got+a+sweet+upgrade.+\nThanks+to+PubliclyBuild%2C+every+GitHub+commit+you+make+gets+tweeted+automatically%21+\nNo+more+manual+posting%2C+it%E2%80%99s+all+done+for+you.+%F0%9F%9A%80+Code+smarter%2C+not+harder.+%F0%9F%92%A1+#TechLife%20#DevCommunity',
  },
];

const Tweet: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl text-xl mx-auto shadow-lg rounded-lg">
      <div className="space-y-4">
         {tweets.map((tweet) => (
          <div key={tweet.id} className="border-b pb-6">
            <h1 className='text-4xl mb-4'>{tweet.title}:</h1>
            {tweet.text.split('\n').map((paragraph, index) => (
              <p key={index} className="leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
            <Button
              className="mt-4 w-full py-2 px-4"
              onClick={() => window.open(tweet.link.replace(/\n/g, '%0A'), '_blank')}
            >
              Post Now
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tweet;

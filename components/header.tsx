'use client'

import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

const IframeWithSkeleton = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const iframe = document.getElementById('youtube-iframe') as HTMLIFrameElement;
    if (iframe) {
      const handleIframeLoad = () => {
        setIframeLoaded(true);
      };

      iframe.addEventListener('load', handleIframeLoad);

      return () => {
        iframe.removeEventListener('load', handleIframeLoad);
      };
    }
  }, []);

  return (
    <>
      {!iframeLoaded && <Skeleton className="w-full max-w-2xl h-full  aspect-video" />}
      <iframe
        id="youtube-iframe"
        src="https://www.youtube.com/embed/FjqDG8p77ng?si=kCojjV0WTDiPriLk"                 title="YouTube Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        className={`w-full max-w-2xl h-auto aspect-video rounded-[6px] ${iframeLoaded ? '' : 'hidden'}`}
      ></iframe>
    </>
  );
};

export const Header = () => {
  return (
    <div className="space-y-20 mt-44">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center text-center lg:text-left ">
          <h2 className="text-4xl font-extrabold sm:text-5xl">
          Focus on your startup,
not Twitter Posts

          </h2>
          <p className="mt-4 text-lg text-foreground">
          Use Your GitHub Commits to Create Engaging Content For Your Twitter.
</p>
          <div className="flex justify-center lg:justify-start items-center mt-4">
            <Link href="/register">
              <Button className="gap-2">
                <Sparkles className="h-5 w-5" />
                <span>Get Started</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center rounded-lg overflow-hidden">
          <IframeWithSkeleton />
        </div>
      </div>
    </div>
  )
}

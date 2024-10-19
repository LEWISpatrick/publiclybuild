'use client'

import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

const IframeWithSkeleton = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false)

  useEffect(() => {
    const iframe = document.getElementById(
      'youtube-iframe'
    ) as HTMLIFrameElement
    if (iframe) {
      const handleIframeLoad = () => {
        setIframeLoaded(true)
      }

      iframe.addEventListener('load', handleIframeLoad)

      return () => {
        iframe.removeEventListener('load', handleIframeLoad)
      }
    }
  }, [])

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
      {!iframeLoaded && <Skeleton className="absolute inset-0" />}
      <iframe
        id="youtube-iframe"
        src="https://www.youtube.com/embed/FjqDG8p77ng?si=kCojjV0WTDiPriLk"
        title="YouTube Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        className={`absolute inset-0 w-full h-full ${iframeLoaded ? '' : 'invisible'}`}
      ></iframe>
    </div>
  )
}

export const Header = () => {
  return (
    <section className="py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2">
            <IframeWithSkeleton />
          </div>
          <div className="w-full lg:w-1/2 space-y-8">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Focus on your startup,
              <br />
              not Twitter Posts
            </h1>
            <p className="text-xl text-muted-foreground">
              Use Your GitHub Commits to Create Engaging Content For Your
              Twitter.
            </p>
            <Link href="/register">
              <Button className="group text-lg px-6 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                <Sparkles className="h-5 w-5 mr-2 transition-transform group-hover:rotate-12" />
                <span>Get Started</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { Header } from '@/components/auth/header'
import { Social } from '@/components/auth/social'
import { BackButton } from '@/components/auth/back-button'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'

interface CardWrapperProps {
  headerTitle: string
  showSocial?: boolean
}

export const CardWrapper = ({
  
  headerTitle,
  showSocial
}: CardWrapperProps) => {
  return (
    <Card className="mx-auto w-full max-w-sm bg-secondary/90 border border-foreground/5 rounded-lg px-7">
      <CardHeader>
        <Header title={headerTitle} />
      </CardHeader>

      

      {showSocial && (
        <div>
          <Social />
        </div>
      )}

    </Card>
  )
}

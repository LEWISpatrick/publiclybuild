'use client'

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import AvatarCircles from '@/components/ui/user-avatar-card'

export const Testimonials = () => {
  // Add or remove testimonials here following this format
  const testimonials = [
    {
      name: 'John Doe',
      avatar: '/testimonials/john-doe.jpg',
      message: 'Your genuine testimonials are important. Let us know how PubliclyBuild has helped with your social media management and reduced your workload. Contact us at patricklewis2009@gmail.com.'
    },
  ]

  return (
    <div className="py-12 bg-background">
      {/* Section Title */}
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        <h2 className="pb-4 text-4xl font-extrabold text-foreground">
          Testimonials
        </h2>
        <p className="text-md opacity-50 max-w-lg">
          Describe how PubliclyBuild has made building in public easier and more efficient for you. Your feedback helps us improve and assists other users.
        </p>
        <AvatarCircles />
      </div>
      {/* Testimonials Card*/}
      <div className="flex items-center justify-center my-6">
        <div className="grid grid-cols-1  gap-6 max-w-sm">
          {testimonials.map((testimonial, i) => (
            <Card
              key={i}
              className="py-4 px-0 bg-secondary border-0 ring-[2px] ring-foreground/10 ring-inset rounded-lg hover:bg-primary/10 hover:ring-primary/25 transition duration-300 cursor-default"
            >
              <CardContent className="py-0 text-center">
                <div className="flex justify-center">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                  </Avatar>
                </div>
                <CardTitle className="text-lg pt-2 text-foreground">
                  {testimonial.name}
                </CardTitle>
                <p className="pt-3 text-foreground/70">
                  "{testimonial.message}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

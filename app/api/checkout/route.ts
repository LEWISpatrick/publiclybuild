import { auth } from '@/auth'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const user = await auth()

    if (!user || !user.user.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const userSubscription = await db.userSubscription.findUnique({
      where: {
        userId: user.user.id
      }
    })

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: process.env.APP_URL || 'http://localhost:3000',
      });
      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }


    const stripeSession = await stripe.checkout.sessions.create({
      success_url: process.env.APP_URL,
      cancel_url: process.env.APP_URL,
      payment_method_types: ['card'],

      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: user?.user.email!,

      line_items: [
        {
          price_data: {
            currency: 'USD',
            product_data: {
              name: 'PubliclyBuild Subscription ',
              description: 'Forget the manual process of Making Twitter posts. Reduce anxiety and focus on your startup with our 1-minute, no-code setup to generate posts and schedule them effortlessly.              '
            },
            // cost (change this to the price of your product)
            unit_amount: 999,
            recurring: {
              interval: 'month'
            }
          },
          quantity: 1
        }
      ],
      metadata: {
        userId: user.user.id
      }
    })
    return new NextResponse(JSON.stringify({ url: stripeSession.url }))
  } catch (error) {
    console.log('[STRIPE_GET]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

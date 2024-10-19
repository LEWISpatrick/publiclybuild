import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === 'checkout.session.completed') {
    if (!session?.metadata?.userId) {
      return new NextResponse('No user id found', { status: 400 })
    }

    await db.userSubscription.create({
      data: {
        userId: session.metadata.userId,
        stripeCustomerId: session.customer as string,
        stripePurchaseId: session.id,
        purchaseDate: new Date()
      }
    })
  }

  return new NextResponse(null, { status: 200 })
}

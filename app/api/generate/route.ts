// app/api/generate/route.ts

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { stripe } from '@/lib/stripe';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

export const POST = async (req: Request) => {
  const { projectDescription, commitMessage, commitDate } = await req.json();
  try {
    const user = await auth();

    if (!user || !user.user.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userRecord = await db.user.findUnique({
      where: { id: user.user.id },
    });

    if (!userRecord) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userSubscription = await db.userSubscription.findUnique({
      where: { userId: user.user.id },
    });

    if (!userSubscription && userRecord.freeTweetsUsed >= 3) {
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
                name: 'PubliclyBuild Subscription',
                description: 'Generate Unlimited posts effortlessly with our 1-minute, no-code setup.',
              },
              unit_amount: 499,
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          userId: user.user.id,
        },
      });
      return NextResponse.json({ url: stripeSession.url });
    }

    if (!userSubscription) {
      await db.user.update({
        where: { id: user.user.id },
        data: { freeTweetsUsed: { increment: 1 } },
      });
    }

    const prompt = `
      Generate a tweet about the following project and commit:
      Project description / Commit Message Description: ${projectDescription}
      Commit message: ${commitMessage}
      Commit date: ${commitDate}
      Make the Tweet sound like a human.
    `;

    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const tweet = response.choices.map((choice: any) => choice.message?.content.trim());

    return NextResponse.json({ tweet });
  } catch (error) {
    console.log('[STRIPE_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

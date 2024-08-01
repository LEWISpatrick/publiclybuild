import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

export const POST = async (req: Request) => {
  const { projectDescription, commitMessage, commitDate } = await req.json();

  const prompt = `
    Generate a tweet about the following project and commit:
    Project description: ${projectDescription}
    Commit message: ${commitMessage}
    Commit date: ${commitDate}
    Make the Tweet sound like a human.
  `;

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const tweet = response.choices.map((choice: any) => choice.message?.content.trim());

    return NextResponse.json({ tweet });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate tweet' }, { status: 500 });
  }
};


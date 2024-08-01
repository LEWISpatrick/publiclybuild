// app/api/commits/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  const { repoFullName } = await request.json();

  if (!repoFullName || typeof repoFullName !== 'string') {
    return NextResponse.json({ error: 'Repository full name is required' }, { status: 400 });
  }

  try {
    const user = await auth();

    if (!user || !user.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const User: any = await db.user.findUnique({
      where: {
        id: user.user.id,
      },
    });

    if (!User || !User.name) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const response = await fetch(`https://api.github.com/repos/${repoFullName}/commits`);
    if (!response.ok) {
      throw new Error('Failed to fetch commits');
    }
    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching commits' }, { status: 500 });
  }
}

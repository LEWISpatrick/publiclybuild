// app/api/repos/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';

interface Repository {
  id: number;
  full_name: string;
  name: string;
}

export async function POST(request: Request) {
  const { repoName } = await request.json();

  if (!repoName || typeof repoName !== 'string') {
    return NextResponse.json({ error: 'Repository name is required' }, { status: 400 });
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

    const response = await fetch(`https://api.github.com/repos/${User.name}/${repoName}`);
    if (!response.ok) {
      throw new Error('Failed to fetch repository');
    }
    const data: Repository | null = await response.json();

    if (data) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Repository not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching repository' }, { status: 500 });
  }
}

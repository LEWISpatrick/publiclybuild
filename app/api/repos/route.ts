// app/api/repos/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';

interface Repository {
  id: number;
  full_name: string;
  name: string;
  created_at: string;
}

export async function GET() {
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

    const response = await fetch(`https://api.github.com/users/${User.name}/repos`);
    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }
    const data: Repository[] = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching repositories' }, { status: 500 });
  }
}

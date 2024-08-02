// app/api/freetweets/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth'; // Adjust the path as needed
import { db } from '@/lib/db'; // Adjust the path as needed

export async function GET(request: NextRequest) {
  try {
    const user = await auth();

    if (!user || !user.user || !user.user.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const User: any = await db.user.findUnique({
      where: { email: user.user.email },
    });

    if (!User) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ freeTweetsUsed: User.freeTweetsUsed });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

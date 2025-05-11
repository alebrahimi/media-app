import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { post } from '@/db/schema';

import { auth } from '@/lib/auth';

export async function GET() {
   const allPosts = await db.select().from(post).orderBy(post.postedAt);
   return NextResponse.json(allPosts);
}

export async function POST(req: Request) {
   const session = await auth.api.getSession({
      headers: await headers(), // you need to pass the headers object.
   });

   if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
   }

   const body = await req.json();

   await db.insert(post).values({
      platform: body.platform,
      platformPostId: body.platformPostId,
      userHandle: body.userHandle,
      userName: body.userName,
      userAvatarUrl: body.userAvatarUrl,
      content: body.content,
      mediaUrls: body.mediaUrls,
      link: body.link,
      likes: body.likes,
      shares: body.shares,
      commentsCount: body.commentsCount,
      postedAt: new Date(body.postedAt),
      createdBy: session.user.id,
   });

   return NextResponse.json({ success: true });
}

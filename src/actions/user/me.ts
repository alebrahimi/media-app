'use server';

import { headers } from 'next/headers';
import { db } from '@/db';
import { user, UserType } from '@/db/schema';
import { eq } from 'drizzle-orm';

import { auth } from '@/lib/auth';

export async function getMe(): Promise<UserType | null | undefined> {
   const session = await auth.api.getSession({ headers: await headers() });
   if (!session) {
      return null;
   }

   return (await db.select().from(user).where(eq(user.id, session.user.id)))[0];
}

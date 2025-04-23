import { db } from '@/db';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { username } from 'better-auth/plugins';

export const auth = betterAuth({
   database: drizzleAdapter(db, {
      provider: 'pg',
   }),
   plugins: [username()],
   emailAndPassword: {
      enabled: true,
   },
});

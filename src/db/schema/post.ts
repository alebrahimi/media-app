import { sql } from 'drizzle-orm';
import { integer, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { dbSchema, user } from '.';

export const post = dbSchema.table('post', {
   id: uuid('id').primaryKey().defaultRandom(),

   platform: text('platform').notNull(), // e.g., 'twitter', 'instagram'
   platformPostId: text('platform_post_id').notNull(), // Original post ID from the platform

   userHandle: text('user_handle'), // e.g., '@john_doe'
   userName: text('user_name'), // Full name
   userAvatarUrl: text('user_avatar_url'), // Avatar/profile picture

   content: text('content').notNull(), // Text content of the post
   mediaUrls: text('media_urls')
      .array()
      .notNull()
      .default(sql`'{}'::text[]`), // Array of media URLs (image/video)

   link: text('link'), // Link to original post

   likes: integer('likes').default(0),
   shares: integer('shares').default(0),
   commentsCount: integer('comments_count').default(0),

   postedAt: timestamp('posted_at').notNull(), // When posted

   createdBy: text('userId')
      .notNull()
      .references(() => user.id),
   createdAt: timestamp('createdAt').defaultNow(),
   updatedAt: timestamp('updatedAt')
      .defaultNow()
      .$onUpdate(() => new Date()),
});

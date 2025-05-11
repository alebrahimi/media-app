'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { post } from '@/db/schema';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

type Post = typeof post.$inferSelect;

export default function DashboardPostsPage() {
   const [allPosts, setAllPosts] = useState<Array<Post>>([]);
   const [search, setSearch] = useState('');
   const [platformFilter, setPlatformFilter] = useState('');
   const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest');

   useEffect(() => {
      async function fetchPosts() {
         const res = await fetch('/api/posts');
         const data = await res.json();
         setAllPosts(data);
      }
      fetchPosts();
   }, []);

   const filteredPosts = allPosts
      .filter(
         (post) =>
            (!platformFilter || post.platform === platformFilter) &&
            (post.content?.toLowerCase().includes(search.toLowerCase()) ||
               post.userHandle?.toLowerCase().includes(search.toLowerCase())),
      )
      .sort((a, b) => {
         const aTime = new Date(a.postedAt).getTime();
         const bTime = new Date(b.postedAt).getTime();
         return sortBy === 'latest' ? bTime - aTime : aTime - bTime;
      });

   return (
      <div className="p-8 space-y-6">
         <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Social Media Posts</h1>
            <Link href={'/posts/new'}>
               <Button size="icon">
                  <Plus />
               </Button>
            </Link>
         </div>
         {/* Filters */}
         <div className="flex gap-4 mb-6">
            <select
               value={platformFilter}
               onChange={(e) => setPlatformFilter(e.target.value)}
               className="border p-2 rounded"
            >
               <option value="">All Platforms</option>
               <option value="twitter">Twitter</option>
               <option value="instagram">Instagram</option>
               <option value="facebook">Facebook</option>
               <option value="tiktok">TikTok</option>
            </select>

            <input
               type="text"
               placeholder="Search posts..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="border p-2 rounded flex-1"
            />

            <select
               value={sortBy}
               onChange={(e) => setSortBy(e.target.value as 'latest' | 'oldest')}
               className="border p-2 rounded"
            >
               <option value="latest">Latest First</option>
               <option value="oldest">Oldest First</option>
            </select>
         </div>
         {/* Posts */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
               <div key={post.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-3">
                     {post.userAvatarUrl && (
                        <Image
                           src={post.userAvatarUrl}
                           alt="Avatar"
                           width={40}
                           height={40}
                           className="rounded-full"
                        />
                     )}
                     <div>
                        <div className="font-semibold">{post.userName || 'Unknown'}</div>
                        <div className="text-sm text-gray-500">
                           {post.userHandle} • {post.platform}
                        </div>
                     </div>
                  </div>

                  <div className="mb-3 text-gray-800">
                     {post.content.slice(0, 150)}
                     {post.content.length > 150 && '...'}
                  </div>

                  {post.mediaUrls?.length > 0 && (
                     <div className="relative w-full h-48 mb-3">
                        <Image src={post.mediaUrls[0]} alt="Media" fill className="object-cover rounded-md" />
                     </div>
                  )}

                  <div className="flex gap-4 text-sm text-gray-500 mt-2">
                     <div>❤️ {post.likes}</div>
                     <div>🔁 {post.shares}</div>
                     <div>💬 {post.commentsCount}</div>
                  </div>

                  <div className="text-xs text-gray-400 mt-2">{new Date(post.postedAt).toLocaleString()}</div>
               </div>
            ))}
         </div>
      </div>
   );
}

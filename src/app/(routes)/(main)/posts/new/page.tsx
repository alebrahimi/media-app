'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
   const router = useRouter();

   const [platform, setPlatform] = useState('');
   const [platformPostId, setPlatformPostId] = useState('');
   const [userHandle, setUserHandle] = useState('');
   const [userName, setUserName] = useState('');
   const [userAvatarUrl, setUserAvatarUrl] = useState('');
   const [content, setContent] = useState('');
   const [mediaUrls, setMediaUrls] = useState('');
   const [link, setLink] = useState('');
   const [likes, setLikes] = useState(0);
   const [shares, setShares] = useState(0);
   const [commentsCount, setCommentsCount] = useState(0);
   const [postedAt, setPostedAt] = useState('');

   async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();

      await fetch('/api/posts', {
         method: 'POST',
         body: JSON.stringify({
            platform,
            platformPostId,
            userHandle,
            userName,
            userAvatarUrl,
            content,
            mediaUrls: mediaUrls.split(',').map((url) => url.trim()),
            link,
            likes: Number(likes),
            shares: Number(shares),
            commentsCount: Number(commentsCount),
            postedAt: postedAt ? new Date(postedAt).toISOString() : new Date().toISOString(),
         }),
      });

      router.push('/posts');
   }

   return (
      <div className="p-8 space-y-6">
         <h1 className="text-3xl font-bold">Create New Post</h1>

         <form onSubmit={handleSubmit} className="space-y-4">
            {/* Platform */}
            <input
               type="text"
               placeholder="Platform (e.g., twitter)"
               value={platform}
               onChange={(e) => setPlatform(e.target.value)}
               className="border p-2 rounded w-full"
            />

            {/* Platform Post ID */}
            <input
               type="text"
               placeholder="Platform Post ID"
               value={platformPostId}
               onChange={(e) => setPlatformPostId(e.target.value)}
               className="border p-2 rounded w-full"
            />

            {/* User Info */}
            <input
               type="text"
               placeholder="User Handle (e.g., @elonmusk)"
               value={userHandle}
               onChange={(e) => setUserHandle(e.target.value)}
               className="border p-2 rounded w-full"
            />
            <input
               type="text"
               placeholder="User Name"
               value={userName}
               onChange={(e) => setUserName(e.target.value)}
               className="border p-2 rounded w-full"
            />
            <input
               type="text"
               placeholder="User Avatar URL"
               value={userAvatarUrl}
               onChange={(e) => setUserAvatarUrl(e.target.value)}
               className="border p-2 rounded w-full"
            />

            {/* Post Content */}
            <textarea
               placeholder="Content"
               value={content}
               onChange={(e) => setContent(e.target.value)}
               className="border p-2 rounded w-full h-32"
            />

            {/* Media URLs */}
            <input
               type="text"
               placeholder="Media URLs (comma separated)"
               value={mediaUrls}
               onChange={(e) => setMediaUrls(e.target.value)}
               className="border p-2 rounded w-full"
            />

            {/* Link */}
            <input
               type="text"
               placeholder="Link to Original Post"
               value={link}
               onChange={(e) => setLink(e.target.value)}
               className="border p-2 rounded w-full"
            />

            {/* Stats */}
            <div className="flex gap-4">
               <input
                  type="number"
                  placeholder="Likes"
                  value={likes}
                  onChange={(e) => setLikes(Number(e.target.value))}
                  className="border p-2 rounded w-full"
               />
               <input
                  type="number"
                  placeholder="Shares"
                  value={shares}
                  onChange={(e) => setShares(Number(e.target.value))}
                  className="border p-2 rounded w-full"
               />
               <input
                  type="number"
                  placeholder="Comments Count"
                  value={commentsCount}
                  onChange={(e) => setCommentsCount(Number(e.target.value))}
                  className="border p-2 rounded w-full"
               />
            </div>

            {/* Posted At */}
            <input
               type="datetime-local"
               value={postedAt}
               onChange={(e) => setPostedAt(e.target.value)}
               className="border p-2 rounded w-full"
            />

            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
               Create Post
            </button>
         </form>
      </div>
   );
}

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
   /* config options here */
   images: {
      remotePatterns: [
         new URL('https://scontent.fbgw66-2.fna.fbcdn.net/**'),
         new URL('https://scontent.fbgw66-1.fna.fbcdn.net/**'),
         new URL('https://images.unsplash.com/**'),
         new URL('https://picsum.photos/**'),
      ],
   },
};

export default nextConfig;

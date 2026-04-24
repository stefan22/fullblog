import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        hostname: 'wooden-finch-842',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'wooden-finch-842.eu-west-1.convex.cloud',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'wooden-finch-842.eu-west-1.convex.site',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'energetic-dachshund-222.eu-west-1.convex.cloud',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'res.cloudinary.com',
        protocol: 'https',
        port: '',
      },
    ],
  },
};

export default nextConfig;

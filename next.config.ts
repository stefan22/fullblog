import type { NextConfig } from 'next';
import path from 'path';
import { fileURLToPath } from 'url';

const configDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    // When a lockfile exists above this repo (e.g. ~/package-lock.json), Next can infer the wrong Turbopack root
    root: configDir,
  },
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

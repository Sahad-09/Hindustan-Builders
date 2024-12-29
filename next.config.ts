import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io', // Allowed hostname
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos', // Add this for Picsum images
      },
    ],
  },
};

export default nextConfig;

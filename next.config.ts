import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allow any domain
      },
    ],
  },

};

export default nextConfig;

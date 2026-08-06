import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allow any domain
      },
    ],
  },

};

const withMDX = createMDX({});

export default withMDX(nextConfig);

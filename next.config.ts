import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Allows importing unoptimized images if needed
  // unoptimized: true, 
};

export default nextConfig;

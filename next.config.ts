import { url } from "inspector";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['framer-motion'],
  images: {
    remotePatterns: [new URL('http:localhost:9000/**')],
  },
};

export default nextConfig;

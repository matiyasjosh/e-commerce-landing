import { url } from "inspector";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["127.0.0.1"],
    remotePatterns: [new URL('http:localhost:9000/**')],
  },
};

export default nextConfig;

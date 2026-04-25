import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    forceSwcTransforms: false,
  },

  turbopack: {}, 
};

export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Optimize for production
  experimental: {
    optimizePackageImports: ['@heroicons/react', '@headlessui/react']
  }
};

export default nextConfig;

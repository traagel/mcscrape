import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Optimize for production
  experimental: {
    optimizePackageImports: ['@heroicons/react', '@headlessui/react']
  },
  images: {
    domains: ['mcdonalds.ee'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mcdonalds.ee',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;

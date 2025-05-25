import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: {
    buildActivity: false,
  },
  images: {
    domains: ['file-v4-api.uat.camcyber.com'],
    // or if you're using Next.js 13+ with remotePatterns:
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'file-v4-api.uat.camcyber.com',
        port: '',
        pathname: '/static/**',
      },
    ],
  },
};

export default nextConfig;

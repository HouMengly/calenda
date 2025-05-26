import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: {
    buildActivity: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'file.cdc.gov.kh',
        port: '',
        pathname: '/upload/file/**',
      },
      {
        protocol: 'https',
        hostname: 'file.uat.cdc.gov.kh', // Second hostname
        port: '',
        pathname: '/upload/file/**',
      },
    ],
  },
};

export default nextConfig;

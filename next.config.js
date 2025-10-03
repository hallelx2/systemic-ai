/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true 
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;

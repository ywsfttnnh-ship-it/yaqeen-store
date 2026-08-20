/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;

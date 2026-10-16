/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Drops the `X-Powered-By: Next.js` response header.
  poweredByHeader: false,
  images: {
    // Everything under /public/images goes through next/image, which serves
    // AVIF or WebP at the size each slot actually needs.
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;

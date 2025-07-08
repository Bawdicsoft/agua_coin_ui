/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {}, // ✅ this is valid
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  async redirects() {
    return [];
  },
};

export default nextConfig;

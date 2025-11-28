/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PUBLIC_BACKEND_URL: process.env.PUBLIC_BACKEND_URL || "",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "www.vincenzosplate.com",
      },
      {
        protocol: "https",
        hostname: "www.foodrepublic.com",
      },
    ],
  },
};

export default nextConfig;

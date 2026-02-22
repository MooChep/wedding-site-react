import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
    }
  ]
},
output: 'standalone',

};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flos.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3.poliform.it",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "t1.gstatic.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /** Allow high JPEG/WebP quality for interior photography */
    qualities: [75, 80, 85, 90, 92, 95],
    /** Extra breakpoints so ~2.5–2.8k sources aren’t forced down to 2048px on large / retina viewports */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 2880, 3840],
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

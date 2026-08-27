import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // All imagery is served locally from /public so the demo works offline and
    // Ashley's real photography can be swapped in by replacing files in place.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

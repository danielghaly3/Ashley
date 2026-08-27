import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /**
   * This is a single-page site. The paths below existed while it was six routes,
   * so anything already shared — a DM, a link in her bio, a search result —
   * lands on the right section instead of a 404. Permanent, because the move is.
   */
  async redirects() {
    return [
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/policies", destination: "/#policies", permanent: true },
      { source: "/faq", destination: "/#faq", permanent: true },
      { source: "/book", destination: "/#book", permanent: true },
    ];
  },
  images: {
    // All imagery is served locally from /public so the demo works offline and
    // Ashley's real photography can be swapped in by replacing files in place.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

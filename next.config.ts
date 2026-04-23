import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(process.cwd()),
  },
  sassOptions: {
    loadPaths: [path.join(process.cwd(), "src")],
  },
  // Canonical host is https://lucas-aufrere.com — any request reaching
  // www.lucas-aufrere.com is 301 redirected to the naked domain so SEO
  // signals consolidate on a single origin.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.lucas-aufrere.com",
          },
        ],
        destination: "https://lucas-aufrere.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

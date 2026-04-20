import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(process.cwd()),
  },
  sassOptions: {
    loadPaths: [path.join(process.cwd(), "src")],
  },
};

export default nextConfig;

import type { NextConfig } from "next";
import path from "path/win32";

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;

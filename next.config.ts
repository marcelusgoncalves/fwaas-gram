import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/como-funciona",
        destination: "/demonstracao",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

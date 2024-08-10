import process from "process";

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: {
    remotePatterns: [{ protocol: "https", hostname: "img.pokemondb.net"}]
  },
};

export default nextConfig;
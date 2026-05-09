import nextPWA from "@ducanh2912/next-pwa";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    skipWaiting: true,
    clientsClaim: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // SSG-only build, no <Image> component used (only inline SVG illustrations).
  // Disabling optimization avoids the runtime cost without losing anything.
  images: { unoptimized: true },
};

export default withPWA(nextConfig);

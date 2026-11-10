import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The create-next-app defaults for Next.js 16.4: data that is not cached is fetched at
  // request time, inside a <Suspense> boundary, and the rest of the page is prerendered.
  cacheComponents: true,
  partialPrefetching: true,
  // Tailwind runs as a Turbopack loader on every CSS file (what create-next-app 16.4 sets up),
  // so there is no postcss.config.mjs.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

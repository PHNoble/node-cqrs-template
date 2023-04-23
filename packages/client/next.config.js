/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites() {
    return [
      {
        source: "/auth/:slug*",
        destination: `${process.env.API_URL}/auth/:slug*`,
      },
      {
        source: "/api/:slug*",
        destination: `${process.env.API_URL}/:slug*`,
      },
      {
        source: "/sync/:slug*",
        destination: `${process.env.SYNC_URL}/:slug*`,
      },
    ];
  },
};

module.exports = nextConfig;

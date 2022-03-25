/** @type {import('next').NextConfig} */
const nextConfig = {
  // See https://github.com/vercel/next.js/issues/6417
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  reactStrictMode: true,
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');

dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['user-images.githubusercontent.com'],
  },
};

module.exports = nextConfig;

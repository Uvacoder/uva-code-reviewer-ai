/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    locales: ["en", "ja", "cn"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;

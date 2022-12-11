/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'lens.infura-ipfs.io'
      },
      {
        protocol: 'https',
        hostname: 'avatar.tobi.sh'
      }
    ],
  },
}

module.exports = nextConfig

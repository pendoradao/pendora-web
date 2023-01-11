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
        hostname: 'pendora.infura-ipfs.io'
      },
      {
        protocol: 'https',
        hostname: 'avatar.tobi.sh'
      },
      {
        protocol: 'https',
        hostname: 'cdn.stamp.fyi'
      },
      {
        protocol: 'https',
        hostname: 'test.com'
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com'
      }
    ],
  },
}

module.exports = nextConfig

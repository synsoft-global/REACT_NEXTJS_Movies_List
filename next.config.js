/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts'],
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: '54.234.87.169', port: '3000', pathname: '/uploads/**' }
    ]
  },
  async rewrites() {
    return [
      { source: '/', destination: '/movies' },
    ]
  },
}

module.exports = nextConfig

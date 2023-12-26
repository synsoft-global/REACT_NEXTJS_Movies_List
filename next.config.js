/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts'],
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: '44.201.221.218', port: '3000', pathname: '/uploads/**' }
    ]
  },
  async redirects() {
    return [
      { source: '/', destination: '/movies', permanent: true },
    ]
  }
}

module.exports = nextConfig

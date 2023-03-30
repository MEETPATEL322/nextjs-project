/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  runtime: 'nodejs',
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/:path*',
      },
    ]
  },
  
}


module.exports = nextConfig

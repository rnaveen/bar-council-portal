/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Removed basePath and assetPrefix for custom domain usage (www.kondareddyb.com)
  // If you need GitHub Pages support, uncomment these:
  // basePath: '/bar-council-portal',
  // assetPrefix: '/bar-council-portal',
}

module.exports = nextConfig

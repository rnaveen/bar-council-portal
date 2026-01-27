/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If your GitHub Pages URL is username.github.io/repo-name (not just username.github.io)
  // Uncomment the lines below and replace 'bar-council-portal' with your repo name:
  // basePath: '/bar-council-portal',
  // assetPrefix: '/bar-council-portal',
}

module.exports = nextConfig

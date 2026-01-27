/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Required for GitHub Pages project sites (username.github.io/repo-name)
  // Update this to match your GitHub repository name
  basePath: '/bar-council-portal',
  assetPrefix: '/bar-council-portal',
}

module.exports = nextConfig

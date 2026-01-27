/** @type {import('next').NextConfig} */
// Get repository name from environment or use default
const repoName = process.env.GITHUB_REPOSITORY?.replace(/.*\//, '') || 'bar-council-portal';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Required for GitHub Pages project sites (username.github.io/repo-name)
  basePath: process.env.NODE_ENV === 'production' ? `/${repoName}` : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? `/${repoName}` : '',
}

module.exports = nextConfig

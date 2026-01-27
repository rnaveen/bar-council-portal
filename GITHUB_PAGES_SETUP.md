# GitHub Pages Deployment Guide

Yes! You can deploy directly to GitHub Pages without Vercel.

## Quick Setup Steps

### Step 1: Initialize Git and Push to GitHub

```bash
cd /Users/genesis/Downloads/Projects/General/bar-council-portal

git init
git add .
git commit -m "Initial commit: Telangana Bar Council Election 2026 Portal"

# Create repository on GitHub first at https://github.com/new
# Repository name: bar-council-portal (or your preferred name)
git remote add origin https://github.com/YOUR_USERNAME/bar-council-portal.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/bar-council-portal`
2. Click **Settings** tab
3. Scroll down to **Pages** section (in left sidebar)
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

### Step 3: Trigger Deployment

The GitHub Actions workflow will automatically deploy when you push to main branch.

**First deployment:**
- Go to **Actions** tab
- Wait for the workflow to complete (takes 2-3 minutes)
- Once complete, go to **Settings** → **Pages** to see your site URL

### Step 4: Access Your Site

Your site will be available at:
- **If repository name is `bar-council-portal`:** `https://YOUR_USERNAME.github.io/bar-council-portal/`
- **If using custom domain:** Your custom domain URL

## Repository URL

After pushing, your repository URL will be:
`https://github.com/YOUR_USERNAME/bar-council-portal`

## Important Notes

- ✅ The project is configured for static export (works with GitHub Pages)
- ✅ GitHub Actions workflow will automatically build and deploy
- ✅ Make sure `public/data/enrollment.json` is committed (already done)
- ⚠️ First deployment takes 2-3 minutes
- ⚠️ If your repo name is different, update `basePath` in `next.config.js`

## Troubleshooting

**Site shows 404:**
- Check Actions tab for build errors
- Ensure GitHub Pages is enabled with "GitHub Actions" source
- Wait a few minutes after first deployment

**Assets not loading:**
- If your repo name is NOT `bar-council-portal`, uncomment and update `basePath` in `next.config.js`

# Deployment Guide

## Quick Deploy to GitHub

### Step 1: Initialize Git (if not done)
```bash
git init
git add .
git commit -m "Initial commit: Telangana Bar Council Election 2026 Portal"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (e.g., `bar-council-portal`)
3. **DO NOT** initialize with README, .gitignore, or license

### Step 3: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/bar-council-portal.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 4: Deploy to Vercel

1. Go to https://vercel.com
2. Click "Import Project"
3. Select your GitHub repository
4. Vercel will auto-detect Next.js
5. Click "Deploy"

Your site will be live at: `https://your-project-name.vercel.app`

## Important Notes

- Make sure `public/data/enrollment.json` is committed (run `npm run convert-excel` first)
- The Excel file (`Enrolment List.xlsx`) is in `.gitignore` and won't be uploaded
- All dependencies are in `package.json` and will be installed automatically

## Environment Variables

No environment variables are required for this project.

## Build Command

Vercel will automatically use: `npm run build`

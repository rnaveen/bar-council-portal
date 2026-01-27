# Git Setup Instructions

Due to permission restrictions, please run these commands manually in your terminal:

## Step 1: Navigate to Project Directory
```bash
cd /Users/genesis/Downloads/Projects/General/bar-council-portal
```

## Step 2: Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: Telangana Bar Council Election 2026 Portal"
```

## Step 3: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `bar-council-portal` (or your preferred name)
3. Description: "Telangana Bar Council Election 2026 - Voter Search Portal"
4. Choose Public or Private
5. **DO NOT** check "Initialize with README"
6. Click "Create repository"

## Step 4: Connect and Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/bar-council-portal.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 5: Deploy to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your `bar-council-portal` repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

Your site will be live at: `https://bar-council-portal.vercel.app` (or your custom domain)

## Repository URL Format

After pushing, your repository URL will be:
`https://github.com/YOUR_USERNAME/bar-council-portal`

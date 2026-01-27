# Troubleshooting GitHub Pages

## If the URL takes you to the repository instead of the site:

### Step 1: Check GitHub Actions Status

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. Check if the "Deploy to GitHub Pages" workflow has run successfully
4. If it shows ❌ (failed), click on it to see the error

### Step 2: Enable GitHub Pages (if not done)

1. Go to **Settings** → **Pages** (in your repository)
2. Under **Source**, make sure **GitHub Actions** is selected (NOT "Deploy from a branch")
3. Click **Save**

### Step 3: Find Your Site URL

After enabling GitHub Actions:
1. Go to **Settings** → **Pages**
2. You'll see: "Your site is live at: https://YOUR_USERNAME.github.io/bar-council-portal/"
3. This is your actual site URL

### Step 4: Wait for Deployment

- First deployment takes 2-3 minutes
- Check the **Actions** tab - the workflow should show ✅ (green checkmark) when done
- Refresh the Pages settings page to see the URL

### Step 5: If Still Not Working

**Option A: Update basePath in next.config.js**

If your repository name is `bar-council-portal`, uncomment these lines in `next.config.js`:

```javascript
basePath: '/bar-council-portal',
assetPrefix: '/bar-council-portal',
```

Then commit and push:
```bash
git add next.config.js
git commit -m "Fix basePath for GitHub Pages"
git push
```

**Option B: Check Repository Name**

If your repository has a different name, update the basePath to match:
- If repo is `my-portal`, use `basePath: '/my-portal'`
- If repo is `bar-council`, use `basePath: '/bar-council'`

### Common Issues:

1. **"404 Not Found"** → Check Actions tab for build errors
2. **"Repository page"** → GitHub Pages not enabled or wrong source selected
3. **"Assets not loading"** → Update basePath in next.config.js
4. **"Workflow failed"** → Check Actions tab for error details

### Quick Fix Commands:

```bash
# Update basePath if repo name is different
# Edit next.config.js, then:
git add next.config.js
git commit -m "Fix GitHub Pages basePath"
git push
```

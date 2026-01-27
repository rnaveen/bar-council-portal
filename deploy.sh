#!/bin/bash

# Deployment script for Telangana Bar Council Election Portal

echo "🚀 Deploying to GitHub..."

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
fi

# Add all files
echo "Adding files..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "Initial commit: Telangana Bar Council Election 2026 Portal

- Voter search portal with enrollment data
- Candidate campaign section for B. Konda Reddy
- Floating candidate image
- Responsive design
- Excel to JSON conversion script"

# Check if remote exists
if git remote | grep -q "origin"; then
    echo "Remote 'origin' already exists"
else
    echo ""
    echo "⚠️  No remote repository configured."
    echo ""
    echo "To deploy to GitHub, please:"
    echo "1. Create a new repository on GitHub (https://github.com/new)"
    echo "2. Run the following commands:"
    echo ""
    echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    echo "Or if you prefer SSH:"
    echo "   git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
fi

echo ""
echo "✅ Local git repository ready!"
echo "📦 Next: Create a GitHub repo and push using the commands above"

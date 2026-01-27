# Quick Start Guide

## Step 1: Install Dependencies

```bash
cd bar-council-portal
npm install
```

## Step 2: Convert Excel to JSON

Make sure `Enrolment List.xlsx` is in the parent directory (`/Users/genesis/Downloads/Projects/General/`), then run:

```bash
npm run convert-excel
```

This will create `data/enrollment.json` with all your enrollment data.

## Step 3: Update Candidate Information

Edit `app/page.tsx` and update the `sampleCandidateData` object:

1. **Basic Info**: Name, tagline, bio
2. **Image**: Add image URL to `imageUrl` (or place image in `public/` folder)
3. **Achievements**: Update the achievements array
4. **Manifesto**: Update the manifesto points
5. **Contact**: Update email, phone, address
6. **Support Stats**: Update with actual vote counts:
   - `firstPriority`: Number of 1st priority votes
   - `secondPriority`: Number of 2nd priority votes
   - `thirdPriority`: Number of 3rd priority votes (optional)
   - `totalSupporters`: Total number of supporters

## Step 4: Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see your website.

## Step 5: Deploy to Vercel

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your GitHub repository
4. Click "Deploy"

That's it! Your website will be live.

## Troubleshooting

### "Enrollment data not found" error
- Make sure you ran `npm run convert-excel`
- Check that `public/data/enrollment.json` exists and has data
- The file should be around 10MB if conversion was successful

### Search not working
- Verify the Excel file has columns for Name, Enrollment Number, and Phone Number
- Check the console for any errors
- Ensure the JSON file was created correctly

### Styling issues
- Make sure Tailwind CSS is properly installed: `npm install tailwindcss`
- Restart the dev server after installing dependencies

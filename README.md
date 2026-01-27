# Telangana Bar Council Election 2026 - Voter Portal

A modern Next.js website featuring enrollment search portal and Bar Council candidate campaign section.

## Features

- **Voter Search Portal**: Quick search by name, enrollment number, phone, address, bar association, and more
- **Candidate Campaign Section**: Full campaign showcase for B. Konda Reddy
- **Excel Data Integration**: One-time conversion from Excel to JSON for fast client-side search
- **Floating Candidate Image**: Sticky campaign image in bottom-right corner

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Excel file: `Enrolment List.xlsx` (should be in the parent directory)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Convert Excel file to JSON:
```bash
npm run convert-excel
```

This will read `../Enrolment List.xlsx` and create `public/data/enrollment.json`.

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

## Project Structure

```
/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Single homepage (search + candidate section)
│   └── globals.css             # Global styles
├── components/
│   ├── SearchPortal.tsx        # Search interface component
│   ├── SearchResults.tsx       # Results display component
│   ├── VoterSuccess.tsx        # Voter success format component
│   ├── CandidateHero.tsx        # Candidate hero section
│   ├── CandidateProfile.tsx   # Candidate profile/details
│   └── CandidateFloater.tsx    # Floating candidate image
├── lib/
│   └── searchUtils.ts          # Search/filter utilities
├── public/
│   ├── data/
│   │   └── enrollment.json     # Converted Excel data (generated)
│   └── candidate-floater.png    # Floating candidate image
├── scripts/
│   └── convertExcel.js         # Excel to JSON conversion script
└── package.json
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Deploy with one click

The `enrollment.json` file should be committed to the repository after running the conversion script.

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Notes

- The Excel file is converted to JSON once during setup
- All search is performed client-side for fast performance
- The website is fully responsive and works on mobile devices
- Dark mode is supported via system preferences
- Candidate floater image appears in bottom-right corner on all pages

import type { Metadata } from "next";
import "./globals.css";
import ClientFloater from "./ClientFloater";

// Website URL - can be overridden with NEXT_PUBLIC_SITE_URL environment variable
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kondareddyb.com';

export const metadata: Metadata = {
  title: "Bar Council Enrollment Search Portal - 2026",
  description: "A public utility portal to search Telangana Bar Council enrollment records for the upcoming Bar Council elections-2026",
  keywords: ["Bar Council", "Telangana", "Election 2026", "Voter Search", "Enrollment Search", "Bar Council Portal"],
  
  // Open Graph / Facebook / LinkedIn link preview
  openGraph: {
    title: "Bar Council Enrollment Search Portal - 2026",
    description: "A public utility portal to search Telangana Bar Council enrollment records for the upcoming Bar Council elections-2026",
    url: siteUrl,
    siteName: "Bar Council Enrollment Portal",
    images: [
      {
        url: `${siteUrl}/candidate-photo.png`, // Preview image
        width: 1200,
        height: 630,
        alt: "Bar Council Election 2026",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card link preview
  twitter: {
    card: "summary_large_image",
    title: "Bar Council Enrollment Search Portal - 2026",
    description: "A public utility portal to search Telangana Bar Council enrollment records for the upcoming Bar Council elections-2026",
    images: [`${siteUrl}/candidate-photo.png`],
  },

  // Additional metadata
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <ClientFloater />
      </body>
    </html>
  );
}

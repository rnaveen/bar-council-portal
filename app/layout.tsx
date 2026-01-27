import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bar Council Enrollment Portal",
  description: "Search enrollment data and support Bar Council candidate",
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
      </body>
    </html>
  );
}

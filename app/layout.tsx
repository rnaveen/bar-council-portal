import type { Metadata } from "next";
import "./globals.css";
import ClientFloater from "./ClientFloater";

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
        <ClientFloater />
      </body>
    </html>
  );
}

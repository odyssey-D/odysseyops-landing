import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@/components/Analytics";

export const metadata: Metadata = {
  title: "Odyssey Ops — Calm operations. Strong standards.",
  description:
    "A modern operating system for hospitality — capturing how your site runs, preserving standards, and turning daily data into calm, confident decisions.",
  openGraph: {
    title: "Odyssey Ops — Calm operations. Strong standards.",
    description:
      "A modern operating system for hospitality — capturing how your site runs, preserving standards, and turning daily data into calm, confident decisions.",
    url: "https://odysseyops.app",
    siteName: "Odyssey Ops",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Odyssey Ops — Calm operations. Strong standards.",
    description:
      "A modern operating system for hospitality — capturing how your site runs, preserving standards, and turning daily data into calm, confident decisions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

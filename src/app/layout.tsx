import type { Metadata, Viewport } from "next";
import { Archivo, Readex_Pro } from "next/font/google";

import "./globals.css";

/* Archivo carries the English text; its width axis gives the wide display headlines. */
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
/* Readex Pro carries every Arabic line (selected with lang="ar"). */
const readex = Readex_Pro({ subsets: ["arabic", "latin"], variable: "--font-readex", display: "swap" });

export const metadata: Metadata = {
  title: "Alaa Adel Fekry | Content Creator, Social Media Specialist, Account Manager",
  description:
    "Alaa Adel Fekry writes hooks, reel scripts and captions in Arabic and English, plans monthly feeds and manages client accounts for brands in Egypt, Saudi Arabia and the UAE.",
  openGraph: {
    title: "Alaa Adel Fekry, content creator",
    description: "Reel scripts, launch campaigns and social media plans for brands in Egypt and the Gulf.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1d0c16",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${readex.variable}`}>
      <body>{children}</body>
    </html>
  );
}

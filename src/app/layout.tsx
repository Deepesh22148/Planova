import type { Metadata } from "next";
import { Playfair_Display} from "next/font/google";
import {Inter} from "next/font/google"
import "./globals.css";

const playfair = Playfair_Display({
    variable: "--font-playfair-display",
    subsets: ["latin"]
})

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Planova - Smart Travel Guide",
  description: "Travel Companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

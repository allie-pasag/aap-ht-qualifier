import type { Metadata } from "next";
import { Cormorant_Garamond, Hanken_Grotesk, Qwitcher_Grypen } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const qwitcher = Qwitcher_Grypen({
  variable: "--font-qwitcher",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "AAP HT Qualifier — askalliepasag.com",
  description: "Find out exactly where you are — and what to build next.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${hanken.variable} ${qwitcher.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://bookme.name" />
        <link rel="dns-prefetch" href="https://bookme.name" />
      </head>
      <body className="min-h-full flex flex-col font-sans text-[#EFE7DB] bg-[#15110E]">
        {children}
      </body>
    </html>
  );
}

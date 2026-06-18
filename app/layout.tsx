import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vinay Kumar Agarwal — Engineering Leader",
  description:
    "Engineering leader building AI and agentic systems at scale — distributed systems, backend infrastructure, and GenAI platforms.",
  metadataBase: new URL("https://vinayagarwal.com"),
  openGraph: {
    title: "Vinay Kumar Agarwal — Engineering Leader",
    description:
      "Engineering leader building AI and agentic systems at scale.",
    url: "https://vinayagarwal.com",
    siteName: "Vinay Kumar Agarwal",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans bg-ink text-snow antialiased">{children}</body>
    </html>
  );
}

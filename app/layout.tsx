import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vinay Kumar Agarwal · Engineering Leader",
  description:
    "Engineering leader building AI and agentic systems at scale across distributed systems, backend infrastructure, and GenAI platforms.",
  metadataBase: new URL("https://vinayagarwal.com"),
  openGraph: {
    title: "Vinay Kumar Agarwal · Engineering Leader",
    description:
      "Engineering leader building AI and agentic systems at scale.",
    url: "https://vinayagarwal.com",
    siteName: "Vinay Kumar Agarwal",
    type: "website",
  },
};

// Applied before paint to avoid a theme flash. Default = dark;
// honors a saved choice, otherwise follows the OS preference.
const themeScript = `
(function(){try{
  var t=localStorage.getItem('theme');
  if(t==='light'){document.documentElement.classList.add('light');}
  else if(!t&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches){document.documentElement.classList.add('light');}
}catch(e){}})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans bg-ink text-snow antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}

//app/layout.tsx
import { ThemeProvider } from "next-themes";
import Header from "@/components/nav/header";
import Footer from "@/components/nav/footer";
// import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { Libre_Baskerville } from "next/font/google";
import { Geist } from "next/font/google";
import CookieConsentComponent from "@/components/cookie-consent";
import Script from "next/script"; // <-- Import next/script
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const siteTitle =
  "MDXBlog: A simple, static-site blogging platform for Next.js";
const siteDescription =
  "A blogging platform that is easy to use, developer friendly, and a pleasure to work with, built with Next.js and MDX.";

// See the following docs for an explanation of Metadata and how Next.js processes it.
// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    siteName: "MDXBlog",
    title: siteTitle,
    description: siteDescription,
    url: defaultUrl,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${libreBaskerville.variable} ${geist.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Google Analytics Script */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-4G4B4HPZWS"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4G4B4HPZWS');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          <main className="flex min-h-[calc(100vh-13rem)] w-full flex-col">
            {children}
            <CookieConsentComponent />
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

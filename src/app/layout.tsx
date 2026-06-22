//app/layout.tsx
import { ThemeProvider } from "next-themes";
import Header from "@/components/nav/header";
import Footer from "@/components/nav/footer";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import CookieConsentComponent from "@/components/cookie-consent";
import Script from "next/script";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const siteTitle = "MDXBlog | MDX-Focused Content Generation Platform";
const siteDescription =
  "An MDX-first platform for generating, editing, and publishing technical content with Next.js, Git-backed files, and component-driven workflows.";

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
      className={`${geistSans.variable} ${geistMono.variable}`}
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
      <body className="min-h-screen bg-background text-foreground font-mono antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex min-h-[calc(100vh-13rem)] w-full flex-col">
            {children}
            <CookieConsentComponent />
          </main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/nav/scroll-to-top";
import SiteHeader from "@/components/nav/site-header";
import Footer from "@/components/nav/footer";
import { ThemeProvider } from "@/components/theme-provider";

import CookieConsentComponent from "@/components/cookie-consent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MDXBlog",
  description: "A simple static blog template built with Next.js and MDX.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollToTop />
          <SiteHeader />
          <main className="flex flex-col items-center justify-between px-6 py-12   sm:px-10 sm:py-24 min-h-[calc(100vh-12rem)]">
            {children}
            <CookieConsentComponent />
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

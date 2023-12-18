import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/nav/site-header";
import { Footer } from "@/components/nav/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MDX Blog",
  description: "Simple static blog built with Next.js and MDX.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
    // appearance={{
    //   baseTheme: dark,
    // }}
    >
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SiteHeader />
            <main className="flex flex-col items-center  min-h-[calc(100vh-200px)] pt-12 pb-12 px-6 sm:px-0 sm:pt-20 sm:pb-20">
              <div className="text-lg sm:text-base max-w-xl w-full mx-auto">
                {children}
              </div>
            </main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

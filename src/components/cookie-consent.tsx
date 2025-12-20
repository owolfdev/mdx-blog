"use client";
import React from "react";
import CookieConsent from "react-cookie-consent";
import Link from "next/link";

function CookieConsentComponent() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept All"
      cookieName="mdx_blog_cookie_consent"
      containerClasses="!fixed !inset-x-0 !bottom-0 !m-0 !w-full !z-[9999] !py-4 !px-4 sm:!px-6 lg:!px-8 !bg-primary/10 backdrop-blur-xl"
      contentClasses="!m-0 !w-full !max-w-7xl !mx-auto !rounded-2xl !p-6 sm:!p-8 !flex !flex-col !gap-6 sm:!flex-row sm:!items-center sm:!justify-between"
      buttonClasses="!m-0 !rounded-lg !bg-primary !text-primary-foreground !px-6 !py-3 !text-sm !font-semibold !transition-all !duration-200 hover:!bg-primary/90 hover:!scale-[1.02] active:!scale-[0.98 !whitespace-nowrap flex items-center justify-center w-full"
      buttonWrapperClasses="!m-0 !flex !items-center !shrink-0 !justify-center sm:w-auto w-full pb-8 sm:pb-0 px-6 sm:px-0 sm:!pr-8 sm:!pt-4"
      expires={150}
    >
      <div className="flex flex-1 items-start gap-4 py-8">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-primary/20">
          <svg
            className="h-6 w-6 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-foreground mb-2">
            Cookie Preferences
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            We use cookies to enhance your browsing experience, serve
            personalized content, and analyze our traffic. By clicking{" "}
            <span className="font-medium text-foreground">"Accept All"</span>,
            you consent to our use of cookies.{" "}
            <Link
              href="/privacy"
              className="font-semibold text-primary hover:text-primary/80 transition-colors underline underline-offset-4 decoration-primary/30 hover:decoration-primary/60"
            >
              Learn more
            </Link>
          </p>
        </div>
      </div>
    </CookieConsent>
  );
}

export default CookieConsentComponent;

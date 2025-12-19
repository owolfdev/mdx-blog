"use client";
import React from "react";
import CookieConsent from "react-cookie-consent";
import Link from "next/link";

function CookieConsentComponent() {
  return (
    <div>
      {" "}
      <CookieConsent
        location="bottom"
        buttonText="I understand"
        cookieName="mdx_blog_cookie_consent"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", background: "#fff", fontSize: "13px" }}
        expires={150} // This is in days. You can adjust as needed.
      >
        This web app may use cookies to enhance the user experience.{" "}
        <span style={{ fontSize: "10px" }}>
          We do not share, sell, rent, or trade your personal information with
          any third parties. For more information, please see our{" "}
          <Link className="font-bold" href="/privacy">
            privacy policy.
          </Link>
        </span>
      </CookieConsent>
    </div>
  );
}

export default CookieConsentComponent;

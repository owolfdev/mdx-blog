import React from "react";
import { ContactForm } from "./form";
import { isDevMode } from "@/lib/utils";
import Link from "next/link";

function Contact() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-xl">
      <h1 className="text-4xl sm:text-5xl font-bold text-center">Contact</h1>
      <div>
        <ContactForm />
      </div>
      {isDevMode() && (
        <div className="flex justify-center">
          Dev mode only:{" "}
          <Link href="/contact/contact-messages" className="underline pl-1">
            {" "}
            see contact messages.
          </Link>
        </div>
      )}
    </div>
  );
}
export default Contact;

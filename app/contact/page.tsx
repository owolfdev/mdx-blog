import React from "react";
import { ContactForm } from "./form";

function Contact() {
  return (
    <>
      <div className="flex flex-col gap-8 max-w-md w-full p-8">
        <h1 className="text-4xl font-bold">Contact</h1>
        <div>
          <ContactForm />
        </div>
      </div>
    </>
  );
}

export default Contact;

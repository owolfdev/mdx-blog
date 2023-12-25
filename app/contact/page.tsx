import React from "react";
import { ContactForm } from "./form";

function Contact() {
  return (
    <>
      <div className="flex flex-col gap-8 w-full ">
        <h1 className="text-4xl sm:text-5xl font-bold text-center">Contact</h1>
        <div>
          <ContactForm />
        </div>
      </div>
    </>
  );
}

export default Contact;

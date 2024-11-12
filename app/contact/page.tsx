// app/contact/page.tsx
import type { Metadata } from "next";
import { ContactForm } from "./form";
import type { Message } from "@/components/form-message";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with us",
};

export default async function ContactPage() {
  // const message = await searchParams;

  return (
    <div className="flex flex-col max-w-3xl w-full pt-10 items-center">
      <div className="flex-1 flex flex-col sm:w-[600px] w-[300px] ">
        <h1 className="text-6xl font-black">Contact</h1>
        <div className="w-full">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

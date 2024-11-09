// app/contact/form.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { FormMessage, type Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReCAPTCHA from "react-google-recaptcha";
import { sendContactMessage } from "./actions";

const messageTypes = [
  { label: "Bug Report", value: "Bug Report" },
  { label: "Support Query", value: "Support Query" },
  { label: "Correspondence", value: "Correspondence" },
];

export function ContactForm({ message }: { message?: Message }) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isRecaptchaVerified, setIsRecaptchaVerified] = React.useState(false);

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  const handleRecaptchaChange = (token: string | null) => {
    setIsRecaptchaVerified(token !== null);
  };

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);

      const values = {
        email: formData.get("email") as string,
        name: formData.get("name") as string,
        message: formData.get("message") as string,
        type: formData.get("type") as string,
      };

      await sendContactMessage(values);
      router.push("/contact/thank-you");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-3xl gap-8 pt-12">
      <form
        className="flex-1 flex flex-col sm:w-[600px] w-full gap-4"
        onSubmit={handleSubmit}
      >
        <p className="text-sm text-foreground">
          Have a question or feedback? Use the form below to get in touch with
          us.
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 [&>textarea]:mb-3 mt-8">
          <Label htmlFor="type">Message Type</Label>
          <div className="mb-3">
            <Select name="type" required>
              <SelectTrigger className="text-lg">
                <SelectValue placeholder="Select message type" />
              </SelectTrigger>
              <SelectContent>
                {messageTypes.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            placeholder="Your name"
            required
            className="text-lg"
          />

          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="text-lg"
          />

          <Label htmlFor="message">Message</Label>
          <Textarea
            name="message"
            placeholder="Your message"
            required
            className="min-h-[100px] text-lg"
          />

          {recaptchaSiteKey && (
            <div className="mb-4">
              <ReCAPTCHA
                sitekey={recaptchaSiteKey}
                onChange={handleRecaptchaChange}
              />
            </div>
          )}

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <button
            type="submit"
            disabled={isSubmitting || !isRecaptchaVerified}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-lg disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {message && <FormMessage message={message} />}
        </div>
      </form>
    </div>
  );
}

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
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

// Define constants
const ORIGIN = "MDXBlog";

// Define Zod schema for validation
const contactFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  type: z.string().min(1, "Message type is required"),
  subject: z.string().min(1, "Subject is required"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const messageTypes = [
  { label: "Correspondence", value: "Correspondence" },
  { label: "Support Query", value: "Support Query" },
  { label: "Bug Report", value: "Bug Report" },
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>(
    {}
  );
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
    setFormErrors({});

    try {
      const formData = new FormData(event.currentTarget);

      const values: ContactFormValues = {
        email: formData.get("email") as string,
        name: formData.get("name") as string,
        message: formData.get("message") as string,
        type: formData.get("type") as string,
        subject: formData.get("subject") as string,
      };

      // Validate form data with Zod
      const parsedData = contactFormSchema.parse(values);

      // Send the data to the server action, including the hardcoded origin
      await sendContactMessage({
        ...parsedData,
        origin: ORIGIN,
        receivedDate: new Date().toISOString(), // Add the current date
      });

      router.push("/contact/thank-you");
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Collect Zod validation errors
        const errors: Record<string, string> = {};
        for (const e of err.errors) {
          if (e.path[0]) {
            errors[e.path[0].toString()] = e.message;
          }
        }
        setFormErrors(errors);
      } else {
        // Handle other errors
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex w-full flex-col gap-8" onSubmit={handleSubmit}>
      <p className="text-sm font-medium text-muted-foreground">
        Have a question or feedback? Use the form below to get in touch with us.
      </p>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="type" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Message Type
          </Label>
          <Select name="type" required>
            <SelectTrigger className="h-11 text-sm font-medium">
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
          {formErrors.type && (
            <div className="text-sm text-destructive">{formErrors.type}</div>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="subject" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Subject
          </Label>
          <Input
            name="subject"
            placeholder="Subject"
            required
            className="h-11 text-sm font-medium"
          />
          {formErrors.subject && (
            <div className="text-sm text-destructive">{formErrors.subject}</div>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Name
            </Label>
            <Input
              name="name"
              placeholder="Your name"
              required
              className="h-11 text-sm font-medium"
            />
            {formErrors.name && (
              <div className="text-sm text-destructive">{formErrors.name}</div>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Email
            </Label>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="h-11 text-sm font-medium"
            />
            {formErrors.email && (
              <div className="text-sm text-destructive">{formErrors.email}</div>
            )}
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Message
          </Label>
          <Textarea
            name="message"
            placeholder="Tell us what you need help with..."
            required
            className="min-h-[140px] text-sm font-medium"
          />
          {formErrors.message && (
            <div className="text-sm text-destructive">{formErrors.message}</div>
          )}
        </div>

        {Boolean(recaptchaSiteKey) && (
          <div>
            <ReCAPTCHA
              sitekey={recaptchaSiteKey}
              onChange={handleRecaptchaChange}
            />
          </div>
        )}

        {error && <div className="text-sm text-destructive">{error}</div>}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            We typically reply within 1–2 business days.
          </p>
          <button
            type="submit"
            disabled={
              isSubmitting ||
              (Boolean(recaptchaSiteKey) && !isRecaptchaVerified)
            }
            className="h-12 rounded-none bg-foreground px-8 text-xs font-black uppercase tracking-[0.2em] text-background hover:bg-foreground/90 disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>
    </form>
  );
}

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ReCAPTCHA from "react-google-recaptcha";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useFormStatus } from "react-dom";
import { sendContactMessage } from "./actions";

function SubmitButton({
  isRecaptchaVerified,
}: {
  isRecaptchaVerified: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      aria-disabled={pending || !isRecaptchaVerified}
      disabled={pending || !isRecaptchaVerified}
      type="submit"
      className="text-lg"
    >
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
}

const formSchema = z.object({
  email: z.string().email(),
  name: z
    .string()
    .min(2, { message: "Your name must be at least 2 characters." }),
  message: z
    .string()
    .min(20, { message: "Your message must be at least 20 characters." }),
  type: z.string().min(2, { message: "Select a type." }),
});

const optionsForSelectType = [
  { label: "Bug Report", value: "Bug Report" },
  { label: "Support Query", value: "Support Query" },
  { label: "Correspondence", value: "Correspondence" },
];

const NEXT_PUBLIC_RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export function ContactForm() {
  const [recaptchaSiteKey] = React.useState<string>(
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
  );
  const [isRecaptchaVerified, setIsRecaptchaVerified] =
    React.useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      message: "",
      type: "",
    },
  });

  const handleRecaptchaChange = (token: string | null) => {
    setIsRecaptchaVerified(token !== null); // Recaptcha verified if token exists
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form Values on Submit:", values);
    await sendContactMessage(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 text-lg"
      >
        {/* Message Type (Select) */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Message Type</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  form.setValue("type", value); // Ensure the form's state is updated with the new value
                }}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="text-lg">
                    <SelectValue placeholder="Select message type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {optionsForSelectType.map((option) => (
                    <SelectItem
                      className="input-no-zoom text-lg"
                      value={option.value}
                      key={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Input */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Email</FormLabel>
              <FormControl>
                <Input
                  className="input-no-zoom text-lg"
                  placeholder="Your email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name Input */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Name</FormLabel>
              <FormControl>
                <Input
                  className="input-no-zoom text-lg"
                  placeholder="Your name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message Textarea */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Message</FormLabel>
              <FormControl>
                <Textarea
                  className="input-no-zoom text-lg"
                  placeholder="Your message"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* reCAPTCHA */}
        <div className="pt-4">
          {recaptchaSiteKey && (
            <ReCAPTCHA
              sitekey={recaptchaSiteKey}
              onChange={handleRecaptchaChange}
            />
          )}
        </div>

        {/* Submit Button */}
        <SubmitButton isRecaptchaVerified={isRecaptchaVerified} />
      </form>
    </Form>
  );
}

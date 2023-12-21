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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"; // <-- Add this import

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string; // Supabase project URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string; // Supabase project anon key

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const formSchema = z.object({
  email: z.string().email().min(2, {}),
  name: z.string().min(2, {
    message: "Your name must be at least 2 characters.",
  }),
  message: z.string().min(20, {
    message: "Your message must be at least 20 characters.",
  }),
  type: z.string().min(2, {
    message: "Select a type.",
  }),
  // recaptcha: z
  //   .string()
  //   .min(1, { message: "Please complete the reCAPTCHA challenge." }),
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
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
  );

  const [isRecaptchaVerified, setIsRecaptchaVerified] =
    React.useState<boolean>(false);

  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      message: "",
      type: "",
    },
  });

  // 2. Handle form submission.
  // const handleSubmit = form.handleSubmit((values) => {
  //   alert(JSON.stringify(values, null, 2));
  // });

  async function testDatabaseConnection() {
    try {
      const { data, error } = await supabase
        .from("contact_mdx_blog")
        .select("*")
        .limit(1);

      if (error) throw error;

      console.log("Data from Supabase:", data);
    } catch (error) {
      console.error("Error reading from Supabase:", error);
    }
  }

  const handleRecaptchaChange = (token: string | null) => {
    setIsRecaptchaVerified(token !== null);
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isRecaptchaVerified) {
      alert("Please verify that you are not a robot.");
      return;
    }
    try {
      // Save the form values to the Supabase table
      const { data, error } = await supabase
        .from("contact_mdx_blog")
        .insert([values]);

      if (error) throw error;

      console.log("Saved to Supabase:", data);
      router.push("/contact/thank-you");
      // alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error saving to Supabase:", error);
      alert("Error submitting form. Please try again.");
    }
  }

  return (
    <>
      {/* <Button onClick={testDatabaseConnection}>Test Database</Button> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 text-lg"
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select message type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {optionsForSelectType.map((option) => (
                      <SelectItem
                        className="input-no-zoom text-lg sm:text-base"
                        value={option.value}
                        key={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="input-no-zoom text-lg sm:text-base"
                    placeholder="Your email"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {/* <span className="text-black">
                  This is your public display name.
                </span> */}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="input-no-zoom text-lg sm:text-base"
                    placeholder="Your name"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {/* <span className="text-black">
                  This is your public display name.
                </span> */}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    className="input-no-zoom text-lg sm:text-base"
                    placeholder="Your message"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {/* <span className="text-black">
                  This is your public display name.
                </span> */}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4">
            {recaptchaSiteKey && (
              <ReCAPTCHA
                sitekey={recaptchaSiteKey}
                onChange={handleRecaptchaChange}
              />
            )}
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}

// sign-in/page.tsx
import { signInAction } from "@/app/actions/auth-actions";
import { FormMessage, type Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

type PageProps = {
  searchParams:
    | Promise<{ message?: Message | null; success?: string } | null>
    | undefined;
};
export default async function Login({ searchParams }: PageProps) {
  const params = await searchParams;
  const message = params?.message;
  const success = params?.success;

  // Transform the `success` string into a `Message` object if it exists
  const successMessage: Message | null = success ? { success } : null;

  return (
    <div className="flex flex-col items-center max-w-3xl gap-8 pt-12">
      <form className="flex-1 flex flex-col sm:w-[500px] w-[300px] gap-4">
        <h1 className="text-6xl font-black">Sign in</h1>
        <p className="text-sm text-foreground">
          Don&apos;t have an account?{" "}
          <Link
            className="text-foreground font-medium underline"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            placeholder="you@example.com"
            required
            className="text-lg"
          />
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              className="text-xs text-foreground underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
            className="text-lg"
          />
          <SubmitButton pendingText="Signing In..." formAction={signInAction}>
            Sign in
          </SubmitButton>
          {message && <FormMessage message={message} />}
          {successMessage && <FormMessage message={successMessage} />}
        </div>
      </form>
    </div>
  );
}

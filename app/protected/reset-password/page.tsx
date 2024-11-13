import { resetPasswordAction } from "@/app/actions/actions";
import { FormMessage, type Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  return (
    <div className="flex flex-col items-center max-w-3xl gap-8 pt-12">
      <form className="flex-1 flex flex-col sm:w-[500px] w-[300px] gap-4">
        <h1 className="text-6xl font-black">Reset Password</h1>
        <p className="text-sm text-foreground">
          Please enter and confirm your new password below.
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="password">New password</Label>
          <Input
            type="password"
            name="password"
            placeholder="New password"
            required
            className="text-lg"
          />
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            required
            className="text-lg"
          />
          <SubmitButton
            pendingText="Resetting..."
            formAction={resetPasswordAction}
          >
            Reset Password
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}

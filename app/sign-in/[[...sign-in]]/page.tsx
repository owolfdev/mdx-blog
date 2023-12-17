import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="">
          <SignIn />
        </div>
      </div>
    </>
  );
}

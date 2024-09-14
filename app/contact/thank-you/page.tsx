import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function ThankYou() {
  return (
    <div className="z-10 max-w-3xl w-full items-center justify-between lg:flex">
      <div className="h-full  p-8">
        <h2 className="font-bold text-2xl pb-2">
          Thank you for your message! We will get back to you as soon as
          possible.
        </h2>
        <Button className="mt-4 text-lg" size="lg">
          <Link href="/blog">Go back to the blog</Link>
        </Button>
      </div>
    </div>
  );
}

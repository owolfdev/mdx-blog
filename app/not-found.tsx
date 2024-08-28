import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl z-10 w-full items-center justify-between">
      <div className="w-full flex justify-center items-center flex-col gap-6 pt-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-center pb-8">
          Page Not Found
        </h1>
        <p className="text-lg text-center">
          Sorry, we couldn&apos;t find the page you were looking for.
        </p>
        <Link href="/" className="text-primary hover:underline text-lg">
          Return Home
        </Link>
      </div>
    </div>
  );
}

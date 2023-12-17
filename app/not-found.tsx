import LoaderLink from "@/components/nav/loader-link";
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col gap-6">
        <h2 className="font-bold text-lg">Not Found</h2>
        <p>Could not find requested resource</p>
        <LoaderLink isButton={false} url="/">
          <span className="cursor-pointer text-xl">Return Home</span>
        </LoaderLink>
        <LoaderLink isButton={false} url="/blog">
          <span className="cursor-pointer text-xl">Go to Blog</span>
        </LoaderLink>
      </div>
    </main>
  );
}

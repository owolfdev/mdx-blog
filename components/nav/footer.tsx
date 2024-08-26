import Link from "next/link";

function Footer() {
  return (
    <footer className="bottom-0 z-40 w-full border-t bg-background p-6 py-10">
      <div className="sm:px-8 px-4 flex flex-col justify-between items-center h-18 space-y-4 sm:space-y-4 text-lg">
        <div className="flex gap-6 items-center">
          <div className="">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-bold">MDXBlog</span> created by{" "}
            <Link target="_blank" href="https://owolf.com">
              OWolf
            </Link>
          </div>
        </div>
        <nav className="flex gap-4 items-center text-base">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;

import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";

function Footer() {
  return (
    <footer className="bottom-0 z-40 w-full bg-background ">
      <div className="sm:px-8 px-4 flex flex-col  items-center h-32 space-y-4 sm:space-y-4 font-light">
        <div className="flex gap-6 items-center pt-5">
          <div className="">&copy; {new Date().getFullYear()} mdxblog.com</div>
          <ThemeSwitcher />
        </div>
        <nav className="flex gap-4 items-center">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          {/* <Link href="/blog">Blog</Link> */}
          <Link href="/privacy">Privacy</Link>
          <Link
            href="/donate"
            className="bg-primary px-3 py-1 rounded-full font-bold text-black"
          >
            Donate
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;

import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="site-container flex flex-col gap-6 py-10 text-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-base font-semibold">
            &copy; {new Date().getFullYear()} mdxblog.com
          </div>
          <ThemeSwitcher />
        </div>
        <nav className="flex flex-wrap items-center gap-6 font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <Link href="/about" className="transition-colors hover:text-foreground">
            About
          </Link>
          <Link
            href="/contact"
            className="transition-colors hover:text-foreground"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="transition-colors hover:text-foreground"
          >
            Privacy
          </Link>
          <Link
            href="/donate"
            className="bg-primary px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-black"
          >
            Donate
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;

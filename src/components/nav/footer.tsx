import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="site-container flex flex-col gap-8 py-10 text-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              MDX-focused content generation platform
            </p>
            <div className="text-lg font-black tracking-[-0.06em]">
              Publish with files, components, and Git.
            </div>
          </div>
          <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            &copy; {new Date().getFullYear()} MDXBlog
          </div>
        </div>
        <nav className="flex flex-wrap items-center gap-6 border-t border-border pt-6 font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <Link href="/blog" className="transition-colors hover:text-foreground">
            Blog
          </Link>
          <Link href="/code" className="transition-colors hover:text-foreground">
            Code
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
        </nav>
      </div>
    </footer>
  );
}

export default Footer;

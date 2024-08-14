"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ModeToggle } from "@/components/nav/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { isDevMode } from "@/lib/utils";
import { GearIcon, PlusIcon } from "@radix-ui/react-icons";

function SiteHeader() {
  const pathname = usePathname();
  const slug = pathname?.split("/")[1]; // Get the slug from the pathname

  const navItems = [
    // { href: "/", label: "Home" },
    // { href: "/install", label: "Install" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const navItemsMobile = [
    { href: "/", label: "Home" },
    // { href: "/install", label: "Install" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    // Check if the current pathname matches the href
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="sm:px-12 px-6 flex items-center h-16 space-x-2 sm:justify-between sm:space-x-0">
        <Sheet>
          <SheetTrigger className="p-2 sm:hidden">
            <HamburgerMenuIcon className="w-8 h-8 sm:hidden" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className="pt-8">
              {/* <SheetTitle>
                <span className="text-4xl">Menu</span>
              </SheetTitle> */}
              {/* <SheetDescription>Find your way around.</SheetDescription> */}
            </SheetHeader>

            <div className="pl-4 text-xl">
              <div className="space-y-8 ">
                {navItemsMobile.map((item) => (
                  <div key={item.href}>
                    <Link href={item.href}>
                      <SheetClose
                        className={isActive(item.href) ? "font-semibold" : ""}
                      >
                        {item.label}
                      </SheetClose>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="font-bold text-3xl tracking-tight">
          <Link className="pr-2" href="/">
            <span className="text-primary">MDX</span>
            <span>Blog</span>
          </Link>
        </div>
        <nav className="pl-6 gap-6 pt-2 hidden sm:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-primary ${
                isActive(item.href) ? "font-semibold" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-end flex-1 space-x-4 z-20">
          <div className="flex gap-2 items-center">
            <div className="flex items-center justify-end flex-1 space-x-4">
              <div className="flex gap-4 items-center">
                {isDevMode() && (
                  <>
                    {" "}
                    <Link title="Create post" href="/blog/create">
                      <Button variant="outline" size="icon">
                        <PlusIcon className="w-[18px] h-[18px]" />
                      </Button>
                    </Link>
                    {/* <CachePostsButton /> */}
                    <Link title="Setting" href="/settings">
                      <Button variant="outline" size="icon">
                        <GearIcon className="w-[18px] h-[18px]" />
                      </Button>
                    </Link>
                  </>
                )}
                <ModeToggle />
              </div>
            </div>
            {/* <AuthComponent /> */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;

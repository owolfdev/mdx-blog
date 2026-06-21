"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

const navItems = [
  { href: "/blog", label: "Blog" },
  { href: "/code", label: "Code" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function NavComponent() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  return (
    <div className="flex items-center gap-6">
      <Sheet>
        <SheetTrigger asChild>
          <div className="panel-surface sm:hidden p-2">
            <HamburgerMenuIcon className="h-[22px] w-[22px]" />
          </div>
        </SheetTrigger>

        <SheetContent side="left">
          <SheetTitle>Menu</SheetTitle>
          <nav className="flex flex-col space-y-4 mt-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-lg ${
                  isActive(item.href) ? "font-semibold" : ""
                }`}
              >
                {" "}
                <SheetClose>{item.label}</SheetClose>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex items-center">
        <h1 className="text-xl font-black uppercase tracking-[-0.08em] sm:text-2xl">
          <Link href="/">
            <span className="text-[hsl(var(--primary))]">MDX</span>Blog
          </Link>
        </h1>
        <nav className="ml-6 hidden items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.24em] sm:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`border-b pb-1 transition-colors hover:text-primary ${
                isActive(item.href)
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default NavComponent;

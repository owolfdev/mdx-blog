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
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

const navItems = [
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function NavComponent() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  return (
    <div className="flex items-center gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="sm:hidden">
            <HamburgerMenuIcon className="h-[18px] w-[18px]" />
          </Button>
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
        <h1 className="text-4xl font-black mr-6">
          <Link href="/">
            <span className="text-primary">MDX</span>Blog
          </Link>
        </h1>
        <nav className="hidden sm:flex h-9 space-x-6  items-end">
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
      </div>
    </div>
  );
}

export default NavComponent;

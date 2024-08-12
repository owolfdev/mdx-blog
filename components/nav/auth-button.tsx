"use client";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import { Button, buttonVariants } from "../ui/button";

export default function AuthComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
        <DropdownMenuTrigger className="">
          <div className={buttonVariants({ variant: "ghost", size: "sm" })}>
            <PersonIcon className="h-5 w-5" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-background">
          <Link href="/">
            <DropdownMenuItem>Home</DropdownMenuItem>
          </Link>
          <Link href="/profile">
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

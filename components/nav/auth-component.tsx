"use client";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { LockClosedIcon, GearIcon, PlusIcon } from "@radix-ui/react-icons";
import { UserButton } from "@clerk/nextjs";
import { buttonVariants, Button } from "@/components/ui/button";
import { isDevMode } from "@/lib/utils";

import React from "react";

function AuthComponent() {
  const { user, isSignedIn, isLoaded } = useUser();
  const outlineButtonVariant = buttonVariants({ variant: "outline" });
  return isSignedIn ? (
    <div className="flex gap-4 items-center">
      {isDevMode() && (
        <Link title="Create post" href="/blog/create">
          <Button variant="outline" size="icon">
            <PlusIcon className="w-[18px] h-[18px]" />
          </Button>
        </Link>
      )}
      {/* <Link title="Administration" href="/admin">
        <Button variant="outline" size="icon">
          <GearIcon className="w-[18px] h-[18px]" />
        </Button>{" "}
      </Link> */}
      <UserButton
        afterSignOutUrl="/"
        userProfileMode="navigation"
        userProfileUrl="/user-profile"
      />
    </div>
  ) : (
    isLoaded && (
      <Link className={outlineButtonVariant} href="/sign-in">
        <div className="flex gap-2 items-center">
          <LockClosedIcon /> <span>Sign In</span>
        </div>
      </Link>
    )
  );
}

export default AuthComponent;

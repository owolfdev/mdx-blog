"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GearIcon, PlusIcon } from "@radix-ui/react-icons";
import { isDevMode } from "@/lib/utils/is-dev-mode";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AdminButtons() {
  if (!isDevMode()) return null;

  return (
    <div className="items-center space-x-4 hidden md:flex">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <PlusIcon className="h-[18px] w-[18px]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href="/post/create">Create Post</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/page/create">Create Page</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Link href="/admin" title="Administration">
        <Button variant="outline" size="icon">
          <GearIcon className="h-[18px] w-[18px]" />
        </Button>
      </Link>
    </div>
  );
}

// import React from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { GearIcon, PlusIcon } from "@radix-ui/react-icons";
// import { isDevMode } from "@/lib/utils/is-dev-mode";

// export function AdminButtons() {
//   if (!isDevMode()) return null;

//   return (
//     <div className="items-center space-x-4 hidden md:flex">
//       <Link href="/post/create" title="Create post">
//         <Button variant="outline" size="icon">
//           <PlusIcon className="h-[18px] w-[18px]" />
//         </Button>
//       </Link>
//       <Link href="/admin" title="Administration">
//         <Button variant="outline" size="icon">
//           <GearIcon className="h-[18px] w-[18px]" />
//         </Button>
//       </Link>
//     </div>
//   );
// }

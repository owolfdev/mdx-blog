import Link from "next/link";
import { buttonVariants, Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";
import AuthComponent from "@/components/nav/auth-component";
import NavComponent from "./nav-component";

export function SiteHeader() {
  const ghostButtonVariant = buttonVariants({ variant: "ghost" });
  const outlineButtonVariant = buttonVariants({ variant: "outline" });
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="sm:px-12 px-6 flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
        <NavComponent />
        <div className="flex items-center justify-end flex-1 space-x-4">
          <div className="flex gap-4 items-center">
            <AuthComponent />
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

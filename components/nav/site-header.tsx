import Link from "next/link";
import { buttonVariants, Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";
import NavComponent from "./nav-component";
import { isDevMode } from "@/lib/utils";
import { LockClosedIcon, GearIcon, PlusIcon } from "@radix-ui/react-icons";
import CachePostsButton from "@/components/admin/cache-posts-button";

export function SiteHeader() {
  const ghostButtonVariant = buttonVariants({ variant: "ghost" });
  const outlineButtonVariant = buttonVariants({ variant: "outline" });
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="sm:px-12 px-6 flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
        <NavComponent />
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
      </div>
    </header>
  );
}

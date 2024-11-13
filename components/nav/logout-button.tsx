"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
function LogoutButton({ userEmail }: { userEmail: string }) {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    try {
      await supabase.auth.signOut();
      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          asChild // Ensures TooltipTrigger doesn't render its own <button>
        >
          <button
            type="button"
            onClick={handleLogout}
            className={buttonVariants({ variant: "outline" })}
            aria-label="Logout"
          >
            Logout
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{userEmail}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default LogoutButton;

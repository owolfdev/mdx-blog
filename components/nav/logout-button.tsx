"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();
  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/sign-in");
    router.refresh();
  }
  return <Button onClick={handleLogout}>Logout</Button>;
}

export default LogoutButton;

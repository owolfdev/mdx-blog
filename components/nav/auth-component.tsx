import React from "react";
import { createClient } from "@/utils/supabase/server";
import LogoutButton from "./logout-button";
import { buttonVariants } from "../ui/button";
import Link from "next/link";

async function AuthComponent() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="">
      {user?.email ? (
        <div className="flex items-center gap-2 " title={user?.email}>
          {/* {user?.email} */}
          <LogoutButton />
        </div>
      ) : (
        <Link className={buttonVariants()} href="/sign-in">
          Login
        </Link>
      )}
    </div>
  );
}

export default AuthComponent;

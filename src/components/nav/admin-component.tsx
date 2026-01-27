import React from "react";
import { createClient } from "@/utils/supabase/server";
import { isAuthorizedAdminEmail } from "@/lib/utils/admin-auth";
import AdminButtonsClient from "./admin-buttons-client";

export async function AdminButtons() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email || !isAuthorizedAdminEmail(user.email)) {
    return null;
  }

  return <AdminButtonsClient />;
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

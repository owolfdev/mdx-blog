import { createClient } from "@/utils/supabase/server";
import { isAuthorizedAdminEmail } from "@/lib/utils/admin-auth";

export const requireAdminUser = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email || !isAuthorizedAdminEmail(user.email)) {
    throw new Error("Unauthorized");
  }

  return user;
};

"use server";

import { deleteContactMessage } from "@/lib/supabase-utils.mjs";

export async function deleteContactMessageAction(messageId: string) {
  try {
    console.log("Deleting message with ID:", messageId);
    const result = await deleteContactMessage(messageId);

    return {
      ok: true,
      status: 200,
      data: result,
    };
  } catch (error) {
    console.error("Error deleting contact message:", error);
    return {
      ok: false,
      status: 500,
      error: "Failed to delete contact message",
    };
  }
}

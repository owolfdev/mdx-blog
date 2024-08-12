import React from "react";
import { getContactMessage } from "@/lib/supabase-utils.mjs";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import DeleteMessageButton from "./delete-message-button";
import { revalidatePath } from "next/cache";

async function Message({ params }: { params: { id: string } }) {
  const data = await getContactMessage(params.id);
  const message = data?.[0];

  revalidatePath("/contact/messages");

  return (
    <div className="flex flex-col gap-8 w-full max-w-xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Message </h1>
        <div>From: {message.name}</div>
      </div>
      <div className="flex flex-col gap-2">
        <div>Id: {params.id} </div>
        <div>Message Type: {message.type}</div>
        <div>Date: {new Date(message.created_at).toLocaleString()} </div>
        <div>Email: {message.email}</div>
        <div>Phone: {message.phone}</div>
        <div>Company: {message.company}</div>
      </div>
      <div>Message: {message.message}</div>
      <div className="flex flex-col gap-2">
        <div>
          Read: {message.read ? "read" : "un-read"}
          {/* {JSON.stringify(message.read)} */}
        </div>
        <div>
          Responded: {message.responded ? "responded" : "not responded"}
          {/* {JSON.stringify(message.responded)} */}
        </div>
      </div>
      <DeleteMessageButton messageId={params.id} />
      <div>
        <Button>
          <Link href="/contact/messages">Back to Messages</Link>
        </Button>
      </div>
    </div>
  );
}

export default Message;

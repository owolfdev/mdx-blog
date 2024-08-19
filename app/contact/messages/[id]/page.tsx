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
    <div className="max-w-3xl z-10 w-full items-center justify-between">
      <div className="w-full flex justify-center items-center flex-col gap-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-center pb-8">
          Message{" "}
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <div>From: {message.name}</div>
        <div>Id: {params.id} </div>
        <div>Message Type: {message.type}</div>
        <div>Date: {new Date(message.created_at).toLocaleString()} </div>
        <div>Email: {message.email}</div>
        <div>Phone: {message.phone}</div>
        <div>Company: {message.company}</div>

        <div>Message: </div>
        <div className="border-2 rounded-lg p-4">{message.message}</div>
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
    </div>
  );
}

export default Message;

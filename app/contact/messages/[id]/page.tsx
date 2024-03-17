import React from "react";
import { getContactMessage } from "@/lib/supabase-utils.mjs";

const message = [
  {
    id: "e57351d7-8dce-45e9-abe6-7d302e65f5a0",
    created_at: "2023-12-20T23:43:51.921867+00:00",
    name: "Oliver",
    email: "oliverwolfson@gmail.com",
    phone: null,
    company: null,
    message:
      "ALTER TABLE contact_mdx_blog\n" +
      "ADD COLUMN IF NOT EXISTS email VARCHAR(255),\n" +
      "ADD COLUMN IF NOT EXISTS name VARCHAR(255),\n" +
      "ADD COLUMN IF NOT EXISTS message TEXT,\n" +
      "ADD COLUMN IF NOT EXISTS type VARCHAR(255),\n" +
      "ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;",
    read: false,
    responded: false,
    type: "Bug Report",
  },
];

async function Message({ params }: { params: { id: string } }) {
  const data = await getContactMessage(params.id);
  const message = data && data[0];
  console.log("message", message);

  return (
    <div className="flex flex-col gap-8 w-full max-w-xl">
      <div className="flex flex-col gap-2">
        <div>Id: {params.id} </div>
        <div>Message Type: {message.type}</div>
        <div>Date: {new Date(message.created_at).toLocaleString()} </div>
        <div>From: {message.name}</div>
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
        <div></div>
      </div>
    </div>
  );
}

export default Message;

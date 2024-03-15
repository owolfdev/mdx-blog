import React from "react";
import { DataTable } from "./data-table";
import { getContactMessages } from "@/lib/supabase-utils.mjs";
import { divide } from "lodash";

async function ContactMessages() {
  const data = await getContactMessages();
  console.log("data from getContactMessages", data);

  return (
    <div className="w-full px-6">
      <div className="text-xl font-bold pb-4">Contact Messages</div>
      <div className="flex flex-col gap-2">
        {data?.map((message) => (
          <div key={message.id}>
            <div>From: {message.name}</div>
            <div>Email: {message.email}</div>
            <div>Date: {new Date(message.created_at).toLocaleString()}</div>
            <div>Message: {message.message}</div>
          </div>
        ))}
      </div>
      <DataTable />
    </div>
  );
}

export default ContactMessages;

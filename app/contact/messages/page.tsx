import React from "react";
import { DataTable } from "./data-table";
import { getContactMessages } from "@/lib/supabase-utils.mjs";
import { divide } from "lodash";
import { is } from "date-fns/locale";
import { isDevMode } from "@/lib/utils";

interface ContactMessagesData {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  read: boolean;
  responded: boolean;
  type: string;
}

async function ContactMessages() {
  let data;
  try {
    data = await getContactMessages();
    // console.log("data from getContactMessages", data);
  } catch (error) {
    console.error("Error fetching contact messages:", error);
  }

  if (!data || !isDevMode()) {
    return (
      <div className="w-full px-6">
        <div className="text-xl font-bold pb-4">Contact Messages</div>
        <div>
          Access denied. Contact messages are only available in dev mode.
        </div>
      </div>
    );
  }

  const contactMessagesData: ContactMessagesData[] = data.map((message) => ({
    id: message.id,
    created_at: message.created_at,
    name: message.name,
    email: message.email,
    phone: message.phone,
    company: message.company,
    message: message.message,
    read: message.read,
    responded: message.responded,
    type: message.type,
  }));

  return (
    <div className="w-full px-6">
      <div className="text-xl font-bold pb-4">Contact Messages</div>
      {/* <div className="flex flex-col gap-2">
        {data.map((message) => (
          <div key={message.id}>
            <div>From: {message.name}</div>
            <div>Email: {message.email}</div>
            <div>Date: {new Date(message.created_at).toLocaleString()}</div>
            <div>Message: {message.message}</div>
          </div>
        ))}
      </div> */}
      <DataTable contactMessagesData={contactMessagesData} />
    </div>
  );
}

export default ContactMessages;

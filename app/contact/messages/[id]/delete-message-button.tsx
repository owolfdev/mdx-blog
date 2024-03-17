"use client";
import React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

function DeleteMessageButton({ messageId }: { messageId: string }) {
  const router = useRouter();
  const handleDeleteMessage = async () => {
    // console.log(`Delete message ${messageId}`);
    const response = await fetch("/api/delete-contact-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: messageId }),
    });

    router.push("/contact/messages");
    router.refresh();
  };
  return (
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger>
          <Button variant="destructive">Delete Message</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete the message?</DialogTitle>
            <DialogDescription>
              <div>This action will permanently delete this message.</div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleDeleteMessage} variant="destructive">
              Yes, Delete Message
            </Button>
            <DialogClose>
              <Button onClick={handleDeleteMessage}>Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DeleteMessageButton;

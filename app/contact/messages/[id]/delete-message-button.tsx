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
import { deleteContactMessage } from "../actions";

function DeleteMessageButton({ messageId }: { messageId: string }) {
  const router = useRouter();
  const handleDeleteMessage2 = async () => {
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

  const handleDeleteMessage = async () => {
    deleteContactMessage(messageId);
    // console.log(`Delete message ${messageId}`);
    router.push("/contact/messages");
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger>
          <div
            className={buttonVariants({ variant: "destructive", size: "lg" })}
          >
            Delete Message
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete the message?</DialogTitle>
            <DialogDescription>
              <div>This action will permanently delete this message.</div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <button
                type="button"
                onClick={handleDeleteMessage}
                className={buttonVariants({
                  variant: "destructive",
                  size: "lg",
                })}
              >
                Yes, Delete Message
              </button>
            </DialogClose>
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

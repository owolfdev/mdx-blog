"use client";
import React from "react";
import { useRouter } from "next/navigation";
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
import { deleteContactMessageAction } from "@/app/actions/delete-contact-message-action";

function DeleteMessageButton({ messageId }: { messageId: string }) {
  const router = useRouter();

  const handleDeleteMessage = async () => {
    try {
      const result = await deleteContactMessageAction(messageId);
      if (!result.ok) {
        throw new Error("Failed to delete message");
      }
      router.push("/contact/messages");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
    }
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

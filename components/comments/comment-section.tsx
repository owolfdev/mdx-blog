"use client";

import { useState } from "react";
import { addComment } from "@/actions/comments/add-comment";
import { editComment } from "@/actions/comments/edit-comment";
import { deleteComment } from "@/actions/comments/delete-comment";
import {
  getMyCommentIds,
  addMyCommentId,
  removeMyCommentId,
} from "@/lib/comments/local-storage";
import CommentList from "./comment-list";
import CommentForm from "./comment-form";
import { isDevMode } from "@/lib/utils/is-dev-mode";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Comment } from "@/types/comment";

type Props = {
  postSlug: string;
  initialComments: Comment[];
};

export default function CommentSection({ postSlug, initialComments }: Props) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  async function handleAddComment(
    authorName: string,
    content: string,
    repliedToId?: string | null
  ) {
    try {
      const newComment = await addComment({
        postSlug,
        authorName,
        content,
        repliedToId,
      });
      setComments((prev) => [...prev, newComment[0]]);
      addMyCommentId(newComment[0].id);
      setDialogOpen(false); // Close dialog after submitting
    } catch (err) {
      console.error(err);
      setError("Failed to add comment.");
    }
  }

  async function handleEditComment(id: string, newContent: string) {
    try {
      await editComment({ id, content: newContent });
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === id ? { ...comment, content: newContent } : comment
        )
      );
    } catch (err) {
      console.error(err);
      setError("Failed to edit comment.");
    }
  }

  async function handleDeleteComment(id: string) {
    try {
      await deleteComment({ id });
      setComments((prev) => prev.filter((comment) => comment.id !== id));
      removeMyCommentId(id);
    } catch (err) {
      console.error(err);
      setError("Failed to delete comment.");
    }
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      {/* Comment button */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mb-6">
            Leave a Comment
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave a Comment</DialogTitle>
          </DialogHeader>
          <CommentForm onSubmit={handleAddComment} />
        </DialogContent>
      </Dialog>

      {/* Comments List */}
      <CommentList
        comments={comments}
        onAdd={handleAddComment}
        onEdit={handleEditComment}
        onDelete={handleDeleteComment}
        isDevMode={isDevMode()}
      />

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

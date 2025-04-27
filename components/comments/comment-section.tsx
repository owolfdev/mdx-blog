"use client";

import { useState } from "react";
import { addComment } from "@/actions/comments/add-comment";
import { editComment } from "@/actions/comments/edit-comment";
import { deleteComment } from "@/actions/comments/delete-comment";
import { approveComment } from "@/actions/comments/approve-comment"; // ✅ Import approve
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

      const mappedComment: Comment = {
        id: newComment[0].id,
        postSlug: newComment[0].post_slug,
        authorName: newComment[0].author_name,
        content: newComment[0].content,
        repliedToId: newComment[0].replied_to_id,
        createdAt: newComment[0].created_at,
        updatedAt: newComment[0].updated_at,
        approved: newComment[0].is_approved,
      };

      setComments((prev) => [...prev, mappedComment]);
      addMyCommentId(mappedComment.id);
      setDialogOpen(false);
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

  async function handleApproveComment(id: string) {
    try {
      await approveComment(id);
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === id ? { ...comment, approved: true } : comment
        )
      );
    } catch (err) {
      console.error(err);
      setError("Failed to approve comment.");
    }
  }

  return (
    <div className="mt-4">
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

      {comments.length > 0 && (
        <h2 className="text-2xl font-bold mt-4">Comments</h2>
      )}

      {/* Comments List */}
      <CommentList
        comments={comments}
        onAdd={handleAddComment}
        onEdit={handleEditComment}
        onDelete={handleDeleteComment}
        onApprove={handleApproveComment} // ✅ Pass the approve handler
        isDevMode={isDevMode()}
      />

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

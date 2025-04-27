"use client";

import { useState } from "react";
import CommentForm from "./comment-form";
import { getMyCommentIds } from "@/lib/comments/local-storage";
import type { Comment } from "@/types/comment"; // ✅ Import the real Comment type

type Props = {
  comments: Comment[];
  onEdit: (id: string, newContent: string) => void;
  onDelete: (id: string) => void;
  isDevMode: boolean;
};

export default function CommentList({
  comments,
  onEdit,
  onDelete,
  isDevMode,
}: Props) {
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const myCommentIds = typeof window !== "undefined" ? getMyCommentIds() : [];

  const canEditOrDelete = (commentId: string) => {
    return isDevMode || myCommentIds.includes(commentId);
  };

  const topLevelComments = comments.filter(
    (comment) => comment.repliedToId === null
  );

  const repliesFor = (commentId: string) =>
    comments.filter((comment) => comment.repliedToId === commentId);

  function renderComment(comment: Comment) {
    return (
      <div key={comment.id} className="border-b py-4 pl-0">
        <div className="flex flex-col gap-1">
          <div className="text-lg font-semibold  mb-1">
            {comment.authorName || "Anonymous"}
          </div>
          {editingId === comment.id ? (
            <CommentForm
              initialAuthorName={comment.authorName ?? undefined}
              initialContent={comment.content}
              onCancel={() => setEditingId(null)}
              onSubmit={(authorName, content) => {
                onEdit(comment.id, content);
                setEditingId(null);
              }}
            />
          ) : (
            <p className="text-base">{comment.content}</p>
          )}
          <div className="flex gap-2 mt-1 text-xs text-gray-500">
            <button type="button" onClick={() => setReplyingToId(comment.id)}>
              Reply
            </button>
            {canEditOrDelete(comment.id) && (
              <>
                <button type="button" onClick={() => setEditingId(comment.id)}>
                  Edit
                </button>
                <button type="button" onClick={() => onDelete(comment.id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>

        {/* Reply form */}
        {replyingToId === comment.id && (
          <div className="ml-6 mt-3">
            <CommentForm
              onSubmit={(authorName, content) => {
                onEdit(comment.id, content);
                setReplyingToId(null);
              }}
              repliedToId={comment.id}
              onCancel={() => setReplyingToId(null)}
            />
          </div>
        )}

        {/* Nested replies */}
        <div className="ml-6">
          {repliesFor(comment.id).map((reply) => renderComment(reply))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-6">
      {topLevelComments.length === 0 && (
        <p className="text-gray-500">No comments yet.</p>
      )}
      {topLevelComments.map((comment) => renderComment(comment))}
    </div>
  );
}

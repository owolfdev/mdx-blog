"use client";

import { useState } from "react";
import CommentForm from "./comment-form";
import { getMyCommentIds } from "@/lib/comments/local-storage";
import type { Comment } from "@/types/comment";

type Props = {
  comments: Comment[];
  onAdd: (
    authorName: string,
    content: string,
    repliedToId?: string | null
  ) => void;
  onEdit: (id: string, newContent: string) => void;
  onDelete: (id: string) => void;
  onApprove: (id: string) => void;
  isDevMode: boolean;
};

export default function CommentList({
  comments,
  onAdd,
  onEdit,
  onDelete,
  onApprove,
  isDevMode,
}: Props) {
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const myCommentIds = typeof window !== "undefined" ? getMyCommentIds() : [];

  const canEditOrDelete = (commentId: string) => {
    return isDevMode || myCommentIds.includes(commentId);
  };

  const canSeeComment = (comment: Comment) => {
    return isDevMode || comment.approved || myCommentIds.includes(comment.id);
  };

  const visibleComments = comments.filter(canSeeComment);

  const topLevelComments = visibleComments.filter(
    (comment) => comment.repliedToId === null
  );

  const repliesFor = (commentId: string) =>
    visibleComments.filter((comment) => comment.repliedToId === commentId);

  function renderComment(comment: Comment, isReply = false) {
    return (
      <div
        key={comment.id}
        className={`pl-0 ${isReply ? "pt-2" : "border-b py-4"} ${
          !comment.approved ? "bg-muted-background" : ""
        }`}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="text-xl font-semibold">
              {comment.authorName || "Anonymous"}
            </div>
            {!comment.approved && (
              <span className="text-xs text-destructive">
                (Comment is Pending Approval)
              </span>
            )}
          </div>

          {editingId === comment.id ? (
            <CommentForm
              onSubmit={(authorName, content) => {
                onEdit(comment.id, content);
                setEditingId(null);
              }}
              initialAuthorName={comment.authorName ?? undefined}
              initialContent={comment.content}
              onCancel={() => setEditingId(null)}
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
                {isDevMode && !comment.approved && (
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => onApprove(comment.id)}
                  >
                    Approve
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Reply form */}
        {replyingToId === comment.id && (
          <div className="ml-6 mt-3">
            <CommentForm
              onSubmit={(authorName, content) => {
                onAdd(authorName, content, comment.id);
                setReplyingToId(null);
              }}
              repliedToId={comment.id}
              onCancel={() => setReplyingToId(null)}
            />
          </div>
        )}

        {/* Nested replies */}
        <div className="ml-6">
          {repliesFor(comment.id).map((reply) => renderComment(reply, true))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-6">
      {topLevelComments.map((comment) => renderComment(comment))}
    </div>
  );
}

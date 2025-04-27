"use client";

import { useState } from "react";

type Props = {
  onSubmit: (
    authorName: string,
    content: string,
    repliedToId?: string | null
  ) => void;
  repliedToId?: string | null;
  initialAuthorName?: string;
  initialContent?: string;
  onCancel?: () => void;
};

export default function CommentForm({
  onSubmit,
  repliedToId = null,
  initialAuthorName = "",
  initialContent = "",
  onCancel,
}: Props) {
  const [authorName, setAuthorName] = useState(initialAuthorName);
  const [content, setContent] = useState(initialContent);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setSubmitting(true);
      await onSubmit(authorName || "Anonymous", content, repliedToId);
      setAuthorName("");
      setContent("");
      if (onCancel) onCancel(); // For cancelling reply mode after submit
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
      <input
        type="text"
        placeholder="Your name (optional)"
        className="border p-2 rounded"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
      />
      <textarea
        placeholder="Write a comment..."
        className="border p-2 rounded h-28"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-400 text-gray-600 px-4 py-2 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

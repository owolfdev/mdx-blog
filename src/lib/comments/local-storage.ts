"use client";

// Get list of comment IDs saved for this browser
export function getMyCommentIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("my_comments");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Add a new comment ID to local storage
export function addMyCommentId(id: string) {
  if (typeof window === "undefined") return;
  try {
    const current = getMyCommentIds();
    const updated = [...new Set([...current, id])]; // prevent duplicates
    localStorage.setItem("my_comments", JSON.stringify(updated));
  } catch {
    // ignore errors
  }
}

// Remove a comment ID from local storage
export function removeMyCommentId(id: string) {
  if (typeof window === "undefined") return;
  try {
    const current = getMyCommentIds();
    const updated = current.filter((existingId) => existingId !== id);
    localStorage.setItem("my_comments", JSON.stringify(updated));
  } catch {
    // ignore errors
  }
}

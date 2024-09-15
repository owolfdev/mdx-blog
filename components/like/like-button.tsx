"use client";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import {
  countLikes,
  addLike,
  removeLike,
  isPostLikedByUser, // New action
} from "@/app/actions/like-actions";

interface LikeButtonProps {
  postId: string; // postId is a string (UUID)
}

function LikeButton({ postId }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [totalLikes, setTotalLikes] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [likeActionInProgress, setLikeActionInProgress] = useState(false); // New state for like action

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchUserId = async () => {
      let storedUserId = localStorage.getItem("userIdForMDXBlog");
      if (!storedUserId) {
        storedUserId = uuidv4(); // For testing purposes, otherwise get it from your auth system.
        localStorage.setItem("userIdForMDXBlog", storedUserId);
      }
      setUserId(storedUserId);
    };

    fetchUserId();
    fetchTotalLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  useEffect(() => {
    if (userId) {
      checkIfLikedByUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  async function fetchTotalLikes() {
    try {
      const response = await countLikes(postId);
      if (response.success && typeof response.count === "number") {
        setTotalLikes(response.count);
      } else {
        setTotalLikes(0);
      }
    } catch (error) {
      console.error("Failed to fetch likes:", error);
      setTotalLikes(0);
    } finally {
      setLoading(false); // Data has been loaded, even if there was an error
    }
  }

  async function checkIfLikedByUser() {
    try {
      const response = await isPostLikedByUser(postId, userId as string);
      if (response.success) {
        setLiked(response.liked);
      }
    } catch (error) {
      console.error("Failed to check if post is liked by user:", error);
    }
  }

  async function handleLikeAction() {
    if (userId && !likeActionInProgress) {
      setLikeActionInProgress(true); // Start the like action
      const response = await addLike(postId, userId);
      if (response.success) {
        setLiked(true);
        setTotalLikes((prev) => prev + 1);
      }
      setLikeActionInProgress(false); // End the like action
    }
  }

  async function handleUnlikeAction() {
    if (userId && !likeActionInProgress) {
      setLikeActionInProgress(true); // Start the unlike action
      const response = await removeLike(postId, userId);
      if (response.success) {
        setLiked(false);
        setTotalLikes((prev) => prev - 1);
      }
      setLikeActionInProgress(false); // End the unlike action
    }
  }

  if (loading) {
    return null; // Hide component while loading
  }

  return (
    <div className="py-8 relative flex flex-col gap-2">
      <div>Total Likes: {totalLikes}</div>
      <div>
        <button
          type="button"
          onClick={() => {
            liked ? handleUnlikeAction() : handleLikeAction();
          }}
          className={`like-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center relative overflow-hidden ${
            liked ? "liked" : "unliked"
          }`}
          disabled={likeActionInProgress} // Disable button while action is in progress
        >
          <div
            className={`like-icon ${liked ? "animate-like" : "animate-unlike"}`}
          >
            {liked ? (
              <AiFillLike className="text-xl mr-2" />
            ) : (
              <AiOutlineLike className="text-xl mr-2" />
            )}
          </div>
          {liked ? "Liked" : "Like"}
        </button>
      </div>
    </div>
  );
}

export default LikeButton;

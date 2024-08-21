"use client";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import {
  countLikes,
  addLike,
  removeLike,
  removeAllLikes,
} from "@/app/actions/like-actions";

interface LikeButtonProps {
  postId: string; // postId is now a string (UUID)
}

function LikeButton({ postId }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [totalLikes, setTotalLikes] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      storedUserId = uuidv4();
      localStorage.setItem("userId", storedUserId);
    }
    setUserId(storedUserId);

    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
    if (likedPosts[postId]) {
      setLiked(true);
    }

    fetchTotalLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

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

  async function handleLikeAction() {
    if (userId) {
      const response = await addLike(postId, userId);
      if (response.success) {
        const likedPosts = JSON.parse(
          localStorage.getItem("likedPosts") || "{}"
        );
        likedPosts[postId] = true;
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
        setLiked(true);
        setTotalLikes((prev) => prev + 1);
      }
    }
  }

  async function handleUnlikeAction() {
    if (userId) {
      const response = await removeLike(postId, userId);
      if (response.success) {
        const likedPosts = JSON.parse(
          localStorage.getItem("likedPosts") || "{}"
        );
        delete likedPosts[postId];
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
        setLiked(false);
        setTotalLikes((prev) => prev - 1);
      }
    }
  }

  async function handleRemoveAllLikes() {
    const response = await removeAllLikes();
    if (response.success) {
      localStorage.setItem("likedPosts", "{}");
      setLiked(false);
      setTotalLikes(0);
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
      <style jsx>{`
        @keyframes like-animation {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          20% {
            transform: scale(1.2) translateX(2px) rotate(5deg);
          }
        }

        @keyframes unlike-animation {
          0%,
          50% {
            transform: scale(1) rotate(0deg);
          }
        }

        .like-icon {
          animation-duration: 0.25s;
        }

        .liked .like-icon {
          animation-name: like-animation;
        }

        .unliked .like-icon {
          animation-name: unlike-animation;
        }
      `}</style>
      <div className="hidden">
        <button
          type="button"
          onClick={handleRemoveAllLikes}
          className={
            "bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2"
          }
        >
          Remove All Likes
        </button>
      </div>
    </div>
  );
}

export default LikeButton;

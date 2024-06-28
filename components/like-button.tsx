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
    // Check for an existing user ID in local storage or create a new one
    let storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      storedUserId = uuidv4();
      localStorage.setItem("userId", storedUserId);
    }
    setUserId(storedUserId);

    // Check if the post is already liked
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
    if (likedPosts[postId]) {
      setLiked(true);
    }

    // Fetch total likes
    fetchTotalLikes();

    // Set loading to false after data is loaded
    setLoading(false);
  }, [postId]);

  async function fetchTotalLikes() {
    console.log("Fetching total likes for post", postId);
    const response = await countLikes(postId);
    if (response.success && typeof response.count === "number") {
      setTotalLikes(response.count);
      console.log("Total likes fetched successfully:", response.count);
    } else {
      console.error("Failed to fetch total likes:", response.error);
      setTotalLikes(0); // default to 0 if there's an error or count is not a number
    }
  }

  async function handleLikeAction() {
    if (userId) {
      console.log("Liking post", postId, "with user ID", userId);
      const response = await addLike(postId, userId);
      if (response.success) {
        const likedPosts = JSON.parse(
          localStorage.getItem("likedPosts") || "{}"
        );
        likedPosts[postId] = true;
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
        setLiked(true);
        setTotalLikes((prev) => prev + 1);
        console.log("Like added successfully");
      } else {
        console.error("Failed to add like:", response.error);
      }
    }
  }

  async function handleUnlikeAction() {
    if (userId) {
      console.log("Unliking post", postId, "with user ID", userId);
      const response = await removeLike(postId, userId);
      if (response.success) {
        const likedPosts = JSON.parse(
          localStorage.getItem("likedPosts") || "{}"
        );
        delete likedPosts[postId];
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
        setLiked(false);
        setTotalLikes((prev) => prev - 1);
        console.log("Like removed successfully");
      } else {
        console.error("Failed to remove like:", response.error);
      }
    }
  }

  async function handleRemoveAllLikes() {
    console.log("Removing all likes");
    const response = await removeAllLikes();
    if (response.success) {
      localStorage.setItem("likedPosts", "{}");
      setLiked(false);
      setTotalLikes(0);
      console.log("All likes removed successfully");
    } else {
      console.error("Failed to remove all likes:", response.error);
    }
  }

  if (loading) {
    return null; // or you can return a loading spinner
  }

  return (
    <div className="py-8">
      <div>Total Likes: {totalLikes}</div>
      <button
        type="button"
        onClick={() => {
          liked ? handleUnlikeAction() : handleLikeAction();
        }}
        className={
          "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
        }
      >
        {liked ? (
          <AiFillLike className="text-xl mr-2" />
        ) : (
          <AiOutlineLike className="text-xl mr-2" />
        )}
        {liked ? "Liked" : "Like"}
      </button>
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

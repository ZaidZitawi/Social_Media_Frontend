import React, { useState, useEffect } from "react";
import axios from "axios";
import "./post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import CommentLikesDialog from "./CommentLikesDialog.jsx"; // Import the new LikesDialog component

const Comment = ({
  commentId,
  userImage,
  userName,
  commentTime,
  text,
  initialLikesCount,
  initialUserLiked,
}) => {
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [userLiked, setUserLiked] = useState(initialUserLiked);
  const [showLikesDialog, setShowLikesDialog] = useState(false);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    setLikesCount(initialLikesCount);
    setUserLiked(initialUserLiked);
  }, [initialLikesCount, initialUserLiked]);

  // Fetch likes when the dialog is opened
  const handleViewLikes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/v0/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("The Comment Likes are:" , response.data);
      setLikes(response.data.likes); // Set data for dialog
      setShowLikesDialog(true); // Show the dialog
    } catch (error) {
      console.error("Error fetching comment likes:", error);
    }
  };

  const handleLikeComment = async () => {
    try {
      const token = localStorage.getItem("token");

      if (userLiked) {
        await axios.delete(
          `http://localhost:8080/v0/like/unlikeComment/${commentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserLiked(false);
        setLikesCount((prevCount) => prevCount - 1);
      } else {
        await axios.post(
          `http://localhost:8080/v0/like/LikeComment/${commentId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserLiked(true);
        setLikesCount((prevCount) => prevCount + 1);
      }
    } catch (error) {
      console.error("Error liking/unliking the comment:", error);
    }
  };

  return (
    <div className="comment">
      <img src={userImage} alt="User" className="comment-user-image" />
      <div className="comment-details">
        <span className="comment-user-name">{userName}</span>
        <span className="comment-time">{commentTime}</span>
        <p className="comment-text">{text}</p>
        <div className="comment-actions">
          <button className="comment-love-btn" onClick={handleLikeComment}>
            <FontAwesomeIcon
              icon={faHeart}
              className={`heart-icon ${userLiked ? "liked" : ""}`}
            />
          </button>
          <span
            className="likes-count"
            onClick={handleViewLikes} // Fetch and show likes dialog
          >
            {likesCount} People Like This Shit
          </span>
        </div>
      </div>

      {showLikesDialog && (
        <CommentLikesDialog
          likes={likes}
          onClose={() => setShowLikesDialog(false)}
        />
      )}
    </div>
  );
};

export default Comment;

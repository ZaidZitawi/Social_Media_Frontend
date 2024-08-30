// Comment.jsx
import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import './post.css'; // Make sure this path matches your file structure

const Comment = ({ userImage, userName, commentTime, text }) => {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
    // Placeholder for like/unlike logic
  };

  return (
    <div className="comment-container">
      <div className="comment">
        <div className="comment-header">
          <img className="comment-user-image" src={userImage} alt="User" />
          <div className="comment-details">
            <p className="comment-username">{userName}</p>
            <p className="comment-time">{commentTime}</p>
          </div>
        </div>
        <p className="comment-text">{text}</p>
      </div>
      <button className="comment-love-btn" onClick={handleLikeClick}>
        <FaHeart className={`heart-icon ${liked ? 'liked' : ''}`} />
      </button>
    </div>
  );
};

export default Comment;

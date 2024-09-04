// Comment.jsx
import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns'; // Import the function from date-fns
import './post.css';

const Comment = ({ userImage, userName, commentTime, text }) => {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  // Convert commentTime from string to Date object
  const formattedTime = formatDistanceToNow(new Date(commentTime), { addSuffix: true });

  return (
    <div className="comment-container">
      <div className="comment">
        <div className="comment-header">
          <img
            className="comment-user-image"
            src={userImage}
            alt="User"
          />
          <div className="comment-details">
            <p className="comment-username">{userName}</p>
            <p className="comment-time">{formattedTime}</p>
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

// ActionButtons.jsx
import React, { useState } from 'react';
import './post.css';

const ActionButtons = ({ onCommentClick }) => {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
    // Placeholder for like/unlike logic
  };

  return (
    <div className="action-buttons">
      <button onClick={handleLikeClick} className="action-button">
        {liked ? 'Unlike' : 'Like'}
      </button>
      <button onClick={onCommentClick} className="action-button">
        Comment
      </button>
    </div>
  );
};

export default ActionButtons;

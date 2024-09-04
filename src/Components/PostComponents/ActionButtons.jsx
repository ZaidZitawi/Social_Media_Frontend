import React, { useState, useEffect } from 'react';
import './post.css';
import LikesDialog from './LikesDialog.jsx';
import axios from 'axios';

const ActionButtons = ({ likes, onCommentClick, postId, commentsCount }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [dialogOpen, setDialogOpen] = useState(false); // State to control dialog visibility
  const [usersWhoLiked, setUsersWhoLiked] = useState(likes); // Initialize with likes from props

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/v0/like/isLiked/${postId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setLiked(response.data);
      } catch (error) {
        console.error('Error fetching liked status:', error);
      }
    };

    if (postId) {
      checkIfLiked();
    }
  }, [postId]);

  const handleLikeClick = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!liked) {
        await axios.post(`http://localhost:8080/v0/like/likePosts/${postId}`, null, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setLiked(true);
        setLikeCount(prevCount => prevCount + 1);
      } else {
        await axios.delete(`http://localhost:8080/v0/like/unlikePosts/${postId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setLiked(false);
        setLikeCount(prevCount => Math.max(prevCount - 1, 0)); // Prevent like count from going negative
      }
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  const handleLikeCountClick = () => {
    setDialogOpen(true); // Open the dialog
  };

  return (
    <div className="action-buttons-container">
      <div className="action-buttons">
        <button onClick={handleLikeClick} className="action-button">
          {liked ? 'Unlike👎' : 'Like👍'}
        </button>
        <button onClick={onCommentClick} className="action-button">
          💬 {commentsCount} {commentsCount === 1 ? 'Comment' : 'Comments'}
        </button>
      </div>
      <span className="likes-count" onClick={handleLikeCountClick}>
        {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
      </span>
      {dialogOpen && (
        <LikesDialog
          users={usersWhoLiked}
          onClose={() => setDialogOpen(false)} // Close the dialog
        />
      )}
    </div>
  );
};

export default ActionButtons;

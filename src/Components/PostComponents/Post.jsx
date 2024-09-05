import React, { useState } from 'react';
import UserPostData from './UserPostData';
import MediaDisplay from './MediaDisplay';
import ActionButtons from './ActionButtons';
import CommentsContainer from './CommentsContainer';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'; 
import './post.css';

const Post = ({ post, onDelete }) => {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const profilePic = post.userEntity.profile.profilePictureUrl;
  const username = post.userEntity.name;
  const date = post.date;
  const media = post.media || [];
  const likes = post.likes || []; // Make sure to include likes
  const comments = post.comments || [];
  const postId = post.postId;

  // Toggle visibility of comments
  const toggleComments = () => {
    setIsCommentsVisible(prevVisible => !prevVisible);
  };



  const handleDeletePost = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:8080/v0/post/delete/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        if (onDelete) {
          onDelete(postId);
        }
      }
    } catch (error) {
      console.error('Error deleting post:', error.response?.data || error.message);
      alert('Failed to delete post. Please try again.');
    }
  };
  
  return (
    <div className="post">
      <UserPostData profilePic={profilePic} username={username} date={date} />
      <div className="post-text">
        <p>{post.text}</p>
      </div>

      <MediaDisplay media={media} />

      <ActionButtons
        likes={likes} // Pass likes directly from post
        onCommentClick={toggleComments}
        postId={postId}
        commentsCount={comments.length} // Pass comments count
      />
      <button className="delete-post-button" onClick={handleDeletePost}>
        <FaTrash className="trash-icon" />
      </button>
      {/* Conditionally render CommentsContainer based on isCommentsVisible */}
      {isCommentsVisible && (
        <CommentsContainer comments={comments} postId={postId} />
      )}
    </div>
  );
};

export default Post;






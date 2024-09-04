// CommentsContainer.jsx
import React, { useState } from 'react';
import './post.css';
import Comment from './Comment';
import defaultImage from '../../images/image.png';
import axios from 'axios';

const CommentsContainer = ({ comments, postId }) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState(comments);

  // Toggle the dialog for all comments
  const handleSeeAllComments = () => {
    setShowAllComments(true);
  };

  // Handle adding a new comment
  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {

         
         const token = localStorage.getItem('token'); 

        // log for debugging
        console.log('Adding comment with data:', {
          text: newComment,
          post: postId,
        });
  
        // Send the POST request with the authorization header
        const response = await axios.post(
          'http://localhost:8080/v0/comments/add',
          {
            text: newComment,
            post: postId, 
          },
          {
            headers: {
               'Authorization': `Bearer ${token}`,
               'Content-Type': 'application/json',
            },
          }
        );
  
        setCommentList([...commentList, response.data]);
        setNewComment(''); // Clear input after adding the comment
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  // Close the dialog
  const handleCloseDialog = () => {
    setShowAllComments(false);
  };

  return (
    <div className="comments-container">
      {commentList.slice(0, 3).map((comment) => {
        const user = comment.user || {};
        const profilePictureUrl = user.profile?.profilePictureUrl || '';
        const userName = user.name || 'Unknown User';
        const commentTime = new Date(comment.date).toLocaleString();
        const userImage = profilePictureUrl ? `/uploads/${profilePictureUrl}` : defaultImage;

        return (
          <Comment
            key={comment.comment_id}
            userImage={userImage}
            userName={userName}
            commentTime={commentTime}
            text={comment.text}
          />
        );
      })}

      {/* Show 'See all comments' only if there are more than 3 comments */}
      {commentList.length > 3 && (
        <button className="see-all-comments-btn" onClick={handleSeeAllComments}>
          See all comments
        </button>
      )}

      {/* Add comment input and button */}
      <div className="add-comment">
        <input
          type="text"
          className="add-comment-input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button className="add-comment-btn" onClick={handleAddComment}>
          Add
        </button>
      </div>

      {/* Full comments dialog */}
      {showAllComments && (
        <div className="comments-dialog">
          <div className="comments-dialog-content">
            <button className="close-dialog-btn" onClick={handleCloseDialog}>
              Close
            </button>
            <div className="comments-dialog-list">
              {commentList.map((comment) => {
                const user = comment.user || {};
                const profilePictureUrl = user.profile?.profilePictureUrl || '';
                const userName = user.name || 'Unknown User';
                const commentTime = new Date(comment.date).toLocaleString();
                const userImage = profilePictureUrl ? `/uploads/${profilePictureUrl}` : defaultImage;

                return (
                  <Comment
                    key={comment.comment_id}
                    userImage={userImage}
                    userName={userName}
                    commentTime={commentTime}
                    text={comment.text}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsContainer;

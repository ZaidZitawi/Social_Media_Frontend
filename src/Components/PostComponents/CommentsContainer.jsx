import React, { useState, useEffect } from "react";
import "./post.css";
import "./Dialog.css";
import Comment from "./Comment";
import CommentLikesDialog from "./CommentLikesDialog"; // Import the CommentLikesDialog component
import defaultImage from "../../images/image.png";
import axios from "axios";

const CommentsContainer = ({ comments, postId }) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState(comments);
  const [dialogComments, setDialogComments] = useState([]);
  const [showLikesDialog, setShowLikesDialog] = useState(false);
  const [selectedCommentLikes, setSelectedCommentLikes] = useState([]); // State to hold likes of the selected comment

  useEffect(() => {
    // Update comment list with likes count and user like status
    const updatedComments = comments.map((comment) => {
      const likesCount = comment.likes?.length || 0;
      const userLiked = comment.likes?.some(
        (like) =>
          like.userEntity?.userId === parseInt(localStorage.getItem("userId"))
      );
      return { ...comment, likesCount, userLiked };
    });
    setCommentList(updatedComments);
  }, [comments]);

  // Toggle the dialog to show all comments
  const handleSeeAllComments = () => {
    setDialogComments(commentList);
    setShowAllComments(true);
  };

  // Handle adding a new comment
  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:8080/v0/comments/add",
          {
            text: newComment,
            post: postId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setCommentList([
          ...commentList,
          { ...response.data, likesCount: 0, userLiked: false },
        ]);
        setNewComment(""); // Clear input after adding the comment
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setShowAllComments(false);
  };

  // Handle showing likes of a specific comment in a dialog
  const handleShowLikesDialog = (likes) => {
    setSelectedCommentLikes(likes);
    setShowLikesDialog(true);
  };

  // Close the likes dialog
  const handleCloseLikesDialog = () => {
    setShowLikesDialog(false);
  };

  return (
    <div className="comments-container">
      {commentList.slice(0, 3).map((comment) => (
        <Comment
          key={comment.comment_id}
          commentId={comment.comment_id}
          userImage={
            comment.user?.profile?.profilePictureUrl
              ? `/uploads/${comment.user.profile.profilePictureUrl}`
              : defaultImage
          }
          userName={comment.user?.name || "Unknown User"}
          commentTime={new Date(comment.date).toLocaleString()}
          text={comment.text}
          initialLikesCount={comment.likesCount}
          initialUserLiked={comment.userLiked}
          onShowLikes={() => handleShowLikesDialog(comment.likes)}
        />
      ))}

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

      {/* Dialog for all comments */}
      {showAllComments && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <button className="close-dialog-btn" onClick={handleCloseDialog}>
              Close
            </button>
            <h3>All Comments</h3>
            {dialogComments.map((comment) => (
              <Comment
                key={comment.comment_id}
                commentId={comment.comment_id}
                userImage={
                  comment.user?.profile?.profilePictureUrl
                    ? `/uploads/${comment.user.profile.profilePictureUrl}`
                    : defaultImage
                }
                userName={comment.user?.name || "Unknown User"}
                commentTime={new Date(comment.date).toLocaleString()}
                text={comment.text}
                initialLikesCount={comment.likesCount}
                initialUserLiked={comment.userLiked}
                onShowLikes={() => handleShowLikesDialog(comment.likes)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Dialog to show likes of a specific comment */}
      {showLikesDialog && (
        <CommentLikesDialog
          likes={selectedCommentLikes}
          onClose={handleCloseLikesDialog}
        />
      )}
    </div>
  );
};

export default CommentsContainer;

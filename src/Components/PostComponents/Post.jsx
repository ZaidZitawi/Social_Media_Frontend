import React, { useState } from 'react';
import UserPostData from './UserPostData';
import MediaDisplay from './MediaDisplay';
import ActionButtons from './ActionButtons';
import CommentsContainer from './CommentsContainer';
import './post.css';
import defaultImage from '../../images/image.png';

const Post = ({ post }) => {
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
      
      {/* Conditionally render CommentsContainer based on isCommentsVisible */}
      {isCommentsVisible && (
        <CommentsContainer comments={comments} postId={postId} />
      )}
    </div>
  );
};

export default Post;

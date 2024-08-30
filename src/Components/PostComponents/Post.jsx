// Post.jsx
import React, { useState } from 'react';
import UserPostData from './UserPostData';
import MediaDisplay from './MediaDisplay';
import ActionButtons from './ActionButtons';
import CommentsContainer from './CommentsContainer';
import './post.css';
import user from '../../images/image.png';

const Post = () => {
  // Dummy post data for frontend-only work
  const post = {
    id: 1,
    user: {
      profilePic: 'https://via.placeholder.com/50',
      username: 'JohnDoe',
    },
    media: [
      { type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    ],
  };

  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const toggleComments = () => {
    setIsCommentsVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className="post">
      <UserPostData
        profilePic={post.user.profilePic}
        username={post.user.username}
      />
      <MediaDisplay media={post.media} />
      <ActionButtons onCommentClick={toggleComments} />
      {isCommentsVisible && <CommentsContainer />}
    </div>
  );
};

export default Post;

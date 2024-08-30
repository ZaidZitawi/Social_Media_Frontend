// PostsList.jsx
import React from 'react';
import Post from './PostComponents/Post.jsx'; // Import the Post component

const PostsList = ({ posts }) => {
  return (
    <div className="posts-list">
      {posts.map((post, index) => (
        <Post 
          key={index}
          title={post.title}
          content={post.content}
          comments={post.comments} // Assuming posts have comments data; adjust as needed
        />
      ))}
    </div>
  );
};

export default PostsList;
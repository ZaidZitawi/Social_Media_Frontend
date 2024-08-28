// PostsList.jsx
import React from 'react';

const PostsList = ({ posts }) => {
  return (
    <div className="posts-list">
      {posts.map((post, index) => (
        <div key={index} className="post-item">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostsList;

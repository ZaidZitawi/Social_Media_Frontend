import React from 'react';
import Post from './PostComponents/Post.jsx';

const PostsList = ({ posts }) => {
  return (
    <div className="posts-list">
      {posts.map((post) => (
        <Post 
          key={post.postId} // Use postId as key
          post={post} // Pass the entire post object
        />
      ))}
    </div>
  );
};

export default PostsList;

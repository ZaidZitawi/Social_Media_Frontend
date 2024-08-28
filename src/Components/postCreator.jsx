// PostCreation.jsx
import React, { useState } from 'react';

const PostCreator = () => {
  const [postContent, setPostContent] = useState('');

  const handlePostSubmit = (e) => {
    e.preventDefault();
    // Logic to handle post creation
    console.log("Post submitted:", postContent);
    setPostContent('');
  };

  return (
    <div className="post-creation">
      <form onSubmit={handlePostSubmit}>
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="What's on your mind?"
          rows="4"
          cols="50"
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default PostCreator;

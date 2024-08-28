
import React, { useState } from 'react';
import PostCreation from './postCreator.jsx'; 
import PostsList from './PostsList.jsx';

const MainArea = () => {
  const [posts, setPosts] = useState([
    { title: 'First Post', content: 'This is the content of the first post.' },
    // Add more posts as needed
  ]);

  return (
    <div className="main-area">
      <PostCreation />
      <PostsList posts={posts} />
    </div>
  );
};

export default MainArea;
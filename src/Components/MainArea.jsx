// MainArea.jsx
import React, { useState } from 'react';
import PostCreation from './PostComponents/postCreator.jsx';
import PostsList from './PostsList.jsx';

const MainArea = () => {
  const [posts, setPosts] = useState([
    { 
      title: 'First Post', 
      content: 'This is the content of the first post.',
      comments: [
        { userImage: 'path/to/image.jpg', userName: 'John Doe', commentTime: '2h', text: 'Nice post!' },
        // More comments
      ]
    },
    { 
      title: 'First Post', 
      content: 'This is the content of the first post.',
      comments: [
        { userImage: 'path/to/image.jpg', userName: 'John Doe', commentTime: '2h', text: 'Nice post!' },
        // More comments
      ]
    },
    { 
      title: 'First Post', 
      content: 'This is the content of the first post.',
      comments: [
        { userImage: 'path/to/image.jpg', userName: 'John Doe', commentTime: '2h', text: 'Nice post!' },
        // More comments
      ]
    },
    { 
      title: 'First Post', 
      content: 'This is the content of the first post.',
      comments: [
        { userImage: 'path/to/image.jpg', userName: 'John Doe', commentTime: '2h', text: 'Nice post!' },
        // More comments
      ]
    }
  ]);

  return (
    <div className="main-area">
      <PostCreation />
      <PostsList posts={posts} />
    </div>
  );
};

export default MainArea;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCreator from './PostComponents/postCreator.jsx';
import PostsList from './PostsList.jsx';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const MainArea = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/v0/post/postsById', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Fetched posts:', response.data);
      setPosts(response.data.reverse()); // Reverse the order to show newest posts first
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Fetch posts when the component mounts or after a post is created
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to handle post creation
  const handlePostCreated = () => {
    setIsLoading(true); // Start loading
    fetchPosts().finally(() => {
      setIsLoading(false); // Stop loading
    });
  };

  return (
    <div className="main-area" style={{ border: '1px solid #1E8EAB'}}>
      {isLoading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      <PostCreator onPostCreated={handlePostCreated} />
      <PostsList posts={posts} />
    </div>
  );
};

export default MainArea;

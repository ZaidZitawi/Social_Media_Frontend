import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCreator from './PostComponents/postCreator.jsx';
import PostsList from './PostsList.jsx';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';



const MainArea = ({ view }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch posts based on the current view
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const endpoint = view === 'timeline' 
        ? 'http://localhost:8080/v0/post/friendsPosts' 
        : 'http://localhost:8080/v0/post/getAllPosts';
      const response = await axios.get(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Fetched posts:', response.data);
      setPosts(response.data.reverse()); // Reverse the order to show newest posts first
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch posts when the component mounts or when the view changes
  useEffect(() => {
    fetchPosts();
  }, [view]);

  // Function to handle post creation
  const handlePostCreated = () => {
    fetchPosts();
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

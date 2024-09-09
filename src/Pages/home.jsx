import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/home.css'; 
import Header from '../Components/Header/header.jsx';
import Sidebar from '../Components/SideBar/Sidebar.jsx';
import FriendSuggestions from '../Components/Friendship/FriendSuggestions.jsx';
import MainArea from '../Components/MainArea';

// Function to decode token and extract email
const decodeTokenEmail = (token) => {
  if (!token) {
    console.error('No token provided');
    return null;
  }

  try {
    const [header, payload] = token.split('.');
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = atob(base64);
    const parsedPayload = JSON.parse(decodedPayload);

    // Extract email from the 'sub' field in the token payload
    const email = parsedPayload.sub || null;
    if (!email) {
      console.error('No email found in token payload');
    }
    return email;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const Home = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [view, setView] = useState('explore'); // Manage current view for MainArea

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Retrieve the token from local storage
        const token = localStorage.getItem('token');
        const email = decodeTokenEmail(token);

        if (!email) {
          throw new Error('Unable to decode email from token');
        }

        // Fetch user profile data
        const response = await axios.get('http://localhost:8080/v0/user/findByEmail', {
          params: { email },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('User profile data:', response.data);

        const userProfile = response.data;
        const { name, userId } = userProfile;
        const profilePictureUrl = userProfile.profile?.profilePictureUrl;

        // Store data in local storage
        localStorage.setItem('email', email);
        localStorage.setItem('userId', userId);
        localStorage.setItem('profileImage', profilePictureUrl);
        localStorage.setItem('name', name);

        // Indicate that data loading is complete
        setDataLoaded(true);

      } catch (error) {
        console.error('Error fetching user profile:', error);
        alert('Failed to fetch user profile. Please try again.');
      }
    };

    fetchUserProfile();
  }, []);

  if (!dataLoaded) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  // Function to handle view changes from the Sidebar
  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
        <Sidebar onViewChange={handleViewChange} />
        <div className="main-area">
          <MainArea view={view} />
        </div>
        <div className="friend-suggestions">
          <FriendSuggestions />
        </div>
      </div>
    </div>
  );
};

export default Home;

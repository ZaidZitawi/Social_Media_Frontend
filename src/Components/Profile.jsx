import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get URL parameters
import ProfileHeader from './ProfileHeader';
import UserInfo from './UserInfo';
import Header from './Header/header';
import Sidebar from './SideBar/Sidebar';
import FriendSuggestions from './Friendship/FriendSuggestions';
import '../Styles/Profile.css';
import axios from 'axios';
import Post from '../Components/PostComponents/Post'; // Import Post component
import MainArea from './MainArea';

const Profile = () => {
    const { userId: routeUserId } = useParams(); // Get userId from URL params if available
    const [userId, setUserId] = useState(null);
    const [friendCount, setFriendCount] = useState(0); // State to manage friend count
    const [posts, setPosts] = useState([]); // State to manage posts
    const currentUserId = localStorage.getItem('userId'); // Get the logged-in user's ID
    const token = localStorage.getItem('token'); // Get the auth token from local storage


    useEffect(() => {
        if (routeUserId) {
            setUserId(routeUserId); // If userId is in URL, use that
        } else {
            setUserId(currentUserId); // Otherwise, fallback to the stored userId
        }
    }, [routeUserId, currentUserId]);

    useEffect(() => {
        if (userId) {
            // Fetch posts of the current user
            const fetchPosts = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/v0/post/postsById`,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                    setPosts(response.data);
                } catch (error) {
                    console.error('Error fetching user posts:', error);
                }
            };

            fetchPosts();

            // Fetch friend count (if needed)
            // Add your friend count fetching logic here
        }
    }, [userId]);

    if (!userId) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-page-container">
            <Sidebar />
            <FriendSuggestions />
            <Header />
            <div className="profile-container">
                <ProfileHeader userId={userId} />
                <div className="profile-content">
                    <div className="profile-main">
                        <UserInfo userId={userId} currentUserId={currentUserId} />
                        <div className="main-content2">
                            <nav className="profile-nav">
                                <ul>
                                    <li>Posts</li>
                                    <li>
                                        <span className="friend-count">
                                            Friends: <span>{friendCount}</span>
                                        </span>
                                    </li>
                                </ul>
                            </nav>
                            <MainArea/>

                            <div className="posts-section">
                                {posts.length > 0 ? (
                                    posts.map(post => <Post key={post.postId} post={post} />)
                                ) : (
                                    <p>No posts available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

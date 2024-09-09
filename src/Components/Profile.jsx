import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import ProfileHeader from './ProfileHeader';
import UserInfo from './UserInfo';
import Header from './Header/header';
import Sidebar from './SideBar/Sidebar';
import FriendSuggestions from './Friendship/FriendSuggestions';
import '../Styles/Profile.css';
import axios from 'axios';
import Post from '../Components/PostComponents/Post';
import MainArea from './MainArea';

const Profile = () => {
    const { userId: routeUserId } = useParams(); 
    const [userId, setUserId] = useState(null);
    const [friendCount, setFriendCount] = useState(0);
    const [posts, setPosts] = useState([]);
    const [friends, setFriends] = useState([]);
    const [showFriendsDialog, setShowFriendsDialog] = useState(false);
    const currentUserId = localStorage.getItem('userId');
    const token = localStorage.getItem('token'); 

    useEffect(() => {
        if (routeUserId) {
            setUserId(routeUserId);
        } else {
            setUserId(currentUserId);
        }
    }, [routeUserId, currentUserId]);

    useEffect(() => {
        if (userId) {
            // Fetch posts of the current user
            const fetchPosts = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/v0/post/postsById`, {
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

            // Fetch friends and count
            const fetchFriends = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/v0/friendship/user/${userId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log('Fetched friends:', response.data);
                    setFriends(response.data);
                    setFriendCount(response.data.length); // Set friend count based on the length of the response
                } catch (error) {
                    console.error('Error fetching friends:', error);
                }
            };

            fetchFriends();
        }
    }, [userId, token]);

    if (!userId) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-page-container">
            <Header />
            <div className='sb'>
                <Sidebar />
            </div>
            <div className='fr'>
                <FriendSuggestions />
            </div>
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
                                        <span 
                                            className="friend-count"
                                            onClick={() => setShowFriendsDialog(true)}
                                        >
                                            Friends: <span>{friendCount}</span>
                                        </span>
                                    </li>
                                </ul>
                            </nav>
                            <MainArea />

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

            {showFriendsDialog && (
                <div className="dialog-overlay">
                    <div className="dialog-content">
                        <button
                            className="close-dialog-btn"
                            onClick={() => setShowFriendsDialog(false)}
                        >
                            Close
                        </button>
                        <h2>Friends</h2>
                        <div className="dialog-list">
                            {friends.length === 0 ? (
                                <p>No friends found.</p>
                            ) : (
                                friends.map(friend => (
                                    <div className="friend-card" key={friend.friendshipId}>
                                        <img
                                            src={`/uploads/${friend.userEntity1.profile.profilePictureUrl}`}
                                            alt="Profile"
                                            className="friend-profile-pic"
                                        />
                                        <div className="friend-name">{friend.userEntity1.name}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;

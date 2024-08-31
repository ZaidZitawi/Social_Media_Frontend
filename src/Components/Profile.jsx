// src/Components/Profile.js
import React, { useState, useEffect } from 'react';
import ProfileHeader from './ProfileHeader';
import UserInfo from './UserInfo';
import PostForm from './PostForm'; // Import PostForm
import '../Styles/Profile.css';

const Profile = () => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId);
    }, []);

    if (!userId) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <ProfileHeader userId={userId} />
            <div className="profile-content">
                <div className="profile-main">
                    <UserInfo userId={userId} />
                    <div className="main-content">
                        <nav className="profile-nav">
                            <ul>
                                <li>Posts</li>
                                <li>Friends</li>
                                <li>Photos</li>
                            </ul>
                        </nav>
                        <div className="posts-section">
                            <PostForm userId={userId} /> {/* Add the PostForm component here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

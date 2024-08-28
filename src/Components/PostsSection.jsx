// src/Components/PostsSection.js
import React from 'react';
import PostForm from './PostForm'; // Import PostForm

const PostsSection = () => {
    return (
        <div className="main-content">
            <nav className="profile-nav">
                <ul>
                    <li>Posts</li>
                    <li>Friends</li>
                    <li>Photos</li>
                </ul>
            </nav>
            <div className="posts-section">
                <PostForm /> {/* Add the PostForm component here */}
            </div>
        </div>
    );
};

export default PostsSection;

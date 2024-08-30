import React from 'react';
import './UserProfile.css'; // Import the CSS file
import logo from '../../images/logoo.png';

export default function UserProfile() {
  return (
    <div className="user-profile">
      {/* Settings Button */}
      <div className="settings-button">
        <button className="settings-btn">
          <svg className="settings-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12h12M6 6h12M6 18h12" />
          </svg>
        </button>
        <div className="settings-menu">
          <button className="menu-item">Edit Post</button>
          <button className="menu-item">Delete Post</button>
        </div>
      </div>

      {/* Profile Picture, Name, and Follow Button */}
      <div className="profile-content">
        <img className="profile-pic" src={logo}/>
        <div className="profile-details">
          <div className="profile-header">
            <div className="profile-text">
              <p className="profile-name">Jen Smith</p>
            </div>
            <button className="follow-btn">Followed</button>
          </div>
          <p className="post-time">Posted on 17:30, June 12, 2022</p>
        </div>
      </div>
    </div>
  );
}

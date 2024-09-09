import React from 'react';
import './post.css';
import defaultImage from '../../images/image.png';

// Helper function to format time
const timeAgo = (timestamp) => {
  const now = new Date();
  const postDate = new Date(timestamp);
  const seconds = Math.floor((now - postDate) / 1000);

  let interval = Math.floor(seconds / 31536000); // Years
  if (interval > 1) return `${interval}y ago`;

  interval = Math.floor(seconds / 2592000); // Months
  if (interval > 1) return `${interval}mo ago`;

  interval = Math.floor(seconds / 86400); // Days
  if (interval > 1) return `${interval}d ago`;

  interval = Math.floor(seconds / 3600); // Hours
  if (interval > 1) return `${interval}h ago`;

  interval = Math.floor(seconds / 60); // Minutes
  if (interval > 1) return `${interval}m ago`;

  return `${Math.floor(seconds)}s ago`; // Seconds
};

const UserPostData = ({ profilePic, username, date }) => {
  // Directly construct the URL for local images
  const imageUrl = profilePic ? `/uploads/${profilePic}` : defaultImage;

  // Format the date
  const formattedDate = timeAgo(date);

  return (
    <div className="user-post-data">
      <img className="profile-pic" src={imageUrl} alt={`${username}'s profile`} />
      <div className="user-info">
        <h4>{username}</h4>
        <p>{formattedDate}</p>
      </div>
    </div>
  );
};

export default UserPostData;

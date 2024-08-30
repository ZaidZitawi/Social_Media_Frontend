import React from 'react';
import { FaUserPlus, FaUserCheck } from 'react-icons/fa';
import './FriendCard.css'; 

const FriendCard = ({ user, onFollow, onUnfollow, isFollowing }) => {
  return (
    <div className="friend-card">
      <img
        src={user.profileImage}
        alt={`${user.username}'s profile`}
        className="friend-card-image"
        loading="lazy"
      />
      <span className="friend-card-username">{user.username}</span>
      <div className="friend-card-actions">
        {isFollowing ? (
          <button
            onClick={() => onUnfollow(user.id)}
            className="friend-card-button unfollow"
            aria-label={`Unfollow ${user.username}`}
          >
            <FaUserCheck style={{ marginRight: '5px' }} />
            Unfollow
          </button>
        ) : (
          <button
            onClick={() => onFollow(user.id)}
            className="friend-card-button follow"
            aria-label={`Follow ${user.username}`}
          >
            <FaUserPlus style={{ marginRight: '5px' }} />
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default FriendCard;

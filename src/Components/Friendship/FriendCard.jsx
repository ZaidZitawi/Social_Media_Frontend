import React from "react";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";
import "./FriendCard.css";

const FriendCard = ({ user, onFollow, onUnfollow, isFollowing }) => {
  const { id, name, profileImage, requestId } = user;

  return (
    <div className="friend-card">
      <img
        src={profileImage}
        alt={`${name}'s profile`}
        className="friend-card-image"
        loading="lazy"
      />
      <span className="friend-card-username">{name}</span>
      <div className="friend-card-actions">
        {isFollowing ? (
          <button
            onClick={() => onUnfollow(id, requestId)} // Pass userId and requestId to onUnfollow
            className="friend-card-button unfollow"
            aria-label={`Unfollow ${name}`}
          >
            <FaUserCheck style={{ marginRight: "5px" }} />
            Cancel
          </button>
        ) : (
          <button
            onClick={() => onFollow(id)}
            className="friend-card-button follow"
            aria-label={`Follow ${name}`}
          >
            <FaUserPlus style={{ marginRight: "5px" }} />
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default FriendCard;

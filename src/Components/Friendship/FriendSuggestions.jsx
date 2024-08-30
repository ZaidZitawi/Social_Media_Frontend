import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import "../../Styles/home.css";
import FriendCard from "./FriendCard"; 


const FriendSuggestions = () => {
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState({});

  useEffect(() => {
    axios
      .get("/api/users/suggestions")
      .then((response) => {
        setUsers(response.data);
        // Initialize following state
        const followingState = {};
        response.data.forEach(user => followingState[user.id] = false); // Adjust this as needed
        setFollowing(followingState);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleFollow = (userId) => {
    console.log("Follow user with ID:", userId);
    setFollowing(prev => ({ ...prev, [userId]: true }));
  };

  const handleUnfollow = (userId) => {
    console.log("Unfollow user with ID:", userId);
    setFollowing(prev => ({ ...prev, [userId]: false }));
  };

  return (
    <div className="friend-suggestions-container" role="complementary" aria-label="Friend Suggestions">
      <div className="friend-suggestions-header">
        <h2 className="friend-suggestions-title">Friend Suggestions</h2>
        <Link
          to="/friends/suggestions"
          className="friend-suggestions-link"
          aria-label="View more friend suggestions"
        >
          View More
        </Link>
      </div>
      {users.length === 0 ? (
        <p>No suggestions available.</p>
      ) : (
        users.map((user) => (
          <FriendCard
            key={user.id}
            user={user}
            onFollow={handleFollow}
            onUnfollow={handleUnfollow}
            isFollowing={following[user.id]}
          />
        ))
      )}
    </div>
  );
};

export default FriendSuggestions;

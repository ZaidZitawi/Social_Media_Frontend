import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import axios from "axios";
import './FriendCard.css';
import FriendCard from "./FriendCard"; 

const FriendSuggestions = () => {
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState({});

  // Fetch user data from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:8080/v0/user/suggestions", {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching friend suggestions:", error);
      }
    };

    fetchUsers();
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
            key={user.userId}
            user={{
              id: user.userId,
              name: user.name,
              profileImage: user.profile ? `/uploads/${user.profile.profilePictureUrl}` : "/path/to/default-image.jpg"
            }}
            onFollow={handleFollow}
            onUnfollow={handleUnfollow}
            isFollowing={following[user.userId]}
          />
        ))
      )}
    </div>
  );
};

export default FriendSuggestions;

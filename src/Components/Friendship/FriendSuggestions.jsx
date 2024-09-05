import React, { useEffect, useState } from "react";
import axios from "axios";
import './FriendCard.css';
import FriendCard from "./FriendCard"; 
import defaultImage from '../../images/image.png';

const FriendSuggestions = () => {
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState({});
  const [showAll, setShowAll] = useState(false);

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
        console.log("Fetched friend suggestions:", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching friend suggestions:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleFollow = (userId) => {
    setFollowing(prev => ({ ...prev, [userId]: true }));
  };

  const handleUnfollow = (userId) => {
    setFollowing(prev => ({ ...prev, [userId]: false }));
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleCloseDialog = () => {
    setShowAll(false);
  };

  return (
    <div className="friend-suggestions-container">
      <div className="friend-suggestions-header">
        <h2 className="friend-suggestions-title">Friend Suggestions</h2>
        {users.length > 4 && (
          <button onClick={toggleShowAll} className="friend-suggestions-link">
            {showAll ? 'Show Less' : 'View More'}
          </button>
        )}
      </div>
      {users.length === 0 ? (
        <p>No suggestions available.</p>
      ) : (
        users.slice(0, 4).map((user) => (
          <FriendCard
            key={user.userId}
            user={{
              id: user.userId,
              name: user.name,
              profileImage: user.profile ? `/uploads/${user.profile.profilePictureUrl}` : defaultImage
            }}
            onFollow={handleFollow}
            onUnfollow={handleUnfollow}
            isFollowing={following[user.userId]}
          />
        ))
      )}

      {/* Overlay and Dialogue */}
      {showAll && (
        <div className="friends-dialog">
          <div className="friends-dialog-content">
            <button className="close-dialog-btn" onClick={handleCloseDialog}>
              Close
            </button>
            <div className="friends-dialog-list">
              {users.map((user) => (
                <FriendCard
                  key={user.userId}
                  user={{
                    id: user.userId,
                    name: user.name,
                    profileImage: user.profile ? `/uploads/${user.profile.profilePictureUrl}` : defaultImage
                  }}
                  onFollow={handleFollow}
                  onUnfollow={handleUnfollow}
                  isFollowing={following[user.userId]}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendSuggestions;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

// Define color scheme
const primaryBlue = "#004696";
const secondaryBlue = "#1E8EAB";
const grayishBlue = "#DDE6EC";

const FriendSuggestions = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from API
    axios.get('/api/users/suggestions') // Adjust the API endpoint accordingly
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleFollow = (userId) => {
    // Implement follow functionality
    console.log("Follow user with ID:", userId);
    // Here, you can add API call logic to follow a user
  };

  return (
    <div
      style={{
        backgroundColor: grayishBlue,
        borderRadius: "8px",
        padding: "15px",
        height: "60vh",
        overflowY: "scroll",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        width: "100%",
        maxWidth: "250px",
        marginLeft: "auto",
        marginRight: "20px",
      }}
      role="complementary" // ARIA role for better accessibility
      aria-label="Friend Suggestions"
    >
      <h2 style={{ color: primaryBlue, marginBottom: "20px" }}>Friend Suggestions</h2>
      {users.length === 0 ? (
        <p>No suggestions available.</p>
      ) : (
        users.map(user => (
          <div
            key={user.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "10px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s", // Smooth transition for hover effect
            }}
            className="suggestion-card"
            role="listitem" // ARIA role for better accessibility
          >
            <Link 
              to={`/profile/${user.id}`} 
              style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
              aria-label={`Go to ${user.username}'s profile`}
            >
              <img
                src={user.profileImage}
                alt={`${user.username}'s profile`}
                style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }}
                loading="lazy" // Lazy loading for performance
              />
              <span style={{ color: primaryBlue }}>{user.username}</span>
            </Link>
            <button
              onClick={() => handleFollow(user.id)}
              style={{
                marginLeft: "auto",
                backgroundColor: secondaryBlue,
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                transition: "background-color 0.3s", // Smooth transition for hover
              }}
              aria-label={`Follow ${user.username}`}
              className="follow-button"
            >
              <FaUserPlus style={{ marginRight: "5px" }} />
              Follow
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default FriendSuggestions;

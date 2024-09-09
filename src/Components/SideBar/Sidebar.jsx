import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaGrinWink,
  FaCompass,
  FaUserFriends,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import axios from "axios";
import logo from "../../images/logoo.png";
import "./sidebar.css";
import "../../Styles/home.css";
import "../PostComponents/Dialog.css";

const Sidebar = ({ onViewChange }) => {
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [requestCount, setRequestCount] = useState(0); // State to store the number of friend requests
  const [activeTab, setActiveTab] = useState('timeline'); // State to manage active tab
  const navigate = useNavigate();

  // Retrieve token from local storage
  const token = localStorage.getItem("token");

  // Fetch friend requests when the component is mounted
  useEffect(() => {
    axios
      .get("http://localhost:8080/v0/friend-request/received", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFriendRequests(response.data);
        setRequestCount(response.data.length); // Set the count of friend requests
        console.log("Received Friend requests:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching friend requests:", error);
      });
  }, [token]); // Run this effect once on component mount

  // Function to handle accepting a friend request
  const handleAccept = (requestId) => {
    axios
      .put(`http://localhost:8080/v0/friend-request/accept/${requestId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setFriendRequests((prevRequests) =>
          prevRequests.filter((request) => request.requestId !== requestId)
        );
        setRequestCount((prevCount) => prevCount - 1); // Decrease the count when a request is accepted
      })
      .catch((error) => {
        console.error("Error accepting friend request:", error);
      });
  };

  // Function to handle rejecting a friend request
  const handleReject = (requestId) => {
    axios
      .put(`http://localhost:8080/v0/friend-request/reject/${requestId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setFriendRequests((prevRequests) =>
          prevRequests.filter((request) => request.requestId !== requestId)
        );
        setRequestCount((prevCount) => prevCount - 1); // Decrease the count when a request is rejected
      })
      .catch((error) => {
        console.error("Error rejecting friend request:", error);
      });
  };

  // Function to handle tab clicks and view changes
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onViewChange(tab); // Notify parent of view change
    navigate('/home'); // Navigate to the home route
  };

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="logo" className="sidebar-logo" />
          <h1 className="sidebar-title">TechPees</h1>
        </div>

        <nav>
          <ul className="sidebar-list">
            <li className="sidebar-item">
              <Link to="/home" className="sidebar-link">
                <FaHome className="sidebar-icon" />
                Home
              </Link>
            </li>
            <li className="sidebar-item">
              <a
                className={`sidebar-link ${activeTab === 'timeline' ? 'active' : ''}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick('timeline');
                }}
              >
                <FaGrinWink className="sidebar-icon" />
                Timeline
              </a>
            </li>
            <li className="sidebar-item">
              <a
                className={`sidebar-link ${activeTab === 'explore' ? 'active' : ''}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick('explore');
                }}
              >
                <FaCompass className="sidebar-icon" />
                Explore
              </a>
            </li>
            <li className="sidebar-item">
              <a
                className="sidebar-link"
                onClick={() => setShowFriendRequests(true)}
                href="#"
              >
                <FaUserFriends className="sidebar-icon" />
                Friend Requests
                {requestCount > 0 && (
                  <span className="notification-counter">{requestCount}</span>
                )}
              </a>
            </li>
          </ul>

          <div className="sidebar-divider">
            <ul className="sidebar-list">
              <li className="sidebar-item">
                <Link to="/profile" className="sidebar-link">
                  <FaUser className="sidebar-icon" />
                  Profile
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to="/logout" className="sidebar-link">
                  <FaSignOutAlt className="sidebar-icon" />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      {showFriendRequests && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <button
              className="close-dialog-btn"
              onClick={() => setShowFriendRequests(false)}
            >
              Close
            </button>
            <h2>Friend Requests</h2>
            <div className="dialog-list">
              {friendRequests.length === 0 ? (
                <p>No friend requests found.</p>
              ) : (
                friendRequests.map((request) => (
                  <div className="friend-card" key={request.requestId}>
                    <img
                      src={`/uploads/${request.sender.profile.profilePictureUrl}`}
                      alt="Profile"
                      className="friend-profile-pic"
                    />
                    <div className="friend-name">{request.sender.name}</div>
                    <button
                      className="accept-btn"
                      onClick={() => handleAccept(request.requestId)}
                    >
                      Accept
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleReject(request.requestId)}
                    >
                      Reject
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;

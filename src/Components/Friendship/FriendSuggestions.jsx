import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FriendCard.css";
import "../PostComponents/Dialog.css";
import FriendCard from "./FriendCard";
import defaultImage from "../../images/image.png";
import { Tabs, Tab, Box } from "@mui/material";

const FriendSuggestions = () => {
  const [users, setUsers] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [following, setFollowing] = useState({});
  const [showAll, setShowAll] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/v0/user/suggestions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
        console.log("Friend suggestions:", response.data);
      } catch (error) {
        console.error("Error fetching friend suggestions:", error);
      }
    };

    const fetchSentRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/v0/friend-request/sent",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Parse and update the sent requests with profile image URL
        console.log("Sent requests response:", response.data);
        const requests = response.data.map(request => ({
          requestId: request.requestId,
          receiverId: request.receiver.userId,
          receiverName: request.receiver.name,
          receiverProfileImage: request.receiver.profile
            ? `/uploads/${request.receiver.profile.profilePictureUrl}`
            : defaultImage
        }));
        setSentRequests(requests);
        console.log("Sent requests:", requests);
      } catch (error) {
        console.error("Error fetching sent friend requests:", error);
      }
    };

    fetchUsers();
    fetchSentRequests();
  }, []);

  const handleCancelRequest = async (requestId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8080/v0/friend-request/cancel/${requestId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setSentRequests((prevRequests) =>
        prevRequests.filter((request) => request.requestId !== requestId)
      );
    } catch (error) {
      console.error("Error cancelling friend request:", error);
    }
  };

  const handleFollow = async (userId, userName, userProfileImage) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/v0/friend-request/send",
        {},
        {
          params: { receiverId: userId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Update the `following` state to mark the user as followed
      setFollowing((prev) => ({ ...prev, [userId]: true }));
  
      // Remove the user from suggestions after sending a request
      setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
  
      // Add the newly sent request directly to the `sentRequests` state
      setSentRequests((prevRequests) => [
        ...prevRequests,
        {
          requestId: response.data.requestId,
          receiverId: userId,
          receiverName: userName,
          receiverProfileImage: userProfileImage || defaultImage,
        },
      ]);
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const handleUnfollow = (userId, requestId) => {
    if (requestId) {
      handleCancelRequest(requestId);
      setFollowing((prev) => ({ ...prev, [userId]: false }));
    } else {
      console.error("Request ID is missing for unfollow action.");
    }
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleCloseDialog = () => {
    setShowAll(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div className="friend-suggestions-container">
      <div className="friend-suggestions-header">
        <h2 className="friend-suggestions-title">Friend Suggestions</h2>
        {users.length > 4 && (
          <button onClick={toggleShowAll} className="friend-suggestions-link">
            {showAll ? "Show Less" : "View More"}
          </button>
        )}
      </div>
      {users.length === 0 && sentRequests.length === 0 ? (
        <p>No suggestions available.</p>
      ) : (
        <>
          {users.slice(0, 4).map((user) => (
            <FriendCard
            key={user.userId}
            user={{
              id: user.userId,
              name: user.name,
              profileImage: user.profile
                ? `/uploads/${user.profile.profilePictureUrl}`
                : defaultImage,
            }}
            onFollow={() => handleFollow(user.userId, user.name, user.profile ? `/uploads/${user.profile.profilePictureUrl}` : defaultImage)}
            onUnfollow={(userId) => handleUnfollow(userId, undefined)}
            isFollowing={following[user.userId] || false}
          />
          
          ))}
        </>
      )}

      {showAll && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <button className="close-dialog-btn" onClick={handleCloseDialog}>
              Close
            </button>
            <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
              <Tabs value={tabIndex} onChange={handleTabChange}>
                <Tab label="Friend Suggestions" />
                <Tab label="Sent Requests" />
              </Tabs>
              <Box sx={{ padding: 2 }}>
                {tabIndex === 0 && (
                  <div className="dialog-list">
                    {users.map((user) => (
                      <FriendCard
                        key={user.userId}
                        user={{
                          id: user.userId,
                          name: user.name,
                          profileImage: user.profile
                            ? `/uploads/${user.profile.profilePictureUrl}`
                            : defaultImage,
                        }}
                        onFollow={() => handleFollow(user.userId, user.name, user.profile ? `/uploads/${user.profile.profilePictureUrl}` : defaultImage)}
                        onUnfollow={(userId) => handleUnfollow(userId, undefined)}
                        isFollowing={following[user.userId] || false}
                      />
                    ))}
                  </div>
                )}
                {tabIndex === 1 && (
                  <div className="dialog-list">
                    {sentRequests.map((request) => (
                      <FriendCard
                        key={request.requestId}
                        user={{
                          id: request.receiverId,
                          name: request.receiverName,
                          profileImage: request.receiverProfileImage || defaultImage,
                          requestId: request.requestId,
                        }}
                        onFollow={handleFollow}
                        onUnfollow={(userId) => handleUnfollow(userId, request.requestId)}
                        isFollowing={true}
                      />
                    ))}
                  </div>
                )}
              </Box>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendSuggestions;

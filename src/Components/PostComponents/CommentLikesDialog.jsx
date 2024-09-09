import React from "react";
import "./Dialog.css"; 

const CommentLikesDialog = ({ likes, onClose }) => {
  // Convert the Set to an array to ensure .map() works
  const likesArray = Array.isArray(likes) ? likes : Array.from(likes);

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <button className="close-dialog-btn" onClick={onClose}>
          Close
        </button>
        <h3>Users who liked this comment:</h3>
        <div className="dialog-list">
          {likesArray.map((like, index) => {
            // Logging the coverPictureUrl value
            console.log(`Cover Picture URL for user ${like.userEntity.name}:`, like.userEntity.profile?.profilePictureUrl);
            const profilePictureUrl = like.userEntity.profile?.profilePictureUrl || "";
            return (
              <div key={index} className="like-card">
                <img
                  src={`/uploads/${profilePictureUrl}`}
                  alt={`${like.userEntity.name}'s profile`}
                  className="like-profile-pic"
                />
                <p className="like-name">{like.userEntity.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommentLikesDialog;

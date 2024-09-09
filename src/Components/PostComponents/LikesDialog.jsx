import React from "react";
import "./Dialog.css";
import defaultImage from "../../images/image.png";

const LikesDialog = ({ users, onClose }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <p>WELCOME TO THE LIKERS Zone, CHECK WHO LIKES YOU</p>
        <button className="close-dialog-btn" onClick={onClose}>
          Close
        </button>
        <div className="dialog-list">
          {users.map((user) => {
            const profilePictureUrl =
              user.userEntity.profile?.profilePictureUrl || "";
            const userName =
              user.userEntity.name + " gave you a Big LIKE Bro👍" ||
              "Unknown User";
            const userImage = profilePictureUrl
              ? `/uploads/${profilePictureUrl}`
              : defaultImage;

            return (
              <div key={user.userEntity.userId} className="like-card">
                <img
                  src={userImage}
                  alt={userName}
                  className="like-profile-pic"
                />
                <span className="like-name">{userName}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LikesDialog;

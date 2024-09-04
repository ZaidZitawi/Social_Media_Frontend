import React from 'react';
import './likesDialog.css';

const LikesDialog = ({ users, onClose }) => {
  return (
    <div className="likes-dialog">
      <div className="likes-dialog-content">
      <p>WLCOME TO THE LIKERS Zone, CHECK WHO LIKES YOU</p>
        <button className="close-dialog-btn" onClick={onClose}>
          Close
        </button>
        <div className="likes-list">
          {users.map(user => {
            const profilePictureUrl = user.userEntity.profile?.profilePictureUrl || '';
            const userName = user.userEntity.name + ' gave you a Big LIKE Bro👍' || 'Unknown User';
            const userImage = profilePictureUrl ? `/uploads/${profilePictureUrl}` : '/path/to/default/image.png';

            return (
              <div key={user.userEntity.userId} className="like-card">
                <img src={userImage} alt={userName} className="like-profile-pic" />
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

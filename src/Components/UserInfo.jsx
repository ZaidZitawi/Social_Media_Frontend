import React from 'react';

const UserInfo = ({ name, onEditProfile }) => {
    return (
        <div className="user-info">
            <h1>{name}</h1>
            <p>Short Bio or Details</p>
            <div className="action-buttons">
                <button onClick={onEditProfile}>Edit Profile</button>
                <button>Add Friend</button>
            </div>
        </div>
    );
};

export default UserInfo;

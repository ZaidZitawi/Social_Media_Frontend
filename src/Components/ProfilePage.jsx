import React, { useState } from 'react';
import Profile from '../Components/Profile';
import EditProfile from '../Components/EditProfile';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="profile-page-container">
            {isEditing ? (
                <EditProfile onCancel={toggleEdit} />
            ) : (
                <Profile onEdit={toggleEdit} />
            )}
        </div>
    );
};

export default ProfilePage;

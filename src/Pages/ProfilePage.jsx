import React, { useState } from 'react';
import Profile from '../Components/Profile';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="profile-page-container">
            <Profile onEdit={toggleEdit} />
        </div>
    );
};

export default ProfilePage;

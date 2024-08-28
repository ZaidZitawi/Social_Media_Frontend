import React from 'react';
import EditIcon from '@mui/icons-material/Edit';

const ProfileHeader = ({ coverPhotoSrc, profilePicSrc, onCoverPhotoChange, onProfilePicChange }) => {
    return (
        <div className="profile-header">
            <div className="cover-photo" style={{ backgroundImage: `url(${coverPhotoSrc})` }}>
                <div className="edit-cover-icon">
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => onCoverPhotoChange(e)}
                        id="cover-photo-upload"
                    />
                    <label htmlFor="cover-photo-upload">
                        <EditIcon />
                    </label>
                </div>
            </div>
            <div className="profile-picture">
                <img src={profilePicSrc} alt="Profile" />
                <div className="edit-profile-picture-icon">
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => onProfilePicChange(e)}
                        id="profile-picture-upload"
                    />
                    <label htmlFor="profile-picture-upload">
                        <EditIcon />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;

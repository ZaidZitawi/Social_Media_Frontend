import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';

const ProfileHeader = ({ userId }) => {
    const [profilePictureUrl, setProfilePictureUrl] = useState("/default-profile.png");
    const [coverPhotoUrl, setCoverPhotoUrl] = useState("");
    const token = localStorage.getItem('token');
    

    const path = "/uploads/";

    useEffect(() => {
        if (!userId) return; 

        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/v0/profile/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const { profilePictureUrl, coverPictureUrl } = response.data;
                setProfilePictureUrl(profilePictureUrl ? path + profilePictureUrl : "");
                setCoverPhotoUrl(coverPictureUrl ? path + coverPictureUrl : "");
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, [userId, token]);

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file && userId) {
            uploadProfilePicture(userId, file);
        }
    };

    const handleCoverPhotoChange = (e) => {
        const file = e.target.files[0];
        if (file && userId) {
            uploadCoverPhoto(userId, file);
        }
    };

    const uploadProfilePicture = async (userId, file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.put(`http://localhost:8080/v0/profile/updateProfilePicture/${userId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Upload Response:', response.data);

            setProfilePictureUrl(path + response.data.profilePictureUrl);
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    };

    const uploadCoverPhoto = async (userId, file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.put(`http://localhost:8080/v0/profile/updateCoverPicture/${userId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setCoverPhotoUrl(path + response.data.coverPictureUrl);
        } catch (error) {
            console.error('Error uploading cover photo:', error);
        }
    };

    return (
        <div className="profile-headerrr">
            <div className="cover-photo-container">
                {coverPhotoUrl ? (
                    <img src={coverPhotoUrl} alt="Cover" />
                ) : (
                    <div>No Cover Photo</div>
                )}
                <div className="edit-cover-icon">
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleCoverPhotoChange}
                        id="cover-photo-upload"
                    />
                    <label htmlFor="cover-photo-upload">
                        <EditIcon />
                    </label>
                </div>
            </div>
            <div className="profile-picture">
                <img src={profilePictureUrl} alt="Profile" />
                <div className="edit-profile-picture-icon">
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleProfilePictureChange}
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

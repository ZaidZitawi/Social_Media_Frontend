import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import coverPhoto from '../images/cover_photo.jpg';
import profilePicture from '../images/profile_picture.jpg';
import '../Styles/Profile.css';
import ProfileHeader from './ProfileHeader';
import UserInfo from './UserInfo';
import PersonalInfo from './PersonalInfo';
import PostsSection from './PostsSection';
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate();
    const [coverPhotoSrc, setCoverPhotoSrc] = useState(coverPhoto);
    const [profilePicSrc, setProfilePicSrc] = useState(profilePicture);
    const [isEditing, setIsEditing] = useState(false);
    const [personalInfo, setPersonalInfo] = useState({
        name: 'Zaid Zitawi',
        education: 'University Name',
        work: 'Company Name',
        dob: 'January 1, 1990'
    });

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        setPersonalInfo({
            ...personalInfo,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        // Save updated personal info
        setIsEditing(false);
    };

    const handleFileChange = async (event, type) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                if (type === 'cover') {
                    const response = await axios.post(`/api/profile/1/upload-cover-picture`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    setCoverPhotoSrc(`path/to/upload/directory/${response.data.coverPictureUrl}`);
                } else if (type === 'profile') {
                    const response = await axios.post(`/api/profile/1/upload-profile-picture`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    setProfilePicSrc(`path/to/upload/directory/${response.data.profilePictureUrl}`);
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    return (
        <div className="profile-container">
            <ProfileHeader 
                coverPhotoSrc={coverPhotoSrc} 
                profilePicSrc={profilePicSrc} 
                onCoverPhotoChange={(e) => handleFileChange(e, 'cover')} 
                onProfilePicChange={(e) => handleFileChange(e, 'profile')} 
            />
            <div className="profile-content">
                <div className="profile-main">
                    <UserInfo name={personalInfo.name} onEditProfile={handleEditProfile} />
                    <PostsSection />
                </div>
                <div className="profile-sidebar">
                    <PersonalInfo 
                        personalInfo={personalInfo} 
                        isEditing={isEditing} 
                        onChange={handleChange} 
                        onSave={handleSave} 
                        onEdit={toggleEdit} 
                    />
                </div>
            </div>
        </div>
    );
};

export default Profile;

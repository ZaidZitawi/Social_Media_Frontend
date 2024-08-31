import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Profile.css';

const UserInfo = ({ userId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!userId) {
            console.error('User ID is null or undefined');
            return;
        }

        // Fetch the user's profile and user data when the component mounts
        const fetchProfileData = async () => {
            try {
                // Fetch profile data to get bio
                const profileResponse = await axios.get(`http://localhost:8080/v0/profile/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setBio(profileResponse.data.bio || '');

                // Fetch user data to get name and email
                const userResponse = await axios.get(`http://localhost:8080/v0/user/${userId}/name`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setName(userResponse.data || '');

                const emailResponse = await axios.get(`http://localhost:8080/v0/user/${userId}/email`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setEmail(emailResponse.data || '');
                
            } catch (error) {
                console.error('Error fetching profile or user data:', error);
            }
        };

        fetchProfileData();
    }, [userId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'bio') setBio(value);
        else if (name === 'name') setName(value);
        // No need to handle email changes as it should not be editable
    };

    const handleSave = async () => {
        if (!userId) {
            console.error('Cannot save data because user ID is null or undefined');
            return;
        }

        try {
            // Update the profile bio
            await axios.put(`http://localhost:8080/v0/profile/updateInfo/${userId}`, 
                { bio },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Update the user name
            await axios.put(`http://localhost:8080/v0/user/${userId}/update`, 
                { name },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile information:', error);
        }
    };

    return (
        <div className="user-info">
            <h1 className="pp">Personal Information</h1>
            {isEditing ? (
                <div className="edit-form">
                    <label>
                        <strong>Name:</strong>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <strong>Email:</strong>
                        <p>{email}</p> {/* Display email without editing */}
                    </label>
                    <label>
                        <strong>Bio:</strong>
                        <textarea
                            name="bio"
                            value={bio}
                            onChange={handleChange}
                        />
                    </label>
                    <div className="action-buttons">
                        <button onClick={handleSave} className="save-button">Save</button>
                        <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
                    </div>
                </div>
            ) : (
                <div>
                    <p className="name"><strong>Name:</strong> {name}</p> {/* Apply the name class */}
                    <p className="email"><strong>Email:</strong> {email}</p>
                    <p className="bio"><strong>Bio:</strong> {bio}</p>
                    <div className="action-buttons">
                        <button className="add-friend-button">Add Friend</button>
                        <button onClick={() => setIsEditing(true)} className="edit-button">Edit Profile</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserInfo;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Profile.css';

const UserInfo = ({ userId, currentUserId }) => {
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

        const fetchProfileData = async () => {
            try {
                const profileResponse = await axios.get(`http://localhost:8080/v0/profile/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setBio(profileResponse.data.bio || '');

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
    };

    const handleSave = async () => {
        if (!userId) {
            console.error('Cannot save data because user ID is null or undefined');
            return;
        }

        try {
            await axios.put(`http://localhost:8080/v0/profile/updateInfo/${userId}`, 
                { bio },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

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
        <div className="user-info2">
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
                        <p>{email}</p>
                    </label>
                    <label>
                        <strong>Bio:</strong>
                        <textarea
                            name="bio"
                            value={bio}
                            onChange={handleChange}
                        />
                    </label>
                    <div className="action-buttons2">
                        <button onClick={handleSave} className="save-button">Save</button>
                        <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
                    </div>
                </div>
            ) : (
                <div>
                    <p className="name"><strong>Name:</strong> {name}</p>
                    <p className="email"><strong>Email:</strong> {email}</p>
                    <p className="bio"><strong>Bio:</strong> {bio}</p>
                    <div className="action-buttons2">
                        {userId === currentUserId ? (
                            <>
                                <button onClick={() => setIsEditing(true)} className="edit-button">Edit Profile</button>
                                {/* Optionally, add other buttons related to your profile */}
                            </>
                        ) : (
                            <button className="add-friend-button">Add Friend</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserInfo;

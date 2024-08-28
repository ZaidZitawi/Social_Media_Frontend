import React, { useState } from 'react';
import '../Styles/EditProfile.css'; // Import styles

const EditProfile = () => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
 

    const handleSave = () => {
        // Handle saving the updated profile information
        console.log('Profile updated:', { name, bio });
    };

    
    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            <div className="edit-section">
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bio">Bio</label>
                        <textarea
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>
                   
                    <button type="button" onClick={handleSave}>Save</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="add-section">
            </div>
        </div>
    );
};

export default EditProfile;

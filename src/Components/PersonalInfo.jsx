// src/Components/PersonalInfo.js
import React from 'react';

const PersonalInfo = ({ personalInfo, isEditing, onChange, onSave, onEdit }) => {
    return (
        <div className="personal-info-section">
            <div className="additional-info">
                <h3>Personal Information</h3>
                {isEditing ? (
                    <div>
                        <p><strong>Name:</strong> <input type="text" name="name" value={personalInfo.name} onChange={onChange} /></p>
                        <p><strong>Education:</strong> <input type="text" name="education" value={personalInfo.education} onChange={onChange} /></p>
                        <p><strong>Work:</strong> <input type="text" name="work" value={personalInfo.work} onChange={onChange} /></p>
                        <p><strong>Date of Birth:</strong> <input type="text" name="dob" value={personalInfo.dob} onChange={onChange} /></p>
                        <button onClick={onSave} className="save-button">Save</button>
                    </div>
                ) : (
                    <div>
                        <p><strong>Name:</strong> {personalInfo.name}</p>
                        <p><strong>Education:</strong> {personalInfo.education}</p>
                        <p><strong>Work:</strong> {personalInfo.work}</p>
                        <p><strong>Date of Birth:</strong> {personalInfo.dob}</p>
                        <button onClick={onEdit} className="edit-button">Edit</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PersonalInfo;

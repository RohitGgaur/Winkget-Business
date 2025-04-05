import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  // Initial user data
  const [userData, setUserData] = useState({
    name: 'your name',
    email: 'yourname@gmail.com',
    mobile: 'Add number',
    location: 'USA'
  });

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State for form data in the modal
  const [formData, setFormData] = useState({...userData});

  // Handle input changes in the modal form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle save changes
  const handleSaveChanges = () => {
    setUserData({...formData});
    setIsModalOpen(false);
  };

  // Handle modal open
  const openModal = () => {
    setFormData({...userData});
    setIsModalOpen(true);
  };

  // Handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="app-wrapper">
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <img src="https://via.placeholder.com/40" alt="User avatar" />
            </div>
            <div className="profile-user-meta">
              <h3 className="profile-username">{userData.name}</h3>
              <p className="profile-email">{userData.email}</p>
            </div>
            <button className="profile-close-btn">×</button>
          </div>

          <div className="profile-body">
            <div className="profile-field-row">
              <span className="field-name">Name</span>
              <span className="field-value">{userData.name}</span>
            </div>
            
            <div className="profile-field-row">
              <span className="field-name">Email account</span>
              <span className="field-value">{userData.email}</span>
            </div>
            
            <div className="profile-field-row">
              <span className="field-name">Mobile number</span>
              <span className="field-value">{userData.mobile}</span>
            </div>
            
            <div className="profile-field-row">
              <span className="field-name">Location</span>
              <span className="field-value">{userData.location}</span>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn-save" onClick={openModal}>
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-panel">
            <h2 className="modal-title">Update Your Profile</h2>
            
            <div className="edit-form">
              <div className="form-field">
                <label className="field-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="field-input"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-field">
                <label className="field-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="field-input"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-field">
                <label className="field-label">Mobile number</label>
                <input
                  type="text"
                  name="mobile"
                  className="field-input"
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-field">
                <label className="field-label">Location</label>
                <input
                  type="text"
                  name="location"
                  className="field-input"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn-confirm" onClick={handleSaveChanges}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
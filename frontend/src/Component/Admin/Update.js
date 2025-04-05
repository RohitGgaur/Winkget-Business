import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './update.css'; // Import the CSS file

const Update = ({ showModal, onClose, id }) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id && showModal) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`http://localhost:8000/api/Adminget/${id}`);
                    if (response.data) {
                        setData(response.data);
                    } else {
                        setError('Unexpected data format');
                    }
                } catch (error) {
                    setError('Failed to load admin data');
                }
                setLoading(false);
            };
            fetchData();
        }
    }, [id, showModal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/api/admin-update/${id}`, data);
            console.log('Admin updated:', response.data);
            onClose(); // Close the modal after saving
        } catch (error) {
            setError('Failed to update admin data');
        }
    };

    if (!showModal) return null;

    if (loading) {
        return (
            <div className="modal show">
                <div className="modal-dialog">
                    <div className="modal-contents">
                        <p>Loading admin data...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="modal show">
                <div className="modal-dialog0">
                    <div className="modal-contents">
                        <p className="error-message">{error}</p>
                        <div className="modal-footer">
                            <button type="button" className="btn0 btn-secondary" onClick={onClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="modal show" tabIndex={-1}>
            <div className="modal-dialog0">
                <div className="modal-contents">
                    <div className="modal-header">
                        <h5 className="modal-title">Admin Profile</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onClose}
                        />
                    </div>
                    
                    <div className="cards">
                        {/* Card Header with Admin Name */}
                        <div className="card-head1">
                            <h4>{data.name || "Admin Profile"}</h4>
                        </div>

                        {/* Email Section */}
                        <div className="section1">
                            <label htmlFor="email" className="form-label">Email Address:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={data.email || ''}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter email address"
                            />
                        </div>

                        {/* City Section */}
                        <div className="section2">
                            <label htmlFor="city" className="form-labels">City:</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={data.City || ''}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter city"
                            />
                        </div>

                        {/* Position Dropdown */}
                        <div className="section3">
                            <label htmlFor="position" className="form-labels">Position:</label>
                            <select
                                id="position"
                                name="position"
                                value={data.position || ""}
                                onChange={handleChange}
                                className="form-select"
                                required
                            >
                                <option value="">Select a position</option>
                                <option value="Head Admin">Head Admin</option>
                                <option value="Ass. Admin">Ass. Admin</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn0 btn-secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn0 btn-primarys"
                            onClick={handleSubmit}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Update;
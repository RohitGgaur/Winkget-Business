import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Update = ({ showModal, onClose, id }) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id && showModal) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`https://winkget-backend.onrender.com/api/Adminget/${id}`);
                    if (response.data) {
                        setData(response.data);
                    } else {
                        setError('Unexpected data format');
                    }
                } catch (error) {
                    setError('Failed to load student data');
                }
                setLoading(false);
            };
            fetchData();
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.put(`https://winkget-backend.onrender.com/api/admin-update/${id}`, data);
            console.log('Student updated:', response.data);
            onClose(); // Close the modal after saving
        } catch (error) {
            setError('Failed to update student data');
        }
    };

    if (!showModal) return null;

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
    return (
        <div className="modal show" tabIndex={-1} style={{ display: "block" }}>
            <div className="modal-dialog">
                <div className="modal-content" style={{ width: "600px", height: "500px" }}>
                    <div className="modal-header">
                        <h5 className="modal-title">Admin Profile</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onClose}
                        />
                    </div>
                    <div className="card1">
    {/* Card Header */}
    <div className="card-head1">
        <h4>{data.name || "No Name"}</h4>
    </div>

    {/* Email Section */}
    <div className="section1 mt-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input
            type="email"
            id="email"
            name="email"
            value={data.email || ''}
            onChange={handleChange}
            className="form-control"
            style={{
                width: "100%",
                height: "35px",
                border: "1px solid black",
                borderRadius: "5px",
                padding: "5px"
            }}
        />
    </div>

    {/* City Section */}
    <div className="section2 mt-4">
        <label htmlFor="city" className="form-label">City:</label>
        <input
            type="text"
            id="city"
            name="city"
            value={data.city || ''}
            onChange={handleChange}
            className="form-control"
            style={{
                width: "100%",
                height: "35px",
                border: "1px solid black",
                borderRadius: "5px",
                padding: "5px"
            }}
        />
    </div>

    {/* Position Dropdown */}
    <div className="section3 mt-4">
        <label htmlFor="position" className="form-label">Position:</label>
        <select
            id="position"
            name="position"
            value={data.position || ""}
            onChange={handleChange}
            className="form-select"
            required
            style={{
                width: "100%",
                height: "40px",
                border: "1px solid black",
                borderRadius: "5px",
                padding: "5px"
            }}
        >
            <option value="">Choose one</option>
            <option value="Head Admin">Head Admin</option>
            <option value="Ass. Admin">Ass. Admin</option>
            <option value="Admin">Admin</option>
        </select>
    </div>
</div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Update;

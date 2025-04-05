import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img from "../../image/Winget.png";
import "./reg.css";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileimg, setProfileimg] = useState(null);
    const [imgprev, setImgprev] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); 

    const imageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImgprev(URL.createObjectURL(file));
            setProfileimg(file);
        }
    };

    const uploadImage = async () => {
        if (!profileimg) {
            toast.warning("Please select a profile image");
            return null;
        }

        const data = new FormData();
        data.append('file', profileimg);
        data.append('upload_preset', 'eq2in9eu');
        
        try {
            let response = await fetch('https://api.cloudinary.com/v1_1/dw89rwftg/image/upload', {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                throw new Error('Image upload failed');
            }

            let urlData = await response.json();
            return urlData;
        } catch (error) {
            console.error('Image upload error:', error);
            toast.error("Image upload failed. Please try again.");
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Form validation
        if (!name.trim() || !email.trim() || !password.trim() || !profileimg) {
            toast.warning("Please fill in all fields and select a profile image");
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.warning("Please enter a valid email address");
            return;
        }
        
        // Password validation
        if (password.length < 6) {
            toast.warning("Password must be at least 6 characters long");
            return;
        }
        
        setIsLoading(true);
        
        const urlData = await uploadImage();
        if (!urlData || !urlData.url) {
            setIsLoading(false);
            return;
        }
        
        try {
            const response = await axios.post('http://localhost:8000/api/Registration', {
                name,
                email,
                password,
                image: urlData.url
            });

            toast.success("Registration Successful!");
            
            // Reset form
            setName('');
            setEmail('');
            setPassword('');
            setImgprev(null);
            setProfileimg(null);
            
            // Redirect after a short delay
            setTimeout(() => {
                navigate('/superdesk/:id');
            }, 1500);
            
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
            toast.error(errorMessage);
            console.error("Registration failed:", err.response ? err.response.data : err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="body">
            {/* Logo at top */}
            <div className="image">
                <img src={img} alt="Winget Logo" />
            </div>
            
            <div className="register-container">
                <div className="container-main1">
                    <div className="heading">
                        <h4>Create Account</h4>
                    </div>

                    {/* Form */}
                    <form className="form1" onSubmit={handleSubmit}>
                        <div className="form-group1">
                            <input
                                type="text"
                                className="form-controls"
                                id="name"
                                placeholder="Admin Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group1">
                            <input
                                type="email"
                                className="form-controls"
                                id="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group1">
                            <input
                                type="password"
                                className="form-controls"
                                id="password"
                                placeholder="Password (min. 6 characters)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength="6"
                            />
                        </div>

                        <div className="form-group1">
                            <input 
                                onChange={imageChange} 
                                className="form-controls" 
                                type="file" 
                                id="profileImage" 
                                accept="image/*"
                                required
                            />
                        </div>
                        
                        {/* Display image preview if available */}
                        {imgprev && (
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <img 
                                    src={imgprev} 
                                    alt="Profile Preview" 
                                    style={{ 
                                        maxWidth: '100px', 
                                        maxHeight: '100px', 
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: '2px solid rgb(64, 95, 95)'
                                    }} 
                                />
                            </div>
                        )}

                        <div className="users">
                            <Link to="/Superlogin">Already Registered? Sign In</Link>
                        </div>

                        <button 
                            type="submit" 
                            className="btns btns-primarys"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : 'Register'}
                        </button>
                    </form>
                </div>
            </div>
            
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Register;
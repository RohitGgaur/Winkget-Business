import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./form.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [profileimg, setProfileimg] = useState(null);
  const [imgprev, setImgprev] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [user, setUser] = useState(null); // Logged-in user

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    testimonial: '',
    rating: 0,
    satisfaction: 1,
    recommend: '',
    image: ''
  });

  // Load user from localStorage and fetch testimonials
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setFormData(prev => ({
        ...prev,
        name: storedUser.name,
        email: storedUser.email
      }));
    }

    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("https://winkget-backend.onrender.com/api/testimonials");
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  // Handle image selection
  const imageChange = (e) => {
    const file = e.target.files[0];
    setImgprev(URL.createObjectURL(file));
    setProfileimg(file);
  };

  // Upload image to Cloudinary
  const uploadImage = async () => {
    const data = new FormData();
    data.append('file', profileimg);
    data.append('upload_preset', 'eq2in9eu');

    try {
      let response = await fetch('https://api.cloudinary.com/v1_1/dw89rwftg/image/upload', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) throw new Error('Image upload failed');
      let urlData = await response.json();
      return urlData.url;
    } catch (error) {
      console.error('Image upload error:', error);
      return null;
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Rating stars
  const handleRating = (star) => {
    setFormData({ ...formData, rating: star });
  };

  // Satisfaction icons
  const handleSatisfaction = (level) => {
    setFormData({ ...formData, satisfaction: level });
  };

  // Submit feedback form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to submit the form.");
      return;
    }

    const imageUrl = await uploadImage();
    if (!imageUrl) {
      toast.error("Image upload failed. Please try again.");
      return;
    }

    try {
      const response = await axios.post("https://winkget-backend.onrender.com/api/testimonials", {
        ...formData,
        image: imageUrl
      });

      toast.success("Feedback Received!");
      setFormData({
        name: user.name,
        email: user.email,
        testimonial: '',
        rating: 0,
        satisfaction: 3,
        recommend: '',
        image: ''
      });
      setProfileimg(null);
      setImgprev(null);
      setTestimonials([...testimonials, response.data]);
    } catch (error) {
      toast.error("Failed to submit testimonial. Please try again.");
    }
  };

  return (
    <div className="testimonial-container">
      <div className="testimonial-form-card">
        <h2 className="form-title">Customer Testimonial</h2>
        <p className="form-subtitle">
          We would love to hear about your experience with our service!
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-gro">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              disabled
              readOnly
              required
            />
          </div>

          <div className="form-gro">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              disabled
              readOnly
              required
            />
          </div>

          <div className="form-gro">
            <label htmlFor="testimonial">Your Testimonial</label>
            <textarea
              id="testimonial"
              name="testimonial"
              placeholder="Share your experience with us..."
              value={formData.testimonial}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="form-gro">
            <label>Overall Rating</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${formData.rating >= star ? 'filled' : ''}`}
                  onClick={() => handleRating(star)}
                >
                  ★
                </span>
              ))}
              <span className="rating-text">Rate your overall experience</span>
            </div>
          </div>

          <div className="form-gro">
            <label>Satisfaction Level</label>
            <div className="satisfaction-scale">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`satisfaction-icon ${formData.satisfaction === level ? 'selected' : ''}`}
                  onClick={() => handleSatisfaction(level)}
                >
                  {level === 1 && '😠'}
                  {level === 2 && '🙁'}
                  {level === 3 && '😐'}
                  {level === 4 && '🙂'}
                  {level === 5 && '😄'}
                </div>
              ))}
            </div>
          </div>

          <div className="form-gro">
            <label>Profile image</label>
            <input type="file" onChange={imageChange} required />
            {imgprev && <img src={imgprev} alt="Preview" width="100" />}
          </div>

          <div className="form-gro">
            <label>Would you recommend us?</label>
            <div className="recommend-options">
              <label className="radio-label">
                <input
                  type="radio"
                  name="recommend"
                  value="Yes"
                  checked={formData.recommend === 'Yes'}
                  onChange={handleChange}
                />
                <span>Yes</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="recommend"
                  value="No"
                  checked={formData.recommend === 'No'}
                  onChange={handleChange}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          <button type="submit" className="submit-btns">
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Form;

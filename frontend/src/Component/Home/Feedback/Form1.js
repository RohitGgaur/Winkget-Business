import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import "./form.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      date: "2024-12-10",
      rating: 5,
      satisfaction: 5,
      testimonial: "I'm extremely impressed with the service provided. The team went above and beyond to meet my needs and the results exceeded my expectations. Would definitely recommend to anyone looking for quality service!",
      profileImg: "/api/placeholder/80/80"
    },
    {
      id: 2,
      name: "Michael Chen",
      date: "2024-11-25",
      rating: 4,
      satisfaction: 4,
      testimonial: "Very professional service and responsive support team. They were quick to address all my concerns and provided timely updates throughout the process.",
      profileImg: "/api/placeholder/80/80"
    },
    {
      id: 3,
      name: "Emma Williams",
      date: "2024-12-01",
      rating: 5,
      satisfaction: 5,
      testimonial: "This company transformed my project completely. Their attention to detail is remarkable and the quality of work is outstanding. I've already recommended them to several friends.",
      profileImg: "/api/placeholder/80/80"
    },
    {
      id: 4,
      name: "David Rodriguez",
      date: "2024-11-15",
      rating: 3,
      satisfaction: 3,
      testimonial: "Good service overall. There were some minor delays in communication, but the end result was satisfactory. I appreciated their willingness to make adjustments based on feedback.",
      profileImg: "/api/placeholder/80/80"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      date: "2024-12-05",
      rating: 5,
      satisfaction: 4,
      testimonial: "I've used many similar services before, but this one stands out for their customer-focused approach. They really listen to what you need and deliver accordingly. The value for money is excellent.",
      profileImg: "/api/placeholder/80/80"
    },
    {
      id: 6,
      name: "James Wilson",
      date: "2024-11-20",
      rating: 4,
      satisfaction: 4,
      testimonial: "Reliable and efficient service. Everything was handled professionally from start to finish. I particularly appreciated how they kept me informed at every stage of the process.",
      profileImg: "/api/placeholder/80/80"
    }
  ]);

  const [filter, setFilter] = useState('all');
  
  // Filter testimonials based on rating
  const filteredTestimonials = filter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.rating === parseInt(filter));

  // Function to render stars based on rating
  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`star ${rating >= star ? 'filled' : ''}`}>★</span>
        ))}
      </div>
    );
  };

  // Function to render satisfaction emoji
  const renderSatisfaction = (level) => {
    const emojis = {
      1: '😠',
      2: '🙁',
      3: '😐',
      4: '🙂',
      5: '😄'
    };
    return <span className="satisfaction-emoji">{emojis[level]}</span>;
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    testimonial: '',
    rating: 0,
    satisfaction: 3,
    recommend: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleRating = (star) => {
    setFormData({ ...formData, rating: star });
  };

  const handleSatisfaction = (level) => {
    setFormData({ ...formData, satisfaction: level });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/testimonials", formData);
      toast.success("Feedback Recived!");
      setFormData({
        name: '',
        email: '',
        testimonial: '',
        rating: 0,
        satisfaction: 3,
        recommend: ''
      });
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast.error("Failed to submit testimonial. Please try again.");

    }
  };

  return (

    <div className="row">
      <div className="col md-6">
        <div className="testimonial-container">
          <div className="testimonial-form-card">
            <h2 className="form-title">Customer Testimonial</h2>
            <p className="form-subtitle">
              We would love to hear about your experience with our service!
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
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

              <div className="form-group">
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

              <div className="form-group">
                <label>Satisfaction Level</label>
                <div className="satisfaction-scale">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`satisfaction-icon ${formData.satisfaction === level ? 'selected' : ''
                        }`}
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

              <div className="form-group">
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
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="testimonial-container">
          <div className="testimonials-page">
            <div className="testimonials-header">
              <h1>What Our Customers Say</h1>
              <p>Read authentic feedback from our valued customers</p>

              <div className="testimonials-filter">
                <span>Filter by rating: </span>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">★★★★★ (5 Stars)</option>
                  <option value="4">★★★★☆ (4 Stars)</option>
                  <option value="3">★★★☆☆ (3 Stars)</option>
                  <option value="2">★★☆☆☆ (2 Stars)</option>
                  <option value="1">★☆☆☆☆ (1 Star)</option>
                </select>
              </div>

              <div className="testimonials-stats">
                <div className="stat-box">
                  <div className="stat-number">{testimonials.length}</div>
                  <div className="stat-label">Total Reviews</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">
                    {(testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)}
                  </div>
                  <div className="stat-label">Average Rating</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">
                    {Math.round(testimonials.filter(t => t.rating >= 4).length / testimonials.length * 100)}%
                  </div>
                  <div className="stat-label">Satisfaction Rate</div>
                </div>
              </div>
            </div>

            <div className="testimonials-grid">
              {filteredTestimonials.length > 0 ? (
                filteredTestimonials.map((testimonial) => (
                  <div key={testimonial.id} className="testimonial-card">
                    <div className="testimonial-header">
                      <img
                        src={testimonial.profileImg}
                        alt={`${testimonial.name} profile`}
                        className="profile-image"
                      />
                      <div className="testimonial-meta">
                        <h3 className="customer-name">{testimonial.name}</h3>
                        <div className="testimonial-date">
                          {new Date(testimonial.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="testimonial-rating">
                      {renderStars(testimonial.rating)}
                      {renderSatisfaction(testimonial.satisfaction)}
                    </div>

                    <div className="testimonial-content">
                      <p>"{testimonial.testimonial}"</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-testimonials">
                  <p>No testimonials match the selected filter.</p>
                </div>
              )}
            </div>

            <div className="testimonials-footer">
              <h2>Ready to share your experience?</h2>
              <p>We value your feedback and would love to hear about your experience with us!</p>
              <button className="add-testimonial-btn">Add Your Testimonial</button>
            </div>

          </div>
        </div>
      </div>
      </div>

      );
};

      export default Form;

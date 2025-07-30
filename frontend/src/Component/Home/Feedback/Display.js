import React, { useState, useEffect } from 'react';
import "./display.css"
const Display = () => {

    const [testimonials, setTestimonials] = useState([]);
    const [stats, setStats] = useState({
        totalReviews: 0,
        averageRating: 0,
        satisfactionRate: 0
    });

    // Fetch testimonials and statistics
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch("https://winkget-backend.onrender.com/api/testimonials");
                const data = await response.json();
                setTestimonials(data.testimonials);
                setStats(data.stats);
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            }
        };
        fetchTestimonials();
    }, []);

    const [filter, setFilter] = useState('all');

    useEffect(() => {
        console.log("Testimonials data:", testimonials);
    }, [testimonials]);

    // Filter testimonials based on rating
    const filteredTestimonials = filter === 'all' 
        ? testimonials 
        : testimonials.filter(t => t.rating === parseInt(filter, 10));

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

    return (
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
                    <div className="stat-number">{stats.totalReviews}</div>
                        <div className="stat-label">Total Reviews</div>
                    </div>
                    <div className="stat-box">
                     
                        <div className="stat-number">{stats.averageRating}</div>
                        
                        <div className="stat-label">Average Rating</div>
                    </div>
                    <div className="stat-box">
                    <div className="stat-number">{stats.satisfactionRate}%</div>
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
                                    src={testimonial.image} 
                                    alt={`${testimonial.name} profile`} 
                                    className="profile-image"
                                    onError={(e) => e.target.src = "/fallback-image.png"} 
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
    );
};

export default Display;

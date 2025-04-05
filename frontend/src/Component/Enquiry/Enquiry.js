import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./enquiry.css";

const Enquiry = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    subject: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission with API call
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.city || !formData.subject || !formData.message) {
      toast.error("Please fill all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/Regist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Your enquiry has been submitted successfully!");
        // Reset form
        setFormData({
          name: "",
          email: "",
          city: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(result.error || "Submission failed. Please try again.");
      }
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="body" style={{ backgroundColor: "white" }}>
      <div className="enquiry-container">
        <div className="form-container0">
          <h2>Submit Your Enquiry</h2>
          <p>Fill out the form below and our support team will get back to you soon.</p>

          {/* Toast Container to show notifications */}
          <ToastContainer position="top-right" autoClose={3000} />

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name <span className="required">*</span></label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address <span className="required">*</span></label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" />
            </div>

            <div className="form-group">
              <label htmlFor="city">City <span className="required">*</span></label>
              <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} placeholder="Enter your city" />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject <span className="required">*</span></label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Enter the subject" />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message <span className="required">*</span></label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Enter your message" rows="5"></textarea>
            </div>

            <button type="submit" className="submit-btn">Submit Enquiry</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Enquiry;

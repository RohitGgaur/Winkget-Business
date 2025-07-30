import React, { useEffect, useState } from "react";
import axios from "axios";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faXTwitter, faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch cities
  useEffect(() => {
    axios
      .get("https://winkget-backend.onrender.com/api/cities")
      .then((response) => setCities(response.data || []))
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  // Fetch categories
  useEffect(() => {
    axios
      .get("https://winkget-backend.onrender.com/api/categories/tree")
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setCategories(response.data);
        } else {
          console.error("API returned empty or invalid data:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Function to split array into two columns
  const splitIntoColumns = (array) => {
    const firstColumn = array.slice(0, 6);
    const secondColumn = array.slice(6, 12);
    return [firstColumn, secondColumn];
  };

  const [categoriesCol1, categoriesCol2] = splitIntoColumns(categories);
  const [citiesCol1, citiesCol2] = splitIntoColumns(cities);

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Cities Section */}
        <div className="footer-section">
          <h3>Cities</h3>
          <div className="footer-columns">
            <ul>
              {citiesCol1.map((city, index) => (
                <li key={index}>{city.name}</li>
              ))}
            </ul>
            <ul>
              {citiesCol2.map((city, index) => (
                <li key={index}>{city.name}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Categories Section */}
        <div className="footer-section">
          <h3>Categories</h3>
          <div className="footer-columns">
            <ul>
              {categoriesCol1.map((category, index) => (
                <li key={index}>{category.name}</li>
              ))}
            </ul>
            <ul>
              {categoriesCol2.map((category, index) => (
                <li key={index}>{category.name}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
       
        <div className="footer-section">
          <h3>Contact Info</h3>
          <span>123 Business Street</span>
          <span>Gaolghar, Gorakhpur, 273032</span>
          <span>Phone: (123) 456-7890</span>
          <span>Email: Diyaratech@info.com</span>

          <div className="social-icons">
            <a href="#" className="social-icon" style={{ backgroundColor: "red" }}>
              <FontAwesomeIcon icon={faInstagram} size="xl" />
            </a>
            <a href="#" className="social-icon" style={{ backgroundColor: "red" }}>
              <FontAwesomeIcon icon={faXTwitter} size="xl" />
            </a>
            <a href="#" className="social-icon" style={{ backgroundColor: "red" }}>
              <FontAwesomeIcon icon={faLinkedin} size="xl" />
            </a>
            <a href="#" className="social-icon" style={{ backgroundColor: "red" }}>
              <FontAwesomeIcon icon={faYoutube} size="xl" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Your Company. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

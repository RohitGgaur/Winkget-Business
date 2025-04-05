import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./subd.css";
import img0 from "../../../image/sub.jpg";

const SubcategoryDetails = ({ propSelectedCity }) => {
    const { category, subcategory } = useParams();
    const navigate = useNavigate();
    
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const selectedCity = propSelectedCity || localStorage.getItem("selectedCity") || "";

    useEffect(() => {
        const fetchDataBySubcategory = async () => {
            setLoading(true);
            try {
                const requests = [
                    axios.get("http://localhost:8000/api/DealershipgetByCategory", {
                        params: { category: subcategory, subcategory: category }
                    }),
                    axios.get("http://localhost:8000/api/FranchisegetByCategory", {
                        params: { category: subcategory, subcategory: category }
                    }),
                    axios.get("http://localhost:8000/api/BusinessgetByCategory", {
                        params: { category: subcategory, subcategory: category }
                    }),
                ];

                const results = await Promise.allSettled(requests);
                const successData = results
                    .filter(res => res.status === "fulfilled" && res.value.data)
                    .flatMap(res => res.value.data);

                const filteredData = selectedCity
                    ? successData.filter(item =>
                        item.location?.trim().toLowerCase() === selectedCity.trim().toLowerCase()
                    )
                    : successData;

                setBusinesses(filteredData);
            } catch (error) {
                console.error("Error fetching businesses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDataBySubcategory();
    }, [category, subcategory, selectedCity]);

    const handleCardClick = (item) => {
        navigate("/subcategory/details", { state: { item } });
    };

    return (
        <div className="page-container">
            {/* Banner */}
            <div className="banner1">
                <img src={img0} alt="photo" />
            </div>

            <div className="main-content">
                {/* Left Sidebar (Filters) */}
                <div className="filters">
                    {/* Dropdown Button */}
                    <div className="dropdown">
                        <button className="filter-button1" onClick={() => setIsOpen(!isOpen)}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" /> Select sub-locality
                        </button>
                        {isOpen && (
                            <div className="dropdown-content">
                                <a href="#">Location 1</a>
                                <a href="#">Location 2</a>
                                <a href="#">Location 3</a>
                            </div>
                        )}
                    </div>

                    {/* Radio Buttons */}
                    <div className="radio-options">
                        <label>
                            <input type="radio" name="type" /> Website
                        </label>
                        <label>
                            <input type="radio" name="type" /> Software
                        </label>
                    </div>
                </div>
                
                {/* Business Cards */}
                <div className="data-container">
                    {loading ? (
                        <p>Loading businesses...</p>
                    ) : (
                        businesses.length > 0 ? (
                            businesses.map((item, index) => (
                                <div key={index} className="card-row" onClick={() => handleCardClick(item)}>
                                    <div className="card-image">
                                        <img src={item.image} alt={item.businessname} />
                                    </div>
                                    <div className="card-details">
                                        <h4 className="business-name">{item.businessname}</h4>
                                        <div className="rating mt-2">
                                            <span className="rating-button">Rating: 5.0 ⭐</span>
                                             <span className="verified-badge">✔ Verified</span>
                                        </div>
                                        <div className="address-section mt-2">
                                            <span className="address-icon">
                                                <FontAwesomeIcon icon={faLocationDot} />
                                            </span>
                                            <span className="address-text">{item.businessaddress}</span>
                                        </div>
                                        <div className="contact-section ">
                                            <button className="contact-button">Whatsapp</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No businesses found in this category.</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubcategoryDetails;
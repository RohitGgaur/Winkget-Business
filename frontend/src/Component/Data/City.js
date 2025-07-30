import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./city.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const City = () => {
  const [selectedTab, setSelectedTab] = useState("city");
  const [cityName, setCityName] = useState("");
  const [localityName, setLocalityName] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  // Fetch all cities
  useEffect(() => {
    axios.get('https://winkget-backend.onrender.com/api/cities')
      .then(response => {
        setCities(response.data);
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
      });
  }, []);

  // Add a new city
  const handleAddCity = async (e) => {
    e.preventDefault();

    if (!cityName) {
      toast.error('Please enter a city name');
      return;
    }

    try {
      const response = await axios.post('https://winkget-backend.onrender.com/api/city', { name: cityName });

      if (response.data) {
        toast.success('City added successfully!');
        setCities([...cities, response.data.city]);
        setCityName("");
      }
    } catch (err) {
      console.error('City creation error:', err);
      toast.error(err.response?.data?.message || 'Error adding city');
    }
  };

  // Add a locality to the selected city
  const handleAddLocality = async (e) => {
    e.preventDefault();
  
    if (!selectedCity) {
      toast.error('Please select a city');
      return;
    }
    if (!localityName) {
      toast.error('Please enter a locality name');
      return;
    }
  
    try {
      console.log(`API Request: https://winkget-backend.onrender.com/api/city/${selectedCity}/locality`);
  
      const response = await axios.post(`https://winkget-backend.onrender.com/api/city/${selectedCity}/locality`, {
        name: localityName,
      });
  
      if (response.data) {
        toast.success('Locality added successfully!');
        setLocalityName("");
      }
    } catch (err) {
      console.error('Locality creation error:', err);
      toast.error(err.response?.data?.message || 'Error adding locality');
    }
  };
  

  return (
    <div className="auth-container1">
      <ToastContainer />

      {/* Page Header */}
      <div className="auth-header">
        <h2>Add City and Locality</h2>
      </div>

      {/* Tab Navigation */}
      <div className="auth-tab-nav">
        <button 
          className={selectedTab === "city" ? "auth-tab-active" : ""}
          onClick={() => setSelectedTab("city")}
        >
          City
        </button>
        <button 
          className={selectedTab === "locality" ? "auth-tab-active" : ""}
          onClick={() => setSelectedTab("locality")}
        >
          Locality
        </button>
      </div>

      {/* Form Section */}
      <div className="auth-body">
        {selectedTab === "city" ? (
          <form className="auth-form-group" onSubmit={handleAddCity}>
            <input 
              type="text" 
              placeholder="Enter City" 
              value={cityName} 
              onChange={(e) => setCityName(e.target.value)} 
            />
            <button className="auth-submit-btn" type="submit">Add City</button>
          </form>
        ) : (
          <form className="auth-form-group" onSubmit={handleAddLocality}>
            <select 
              value={selectedCity} 
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city._id} value={city._id}>{city.name}</option>
              ))}
            </select>

            <input 
              type="text" 
              placeholder="Enter Locality" 
              value={localityName} 
              onChange={(e) => setLocalityName(e.target.value)} 
            />
            <button className="auth-submit-btn" type="submit">Add Locality</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default City;

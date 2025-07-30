import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./navbar.css";

const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [selectedTab, setSelectedTab] = useState("login");
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem("selectedCity") || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [profileimg, setProfileimg] = useState(null);
  const [imgprev, setImgprev] = useState(null);
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isAuthenticated = !!localStorage.getItem("token"); // Example check
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  //  console.log("Token:", localStorage.getItem("token"));
  const handleProfileClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault(); // Stop navigation
      toast.error("You should login first!");
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear(); // Clears all stored data
    toast.success("Logout successfully");
  };



  const uploadImage = async () => {
    const data = new FormData();
    data.append('file', profileimg);
    data.append('upload_preset', 'eq2in9eu'); // Ensure this is correct
    try {
      let response = await fetch('https://api.cloudinary.com/v1_1/dw89rwftg/image/upload', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      let urlData = await response.json();
      console.log(urlData);
      return urlData;
    } catch (error) {
      console.log('Image upload error:', error);
      return null;
    }
  };
  const imageChange = (e) => {
    const file = e.target.files[0];
    setImgprev(URL.createObjectURL(file));
    setProfileimg(file);
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://winkget-backend.onrender.com/api/userlogin", {
        email,
        password,
      });

      toast.success("Login Successful!", {
        onClose: () => {
          console.log("Toast closed successfully.");
        },
      });
        
      setData(response.data.user);
      console.log("data", response.data.user._id);
      setUserId(response.data.user._id);
      localStorage.setItem("token", response.data.token);
      setIsModalVisible(false);
      setIsLoggedIn(true);
    } catch (err) {
      toast.error("Invalid credentials!");
      console.error("Login failed:", err.response?.data || err.message);
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();

    const imageUrl = await uploadImage();

    if (!imageUrl) {
      toast.error("Image upload failed!");

      return;
    }

    try {
      const response = await axios.post(
        "https://winkget-backend.onrender.com/api/Registers",
        {
          name,
          email,
          password,
          city,
          image: imageUrl.url,
        }
      );

      toast.success("Registration Successful!");
      setName("");
      setEmail("");
      setPassword("");
      setCity("");
      setProfileimg(null);

      setIsModalVisible(false);
    } catch (err) {
      toast.error("Registration failed! User may already exist.");
      console.error("Registration failed:", err.response?.data || err.message);
    }
  };

  // Fetch Cities
  useEffect(() => {
    axios.get("https://winkget-backend.onrender.com/api/cities")
      .then(response => setCities(response.data || []))
      .catch(error => console.error("Error fetching cities:", error));
  }, []);

  // Fetch Categories
  useEffect(() => {
    axios.get("https://winkget-backend.onrender.com/api/categories/tree")
      .then((response) => {
        console.log("Fetched Categories Data:", response.data); // Check what API returns
        if (Array.isArray(response.data) && response.data.length > 0) {
          setCategories(response.data); // Ensure it's updating state
        } else {
          console.error("API returned empty or invalid data:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Handle City Selection
  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    localStorage.setItem("selectedCity", city);
    window.location.reload();
  };

  // Handle Search
  const handleSearch = (e, directSearchTerm = null) => {
    if (e) e.preventDefault();

    let finalSearchTerm = directSearchTerm || searchTerm;
    if (!finalSearchTerm.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    console.log("Available Categories:", categories);
    console.log("Search Term:", finalSearchTerm);

    const lowercasedSearch = finalSearchTerm.toLowerCase();
    let matchedCategory = null;
    let matchedSubcategory = null;

    categories.forEach((category) => {
      if (category.name.toLowerCase().includes(lowercasedSearch)) {
        matchedCategory = category;
      } else if (category.children && Array.isArray(category.children)) {
        const subMatch = category.children.find((sub) =>
          sub.name.toLowerCase().includes(lowercasedSearch)
        );

        if (subMatch) {
          matchedCategory = category;
          matchedSubcategory = subMatch;
        }
      }
    });

    if (matchedSubcategory) {
      console.log("Matched Subcategory:", matchedSubcategory);
      navigate(`/subcategory/${matchedCategory.name}/${matchedSubcategory.name}`);
    } else if (matchedCategory) {
      console.log("Matched Category:", matchedCategory);
      navigate(`/subcategories/${matchedCategory._id}`);
    } else {
      toast.error("No matching category or subcategory found");
    }

    setShowDropdown(false); // Close dropdown after search
  };

  const handleTrendingItemClick = (item) => {
    setSelectedItem(null); // Reset first to force re-render
    setIsModalOpen(false); // Close modal before reopening

    setTimeout(() => {
      setSelectedItem(item);
      setIsModalOpen(true);
    }, 100);
  };


  const handleSearchFocus = () => {
    setShowDropdown(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setShowDropdown(false), 200);
  };



  return (
    <>
      <div className="desktop-navbar">
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="containers">
            {/* Logo */}
            <Link className="navbar-brand" to="/Home">Winkget Business</Link>

            {/* Toggle Button for Mobile */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navbar Items */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">

                {/* City Filter Dropdown */}
                
                <li className="nav-item dropdown" id="navcity">
                  <select className="forms-selects" value={selectedCity} onChange={handleCityChange}>
                    <option value="">Select City</option>
                    {cities.map(city => (
                      <option key={city._id} value={city.name}>{city.name}</option>
                    ))}
                  </select>
                </li>
                
                <div className="search-container position-relative"id="navsearch">
                  <form className="d-flex" onSubmit={handleSearch}>
                    <input
                      className="form-control1 me-2"
                      type="search"
                      placeholder="Restaurants near me"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={handleSearchFocus}
                      onBlur={handleSearchBlur}
                    />
                    <button className="btn search-btn" type="submit">
                      <i className="bi bi-search"></i>
                    </button>
                  </form>

                  {showDropdown && (
                    <div className="search-dropdown">
                      <div className="trending-header">TRENDING SEARCHES</div>
                      <ul className="trending-list">
                        {/* Map categories */}
                        {categories?.map((item, index) => (
                          <li key={index} onClick={() => handleTrendingItemClick(item)}>
                            <div className="trending-icon">
                              <i className="bi bi-arrow-right-short"></i>
                            </div>
                            <div className="trending-item-content">
                              <div>{item.name}</div>
                              <div className="item-type">{item.type}</div>
                            </div>
                          </li>
                        ))}

                        {/* Map subcategories */}
                        {categories?.flatMap((category) => category.children || []).map((item, index) => (
                          <li key={`child-${index}`} onClick={() => handleTrendingItemClick(item)}>
                            <div className="trending-icon">
                              <i className="bi bi-arrow-right-short"></i>
                            </div>
                            <div className="trending-item-content">
                              <div>{item.name}</div>
                              <div className="item-type">{item.type}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {/* Free Listing Dropdown */}
                <li className="nav-item1 dropdown"id="navfree">
                  <a className="nav-link dropdown-toggle" href="#" id="freeListingDropdown" role="button" data-bs-toggle="dropdown">
                    <i className="bi bi-bar-chart-line"></i> Free Listing
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" onClick={() => navigate("/BusinessForm")}>Business Form</a>
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={() => navigate("/FranchiseForm")}>Franchise Form</a>
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={() => navigate("/DealershipForm")}>Dealership Form</a>
                    </li>
                  </ul>
                </li>
              </ul>

              {/* Search Bar with Dropdown */}


              {/* Login Button */}
              <button
                className={`btn ms-3 ${isLoggedIn ? "btn-danger" : "btn-primary1"}`}
                onClick={() => {
                  if (isLoggedIn) {
                    handleLogout(); // Logout user
                  } else {
                    setIsModalVisible(true); // Show login modal
                  }
                }}
              >
                {isLoggedIn ? "Logout" : "Login"}
              </button>

              {/* Profile Dropdown */}
              <div className="user mx-3">
                <Link to={`/Userdeshboard/${userId}`} onClick={handleProfileClick}>
                  <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="rounded-circle" height="40" alt="Profile" />
                </Link></div>
            </div>
            {isModalVisible && (
              <div className="auth-modal-overlay">
                <div className="auth-modal-container">
                  {/* Modal Header */}
                  <div className="auth-modal-header">
                    <h2>User Account</h2>
                    <button onClick={() => setIsModalVisible(false)} className="auth-close-btn">×</button>
                  </div>

                  {/* Tab Navigation */}
                  <div className="auth-tab-nav">
                    <button
                      className={selectedTab === "login" ? "auth-tab-active" : ""}
                      onClick={() => setSelectedTab("login")}
                    >
                      Login
                    </button>
                    <button
                      className={selectedTab === "signup" ? "auth-tab-active" : ""}
                      onClick={() => setSelectedTab("signup")}
                    >
                      Sign Up
                    </button>
                  </div>

                  {/* Form Section */}
                  <div className="auth-modal-body">
                    {selectedTab === "login" ? (
                      <form className="auth-form-group" onSubmit={handleLogin}>
                        <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button type="submit" className="auth-submit-btn">Login</button>
                      </form>
                    ) : (
                      <form className="auth-form-group" onSubmit={handleSignup}>
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <input
                          type="text"
                          placeholder="Enter City"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                        />
                        <input
                          type="file"
                          placeholder="Upload image"
                          onChange={imageChange}
                        />
                        <button type="submit" className="auth-submit-btn">Sign Up</button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
      <div className="mobile-navbar">
        <div className="top-navbar">
          <div className="logo">Winkget</div>
          <div className="location">

            <select
              id="citySelect"
              className="form-select"
              value={selectedCity}
              onChange={handleCityChange}
            >
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city._id} value={city.name}>{city.name}</option>
              ))}
            </select>
          </div>
          <button
            className={`btn ms-3 ${isLoggedIn ? "btn-danger" : "btn-primary1"}`}
            onClick={() => {
              if (isLoggedIn) {
                handleLogout(); // Logout user
              } else {
                setIsModalVisible(true); // Show login modal
              }
            }}
            style={{ width: "80px", marginBottom: "8px" }}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>

          {/* Ensure the modal appears when isModalVisible is true */}
          {isModalVisible && (
            <div className="auth-modal-overlay">
              <div className="auth-modal-container">
                {/* Modal Header */}
                <div className="auth-modal-header">
                  <h2>User Account</h2>
                  <button onClick={() => setIsModalVisible(false)} className="auth-close-btn">×</button>
                </div>

                {/* Tab Navigation */}
                <div className="auth-tab-nav">
                  <button
                    className={selectedTab === "login" ? "auth-tab-active" : ""}
                    onClick={() => setSelectedTab("login")}
                  >
                    Login
                  </button>
                  <button
                    className={selectedTab === "signup" ? "auth-tab-active" : ""}
                    onClick={() => setSelectedTab("signup")}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Form Section */}
                <div className="auth-modal-body">
                  {selectedTab === "login" ? (
                    <form className="auth-form-group0" onSubmit={handleLogin}>
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button type="submit" className="auth-submit-btn">Login</button>
                    </form>
                  ) : (
                    <form className="auth-form-group0" onSubmit={handleSignup}>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Enter City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                      <input
                        type="file"
                        placeholder="Upload image"
                        onChange={imageChange}
                      />

                      <button type="submit" className="auth-submit-btn">Sign Up</button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="icons">
            <span>🛒</span> {/* Cart Icon */}
            <span>☰</span> {/* Menu Icon */}
          </div>
        </div>
        {/* Search Bar */}
        <div className="body">
          <div className="search-container position-relative">
            <form className="search-form d-flex" onSubmit={handleSearch}>
              <input
                className="search-input form-control1"
                type="search"
                placeholder="Search across 10 Lakh+ Businesses"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
              />
              <button className="search-btn" type="submit">
                🔍
              </button>
            </form>

            {showDropdown && (
              <div className="search-dropdown">
                <div className="trending-header">TRENDING SEARCHES</div>
                <ul className="trending-list">
                  {/* ✅ Display main categories */}
                  {categories?.map((item, index) => (
                    <li key={index} onClick={() => handleTrendingItemClick(item)}>
                      <div className="trending-icon">
                        <i className="bi bi-arrow-right-short"></i>
                      </div>
                      <div className="trending-item-content">
                        <div>{item.name}</div>
                        <div className="item-type">{item.type}</div>
                      </div>
                    </li>
                  ))}

                  {/* ✅ Display subcategories */}
                  {categories?.flatMap((category) => category.children || []).map((item, index) => (
                    <li key={`child-${index}`} onClick={() => handleTrendingItemClick(item)}>
                      <div className="trending-icon">
                        <i className="bi bi-arrow-right-short"></i>
                      </div>
                      <div className="trending-item-content">
                        <div>{item.name}</div>
                        <div className="item-type">{item.type}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* Bottom Navbar */}
        <div className="bottom-navbar">
          <Link to="/" className="nav-item">
            <span>🏠</span>
            <p>Home</p>
          </Link>
          <Link to="#" className="nav-item" onClick={() => setShowPopup(true)}>
            <span>📂</span>
            <p1>Categories</p1>
          </Link>
          {/* Popup for Showing All Categories */}
          {showPopup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <span className="close-btn" onClick={() => setShowPopup(false)}>✖</span>
                <h3>All Categories</h3>
                <div className="all-categories">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="category-item"
                      onClick={() => {
                        navigate(`/subcategory/${category._id}`, { state: category });
                        setShowPopup(false); // Close popup after navigation
                      }}
                    >
                      <div className="category-box1">
                        <img src={category.icon} alt={category.name} />
                      </div>
                      <span className="category-name">{category.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <Link to="/shop" className="nav-item">
            <span>🛒</span>
            <p>Shop</p>
          </Link>
          <Link
            to="#"
            className="nav-item"
            onClick={() => setShowMobileDropdown(!showMobileDropdown)}
          >
            <span>➕</span>
            <p>Free List</p>
          </Link>

          {/* ✅ Position Dropdown Above Bottom Navbar */}
          <div className={`mobile-dropdown-container ${showMobileDropdown ? "show" : ""}`}>
            <ul className="mobile-dropdown">
              <li>
                <a className="dropdown-item" onClick={() => navigate("/BusinessForm")}>
                  Business Form
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={() => navigate("/FranchiseForm")}>
                  Franchise Form
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={() => navigate("/DealershipForm")}>
                  Dealership Form
                </a>
              </li>
            </ul>
          </div>

          <Link to={`/Userdeshboard/${userId}`} onClick={handleProfileClick} className="nav-item">
            <span>👤</span>
            <p>Profile</p>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Navbar;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import banner from "../../image/Diyara.png"
import "bootstrap-icons/font/bootstrap-icons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import './home.css';
import { Columns } from 'lucide-react';
import Footer from "../Footer/Footer.js"

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState("login");
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Select City");
  const navigate = useNavigate();
  const [categorie, setCategorie] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [vendors, setVendors] = useState([]);
  const [franchise, setFranchise] = useState([]);
  const [dealership, setDealership] = useState([]);
  // Fetch Vendor Data
  const fetchVendors = async () => {
    try {
      const response = await axios.get("https://winkget-backend.onrender.com/api/venderget");
      console.log("Fetched vendor details:", response.data);

      if (Array.isArray(response.data)) {
        setVendors(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setVendors([]);
      }
    } catch (error) {
      console.error("Error fetching vendors:", error);
      setVendors([]);
    }
  };
  useEffect(() => {
    fetchVendors();
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    const fetchFranchise = async () => {
      try {
        const response = await axios.get("https://winkget-backend.onrender.com/api/Franchiseget", { signal: controller.signal });
        console.log("Fetched Franchise details:", response.data);
        if (Array.isArray(response.data)) {
          setFranchise(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setFranchise([]);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching vendors:", error);
          setFranchise([]);
        }
      }
    };
    fetchFranchise();
    return () => controller.abort(); // Cleanup to prevent memory leaks
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    const fetchDealership = async () => {
      try {
        const response = await axios.get("https://winkget-backend.onrender.com/api/Dealershipget", { signal: controller.signal });
        console.log("Fetched dealership details:", response.data);
        if (Array.isArray(response.data)) {
          setDealership(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setDealership([]);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching dealership:", error);
          setDealership([]);
        }
      }
    };
    fetchDealership();
    return () => controller.abort(); // Cleanup to prevent memory leaks
  }, []);
  // category get
  useEffect(() => {
    axios
      .get("https://winkget-backend.onrender.com/api/categories")
      .then((response) => {
        console.log("Data:", response.data);
        setCategorie(response.data); // Expected format: [{ name: "Electronics", subcategories: ["Mobiles", "Laptops"] }, ...]
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Filter categories based on search term
  const filteredCategories = categorie.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.subcategories.some((sub) =>
      sub.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  useEffect(() => {
    axios.get("https://winkget-backend.onrender.com/api/cities")
      .then(response => {
        console.log("API Data of city:", response.data);

        // Ensure cities is an array of objects with 'name' property
        if (Array.isArray(response.data)) {
          setCities(response.data);
        } else {
          console.error("Invalid API response:", response.data);
          setCities([]);
        }
      })
      .catch(error => {
        console.error("Error fetching city:", error);
      });
  }, []);

  // Fetch categories on component mount
  useEffect(() => {
    axios
      .get("https://winkget-backend.onrender.com/api/categories")
      .then((response) => {
        console.log("Data:", response.data);
        setCategories(response.data); // Assuming response.data is an array of objects
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Fetch categories in tree format
  useEffect(() => {
    axios
      .get("https://winkget-backend.onrender.com/api/categories/tree")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const cardRows = [
    { title: "Latest Deals", cards: ["Card 1", "Card 2", "Card 3", "Card 4", "Card 5"] },
    { title: "Popular Picks", cards: ["Card 6", "Card 7", "Card 8", "Card 9", "Card 10"] },
    { title: "Recommended", cards: ["Card 11", "Card 12", "Card 13", "Card 14", "Card 15"] },
    { title: "Best Offers", cards: ["Card 16", "Card 17", "Card 18", "Card 19", "Card 20"] }
  ];
  const visibleCategories = categories.slice(0, 4);

  return (
    <div className="app">
      {/* Banner */}
      <div className="banners">
        <img src={banner} alt="Banner" />
      </div>

      <div className="categories-grid mt-3">
        {visibleCategories.map((category, index) => (
          <div
            key={index}
            className="category-item"
            onClick={() => navigate(`/subcategories/${category._id}`, { state: category })}
          >
            <div className="category-box">
              <img src={category.icon} alt={category.name} />
              <span className="category-name">{category.name}</span>
            </div>

          </div>
        ))}
      </div>
      {/* "View More" Button to Show All Categories in Popup */}
      {/* <div className="category-item" onClick={() => setShowPopup(true)}>
          <div className="category-box view-more">
            <span>→</span>
          </div>
          <span className="category-name">View More</span>
        </div> */}


      {/* Popup for Showing All Categories  */}
      {/* {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <span className="close-btn" onClick={() => setShowPopup(false)}>✖</span>
            <h3>All Categories</h3>
            <div className="all-categories">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="category-item"
                  onClick={() => navigate(`/subcategory/${category._id}`, { state: category })}
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
      )} */}
      <div className="heading">
        <h3>Business for Sale</h3>
      </div>
      <div className="vendor-container">
        {vendors.length > 0 ? (
          vendors.map((vendor, index) => (
            <div className="vendor-card" key={index}>
              <img className="vendor-img" src={vendor.profileimage} alt={vendor.businessname} />


              <h3 className="business-names mt-2">{vendor.businessname}</h3>
              <div className="info-row">
                <span className="label1">category</span>
                <span className="value1">{vendor.category}</span>
              </div>
              <div className="info-row">
                <span className="label1">Investment range</span>
                <span className="value1">₹{vendor.inventoryvalue}</span>
              </div>
              <div className="info-row">
                <span className="label1">Area Required</span>
                <span className="value1">7000 qft</span>
              </div>
              <div className="info-row">
                <span className="label1">Franchise Outlets</span>
                <span className="value1">{vendor.numberofemployee}</span>
              </div>

              <button className="know-more-btn">Know More</button>
            </div>
          ))
        ) : (
          <p>No vendors available</p>
        )}
      </div>




      <div className="heading">
        <h3>Franchise for Sale</h3>
      </div>
      <div className="vendor-container">
        {franchise.length > 0 ? (
          franchise.map((item, index) => (
            <div className="vendor-card" key={index}>
              <img className="vendor-img" src={item.image} alt={item.name} />

              <h3 className="business-names mt-2">{item.businessname}</h3>
              <div className="info-row">
                <span className="label1">category</span>
                <span className="value1">{item.category}</span>
              </div>
              <div className="info-row">
                <span className="label1">Investmentrequired:</span>
                <span className="value1">₹{item.investmentrequired}</span>
              </div>
              <div className="info-row">
                <span className="label1">Outlets:</span>
                <span className="value1">{item.numberoutlets}</span>
              </div>
              <div className="info-row">
                <span className="label1">Area:</span>
                <span className="value1">{item.arearequired}sqrt</span>
              </div>

              <button className="know-more-btn">Know More</button>
            </div>
          ))
        ) : (
          <p>No Franchise available</p>
        )}
      </div>
      <div className="heading" >
        <h3>Dealership for Sale</h3>
        </div>
        <div className='vendor-container'>
          {dealership.length > 0 ? (
            dealership.map((dealership, index) => (
              <div className='vendor-card'
                key={index}
              >
                <img className='vendor-img'
                  src={dealership.image}
                  alt={dealership.name}
                />
                {/* <span className="category">{dealership.businessname}</span> */}
                <h3 className="business-name mt-2">{dealership.businessname}</h3>
                <div className="info-row">
                  <span className="label1">category</span>
                  <span className="value1">{dealership.category}</span>
                </div>
                <div className="info-row">
                  <span className="label1">InvestmentRequired:</span>
                  <span className="value1">₹{dealership.investmentrequired}</span>
                </div>
                <div className="info-row">
                  <span className="label1">Outlets:</span>
                  <span className="value1">{dealership.numberoutlets}</span>
                </div>
                <div className="info-row">
                  <span className="label1">Area:</span>
                  <span className="value1">{dealership.arearequired}sqrt</span>
                </div>
                <button className="know-more-btn">Know More</button>
              </div>
            ))
          ) : (
            <p>No Dealer available</p>
          )}
        </div>
      
      {/* footer */}
      <>
        {/* Footer */}

      </>
      <Footer />
    </div>
  );
};

export default Home;

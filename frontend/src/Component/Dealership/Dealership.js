import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { LayoutDashboard, Users, Settings, LogOut, Building2, Castle, FolderInput, Play, ChevronLeft } from 'lucide-react';
import '../Superadmin/desh.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan,faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dealership = ({ closeModal }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [deal, setDeal] = useState(() => {
    const saveddeal = localStorage.getItem('franchise');
    return saveddeal ? JSON.parse(saveddeal) : [];
  });
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [location, setLocation] = useState('');
  const [area, setArea] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [businessname, setBusinessname] = useState('');
  const [dealership, setDealership] = useState('');
  const [businessnumber, setBusinessnumber] = useState('');
  const [businessemail, setBusinessemail] = useState('');
  const [citys, setCitys] = useState('');
  const [businessaddress, setBusinessaddress] = useState('');
  // const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [businesscommenced, setBusinesscommenced] = useState('');
  const [dealershipcommenced, setDealershipcommenced] = useState('');
  const [investmentrequired, setInvestmentrequired] = useState('');
  const [arearequired, setArearequired] = useState('');
  const [numberoutlets, setNumberoutlets] = useState('');
  const [dealershipfee, setDealershipfee] = useState('');
  const [dealershipterm, setDealershipterm] = useState('');
  const [renewable, setRenewable] = useState('');
  const [typeproperty, setTypeproperty] = useState('');
  const [preferedarea, setPreferedarea] = useState('');
  const [deliverables, setDeliverables] = useState('');
  const [about, setAbout] = useState('');
  const [uploadbanner, setUploadbanner] = useState(null);
  // const [uploadimage, setUploadimage] = useState(null); 
  const [website, setWebsite] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [error, setError] = useState(null);

  // For preview images (optional)
  const [imgprev, setImgprev] = useState(null);
  const [bannerPrev, setBannerPrev] = useState(null); // For banner image preview
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [category, setCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  // state for city and locality
  // Initialize state with empty strings instead of undefined
  const [city, setCity] = useState('');
  const [selectlocality, setSelectlocality] = useState('');
  const [cities, setCities] = useState([]);
  const [locality, setLocality] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');


  // Handle city change
  const handleCityChange = (e) => {
    const selectedCityId = e.target.value;

    setCity(selectedCityId); // This will always be a string

    setSelectlocality(''); // Reset to empty string, not undefined

    if (selectedCityId) {
      const selectedCity = cities.find(cit => cit._id === selectedCityId);
      console.log("Selected city:", selectedCity.name);
      if (selectedCity) {
        setLocation(selectedCity.name);
      }
      // setCity(selectedCity);
      if (selectedCity && Array.isArray(selectedCity.locality)) {
        // Create proper objects from the locality strings
        // console.log("locality",selectedCity.locality);
        const localityObjects = selectedCity.locality.map((name, index) => ({
          _id: index.toString(),
          name: name,

        }));

        setLocality(localityObjects);
        console.log("Processed localities:", localityObjects);
      } else {
        setLocality([]);
      }
    } else {
      setLocality([]);
    }
  };

  // Handle locality change
  const handleLocality = (e) => {
    const localityId = e.target.value; // This is the index/ID like "0"
    setSelectlocality(localityId);

    // Find the actual locality name based on the selected ID
    const selectedLocalityObj = locality.find(loc => loc._id === localityId);
    if (selectedLocalityObj) {
      console.log("locality", selectedLocalityObj.name);
      setArea(selectedLocalityObj.name); // Set the area to the name, not the ID
    }
  };
  useEffect(() => {
    axios.get('https://winkget-backend.onrender.com/api/cities')
      .then(response => {
        console.log("Data:", response.data);
        console.log("First City ID:", response.data[0]._id);
        setCities(response.data);
      })
      .catch(error => {
        console.error('Error fetching city:', error);
      });
  }, []);
  // Fetch categories on component mount
  useEffect(() => {
    axios.get('https://winkget-backend.onrender.com/api/categories')
      .then(response => {
        console.log("Data:", response.data);
        console.log("First Category ID:", response.data[0]._id);
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);
  useEffect(() => {
    axios.get('https://winkget-backend.onrender.com/api/cities')
      .then(response => {
        console.log("Data:", response.data);
        console.log("First City ID:", response.data[0]._id);
        setCities(response.data);
      })
      .catch(error => {
        console.error('Error fetching city:', error);
      });
  }, []);
  // Fetch categories on component mount
  useEffect(() => {
    axios.get('https://winkget-backend.onrender.com/api/categories')
      .then(response => {
        console.log("Data:", response.data);
        console.log("First Category ID:", response.data[0]._id);
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);
  // handle city

  // Handle category change
  useEffect(() => {
    // Fetching categories only once
    axios.get("https://winkget-backend.onrender.com/api/categories/tree")
      .then(response => {
        console.log("Fetched Categories:", response.data);
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);
  
  useEffect(() => {
    // Fetch subcategories when category id changes
    const fetchSubcategories = async () => {
      if (!category) return; // If no category is selected, do nothing
  
      try {
        const selectedCategory = categories.find(cat => cat._id === category);
        if (selectedCategory && Array.isArray(selectedCategory.subcategories)) {
          setSubcategories(selectedCategory.subcategories);
          console.log("Subcategories:", selectedCategory.subcategories);
        } else {
          // If no subcategories are available in the selected category, fetch them from the backend
          const response = await axios.get(`https://winkget-backend.onrender.com/api/categories/${category}`);
          console.log("Fetched Subcategories:", response.data.children);
          setSubcategories(response.data.children || []);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
  
    fetchSubcategories();
  }, [category, categories]); // Runs when category or categories change
  
  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories.find(cat => cat._id === selectedCategoryId);
  
    setCategory(selectedCategoryId);
    setCategoryName(selectedCategory ? selectedCategory.name : "");
  
    setSelectedSubCategory(""); // Reset subcategory selection
    setSubcategoryName(""); // Reset subcategory name
  
    // Since subcategories will be fetched based on the category, no need to set them here
  };
  
  const handleSubCategory = (e) => {
    const selectedSubCategoryId = e.target.value;
    const selectedSubCategory = subcategories.find(sub => sub._id === selectedSubCategoryId);
  
    setSelectedSubCategory(selectedSubCategoryId);
    setSubcategoryName(selectedSubCategory ? selectedSubCategory.name : "");
  };
  
  const handleDelete = async (did) => {
    console.log('Deleting franchise with ID:', did); // Debugging

    if (!did) {
      alert('Invalid Franchise ID: ' + did);
      return;
    }
    if (!window.confirm('Are you sure you want to delete this franchise?')) return;

    try {
      await axios.delete(`https://winkget-backend.onrender.com/api/Dealershipdelete/${did}`);
      alert('Dealership deleted successfully');

      // Update state to remove deleted franchise
      setDeal(deal.filter(deal => deal._id !== did));
    } catch (error) {
      console.error('Error deleting dealership:', error);
      alert(error.response?.data?.message || 'Failed to delete dealership');
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  useEffect(() => {
    fetchVender();
  }, []);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://winkget-backend.onrender.com/api/superadmin/${id}`);
        setData(response.data);
        console.log(response.data.id);
        // const supid=response.data.id;
      } catch (error) {
        console.error('Error fetching dealership data:', error);
      }
    };
    fetchData();
  }, [id]);

  const fetchVender = async () => {
    try {
      const response = await axios.get('https://winkget-backend.onrender.com/api/Dealershipget');
      console.log("Fetched dealership:", response.data);

      if (Array.isArray(response.data)) {
        setDeal(response.data);
        localStorage.setItem('dealer', JSON.stringify(response.data));
      } else {
        console.error("Unexpected response format:", response.data);
        toast.error("Failed to fetch dealership");
      }
    } catch (error) {
      console.error('Error fetching dealership:', error);
      toast.error('Failed to fetch dealership');
    }
  };
  const uploadImage = async (file) => {
    if (!file) {
      console.error("No file selected for upload.");
      return null;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "eq2in9eu");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dw89rwftg/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Cloudinary error:", errorText);
        throw new Error("Image upload failed");
      }

      const urlData = await response.json();
      return urlData.url;
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    }
  };
  const closeModalAndReset = () => {
    setName('');
    setEmail('');
    setMobile('');
    setLocation('');
    setArea('');
    setPassword('');
    setImage('')
    setBusinessname('');
    setDealership('');
    setBusinessnumber('');
    setBusinessemail('');
    setCitys('');
    setBusinessaddress('');
    setCategory('');
    setSubcategory('');
    setBusinesscommenced('');
    setDealershipcommenced('');
    setInvestmentrequired('');
    setArearequired('');
    setNumberoutlets('');
    setDealershipfee('');
    setDealershipterm('');
    setRenewable('');
    setTypeproperty('');
    setPreferedarea('');
    setDeliverables('');
    setAbout('');
    setWebsite('');
    setFacebook('');
    setInstagram('');

    setUploadbanner(null);
    // setUploadimage(null);
    setError(null);
    // setProfileimg(null);
    // setImgprev(null);
    // setBannerPrev(null); // For banner image preview
    setIsModalOpen(false); // Close modal state if it's part of your app logic
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email first
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Upload images if they exist
    const profileImageUrl = image ? await uploadImage(image) : null;
    const bannerImageUrl = uploadbanner ? await uploadImage(uploadbanner) : null;

    // If image upload fails
    if (!profileImageUrl && image) {
      toast.error('Profile image upload failed');
      return;
    }
    if (!bannerImageUrl && uploadbanner) {
      toast.error('Banner image upload failed');
      return;
    }

    // 🛠️ Debugging: Log the form data before sending request
    const formData = {
      name,
      email,
      mobile,
      location,
      area,
      password,
      image: profileImageUrl,
      uploadbanner: bannerImageUrl,
      businessname,
      dealership,
      businessnumber,
      businessemail,
      city: citys,
      businessaddress,
      category:categoryName,
      subcategory:subcategoryName,
      businesscommenced,
      dealershipcommenced,
      investmentrequired,
      arearequired,
      numberoutlets,
      dealershipfee,
      dealershipterm,
      renewable,
      typeproperty,
      preferedarea,
      deliverables,
      about,
      website,
      facebook,
      instagram,
    };

    console.log("Form Data being sent:", formData); // Debugging log

    try {
      const response = await axios.post('https://winkget-backend.onrender.com/api/Registerd', formData);

      if (response.data) {
        toast.success('Registration Successful!');
        closeModalAndReset();
      } else {
        toast.error('Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);

      // If backend returns an error message, show it in toast
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Registration failed');
      }
    }
  };

  const handleBanner = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadbanner(file);
    }
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="admin-container"style={{height:"100vh"}}>
      <div className="main-content">
        <div className="container">
          <div className="header1">
            <h1>Dealership Management</h1>
            <button className="add-button" onClick={() => setIsModalOpen(true)}>
              Add Dealership
            </button>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="modal-overlay1">
              <div className="modal-content0">
                <button onClick={closeModalAndReset} className="close-button">&times;</button>
                {/* <h2 className='text-center'>Register Dealership </h2> */}

                <form onSubmit={handleSubmit}>
                  {/* Step 1 */}
                  {step === 1 && (
                    <>
                      <h5 >Personal Information</h5>
                      <div className="form-grp">

                        <input
                          type="text"
                          id="name"
                          className="form-controler"
                          placeholder="Enter Your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp">

                        <input
                          type="email"
                          id="email"
                          className="form-controler"
                          placeholder="Enter Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp">

                        <input
                          type="text"
                          id="name"
                          className="form-controler"
                          placeholder="Mobile Number"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp">
                        <input
                          type="text"
                          id="city"
                          className="form-controler"
                          placeholder="Enter City"
                          value={citys}
                          onChange={(e) => setCitys(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-grp">
                        <input
                          type="text"
                          id="address"
                          className="form-controler"
                          placeholder="Area"
                          value={businessaddress}
                          onChange={(e) => setBusinessaddress(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp">

                        <input
                          type="text"
                          id="name"
                          className="form-controler"
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="row mt-3">
                        <input
                          type="file"
                          id="photog"
                          className="form-controler"
                          placeholder="Business Document"
                          onChange={handleUpload}
                          accept="image/*"
                          required
                          
                        />


                      </div>
                    </>
                  )}

                  {/* Step 2 */}
                  {step === 2 && (
                    <>
                      <h5>Business Details</h5>
                      <div className="form-grp">
                        <input
                          type="text"
                          id="business"
                          className="form-controler"
                          placeholder="Business Name"
                          value={businessname}
                          onChange={(e) => setBusinessname(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp">
                        <input
                          type="text"
                          id="franchies"
                          className="form-controler"
                          placeholder="Franchise Name"
                          value={dealership}
                          onChange={(e) => setDealership(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-grp">
                        <input
                          type="Number"
                          id="number"
                          className="form-controler"
                          placeholder="Business Number"
                          value={businessnumber}
                          onChange={(e) => setBusinessnumber(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp">
                        <input
                          type="email"
                          id="email"
                          className="form-controler"
                          placeholder="Business Email"
                          value={businessemail}
                          onChange={(e) => setBusinessemail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp">
                        <select className="form-controler" value={city} onChange={handleCityChange} required>
                          <option value="">Select City</option>
                          {cities.length > 0 ? (
                            cities.map((cit) => (
                              <option key={cit._id} value={cit._id}>
                                {cit.name}
                              </option>
                            ))
                          ) : (
                            <option disabled>Loading city...</option>
                          )}
                        </select>
                      </div>

                      <div className="form-grp ">
                        <select
                          className="form-controler"
                          value={selectlocality}
                          onChange={handleLocality}
                          required
                          disabled={!city}
                        >
                          <option value="">Select Locality</option>
                          {locality.length > 0 ? (
                            locality.map((loc) => (
                              <option key={loc._id} value={loc._id}>
                                {loc.name};
                              </option>
                            ))
                          ) : (
                            <option disabled>{city ? "Loading locality..." : "Select a city first"}</option>
                          )}
                        </select>
                      </div>
                  

                    </>
                  )}

                  {/* Step 3 */}
                  {step === 3 && (
                    <>
                      <h4>Business Details</h4>
                      <div className="form-grp">
                        <select className="form-controler" value={category} onChange={handleCategoryChange} required>
                          <option value="">Select Category</option>
                          {categories.length > 0 ? (
                            categories.map((cat) => (
                              <option key={cat._id} value={cat._id}>
                                {cat.name}
                              </option>
                            ))
                          ) : (
                            <option disabled>Loading categories...</option>
                          )}
                        </select>
                      </div>
                      <div className="form-grp">
                        <select
                          className="form-controler"
                          value={selectedSubCategory}
                          onChange={handleSubCategory}
                          required
                          disabled={!category}
                        >
                          <option value="">Select Subcategory</option>
                          {subcategories.length > 0 ? (
                            subcategories.map((sub) => (
                              <option key={sub._id} value={sub._id}>
                                {sub.name}
                              </option>
                            ))
                          ) : (
                            <option disabled>{category ? "Loading subcategories..." : "Select a category first"}</option>
                          )}
                        </select>
                      </div>
                      <div className="form-grp">
                        <input
                          type="text"
                          id="type"
                          className="form-controler"
                           placeholder="Business Commenced"
                          value={businesscommenced}
                          onChange={(e) => setBusinesscommenced(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp">
                        <input
                          type="text"
                          id="type"
                          className="form-controler"
                          placeholder="Dealership Commenced"
                          value={dealership}
                          onChange={(e) => setDealershipcommenced(e.target.value)}
                          required
                        />
                      </div>
                    
                    </>
                  )}
                  {step === 4 && (
                    <>
                      <h4>Financial Details</h4>
                      <div className="form-grp ">
                        <input
                          type="text"
                          id="type"
                          className="form-controler"
                          placeholder="Investment Required"
                          value={investmentrequired}
                          onChange={(e) => setInvestmentrequired(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp">
                        <input
                          type="Number"
                          id="ebitda"
                          className="form-controler"
                          placeholder="Area required"
                          value={arearequired}
                          onChange={(e) => setArearequired(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp">
                        <input
                          type="Number"
                          id="outlets"
                          className="form-controler"
                          placeholder="Number of Outlets"
                          value={numberoutlets}
                          onChange={(e) => setNumberoutlets(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp">
                        <input
                          type="Number"
                          id="inventory"
                          className="form-controler"
                          placeholder="Dealetship Fee"
                          value={dealershipfee}
                          onChange={(e) => setDealershipfee(e.target.value)}
                          required
                        />
                      </div>
                     
                      <div className="form-grp">
                        <input
                          type="text"
                          id="rental"
                          className="form-controler"
                          placeholder="Dealership Term"
                          value={dealershipterm}
                          onChange={(e) => setDealershipterm(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp">
                        <input
                          type="text"
                          id="looking"
                          className="form-controler"
                          placeholder="Renewable"
                          value={renewable}
                          onChange={(e) => setRenewable(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp">
                        <input
                          type="text"
                          id="amount"
                          className="form-controler"
                          placeholder="Type OF Property"
                          value={typeproperty}
                          onChange={(e) => setTypeproperty(e.target.value)}
                          required
                        />
                      </div>

                    </>
                  )}
                  {step === 5 && (
                    <>
                      <h4 style={{ marginTop: "15px" }}>About Business</h4>
                      <div className="form-grp">
                        <input
                          type="text"
                          id="about"
                          className="form-controler"
                          placeholder="About......"
                          value={about}
                          onChange={(e) => setAbout(e.target.value)}
                          required
                          style={{ height: "60px" }} />
                      </div>
                      <div className="form-grp">
                        <input
                          type="text"
                          id="amount"
                          className="form-controler"
                          placeholder="Prefered Area"
                          value={preferedarea}
                          onChange={(e) => setPreferedarea(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp">
                        <input
                          type="text"
                          id="amount"
                          className="form-controler"
                          placeholder="Deliverables"
                          value={deliverables}
                          onChange={(e) => setDeliverables(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp">
                        <input
                          type="text"
                          id="type"
                          className="form-controler"
                          placeholder="Website"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp ">
                        <input
                          type="text"
                          id="facebook"
                          className="form-controler"
                          placeholder="Facebook"
                          value={facebook}
                          onChange={(e) => setFacebook(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp ">
                        <input
                          type="text"
                          id="instagram"
                          className="form-controler"
                          placeholder="Instagram"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          required
                        />
                      </div>


                      <div className="form-grp">

                        <input
                          type="file"
                          id="photog"
                          className="form-controler"
                          placeholder='Upload Bannner'
                          onChange={handleBanner}
                          accept="image/*"
                          required
                          />
                      </div>


                    </>
                  )}
                  {/* Navigation Buttons */}
                  <div className="button-group" style={{ display: "flex", justifyContent: "space-between", alignItems: "center",marginTop:"500px",gap:"110px",position:"fixed" }}>
  {step > 1 && (
    <button
      type="button"
      onClick={() => setStep(step - 1)}
      style={{
        width: "90px",
        height: "40px",
        background: "green",
        color: "white",
        border: "1px solid black",
        borderRadius: "5px",
      }}
    >
      Back
    </button>
  )}
  
  {step < 5 && (
    <button
      type="button"
      onClick={() => setStep(step + 1)}
      style={{
        width: "90px",
        height: "40px",
        background: "green",
        color: "white",
        border: "1px solid black",
        borderRadius: "5px",
      }}
    >
      Next
    </button>
  )}

  {step === 5 && (
    <button
      type="submit"
      className="btn btn-primary1"
      style={{
        width: "90px",
        height: "40px",
        background: "blue",
        color: "white",
        border: "1px solid black",
        borderRadius: "5px",
      }}
    >
      Submit
    </button>
  )}
</div>
                </form>
              </div>
            </div>
          )}
          <div className="admin-cards-container1">
            {deal.length > 0 ? (
              deal.map((deal) => (
                <div key={deal._id} className="admin-card">
                  {/* {console.log("Rendering admin:", admin)} */}

                  {deal.image ? (
                    <img src={deal.image} alt={deal.name || "Admin Image"} className="admin-image" />
                  ) : (
                    <p>No Image Available</p>
                  )}

                  <div className="admin-info">
                    <h3>{deal.name || "No Name"}</h3>
                    <p>{deal.location || "No Position"}</p>
                    <p>{deal._id || "No Email"}</p>
                    <p>{deal.email || "No Email"}</p>

                  </div>

               <div className="admin-actions">
                                                                   <div className="update">
                                                                   <FontAwesomeIcon icon={faPenToSquare} />
                                                                   </div>
                                                                   <div className="delete">
                                                                   <FontAwesomeIcon icon={faTrashCan} size="lg" color="black" onClick={() => handleDelete(deal._id)} />
                                                                   </div>
                                                                 </div>
                </div>
              ))
            ) : (
              <p>No Dealership found.</p>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}

export default Dealership;


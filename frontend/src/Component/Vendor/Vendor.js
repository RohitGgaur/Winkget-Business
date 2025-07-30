import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { LayoutDashboard, Users, Settings, LogOut, Building2, Castle, FolderInput, Play, ChevronLeft } from 'lucide-react';
import '../Superadmin/desh.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan,faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Vender = ({ closeModal, categoryId, subId }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [venders, setVenders] = useState(() => {
    const savedvenders = localStorage.getItem('venders');
    return savedvenders ? JSON.parse(savedvenders) : [];
  });
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [location, setLocation] = useState('');
  const [area, setArea] = useState('');
  const [password, setPassword] = useState('');
  const [businessname, setBusinessname] = useState('');
  const [businessnumber, setBusinessnumber] = useState('');
  const [businessemail, setBusinessemail] = useState('');
  // const [city, setCity] = useState('');
  const [businessaddress, setBusinessaddress] = useState('');
  // const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [numberofemployee, setNumberofemployee] = useState('');
  const [businesstype, setBusinesstype] = useState('');
  const [establishment, setEstablishment] = useState('');
  const [businessdocument, setBusinessdocument] = useState('');
  const [annualtumover, setAnnualtumover] = useState('');
  const [editda, setEditda] = useState('');
  const [ededitamargin, setEdeditamargin] = useState('');
  const [inventoryvalue, setInventoryvalue] = useState('');
  const [grossincome, setGrossincome] = useState('');
  const [rental, setRental] = useState('');
  const [lookingfor, setLookingfor] = useState('');
  const [amount, setAmount] = useState('');
  const [about, setAbout] = useState('');

  const [website, setWebsite] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [error, setError] = useState(null);
  const [profileimg, setProfileimg] = useState(null);
  const [bannerimage, setBannerimage] = useState(null);
  const [uploadimage, setUploadimage] = useState(null);
  const [imgprev, setImgprev] = useState(null); // For image preview if needed
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [citys, setCitys] = useState('');
  // State for categories and subcategories
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

  // fetch city
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
  


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleDelete = async (id) => {
    console.log('Deleting franchise with ID:', id); // Debugging

    if (!id) {
      alert('Invalid Franchise ID: ' + id);
      return;
    }



    if (!window.confirm('Are you sure you want to delete this vender?')) return;

    try {
      await axios.delete(`https://winkget-backend.onrender.com/api/Venderdelete/${id}`);
      alert('Franchise deleted successfully');

      // Update state to remove deleted franchise
      setVenders(venders.filter(vender => vender._id !== id));
    } catch (error) {
      console.error('Error deleting franchise:', error);
      alert(error.response?.data?.message || 'Failed to delete franchise');
    }
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
        console.error('Error fetching admin data:', error);
      }
    };
    fetchData();
  }, [id]);

  const fetchVender = async () => {
    try {
      const response = await axios.get('https://winkget-backend.onrender.com/api/venderget');
      console.log("Fetched venderdetails:", response.data);
      console.log("image:", response.data.name);

      if (Array.isArray(response.data)) {
        setVenders(response.data);
        localStorage.setItem('vender', JSON.stringify(response.data));
      } else {
        console.error("Unexpected response format:", response.data);
        toast.error("Failed to fetch vender");
      }
    } catch (error) {
      console.error('Error fetching vender:', error);
      toast.error('Failed to fetch vender');
    }
  };
  const uploadImage = async (file) => {
    if (!file) {
      console.error("No file selected for upload.");
      return null;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "eq2in9eu"); // Check this preset in Cloudinary
    console.log("Uploading file:", file);

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dw89rwftg/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        const errorText = await response.text(); // Get error details
        console.error("Cloudinary error:", errorText);
        throw new Error("Image upload failed");
      }

      const urlData = await response.json();
      console.log("Upload successful, URL:", urlData.url);
      return urlData.url; // Return uploaded image URL
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

    setBusinessname('');
    setBusinessnumber('');
    setBusinessemail('');
    setCitys('');
    setBusinessaddress('');
    setCategory('');
    setSubcategory('');
    setNumberofemployee('');
    setBusinesstype('');
    setEstablishment('');
    setBusinessdocument('');
    setAnnualtumover('');
    setEditda('');
    setEdeditamargin('');
    setInventoryvalue('');
    setGrossincome('');
    setRental('');
    setLookingfor('');
    setAmount('');
    setAbout('');
    setWebsite('');
    setFacebook('');
    setInstagram('');

    setBannerimage('');
    setUploadimage('');
    setError(null);
    setProfileimg('');
    setImgprev(null);
    setIsModalOpen(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      // Upload images asynchronously
      const profileImageUrlPromise = profileimg ? uploadImage(profileimg) : Promise.resolve(null);
      const bannerImageUrlPromise = bannerimage ? uploadImage(bannerimage) : Promise.resolve(null);
      const uploadImageUrlPromise = uploadimage ? uploadImage(uploadimage) : Promise.resolve(null);

      // Wait for all uploads to complete
      const [profileImageUrl, bannerImageUrl, uploadImageUrl] = await Promise.all([
        profileImageUrlPromise,
        bannerImageUrlPromise,
        uploadImageUrlPromise,
      ]);

      // Check if any image upload failed
      if (profileimg && !profileImageUrl) {
        toast.error('Profile image upload failed');
        return;
      }
      if (bannerimage && !bannerImageUrl) {
        toast.error('Banner image upload failed');
        return;
      }
      if (uploadimage && !uploadImageUrl) {
        toast.error('Upload image upload failed');
        return;
      }

      // Submit form data
      const response = await axios.post('https://winkget-backend.onrender.com/api/vender', {
        name,
        email,
        mobile,
        location,
        area,
        password,
        profileimage: profileImageUrl,
        bannerimage: bannerImageUrl,
        uploadimage: uploadImageUrl,
        businessname,
        businessnumber,
        businessemail,
        city: citys,
        businessaddress,
        category: categoryName,
        subcategory: subcategoryName,
        numberofemployee,
        businesstype,
        establishment,
        businessdocument,
        annualtumover,
        editda,
        ededitamargin,
        inventoryvalue,
        grossincome,
        rental,
        lookingfor,
        amount,
        about,
        website,
        facebook,
        instagram,
      });

      if (response.data) {
        toast.success('Registration Successful!');
        closeModalAndReset();
      } else {
        toast.error('Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileimg(file);
      setImgprev(URL.createObjectURL(file));
    }
  };
  const handleProfile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileimg(file);

    }
  };

  const handleBanner = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBannerimage(file);
    }
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadimage(file);
    }
  };

  return (
    <div className="admin-container">
      <div className="main-content">
        <div className="container">
          <div className="header1">
            <h1>Vender Management</h1>
            <button className="add-button" onClick={() => setIsModalOpen(true)}>
              Add Vender
            </button>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="modal-overlay1">
              <div className="modal-content0">
                <button onClick={closeModalAndReset} className="close-button">&times;</button>
                {/* <h5 className='text-center mb-4'>Register Vendor (Step {step} of 3)</h5> */}

                <form onSubmit={handleSubmit}>
                  {/* Step 1 */}
                  {step === 1 && (
                    <>
                      <h7 >Personal Information</h7>
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
                          
                        />
                      </div>
                    </>
                  )}

                  {/* Step 2 */}
                  {step === 2 && (
                    <>
                      <h5>Business Details</h5>
                      <div className="form-grp mt-2">
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

                      <div className="form-grp mt-2">
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
                      <div className="form-grp mt-2">
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

                      <div className="form-grp mt-2">
                        <select className="form-controler0" value={city} onChange={handleCityChange} required>
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
                      
                        <div className="form-grp mt-2">
                        <select
                          className="form-controler0"
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
                      <div className="form-grp mt-2">
                        <select className="form-controler0" value={category} onChange={handleCategoryChange} required>
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
                      <div className="form-grp mt-2">
                        <select
                          className="form-controler0"
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


                    </>
                  )}

                  {/* Step 3 */}
                  {step === 3 && (
                    <>
                      <h4>Business Details</h4>
                      <div className="form-grp">
                        <input
                          type="Number"
                          id="type"
                          className="form-controler"
                          placeholder="Number OF Employee"
                          value={numberofemployee}
                          onChange={(e) => setNumberofemployee(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp ">
                        <input
                          type="text"
                          id="type"
                          className="form-controler"
                          placeholder="Business Type"
                          value={businesstype}
                          onChange={(e) => setBusinesstype(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp ">
                        <input
                          type="text"
                          id="year"
                          className="form-controler"
                          placeholder="Establishment Year"
                          value={establishment}
                          onChange={(e) => setEstablishment(e.target.value)}
                          required
                        />
                      </div>


                      <div className="form-grp">

                        <input
                          type="file"
                          id="photo"
                          className="form-controler"
                          placeholder='Business Document'
                          onChange={handleProfile}
                          accept="image/*"

                          style={{ height: "100px" }} />
                      </div>


                    </>
                  )}
                  {step === 4 && (
                    <>
                      <h6>Financial Details</h6>
                      <div className="form-grp ">
                        <input
                          type="text"
                          id="type"
                          className="form-controler"
                          placeholder="Annual Tumover"
                          value={annualtumover}
                          onChange={(e) => setAnnualtumover(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp">
                        <input
                          type="text"
                          id="ebitda"
                          className="form-controler"
                          placeholder="EBITDA"
                          value={editda}
                          onChange={(e) => setEditda(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp">
                        <input
                          type="text"
                          id="ebitdamargin"
                          className="form-controler"
                          placeholder="EBITDA Margin"
                          value={ededitamargin}
                          onChange={(e) => setEdeditamargin(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp">
                        <input
                          type="text"
                          id="inventory"
                          className="form-controler"
                          placeholder="Inventory Value"
                          value={inventoryvalue}
                          onChange={(e) => setInventoryvalue(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp">
                        <input
                          type="text"
                          id="gross"
                          className="form-controler"
                          placeholder="gross Income"
                          value={grossincome}
                          onChange={(e) => setGrossincome(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="form-grp">
                        <input
                          type="text"
                          id="looking"
                          className="form-controler"
                          placeholder="Looking For"
                          value={lookingfor}
                          onChange={(e) => setLookingfor(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp">
                        <input
                          type="text"
                          id="amount"
                          className="form-controler"
                          placeholder="Amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          required
                        />
                      </div>

                    </>
                  )}
                  {step === 5 && (
                    <>
                      <h4>About Business</h4>
                      <div className="form-grp">
                        <input
                          type="text"
                          id="rental"
                          className="form-controler"
                          placeholder="Rental"
                          value={rental}
                          onChange={(e) => setRental(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grp">
                        <input
                          type="text"
                          id="about"
                          className="form-controler"
                          placeholder="About......"
                          value={about}
                          onChange={(e) => setAbout(e.target.value)}
                          required
                          style={{ height: "80px" }} />
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
                          id="photo"
                          className="form-controler"
                          placeholder='Upload Bannner'
                          onChange={handleBanner}
                          accept="image/*"

                          />
                      </div>


                    </>
                  )}
                  {/* Navigation Buttons */}
                  <div className="button-group" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop:"460px",gap:"110px",position:"fixed" }}>
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
            {venders.length > 0 ? (
              venders.map((vender) => (
                <div key={vender._id} className="admin-card">
                  {/* {console.log("Rendering admin:", admin)} */}

                  {vender.profileimage ? (
                    <img src={vender.profileimage} alt={vender.name || "Admin Image"} className="admin-image" />
                  ) : (
                    <p>No Image Available</p>
                  )}

                  <div className="admin-info">
                    <h3>{vender.name || "No Name"}</h3>
                    <p>{vender.location || "No Position"}</p>
                    <p>{vender._id || "No Email"}</p>
                    <p>{vender.email || "No Email"}</p>

                  </div>

                   <div className="admin-actions">
                                 <div className="update">
                                 <FontAwesomeIcon icon={faPenToSquare} />
                                 </div>
                                 <div className="delete">
                                 <FontAwesomeIcon icon={faTrashCan} size="lg" color="black" onClick={() => handleDelete(vender._id)} />
                                 </div>
                               </div>
                </div>
              ))
            ) : (
              <p>No vender found.</p>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}

export default Vender;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link,useLocation  } from 'react-router-dom';
import axios from 'axios';
import { LayoutDashboard, Users, Settings, LogOut,Building2,Castle, FolderInput,Play , ChevronLeft } from 'lucide-react';
import './desh.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan,faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Update from "../Admin/Update.js"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Admin = ({ closeModal }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const[data,setData]=useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [admins, setAdmins] = useState(() => {
    const savedAdmins = localStorage.getItem('admins');
    return savedAdmins ? JSON.parse(savedAdmins) : [];
  });
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [city,setCity]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [profileimg, setProfileimg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [category,setCategory]=useState('');
const [modal,setModal]=useState(false);
const [isDashboardOpen, setIsDashboardOpen] = useState(false);
const [isCategoryOpen, setIsCategoryOpen] = useState(false);
const locations = useLocation();
  const handleUpdate = (id) => {
    // console.log("Update clicked for ID:", id);
    setSelectedId(id); // Set selected admin ID
    setShowModal(true); // Show the modal
};
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://winkget-backend.onrender.com/api/superadmin/${id}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
    fetchData();
  }, [id]);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('https://winkget-backend.onrender.com/api/adminget');
      console.log("Fetched admins:", response.data);

      if (Array.isArray(response.data)) {
        setAdmins(response.data);
        localStorage.setItem('admins', JSON.stringify(response.data));
      } else {
        console.error("Unexpected response format:", response.data);
        toast.error("Failed to fetch admins");
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
      toast.error('Failed to fetch admins');
    }
  };
  const handleDelete = async (adminid) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return;
    try {
        await axios.delete(`https://winkget-backend.onrender.com/api/delete/${adminid}`);
        alert('Admin deleted successfully');
        // Update UI after deletion
        setAdmins(admins.filter(admin => admin.adminid !== adminid)); 
    } catch (error) {
        console.error('Error deleting admin:', error);
        alert('Failed to delete admin');
    }
};
  const uploadImage = async () => {
    const data = new FormData();
    data.append('file', profileimg);
    data.append('upload_preset', 'eq2in9eu');
    try {
      let response = await fetch('https://api.cloudinary.com/v1_1/dw89rwftg/image/upload', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      let urlData = await response.json();
      return urlData;
    } catch (error) {
      console.log('Image upload error:', error);
      return null;
    }
  };
  const closeModalAndReset = () => {
    setName('');
   setPosition('');
   setCity('');
    setEmail('');
    setPassword('');
    setProfileimg(null);
    setError(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const urlData = await uploadImage();
    if (!urlData || !urlData.url) {
      toast.error('Image upload failed');
      return;
    }
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
  
    try {
      const response = await axios.post('https://winkget-backend.onrender.com/api/Register', {
        name,
        position,
        city,
        email,
        password,
        image: urlData.url
      });
  
      if (response.data) {
              toast.success('Registration Successful!');
              closeModalAndReset(); // Close modal and reset form
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
      
    }
  };
 
  
  
  return (
    <div className="admin-container">
      {/* Main Content */}
      <div className="main-content">
        <div className="container">
        <div className="header1">
            <h1>Admin Management</h1>
            <button className="add-button" onClick={() => setIsModalOpen(true)}>
              Add Admin
            </button>
          </div>
          {/* Modal */}
          {isModalOpen && (
            <div className="modal-overlay1">
              <div className="modal-content0">
                <button onClick={closeModalAndReset} className="close-button">&times;</button>
                <h2>Register Admin</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-grp mt-5">
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
                    <select
                      className="form-controler"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      required
                    >
                      <option value="">Choose one</option>
                      <option value="Head Admin">Head Admin</option>
                      <option value="Ass. Admin">Ass. Admin</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div className="form-grp">
                    <input
                      type="text"
                      id="city"
                      className="form-controler"
                      placeholder="Enter city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-grp">
                    <input
                      type="email"
                      id="email"
                      className="form-controler"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-grp">
                    <input
                      type="password"
                      id="password"
                      className="form-controler"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-grp">
                    <input
                      type="file"
                      id="photo"
                      className="form-controler"
                      onChange={handleFileChange}
                      accept="image/*"
                      required
                    />
                  </div>
                  <button type="submit" className="btns 01">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
          {/* Admin Cards */}
          <div className="admin-cards-container1">
        {admins.length > 0 ? (
          admins.map((admin) => (
            <div key={admin._id} className="admin-card">
              {admin.image ? (
                <img
                  src={admin.image}
                  alt={admin.name || "Admin Image"}
                  className="admin-image"
                />
              ) : (
                <p>No Image Available</p>
              )}
              <div className="admin-info">
              <h7>{admin.position || "No Position"}</h7>
                <h3>{admin.name || "No Name"}</h3>
              
            
              </div>
              {/* Buttons */}
              <div className="admin-actions">
                <div className="update">
                <FontAwesomeIcon icon={faPenToSquare} onClick={() => handleUpdate(admin._id)}/>
                </div>
                <div className="delete">
                <FontAwesomeIcon icon={faTrashCan} size="lg" color="black" onClick={() => handleDelete(admin._id)} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No admins found.</p>
        )}
      </div>

      {/* Include Update Component */}
      {showModal && (
        <Update showModal={showModal} onClose={() => setShowModal(false)} id={selectedId} />
      )}

        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Admin;

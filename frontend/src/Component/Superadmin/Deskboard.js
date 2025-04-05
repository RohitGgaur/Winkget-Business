import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link,useLocation,Outlet  } from 'react-router-dom';
import axios from 'axios';
import { LayoutDashboard, Users, Settings, LogOut,Building2,Castle, FolderInput,Play , ChevronLeft } from 'lucide-react';
import './desh.css';
import Update from "../Admin/Update.js"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Deskboard = ({ closeModal }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState({});
  const { id } = useParams();
  const {cid}=useParams();
  const navigate = useNavigate();
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
  const [imgprev, setImgprev] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [category,setCategory]=useState('');
  const [subcategory,setSubcategory]=useState('');
  const [location,setLocation]=useState('');
  const[locality,setLocality]=useState('');
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
        const response = await axios.get(`http://localhost:8000/api/superadmin/${id}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
    fetchData();
  }, [id]);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/adminget');
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
        await axios.delete(`http://localhost:8000/api/delete/${adminid}`);
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
    setImgprev(null);
    setError(null);
    setIsModalOpen(false);
  };
  const closereset=()=>{
    setCategory('');
    setSubcategory('');
    setLocation('');
    setLocality('');
    setModal('');
  }
  const handlSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/fill', {
        category,
        subcategory,
        location,
        locality,
      });
  
      if (response.data) {
              toast.success('Data fill Successful!');
              closereset(); // Close modal and reset form
            } else {
              toast.error('data  failed');
            }
          } catch (err) {
            console.error('Registration error:', err);
            toast.error(err.response?.data?.message || 'Registration failed');
          }

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
      const response = await axios.post('http://localhost:8000/api/Register', {
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
      setImgprev(URL.createObjectURL(file));
    }
  };
 
  
  
  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Logo Section */}
      <div className="logo-section">
        {!collapsed && <span className="logo-text">SuperAdminPanel</span>}
        <button onClick={() => setCollapsed(!collapsed)} className="collapse-btn">
          <ChevronLeft className={`chevron-icon ${collapsed ? "rotate" : ""}`} />
        </button>
      </div>

      {/* Admin Profile */}
      <div className="admin-profile">
  <div className="profile-content">
    <img src={data.image} alt="Admin" className="profiles-image" />
    {!collapsed && (
      <div className="profile-details">
        <p className="admin-role">SuperAdmin</p> {/* Role comes first */}
        <p className="admin-name">{data.name}</p> {/* Name below Role */}
      </div>
    )}
  </div>
</div>


      {/* Dashboard Section */}
      <div className="nav-section">
        <button
          className="nav-button mx-2"
          style={{ textDecoration: "none", display: "flex", alignItems: "center", width: "100%" }}
          onClick={() => setIsDashboardOpen(!isDashboardOpen)}
        >
          <LayoutDashboard className="nav-icon"/>
          {!collapsed && <span className="nav-label">Dashboard</span>}
        </button>

        {/* Sub-menu for Dashboard */}
        {isDashboardOpen && (
          <div className="submenu">
              
             <Link to="admin" className="nav-button sub-nav" style={{ textDecoration: "none" }}>
                             <Users className="nav-icon"size={22}style={{marginLeft:"29px"}} />
                             {!collapsed && <span className="nav-label mx-5">Admin</span>}
                           </Link>
            <Link to="vender" className="nav-button sub-nav" style={{ textDecoration: "none" }}>
              <Building2  className="nav-icon"size={22}style={{marginLeft:"29px"}} />
              {!collapsed && <span className="nav-label mx-5">Vender</span>}
            </Link>
            <Link to="franchise" className="nav-button sub-nav" style={{ textDecoration: "none" }}>
              <Castle className="nav-icon"size={22}style={{marginLeft:"29px"}} />
              {!collapsed && <span className="nav-label mx-5">Franchise</span>}
            </Link>
            <Link to="dealership" className="nav-button sub-nav" style={{ textDecoration: "none" }}>
            <Settings className="nav-icon" size={30}style={{marginLeft:"29px"}} />  {/* Adjust size as needed */}
              {!collapsed && <span className="nav-label mx-5">Dealership</span>}
            </Link>
          </div>
        )}
      </div>

      {/* Category Section */}
      <div className="nav-section">
        <button
          className="nav-button mx-2"
          style={{ textDecoration: "none", display: "flex", alignItems: "center", width: "100%" }}
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          <LayoutDashboard className="nav-icon" />
          {!collapsed && <span className="nav-label">Add items</span>}
        </button>

        {/* Sub-menu for Category */}
        {isCategoryOpen && (
          <div className="submenu">
             <Link to="Createcategory" className="nav-button sub-nav" style={{ textDecoration: "none" }}>
              < FolderInput className="nav-icon"style={{marginLeft:"30px"}}/>
              {!collapsed && <span className="nav-label">Category</span>}
            </Link>
            <Link to="Subcategory" className="nav-button sub-nav" style={{ textDecoration: "none" }}>
              <Play className="nav-icon"style={{marginLeft:"30px"}} />
              {!collapsed && <span className="nav-label">Subcategory</span>}
            </Link>
          
            <Link to="city" className="nav-button sub-nav" style={{ textDecoration: "none" }}>
              <Settings className="nav-icon"style={{marginLeft:"30px"}} />
              {!collapsed && <span className="nav-label">Add City&Locaity</span>}
            </Link>
          </div>
        )}
      </div>
      {/* Logout Section */}
      <div className="logout-section" style={{ marginTop: "auto" }}>
        <button className="logout-button" onClick={() => navigate("/")}>
          <LogOut className="nav-icon" />
          {!collapsed && <span className="nav-label">Logout</span>}
        </button>
      </div>
    </div>

      {/* Main Content */}
      <div className="main-content">
      <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Deskboard;
// onClick={() => handleDelete(admin.id)}
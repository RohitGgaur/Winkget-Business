import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link ,Outlet} from 'react-router-dom';
import axios from 'axios';
import { LayoutDashboard, Users, Settings, LogOut,Building2,Castle, FolderInput,Play , ChevronLeft } from 'lucide-react';
import '../Superadmin/desh.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState({});
  const { id} = useParams();

  const navigate = useNavigate();
  const [adminCity, setAdminCity] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [vender, setVender] = useState(() => {
      const savedVender = localStorage.getItem('vender');
      return savedVender ? JSON.parse(savedVender) : [];
    });
    const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [area, setArea] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [profileimg, setProfileimg] = useState(null);
  const [imgprev, setImgprev] = useState(null);
const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const fetchData = async () => {
      try {
        const response = await axios.get(`https://winkget-backend.onrender.com/api/Adminget/${id}`);
        setData(response.data);
        console.log(response.data)
        setAdminCity(response.data.city);
         console.log("ye lo",response.data.city);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
    useEffect(() => {
      fetchVender();
    }, []);

  useEffect(() => {
    if (!id) return;
    
    fetchData();
  }, [id]);
  const fetchVender = async () => {
    try {
      const response = await axios.get('https://winkget-backend.onrender.com/api/venderget');
      console.log("Fetched vender:", response.data);

      if (Array.isArray(response.data)) {
        setVender(response.data);
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
  const uploadImage = async () => {
    if (!profileimg) return null;
    
    const data = new FormData();
    data.append('file', profileimg);
    data.append('upload_preset', 'eq2in9eu');
    
    try {
      let response = await fetch('https://api.cloudinary.com/v1_1/dw89rwftg/image/upload', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) throw new Error('Image upload failed');
      return await response.json();
    } catch (error) {
      console.error('Image upload error:', error);
      return null;
    }
  };

  const closeModalAndReset = () => {
    setName('');
    setLocation('');
    setArea('');
    setEmail('');
    setPassword('');
    setProfileimg(null);
    setImgprev(null);
    setError(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Validate image
    if (!profileimg) {
      toast.error('Please select an image');
      return;
    }

    try {
      // Upload image first
      const urlData = await uploadImage();
      if (!urlData || !urlData.url) {
        toast.error('Image upload failed');
        return;
      }

      // Submit form data
      const response = await axios.post('https://winkget-backend.onrender.com/api/vender', {
        name,
        location,
        area,
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

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'users', icon: Users, label: 'Vender' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="admin-container">
      {/* Sidebar */}
     <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
          {/* Logo Section */}
          <div className="logo-section">
            {!collapsed && <span className="logo-text">AdminPanel</span>}
            <button onClick={() => setCollapsed(!collapsed)} className="collapse-btn">
              <ChevronLeft className={`chevron-icon ${collapsed ? "rotate" : ""}`} />
            </button>
          </div>
    
          {/* Admin Profile */}
          <div className="admin-profile">
            <div className="profile-content">
              <img src={data.image} alt="Admin" className="profile-image" />
              {!collapsed && (
                <div className="profile-details">
                   <p className="admin-role">Admin</p>
                  <p className="admin-name">{data.name}</p>
                 
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
              <LayoutDashboard className="nav-icon" />
              {!collapsed && <span className="nav-label">Dashboard</span>}
            </button>
    
            {/* Sub-menu for Dashboard */}
            {isDashboardOpen && (
              <div className="submenu">
                <Link to="Business" className="nav-button sub-nav" style={{ textDecoration: "none" }}>
                  <Users className="nav-icon"size={22}style={{marginLeft:"29px"}} />
                  {!collapsed && <span className="nav-label">Vender</span>}
                </Link>
                <Link to="Franchise" className="nav-button sub-nav" style={{ textDecoration: "none" }}>
                  <Settings className="nav-icon"size={22}style={{marginLeft:"29px"}} />
                  {!collapsed && <span className="nav-label">Franchise</span>}
                </Link>
                <Link to="Dealership"className="nav-button sub-nav" style={{ textDecoration: "none" }}>
                  <Settings className="nav-icon"size={22}style={{marginLeft:"29px"}} />
                  {!collapsed && <span className="nav-label">Dealership</span>}
                </Link>
              </div>
            )}
             {isDashboardOpen && (
              <div className="submenu">
               
             
                <Link to={`/Enquiries/${data.city}`} className="nav-button sub-nav" style={{ textDecoration: "none" }}>
                  <Settings className="nav-icon"size={22}style={{marginLeft:"29px"}} />
                  {!collapsed && <span className="nav-label">Enquiry</span>}
                </Link>
              </div>
            )}
          </div>
    
          {/* Logout Section */}
          <div className="logout-section" style={{ marginTop: "auto" }}>
            <button className="logout-button" onClick={() => navigate("/Adminlogin")}>
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

export default Dashboard;
// onClick={() => handleDelete(admin._id)}
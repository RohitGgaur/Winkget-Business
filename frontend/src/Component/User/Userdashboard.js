import React, { useState,useEffect } from 'react';
import { useParams, useNavigate, Link,Outlet } from 'react-router-dom';
import axios from 'axios';
import "./user.css"
const Userdashboard = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState('Allow');
  const { userId } = useParams();
  const [data,setData]=useState([]);
  const [minimized, setMinimized] = useState(false);
  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/userdata/${userId}`);
        setData(response.data);
        console.log(response.data);
        console.log(response.data._id);
        // const supid=response.data.id;
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
    fetchData();
  }, [userId]);
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    if (showSettings && !showProfileMenu) {
      setShowSettings(false);
    }
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    if (!showProfileMenu) {
      setShowProfileMenu(true);
    }
  };

  const toggleNotification = () => {
    setNotificationStatus(notificationStatus === 'Allow' ? 'Mute' : 'Allow');
  };

  const toggleSidebar = () => {
    setMinimized(!minimized);
    setShowProfileMenu(false);
    setShowSettings(false);
  };

  return (
    <div className="dashboard-container0">
      {/* Sidebar */}
      <div className={`sidebar ${minimized ? 'minimized' : ''}`}>
        {/* Toggle button */}
        <div className="toggle-container">
          <button 
            onClick={toggleSidebar} 
            className="toggle-button"
          >
            ≡
          </button>
        </div>

        <div className="sidebar-header0">
          {minimized ? (
            <h1>D</h1>
          ) : (
            <h1>Dashboard</h1>
          )}
        </div>

        {/* User profile section */}
        <div className="profile-container">
          <div 
            className="profile-section"
            onClick={toggleProfileMenu}
          >
            <div className="avatar">
              <img src={data.image} alt="User" />
            </div>
            {!minimized && (
              <div className="user-info">
                <p className="user-name">{data.name}</p>
                <p className="user-email">{data.email}</p>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          {showProfileMenu && (
            <div className={`profile-menu ${minimized ? 'menu-right' : ''}`}>
              <Link to="profile" className="menu-item" onClick={() => {}}>
                <div className="menu-icon">👤</div>
                <span>My Profile</span>
                <span className="chevron">›</span>
              </Link>

              <div className="menu-item" onClick={toggleSettings}>
                <div className="menu-icon">⚙️</div>
                <span>Settings</span>
                <span className="chevron">›</span>
              </div>

              <div className="menu-item">
                <div className="menu-icon">🔔</div>
                <span>Notification</span>
                <div
                  className="status-badge"
                  onClick={toggleNotification}
                >
                  {notificationStatus}
                </div>
              </div>

              <Link to="/Home" className="menu-item">
                <div className="menu-icon">🚪</div>
                <span>Log Out</span>
              </Link>
            </div>
          )}

          {/* Settings Panel */}
          {showSettings && (
            <div className={`settings-panel ${minimized ? 'menu-right' : ''}`}>
              <div className="settings-header">
                <h3>Settings</h3>
                <button className="close-button" onClick={() => setShowSettings(false)}>×</button>
              </div>

              <div className="settings-item">
                <span>Theme</span>
                <div className="setting-value">
                  <span>Light</span>
                  <span className="chevron">›</span>
                </div>
              </div>

              <div className="settings-item">
                <span>Language</span>
                <div className="setting-value">
                  <span>Eng</span>
                  <span className="chevron">›</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main menu items */}
      
         <div className="menu-container">
          <Link to="" className="menu-item">
            <div className="menu-icon">🏠</div>
            {!minimized && <span>Dashboard</span>}
          </Link>
          <Link to="messages" className="menu-item">
            <div className="menu-icon">💬</div>
            {!minimized && <span>Messages</span>}
          </Link>
          <Link to="analytics" className="menu-item">
            <div className="menu-icon">📊</div>
            {!minimized && <span>Analytics</span>}
          </Link>
          <Link to="projects" className="menu-item">
            <div className="menu-icon">💼</div>
            {!minimized && <span>Projects</span>}
          </Link>
          <Link to="tasks" className="menu-item">
            <div className="menu-icon">✓</div>
            {!minimized && <span>Tasks</span>}
          </Link>
        </div>
      </div>

      {/* Main content area */}
      <div className="main-content9">
        <Outlet />
      </div>
    </div>
  );
};

export default Userdashboard;

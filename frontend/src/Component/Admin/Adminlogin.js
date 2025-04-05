
// import React, { useState } from 'react';
// import axios from 'axios';
// import {useParams, Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom'; 
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Adminlogin = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);
//     const navigate = useNavigate(); 
   
//     const handleSubmit = async (e) => {
      
//       e.preventDefault();
//       try {
//         const response = await axios.post('http://localhost:8000/api/Adminlogin', {
//           email,
//           password,
//         });
    
//         toast("Signin Successful!");
//         setError(null);
//         console.log(response.data.user._id);
//         setEmail('');
//         setPassword('');
  
//         let id = response.data.user._id
  
      
//         navigate(`/admindesk/${id}`);  
//       } catch (err) {
//         toast("Signin failed!");
//         setError("User already exists or other error occurred."); 
//         console.error("Signin failed:",  err.response ? err.response.data : err.message);
//       }
//     };
  
//     return (
//       <>
//         <ToastContainer />
//         <div className='d-flex align-items-center justify-content-center' style={{ minHeight: "20vh",marginTop:"50px",backgroundColor:"white" }}>
//           <div className="container-main" style={{ padding: "70px", borderRadius: "10px", height: "70vh", width: "70vh", marginTop: "10px", boxShadow: "0 0 15px green" }}>
//             <div className="heading" style={{ textAlign: "center" }}>
//               <h2>Log In</h2>
//             </div>
//             <form className="form" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} onSubmit={handleSubmit}>
//               <div className="form-group" style={{ width: "100%", maxWidth: "400px", marginBottom: "35px" }}>
//                 <label htmlFor="exampleInputEmail1">Email address</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="exampleInputEmail1"
//                   aria-describedby="emailHelp"
//                   placeholder="Enter email"
//                   style={{ width: "100%" }}
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
              
//               <div className="form-group" style={{ width: "100%", maxWidth: "400px", marginBottom: "35px" }}>
//                 <label htmlFor="exampleInputPassword1">Password</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   id="exampleInputPassword1"
//                   placeholder="Password"
//                   style={{ width: "100%" }}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
            
//               <div className="user">
//                 <Link to="/">Sign up</Link>
//               </div>
//               <button type="submit" className="btn btn-primary" style={{ marginTop: "7px" }}>Submit</button>
//             </form>
//           </div>
//         </div>
//       </>
//     );
//   };

// export default Adminlogin;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../../image/Winget.png"; // Import background image
import "../Superadmin/log.css"; // Import CSS

// // const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
    const handleSubmit = async (e) => {
      
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8000/api/Adminlogin', {
          email,
          password,
        });
    
        toast("Signin Successful!");
        setError(null);
        console.log("API Response:", response.data);
        console.log(response.data.user._id);
        setEmail('');
        setPassword('');
  
        let id = response.data.user._id
  
      
        navigate(`/admindesk/${id}`);  
      } catch (err) {
        toast("Signin failed!");
        setError("User already exists or other error occurred."); 
        console.error("Signin failed:",  err.response ? err.response.data : err.message);
      }
    };
 

  return (
    <>
      <ToastContainer position="bottom-center" autoClose={3000} />
      <div className="auth-container">
        <div className="logo-container">
          <img src={img} alt="Winget Logo" className="logo" />
        </div>

        <div className="auth-card">
          <h2 className="auth-heading">Log In</h2>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="auth-links">
              <Link to="/signup">Don't have an account? Sign up</Link>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../../image/Winget.png"; // Import background image
import "./log.css"; // Import the CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/signin", {
        email,
        password,
      });

      toast("Signin Successful!");
      setEmail("");
      setPassword("");

      let id = response.data.user._id;
      navigate(`/superdesk/${id}`);
    } catch (err) {
      toast("Signin failed!");
      console.error(
        "Signin failed:",
        err.response ? err.response.data : err.message
      );
    }
  };

  return (
    <>
      <div className="auth-container">
        <div className="logo-container">
          <img src={img} alt="Winget Logo" className="logo" />
        </div>
        
        <div className="auth-card">
          <h2 className="auth-heading">Log In</h2>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="forms-groups">
              <label className="form-labels">Email address</label>
              <input
                type="email"
                className="form-controls"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="forms-groups">
              <label className="form-labels">Password</label>
              <input
                type="password"
                className="form-controls"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="auth-links">
              <Link to="/signup">Don't have an account? Sign up</Link>
            </div>
            
            <button type="submit" className="btn-primary">
              Log In
            </button>
          </form>
        </div>
        
        <ToastContainer position="bottom-center" autoClose={3000} />
      </div>
    </>
  );
};

export default Login;
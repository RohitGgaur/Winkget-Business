import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Createcategory.css';

const Createcategory = () => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState(null);
  const [image, setImage] = useState(null);

  const uploadImage = async (file) => {
    if (!file) return null;

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
        throw new Error("Image upload failed");
      }

      const urlData = await response.json();
      return urlData.url;
    } catch (error) {
      toast.error("Image upload failed");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const iconUrl = icon ? await uploadImage(icon) : null;
    const imageUrl = image ? await uploadImage(image) : null;

    if (!name || !iconUrl || !imageUrl) {
      toast.error("All fields are required!");
      return;
    }

    const formData = {
      name, 
      icon: iconUrl,
      image: imageUrl
    };

    try {
      const response = await axios.post('https://winkget-backend.onrender.com/api/categories', formData);

      if (response.data) {
        toast.success("Category created successfully!");
        setName('');
        setIcon(null);
        setImage(null);
        document.getElementById("file1").value = ""; 
        document.getElementById("file2").value = "";
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Category creation failed");
    }
  };

  return (
    <div className="category-container">
      <ToastContainer />
      <div className="form-container">
        <h1 className="title">Create Category</h1>
        
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            required
          />

          <div className="file-input-container">
            <label htmlFor="file1" className="upload-buttons">
              Upload Icon
            </label>
            <input
              id="files"
              type="file"
              onChange={(e) => setIcon(e.target.files[0])}
              className="hidden0"
              accept="image/*"
            />
          </div>

          <div className="file-input-container">
            <label htmlFor="file2" className="upload-buttons">
              Upload Image
            </label>
            <input
              id="file2"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden0"
              accept="image/*"
            />
          </div>

          <button type="submit" className="register-button">
            Create Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Createcategory;

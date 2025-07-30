import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./subcategory.css";

const Subcategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([{ name: "", icon: null, image: null }]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://winkget-backend.onrender.com/api/categories/tree")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const uploadImage = async (file) => {
    if (!file) return null;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "eq2in9eu");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dw89rwftg/image/upload", {
        method: "POST",
        body: data,
      });

      if (!response.ok) throw new Error("Image upload failed");

      const urlData = await response.json();
      return urlData.url;
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    }
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...subCategories];
    updated[index][field] = value;
    setSubCategories(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory) {
      toast.error("Please select a parent category");
      return;
    }

    let parentId = selectedCategory;

    for (let subCategory of subCategories) {
      const iconUrl = subCategory.icon ? await uploadImage(subCategory.icon) : null;
      const imageUrl = subCategory.image ? await uploadImage(subCategory.image) : null;

      if (!iconUrl || !imageUrl) {
        toast.error("Image upload failed");
        return;
      }

      try {
        const response = await axios.post("https://winkget-backend.onrender.com/api/categories", {
          name: subCategory.name,
          icon: iconUrl,
          image: imageUrl,
          parentId,
        });

        if (response.data) {
          toast.success(`SubCategory "${subCategory.name}" created successfully!`);
          parentId = response.data.category._id;
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "SubCategory creation failed");
        return;
      }
    }

    setSubCategories([{ name: "", icon: null, image: null }]);
  };

  const addSubCategoryInput = () => {
    setSubCategories([...subCategories, { name: "", icon: null, image: null }]);
  };

  const removeSubCategoryInput = (index) => {
    if (subCategories.length > 1) {
      setSubCategories(subCategories.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="subcategory-wrapper">
      <ToastContainer />

      {/* Subcategory Form */}
      <div className="form-container">
        <h1>Create SubCategories</h1>
        <form onSubmit={handleSubmit} className="form">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
            <option value="">Select Parent Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>

          {subCategories.map((sub, index) => (
            <div key={index} className="subcategory-group">
              <input
                type="text"
                placeholder={`SubCategory Name ${index + 1}`}
                value={sub.name}
                onChange={(e) => handleInputChange(index, "name", e.target.value)}
                required
              />

              {/* <label htmlFor={`icon-${index}`} className="upload-button">Upload Icon</label> */}
              <input
                id={`icon-${index}`}
                type="file"
                className="hide"
                accept="image/*"
                onChange={(e) => handleInputChange(index, "icon", e.target.files[0])}
              />
              {/* {sub.icon && <span className="file-name">{sub.icon.name}</span>} */}

              {/* <label htmlFor={`image-${index}`} className="upload-button">Upload Image</label> */}
              <input
                id={`image-${index}`}
                type="file"
                className="hide"
                accept="image/*"
                onChange={(e) => handleInputChange(index, "image", e.target.files[0])}
              />
              {/* {sub.image && <span className="file-name">{sub.image.name}</span>} */}

              <button type="button" className="remove-button" onClick={() => removeSubCategoryInput(index)}>
                Remove
              </button>
            </div>
          ))}

          <button type="button" className="add-button" onClick={addSubCategoryInput}>Add More</button>
          <button type="submit" className="register-button">Create SubCategories</button>
        </form>
      </div>

      {/* Category Name List */}
      <div className="category-list-column">
        <h2>All Categories</h2>
        <div className="category-list">
          {categories.map((cat) => (
            <div key={cat._id} className="category-name-item"onClick={() => navigate(`/subcategory/${cat._id}`, { state: cat })}style={{cursor:"pointer"}}>
              {cat.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subcategory;

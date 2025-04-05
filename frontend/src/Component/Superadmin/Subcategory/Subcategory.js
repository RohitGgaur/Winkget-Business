import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./sub.css";

const Subcategory = () => {
  const { id } = useParams(); // Get category ID from URL
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", icon: null, iconPreview: "" });

  // ✅ Fetch Subcategories
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/categories/${id}`);
        console.log("Fetched Data:", response.data);

        if (response.data && response.data.children) {
          setSubcategories(response.data.children);
        } else {
          setSubcategories([]);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, [id]);

  // ✅ Handle Update Click
  const handleUpdate = (subcategory) => {
    console.log("Update button clicked for:", subcategory);
    setSelectedSubcategory(subcategory);
    setFormData({ name: subcategory.name, icon: null, iconPreview: subcategory.icon });
  };

  // ✅ Handle File Selection & Upload to Cloudinary
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataToSend = new FormData();
    formDataToSend.append("file", file);
    formDataToSend.append("upload_preset", "your_upload_preset"); // Replace with Cloudinary upload preset

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dw89rwftg/image/upload', // Replace with Cloudinary cloud name
        formDataToSend
      );

      console.log("Cloudinary Response:", response.data);
      setFormData({ ...formData, icon: response.data.secure_url, iconPreview: response.data.secure_url });
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      alert("Failed to upload image");
    }
  };

  // ✅ Handle Update Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSubcategory) return;

    console.log("Submitting Update for:", selectedSubcategory);

    const formDataToSend = {
      name: formData.name,
      icon: formData.icon, // Cloudinary URL
    };

    try {
      const response = await axios.put(
        `http://localhost:8000/api/categories/${selectedSubcategory._id}`,
        formDataToSend
      );

      console.log("Update Response:", response.data);

      // ✅ Update UI after successful update
      setSubcategories((prev) =>
        prev.map((sub) =>
          sub._id === selectedSubcategory._id
            ? { ...sub, name: formData.name, icon: formData.icon || sub.icon }
            : sub
        )
      );

      setSelectedSubcategory(null); // Close modal
      setFormData({ name: "", icon: null, iconPreview: "" });

    } catch (error) {
      console.error("Error updating subcategory:", error.response?.data || error);
    }
  };

  // ✅ Handle Delete
  const handleDelete = async (subcategoryId) => {
    console.log("Delete button clicked for:", subcategoryId);

    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        await axios.delete(`http://localhost:8000/api/categories/${subcategoryId}`);
        console.log("Subcategory Deleted");

        // ✅ Update UI after deletion
        setSubcategories(subcategories.filter((sub) => sub._id !== subcategoryId));
        alert("Subcategory deleted successfully!");
      } catch (error) {
        console.error("Error deleting subcategory:", error.response?.data || error);
        alert("Failed to delete subcategory.");
      }
    }
  };

  return (
    <div>
      <h2>Subcategories</h2>
      <p>Category ID: {id}</p>

      {subcategories.length > 0 ? (
        <div className="subcategory-container">
          {subcategories.map((sub) => (
            <div
              key={sub._id}
              className="subcategory-item"
              onClick={() => navigate(`/subcategory/${sub._id}`)}
            >
              <img src={sub.icon} alt={sub.name} className="subcategory-icon" />
              <span className="subcategory-name" style={{ fontSize: "20px", fontWeight: "bold" }}>
                {sub.name}
              </span>
              <button 
                className="Update mx-3" 
                style={{ border: "1px solid black", borderRadius: "4px", color: "white", backgroundColor: "green", width: "70px", height: "30px" }} 
                onClick={() => handleUpdate(sub)}
              >
                Update
              </button>
              <button 
                className="delete mx-3" 
                style={{ border: "1px solid black", borderRadius: "4px", color: "white", backgroundColor: "red", width: "70px", height: "30px" }} 
                onClick={() => handleDelete(sub._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No subcategories found.</p>
      )}

      {selectedSubcategory && (
        <div className="modal">
          <div className="modal-content">
            <h3>Update Subcategory</h3>
            <form onSubmit={handleSubmit}>
              <label>Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              
              <div className="f" style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <label>Upload Image:</label>
                <input type="file" accept="image/*" onChange={handleFileChange} />
              </div>

              {formData.iconPreview && (
                <img src={formData.iconPreview} alt="Preview" style={{ width: "100px", height: "100px", marginTop: "10px" }} />
              )}

              <div className="btn" style={{ margin: "8px", display: "flex", gap: "10px" }}>
                <button
                  type="submit"
                  className="bt mx-4"
                  style={{
                    border: "1px solid black",
                    borderRadius: "4px",
                    backgroundColor: "blue",
                    color: "white",
                    padding: "8px 16px",
                    cursor: "pointer"
                  }}
                >
                  Save
                </button>

                <button
                  type="button"
                  className="bt mx-4"
                  onClick={() => setSelectedSubcategory(null)}
                  style={{
                    border: "1px solid black",
                    borderRadius: "4px",
                    backgroundColor: "green",
                    color: "white",
                    padding: "8px 16px",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subcategory;

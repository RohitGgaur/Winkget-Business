import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./subc.css";

const Subcategories = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [subcategories, setSubcategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
       const [img,setImg]=useState([]);
    // Fetch Subcategories and Category Name
    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/categories/${id}`);
                setSubcategories(response.data?.children || []);
                setCategoryName(response.data?.name || "");
                setImg(response.data?.image || "")
                console.log("Fetched subcategories:", response.data?.children);
            } catch (error) {
                console.error("Error fetching subcategories:", error);
            }
        };
        fetchSubcategories();
    }, [id]);

    // Navigate to Subcategory Details Page
    const handleSubcategoryClick = (subcategory) => {
        navigate(`/subcategory/${categoryName}/${subcategory}`);
    };

    return (
        <div className="body"style={{backgroundColor:"white"}}>
        <div className="main">
            <img src={img} />

            {subcategories.length > 0 ? (
                <div className="subcategory-container">
                    {subcategories.map((sub) => (
                        <div
                            key={sub._id}
                            className="subcategory-item"
                            onClick={() => handleSubcategoryClick(sub.name)}
                        >
                            <img src={sub.icon} alt={sub.name} className="subcategory-icon"style={{borderRadius:"4px"}} />
                            <span className="subcategory-name" >
                                {sub.name}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No subcategories found.</p>
            )}
        </div>
        </div>
    );
};

export default Subcategories;

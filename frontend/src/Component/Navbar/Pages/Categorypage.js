import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Categorypage = () => {
  const { id } = useParams(); // Extracting category ID from URL
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/categories/${id}`);
        const data = await response.json();
        console.log("lo data",data);
        setCategory(data);
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!category) return <p>Category not found.</p>;

  return (
    <div>
      <h2>Category: {category.name}</h2>
      <h3>Subcategories:</h3>
      {category.children && category.children.length > 0 ? (
        <ul>
          {category.children.map((child) => (
            <li key={child._id}>
              {child.name}
              {child.children && child.children.length > 0 && (
                <ul>
                  {child.children.map((subChild) => (
                    <li key={subChild._id}>
                      {subChild.name}
                      {subChild.children && subChild.children.length > 0 && (
                        <ul>
                          {subChild.children.map((thirdLevelChild) => (
                            <li key={thirdLevelChild._id}>{thirdLevelChild.name}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No subcategories available.</p>
      )}
    </div>
  );
};

export default Categorypage;

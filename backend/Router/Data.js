
 const express = require('express');
 const router = express.Router();
const Category = require('../Schema/Category.js');

router.post("/categories", async (req, res) => {
  try {
    const { name, icon, image, parentId } = req.body;

    if (!name || !icon || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create the category
    const newCategory = new Category({ name, icon, image, parentId });
    await newCategory.save();

    // If it's a subcategory, update the parent's `children` array
    if (parentId) {
      const parentCategory = await Category.findById(parentId);
      if (!parentCategory) {
        return res.status(404).json({ message: "Parent category not found" });
      }
      parentCategory.children.push(newCategory._id);
      await parentCategory.save();
    }

    res.status(201).json({ message: "Category created successfully", category: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error: error.message });
  }
});

// 📌 3️⃣ Retrieve categories in a hierarchical structure (Tree View)
const getCategoryTree = async (parentId = null) => {
  const categories = await Category.find({ parentId }).lean();

  for (let category of categories) {
    category.children = await getCategoryTree(category._id);
  }

  return categories;
};

// API to get all categories in a tree structure
router.get("/categories/tree", async (req, res) => {
  try {
    const categoryTree = await getCategoryTree();
    res.status(200).json(categoryTree);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error: error.message });
  }
});

// 📌 4️⃣ Get a Single Category with Subcategories
router.get("/categories/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId)
      .populate({
        path: "children",
        populate: {
          path: "children", // Populate second level
          populate: {
            path: "children", // Populate third level
          }
        }
      });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error: error.message });
  }
});


// 📌 5️⃣ Update a Category
router.put("/categories/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, icon, image } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name, icon, image }, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category updated successfully", category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error: error.message });
  }
});


// 📌 6️⃣ Delete a Category and its Subcategories
router.delete("/categories/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Find the category
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Recursively delete subcategories
    const deleteCategoryAndChildren = async (categoryId) => {
      const children = await Category.find({ parentId: categoryId });
      for (const child of children) {
        await deleteCategoryAndChildren(child._id);
      }
      await Category.findByIdAndDelete(categoryId);
    };

    await deleteCategoryAndChildren(categoryId);

    res.status(200).json({ message: "Category and its subcategories deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error: error.message });
  }
});

module.exports = router;



// const mongoose = require('mongoose');

// const categorySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   icon: { type: String },
//   image: { type: String },
//   subcategories: [{ 
//     name: String,
//     icon: String,
//     image: String
//   }]
// });

// module.exports = mongoose.model('Category', categorySchema);
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true }, // Icon URL
  image: { type: String, required: true }, // Image URL
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null }, // Parent reference
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }], // Array of subcategory IDs
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;




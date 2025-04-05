
// const mongoose = require('mongoose');

// const locationSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   locality: [{ 
//     name: String,
//   }]
// });

// module.exports = mongoose.model('City', locationSchema);
const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  locality: [{ type: String }]
});

const City = mongoose.model('City', CitySchema);
module.exports = City;

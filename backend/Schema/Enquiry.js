const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Enquiry = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: { type: String, required: true, }, 
    city: {
        type: String,
        required: true,
    },
 subject:{
    type:String,
    required:true,
 },
  message:{
    type:String,
    required:true,
  },
  status: { type: String, default: "Pending" },

}, {timestamps: true});
const Enquiries = mongoose.model('Enquiries', Enquiry);
module.exports = Enquiries;

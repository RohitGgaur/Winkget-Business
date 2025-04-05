const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');


const feedbackform = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    testimonial: { type: String, required: true },
    rating: { type: Number, required: true },
    satisfaction: { type: Number, required: true },
    recommend: { type: String, required: true },
    image: { type: String }
});

const feedback = mongoose.model('feedback', feedbackform);
module.exports = feedback;

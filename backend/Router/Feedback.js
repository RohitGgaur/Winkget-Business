const express = require('express');
const Testimonial = require('../Schema/Feedbackform'); // Ensure the path is correct
const router = express.Router(); // Corrected Router import

// Test Route
router.get('/', (req, res) => {
    res.send("Hello, World!"); // Fixed undefined 'hello'
});

// Submit Testimonial
router.post("/testimonials", async (req, res) => {
    try {
        const newTestimonial = new Testimonial(req.body);
        await newTestimonial.save();
        res.status(201).json({ message: "Testimonial submitted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save testimonial" });
    }
});

// Get All Testimonials
// router.get("/testimonials", async (req, res) => {
//     try {
//         const testimonials = await Testimonial.find();
//         res.json(testimonials);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch testimonials" });
//     }
// });
router.get("/testimonials", async (req, res) => {
    try {
        const testimonials = await Testimonial.find();

        // Calculate statistics
        const totalReviews = testimonials.length;
        const averageRating = totalReviews > 0 
            ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / totalReviews).toFixed(1) 
            : 0;
        const satisfactionRate = totalReviews > 0 
            ? Math.round((testimonials.filter(t => t.rating >= 4).length / totalReviews) * 100) 
            : 0;

        res.status(200).json({
            testimonials,
            stats: { totalReviews, averageRating, satisfactionRate }
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch testimonials" });
    }
});

module.exports = router; // Ensure router is exported

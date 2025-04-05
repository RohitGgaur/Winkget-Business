const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Superadmin = require('../Schema/Superadmin'); // Import your Superadmin model

// Route to get superadmin data by predefined ID
router.get('/superadmin/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Superadmin ID format' });
        }

        const user = await Superadmin.findById(id); // Fetch user by _id

        if (!user) {
            return res.status(404).json({ message: 'Superadmin not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching superadmin:', error); // Log full error
        res.status(500).json({ message: 'Error fetching superadmin', error: error.message });
    }
});

module.exports = router;

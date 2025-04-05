const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Franchise = require('../Schema/Franchise.js'); 

// Route to get all admin data
router.get('/Franchiseget', async (req, res) => {
    try {
        const users = await Franchise.find(); // Fetch all admin records

        if (!users.length) {
            return res.status(404).json({ message: 'No Franchise found' });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching Franchise:', error);
        res.status(500).json({ message: 'Error fetching Franchise', error: error.message });
    }
});
router.get('/Franchiseget/:fid', async (req, res) => {
    try {
        const { fid } = req.params;

      
        if (!mongoose.Types.ObjectId.isValid(fid)) {
            return res.status(400).json({ message: 'Invalid admin ID format' });
        }

        const user = await admin.findById(fid); // Fetch user by _id

        if (!user) {
            return res.status(404).json({ message: 'Franchise not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching Franchise:', error); // Log full error
        res.status(500).json({ message: 'Error fetching Franchise', error: error.message });
    }
});
module.exports = router;

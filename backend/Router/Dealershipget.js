const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Dealership = require('../Schema/Dealership.js'); 

// Route to get all admin data
router.get('/Dealershipget', async (req, res) => {
    try {
        const users = await Dealership.find(); // Fetch all admin records

        if (!users.length) {
            return res.status(404).json({ message: 'No Dealership found' });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching Dealership:', error);
        res.status(500).json({ message: 'Error fetching Dealership', error: error.message });
    }
});
router.get('/Dealearshipget/:did', async (req, res) => {
    try {
        const { did } = req.params;

      
        if (!mongoose.Types.ObjectId.isValid(did)) {
            return res.status(400).json({ message: 'Invalid Dealership ID format' });
        }

        const user = await Dealership.findById(did); // Fetch user by _id

        if (!user) {
            return res.status(404).json({ message: 'Franchise not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching Dealership:', error); // Log full error
        res.status(500).json({ message: 'Error fetching Dealership', error: error.message });
    }
});
module.exports = router;

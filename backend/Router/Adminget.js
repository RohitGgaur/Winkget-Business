const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const admin = require('../Schema/Admin.js'); 

// Route to get all admin data
router.get('/adminget', async (req, res) => {
    try {
        const users = await admin.find(); // Fetch all admin records

        if (!users.length) {
            return res.status(404).json({ message: 'No admins found' });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ message: 'Error fetching admins', error: error.message });
    }
});
router.get('/Adminget/:id', async (req, res) => {
    try {
        const { id } = req.params;

      
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid admin ID format' });
        }

        const user = await admin.findById(id); // Fetch user by _id

        if (!user) {
            return res.status(404).json({ message: 'admin not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching admin:', error); // Log full error
        res.status(500).json({ message: 'Error fetching admin', error: error.message });
    }
});


module.exports = router;

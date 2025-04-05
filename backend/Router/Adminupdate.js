const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const admin = require('../Schema/Admin');


router.put('/admin-update/:id', async (req, res) => {
    const id = req.params.id;
    const {name, email,city,position, password,image }=req.body;
    const updates = req.body; 

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid admin ID' });
        }
        const user = await admin.findOneAndUpdate(
            { _id: id }, // Find the student by roll number
            { $set: updates }, // Update the fields provided in the request body
            { new: true } // Return the updated document
        );

        if (!user) {
            return res.status(404).json({ message: 'admin not found' });
        }

        res.json(user); // Return the updated student details
    } catch (error) {
        console.error('Error updating admin details:', error);
        res.status(500).json({ message: 'Error updating admin details' });
    }
});

module.exports = router;

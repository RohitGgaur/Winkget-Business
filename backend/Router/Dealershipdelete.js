const express = require('express');
const mongoose = require('mongoose'); 
const router = express.Router();
const  Delaership= require('../Schema/Dealership.js');

router.delete('/Dealershipdelete/:did', async (req, res) => {
    try {
        const { did } = req.params;

      
        if (!mongoose.Types.ObjectId.isValid(did)) {
            return res.status(400).json({ message: 'Invalid Franchise ID' });
        }

     
        const dealership = await Delaership.findByIdAndDelete(did);

        if (!dealership) {
            return res.status(404).json({ message: 'dealership not found' });
        }

        res.status(200).json({ message: 'dealership deleted successfully' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;

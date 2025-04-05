const express = require('express');
const mongoose = require('mongoose'); 
const router = express.Router();
const  Franchise= require('../Schema/Franchise');

router.delete('/Franchisedelete/:fid', async (req, res) => {
    try {
        const { fid } = req.params;

      
        if (!mongoose.Types.ObjectId.isValid(fid)) {
            return res.status(400).json({ message: 'Invalid Franchise ID' });
        }

     
        const franchise = await Franchise.findByIdAndDelete(fid);

        if (!franchise) {
            return res.status(404).json({ message: 'Franchise not found' });
        }

        res.status(200).json({ message: 'Franchise deleted successfully' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;

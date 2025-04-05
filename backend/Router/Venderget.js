const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const vender= require('../Schema/Vender.js'); 


router.get('/venderget', async (req, res) => {
    try {
        const users = await vender.find(); 

        if (!users.length) {
            return res.status(404).json({ message: 'No vender found' });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching vender:', error);
        res.status(500).json({ message: 'Error fetching venders', error: error.message });
    }
});
router.get('/Adminget/:id', async (req, res) => {
    try {
        const { id } = req.params;

      
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid vender ID format' });
        }

        const user = await vender.findById(id); // Fetch user by _id

        if (!user) {
            return res.status(404).json({ message: 'vender not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching vender:', error); // Log full error
        res.status(500).json({ message: 'Error fetching vender', error: error.message });
    }
});
module.exports = router;

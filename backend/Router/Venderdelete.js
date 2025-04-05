const express = require('express');
const mongoose = require('mongoose'); // ✅ Import mongoose
const router = express.Router();
const  Vender= require('../Schema/Vender');

router.delete('/venderdelete/:id', async (req, res) => {
    try {
        const { id } = req.params;

      
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Vender ID' });
        }

     
        const vender = await Vender.findByIdAndDelete(id);

        if (!vender) {
            return res.status(404).json({ message: 'Vender not found' });
        }

        res.status(200).json({ message: 'vender deleted successfully' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;

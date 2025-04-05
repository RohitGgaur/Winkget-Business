const express = require('express');
const mongoose = require('mongoose'); // ✅ Import mongoose
const router = express.Router();
const Admin = require('../Schema/Admin');

router.delete('/delete/:adminid', async (req, res) => {
    try {
        const { adminid } = req.params;

        // ✅ Check if adminid is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(adminid)) {
            return res.status(400).json({ message: 'Invalid admin ID' });
        }

        // ✅ Use _id if adminid is actually the MongoDB ObjectId
        const admin = await Admin.findByIdAndDelete(adminid);

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;

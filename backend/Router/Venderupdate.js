const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const vender = require('../Schema/Vender');


router.put('/vender-update/:id', async (req, res) => {
    const id = req.params.id;
    const {name, email,mobile,location,area, password,image,businessname,businessnumber,businessemail,city,businessaddress,category,subcategory,numberofemployee, businesstype,establishment,businessdocument, annualtumover, editda,ededitamargin,inventoryvalue,grossincome,rental,lookingfor,amount,about,uploadbanner,uploadimage, website, facebook,instagram}=req.body;
    const updates = req.body; 

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid vender ID' });
        }
        const user = await vender.findOneAndUpdate(
            { _id: id }, // Find the student by roll number
            { $set: updates }, // Update the fields provided in the request body
            { new: true } // Return the updated document
        );

        if (!user) {
            return res.status(404).json({ message: 'vender not found' });
        }

        res.json(user); // Return the updated student details
    } catch (error) {
        console.error('Error updating vender details:', error);
        res.status(500).json({ message: 'Error updating vender details' });
    }
});

module.exports = router;

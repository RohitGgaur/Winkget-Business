// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const Business = require('../../Schema/Vender.js'); 
// router.get('/BusinessgetByCategory', async (req, res) => {
//     try {
//         const { category, subcategory } = req.query;
//      console.log('Received Params:', category, subcategory); // Debugging

//         // Case-insensitive query using regex
//         const business = await Business.find({ 
//             category: new RegExp(category, 'i'), 
//             subcategory: new RegExp(subcategory, 'i') 
//         });

//         // console.log('Found Vendor:', business); // Check the output

//         if (!business.length) {
//             return res.status(404).json({ message: 'No Vendor found' });
//         }

//         res.status(200).json(business);
//     } catch (error) {
//         console.error('Error fetching Vendor:', error);
//         res.status(500).json({ message: 'Error fetching Vendor', error: error.message });
//     }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Business = require('../../Schema/Vender.js'); 

router.get('/BusinessgetByCategory', async (req, res) => {
    try {
        const { category, subcategory, city } = req.query;
        console.log('Received Params:', category, subcategory, city); // Debugging

        // Build the query object dynamically
        const query = {
            category: new RegExp(category, 'i'), 
            subcategory: new RegExp(subcategory, 'i')
        };

        // Add city filter if provided
        if (city) {
            query.city = new RegExp(city, 'i');
        }

        // Fetch data from the database with the constructed query
        const business = await Business.find(query);

        if (!business.length) {
            return res.status(404).json({ message: 'No Vendor found' });
        }

        res.status(200).json(business);
    } catch (error) {
        console.error('Error fetching Vendor:', error);
        res.status(500).json({ message: 'Error fetching Vendor', error: error.message });
    }
});

module.exports = router;


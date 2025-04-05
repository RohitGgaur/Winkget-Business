// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const Franchise = require('../../Schema/Franchise.js'); 
// router.get('/FranchisegetByCategory', async (req, res) => {
//     try {
//         const { category, subcategory } = req.query;
//          console.log('Received Params:', category, subcategory); // Debugging

//         // Case-insensitive query using regex
//         const franchise = await Franchise.find({ 
//             category: new RegExp(category, 'i'), 
//             subcategory: new RegExp(subcategory, 'i') 
//         });

//         // console.log('Found Franchise:', franchise); // Check the output

//         if (!franchise.length) {
//             return res.status(404).json({ message: 'No franchise found' });
//         }

//         res.status(200).json(franchise);
//     } catch (error) {
//         console.error('Error fetching franchise:', error);
//         res.status(500).json({ message: 'Error fetching franchise', error: error.message });
//     }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Franchise = require('../../Schema/Franchise.js'); 

router.get('/FranchisegetByCategory', async (req, res) => {
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
        const franchise = await Franchise.find(query);

        console.log('Found Franchise:', franchise); // Check the output

        if (!franchise.length) {
            return res.status(404).json({ message: 'No franchise found' });
        }

        res.status(200).json(franchise);
    } catch (error) {
        console.error('Error fetching franchise:', error);
        res.status(500).json({ message: 'Error fetching franchise', error: error.message });
    }
});

module.exports = router;


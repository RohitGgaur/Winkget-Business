// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const Dealership = require('../../Schema/Dealership.js'); 
// router.get('/DealershipgetByCategory', async (req, res) => {
//     try {
//         const { category, subcategory } = req.query;
//         console.log('Received Params:', category, subcategory); // Debugging

//         // Case-insensitive query using regex
//         const dealerships = await Dealership.find({ 
//             category: new RegExp(category, 'i'), 
//             subcategory: new RegExp(subcategory, 'i') 
//         });

//         console.log('Found Dealerships:', dealerships); // Check the output

//         if (!dealerships.length) {
//             return res.status(404).json({ message: 'No Dealership found' });
//         }

//         res.status(200).json(dealerships);
//     } catch (error) {
//         console.error('Error fetching Dealership:', error);
//         res.status(500).json({ message: 'Error fetching Dealership', error: error.message });
//     }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Dealership = require('../../Schema/Dealership.js'); 

router.get('/DealershipgetByCategory', async (req, res) => {
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
        const dealerships = await Dealership.find(query);

        console.log('Found Dealerships:', dealerships); // Check the output

        if (!dealerships.length) {
            return res.status(404).json({ message: 'No Dealership found' });
        }

        res.status(200).json(dealerships);
    } catch (error) {
        console.error('Error fetching Dealership:', error);
        res.status(500).json({ message: 'Error fetching Dealership', error: error.message });
    }
});

module.exports = router;

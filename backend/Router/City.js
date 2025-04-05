const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const City = require('../Schema/Location.js');

// Get all cities
router.get('/cities', async (req, res) => {
  try {
    const cities = await City.find();  // 🔹 Fixed 'Location.find()' to 'City.find()'
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cities' });
  }
});

// Create a new city
router.post('/city', async (req, res) => {
  try {
    const { name } = req.body;  // 🔹 Ensure correct naming (category vs name)

    if (!name) {
      return res.status(400).json({ message: 'City name is required' });
    }

    const newCity = new City({
      name,  // 🔹 Ensure correct naming
      locality: []
    });

    await newCity.save();

    res.status(201).json({ message: 'City created successfully', city: newCity });
  } catch (err) {
    res.status(500).json({ message: 'Error creating city' });
  }
});

// Add locality to a city
router.post('/city/:cityId/locality', async (req, res) => {
  try {
    const { cityId } = req.params;
    const { name } = req.body;

    if (!mongoose.Types.ObjectId.isValid(cityId)) {
      return res.status(400).json({ message: 'Invalid city ID format' });
    }

    if (!name) {
      return res.status(400).json({ message: 'Locality name is required' });
    }

    const city = await City.findById(cityId);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    city.locality.push(name);
    await city.save();

    res.status(201).json({ message: 'Locality added successfully', city });
  } catch (err) {
    console.error('Error adding locality:', err);
    res.status(500).json({ message: 'Error adding locality', error: err.message });
  }
});

module.exports = router;

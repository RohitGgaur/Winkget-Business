const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Schema/User.js');
const router = express.Router();

// Home Route
router.get('/', (req, res) => {
    res.send("Hello, world!");
});

// **Register Route**
router.post('/Registers', async (req, res) => {
    try {
       
        const { name, email, city, password, image } = req.body;

        if (!name || !email || !password || !city) {
            return res.status(400).json({ error: "Fill all fields" });
        }

        // **Check if email already exists**
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // **Create User**
        const newUser = new User({ name, email, city, password, image });

        // **Generate Token**
        const token = await newUser.generateAuthToken();

        // **Save to Database**
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", token, user: newUser });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// **Login Route**
router.post('/userlogin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Please fill in all details" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        const token = await user.generateAuthToken();

        res.status(200).json({ message: "Signin Successful", token, user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/userdata/:id', async (req, res) => {
    try {
        const { id } = req.params; // ✅ Get id from URL parameters

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findById(id); // ✅ Use findById() for ObjectId

        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
});



module.exports = router;

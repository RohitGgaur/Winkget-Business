const express = require('express');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Dealership = require('../Schema/Dealership.js');

const Router = express.Router();

// Register route (POST /Registerd)
Router.post('/Registerd', async (req, res) => {
    try {
        const {
            name, email, mobile, location, area, password, image, businessname,
            dealership, businessnumber, businessemail, city, businessaddress, category, subcategory,
            businesscommenced, dealershipcommenced, investmentrequired, arearequired, numberoutlets,
            dealershipfee, dealershipterm, renewable, typeproperty, preferedarea, deliverables,
            about, uploadbanner, uploadimage, website, facebook, instagram
        } = req.body;

        //  console.log("Received Data: ", req.body); // Debugging

        // List required fields
        const requiredFields = [
            "name", "email", "password", "mobile", "location", "area",
            "businessname", "businessnumber", "businessemail", "city", "businessaddress",
            "category", "subcategory", "businesscommenced", "dealership",
            "investmentrequired", "arearequired", "numberoutlets",
            "dealershipfee", "dealershipterm", "renewable", "typeproperty",
            "preferedarea", "deliverables", "about", "uploadbanner", "website",
            "facebook", "instagram"
        ];

        // Find missing fields
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({ error: "Missing fields", missingFields });
        }

        // Check if dealership already exists
        const existingDealer = await Dealership.findOne({ email });
        if (existingDealer) {
            return res.status(400).json({ error: "Dealership already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new dealership entry
        const newDealer = new Dealership({
            name, email, mobile, location, area, password: hashedPassword, image, businessname,
            dealership, businessnumber, businessemail, city, businessaddress, category, subcategory,
            businesscommenced, dealershipcommenced, investmentrequired, arearequired, numberoutlets,
            dealershipfee, dealershipterm, renewable, typeproperty, preferedarea, deliverables,
            about, uploadbanner, uploadimage, website, facebook, instagram
        });

        // Save to the database
        await newDealer.save();

        // Send Email Confirmation
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'gaur0423@gmail.com',
                pass: 'qmtjxpxwmxfvnhtl'
            }
        });

        const mailOptions = {
            from: 'gaur0423@gmail.com',
            to: email,
            subject: `Welcome☺️, ${name}! Here are your Login Details`,
            text: `Hello ${name},\n\nYour registration is successful!\nYour username is: ${email}\nYour password is: ${password}\n\nRegards, Your Team\n IF any issue occurs Contact our Developer Rohit Gaur\nContact No: 7906626698`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: "Registration Successful" });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = Router;

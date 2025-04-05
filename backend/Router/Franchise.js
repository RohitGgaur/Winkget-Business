const express = require('express');
const nodemailer = require('nodemailer');
const FranchiseSchema = require('../Schema/Franchise.js');  // Renamed to FranchiseSchema
const jwt = require('jsonwebtoken');
const Router = express.Router();

// Register route (POST /vender)
Router.post('/Registerf', async (req, res) => {
    const { name, email, mobile, location, area, password, image, businessname,
        businessnumber, businessemail, city, businessaddress, category, subcategory,
        franchisename, establishment, businesscommenced, franchisecommenced, investmentrequired,
        arearequired, numberoutlets, franchisefee, royalty, franchiseterm, renewable, typeproperty,
        preferedarea, deliverables, about, uploadbanner, uploadimage, website, facebook, instagram } = req.body;

    try {
        if (!name || !email || !password || !location || !area || !mobile ||!image || !businessname || 
            !businessnumber || !businessemail || !city || !businessaddress || !category || 
            !subcategory || !franchisename || !establishment || !businesscommenced || 
            !franchisecommenced || !investmentrequired || !arearequired || !numberoutlets || 
            !franchisefee || !royalty || !franchiseterm || !renewable || !typeproperty || 
            !preferedarea || !deliverables || !about||!uploadbanner || !website || !facebook || !instagram) {
            return res.status(400).json({ error: "Please fill all the required fields" });
        }

        const existingVender = await FranchiseSchema.findOne({ email });
        if (existingVender) {
            return res.status(400).json({ error: "User already exists" });
        }

        const newFranchise = new FranchiseSchema({  // Renamed to newFranchise
            name, email, mobile, location, area, password, image, businessname, 
            businessnumber, businessemail, city, businessaddress, category, subcategory, franchisename, 
            establishment, businesscommenced, franchisecommenced, investmentrequired, arearequired, 
            numberoutlets, franchisefee, royalty, franchiseterm, renewable, typeproperty, preferedarea, 
            deliverables, about, uploadbanner, uploadimage, website, facebook, instagram
        });

        const token = await newFranchise.generateAuthToken();
        await newFranchise.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'gaur0423@gmail.com', 
                pass: 'qmtjxpxwmxfvnhtl' 
            }
        });

        const mailOptions = {
            from: 'gaur0423@gmail.com',
            to:`${email}`, 
            subject: `Welcome☺️, ${name}! Here are your Login Details`,
            text: `Hello ${name},\n\nYour registration is successful!\nYour username is: ${email}\nYour password is: ${password}\nRegards, Your Team\n IF any issue occur Contact our Developer Rohit Gaur\nContact No:7906626698`
        };

        await transporter.sendMail(mailOptions);
        res.status(201).json({ message: "Registration Successful", token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = Router;

// Login route (POST /venderlogin)
// Router.post('/venderlogin', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         if (!email || !password) {
//             return res.status(400).json({ error: "Please provide both email and password" });
//         }

//         const vender = await Vender.findOne({ email });

//         if (!vender) {
//             return res.status(401).json({ error: "Invalid Credentials" });
//         }

//         const isMatch = await bcrypt.compare(password, vender.password);

//         if (!isMatch) {
//             return res.status(401).json({ error: "Invalid Credentials" });
//         }

//         const token = await vender.generateAuthToken();
//         res.status(200).json({ message: "Login successful", token, vender });

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

module.exports = Router;

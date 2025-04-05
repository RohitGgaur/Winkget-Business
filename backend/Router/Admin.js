const express=require('express');
const userschema = require('../Schema/Admin.js')
const jwt = require('jsonwebtoken');
const Router= require('router');
const router = Router();
const nodemailer = require('nodemailer');
router.get('/',(req,res)=>{
    res.send(hello);
})


router.post('/Register', async (req, res) => {
    try {
        const { name, email,position,city, password,image } = req.body;

        
        if (!name || !email ||  !password || !position) {
            return res.status(400).json({ error: "Fill all sections" });
        }

        const userExist = await userschema.findOne({ email });
        if (userExist) {
            return res.status(300).json({ error: "User already exists" });
        }
        const user = new userschema({ name, email,position,city,password,image});


        const token = await user.generateAuthToken();

 
        await user.save();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'gaur0423@gmail.com', 
                pass: 'qmtjxpxwmxfvnhtl' 
            }
        });

        // Email options
        const mailOptions = {
            from: 'gaur0423@gmail.com',
            to:`${email}`, 
            subject: `Welcome🥹, ${name}! Here are your Login Details`,
            text: `Hello ${name},\n\nYour registration is successful!\nYour username is: ${email}\nYour password is: ${password}\nRegards, Your Team`
        };

      

        // Send email
        await transporter.sendMail(mailOptions);
 
        res.status(201).json({ message: "Registration Successful", token,user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




router.post('/Adminlogin', async (req, res) => {
    const { email, password } = req.body;

    console.log("hitted");
    
    if (!email || !password) {
        return res.status(405).json("Please fill in all details");
    }

    try {
   
        const user = await userschema.findOne({ email: email });


        if (!user) {
            console.log("bhkku");
            return res.status(401).json({ error: "Invalid Credentials" });
          
        }


        if (password !== user.password) {
            console.log("bhkkp");
        
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        // Generate authentication token (if you're using JWT)
        const token = await user.generateAuthToken();

        // Respond with success message and token
        res.status(200).json({ message: "Signin Successful", token, user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
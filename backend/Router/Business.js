// const express=require('express');
// const userschema = require('../Schema/Vender.js')
// const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
// const Router= require('router');
// const router = Router();
// router.get('/',(req,res)=>{
//     res.send(hello);
// })


// router.post('/vender', async (req, res) => {
//     try {
//         const { name, email,mobile,location,area, password,image,businessname,businessnumber,businessemail,city,businessaddress,category,subcategory,numberofemployee, businesstype,establishment,businessdocument, annualtumover, editda,ededitamargin,inventoryvalue,grossincome,rental,lookingfor,amount,about,uploadbanner,uploadimage, website, facebook,instagram } = req.body;

        
//         if (!name || !email || !password || !location ||!image|| !area || !mobile || !businessname || 
//             !businessnumber || !businessemail || !city || !businessaddress || !category || 
//             !subcategory || !numberofemployee || !businesstype || !establishment
//            || !annualtumover || !editda || !ededitamargin || 
//             !inventoryvalue || !grossincome || !rental || !lookingfor || !amount || 
//             !about||!uploadbanner||!uploadimage  || !website || !facebook || !instagram) {
            
//             return res.status(400).json({ error: "Fill all sections" });
//         }

//         const userExist = await userschema.findOne({ email });
//         if (userExist) {
//             return res.status(300).json({ error: "User already exists" });
//         }
//         const user = new userschema({ 
//             name, email, mobile, location, area, password, businessname, 
//             businessnumber, businessemail, city, businessaddress, category, subcategory, 
//             numberofemployee, businesstype, establishment, businessdocument, annualtumover,  
//             editda, ededitamargin, inventoryvalue, grossincome, rental, lookingfor, amount, 
//             about, uploadbanner, uploadimage, website, facebook, instagram 
//         });
//         const token = await user.generateAuthToken();
//         await user.save();
//  const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'gaur0423@gmail.com', 
//                 pass: 'qmtjxpxwmxfvnhtl' 
//             }
//         });
//         const mailOptions = {
//             from: 'gaur0423@gmail.com',
//             to:`${email}`, 
//             subject: `Welcome☺️, ${name}! Here are your Login Details`,
//             text: `Hello ${name},\n\nYour registration is successful!\nYour username is: ${email}\nYour password is: ${password}\nRegards, Your Team\n IF any issue occur Contact our Developer Rohit Gaur\nContact No:7906626698`
//         };

//         await transporter.sendMail(mailOptions);
//         res.status(201).json({ message: "Registration Successful", token });

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });



// router.post('/venderlogin', async (req, res) => {
//     const { email, password } = req.body;

//     console.log("yes i am hitted");
    
//     if (!email || !password) {
//         return res.status(405).json("Please fill in all details");
//     }

//     try {
   
//         const user = await userschema.findOne({ email: email });


//         if (!user) {
//             return res.status(401).json({ error: "Invalid Credentials" });
//         }


//         if (password !== user.password) {
//             return res.status(401).json({ error: "Invalid Credentials" });
//         }

//         // Generate authentication token (if you're using JWT)
//         const token = await user.generateAuthToken();

//         // Respond with success message and token
//         res.status(200).json({ message: "Signin Successful", token, user });

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
// module.exports = router;
const express = require('express');
const userschema = require('../Schema/Vender.js');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');


const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello, Welcome to the Vendor API");
});

router.post('/vender', async (req, res) => {
    try {
        const { name, email, mobile, location, area, password, profileimage, businessname, 
                businessnumber, businessemail, city, businessaddress, category, 
                subcategory, numberofemployee, businesstype, establishment, businessdocument, 
                annualtumover, editda, ededitamargin, inventoryvalue, grossincome, rental, 
                lookingfor, amount, about, bannerimage, uploadimage, website, facebook, instagram } = req.body;

                // console.log(req.body)
        // Validate required fields
        if (!name || !email || !password || !mobile) { 
            return res.status(400).json({ error: "Name, email, password, and mobile are required" });
        }

        // Check if user already exists
        const userExist = await userschema.findOne({ email });
        if (userExist) {
            return res.status(300).json({ error: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new userschema({ 
            name, email, mobile, location, area, password: hashedPassword,profileimage, businessname, 
            businessnumber, businessemail, city, businessaddress, category, subcategory, 
            numberofemployee, businesstype, establishment, businessdocument, annualtumover,  
            editda, ededitamargin, inventoryvalue, grossincome, rental, lookingfor, amount, 
            about, bannerimage, uploadimage, website, facebook, instagram 
        });

        // Generate token
        const token = await user.generateAuthToken();
        await user.save();

        // Send email
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
            text: `Hello ${name},\n\nYour registration is successful!\nYour username is: ${email}\nYour password is: ${password}\nRegards, Your Team\n IF any issue occur Contact our Developer Rohit Gaur\nContact No:7906626698`
        };

        await transporter.sendMail(mailOptions);
        res.status(201).json({ message: "Registration Successful", token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login Route
router.post('/venderlogin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Please fill in all details" });
    }

    try {
        const user = await userschema.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        const token = await user.generateAuthToken();
        res.status(200).json({ message: "Signin Successful", token, user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

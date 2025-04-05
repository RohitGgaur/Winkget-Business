const express=require('express');
const userschema = require('../Schema/Superadmin.js')
const jwt = require('jsonwebtoken');
const Router= require('router');
const router = Router();
router.get('/',(req,res)=>{
    res.send(hello);
})


router.post('/Registration', async (req, res) => {
    try {
        const { name, email, password,image } = req.body;

        
        if (!name || !email ||  !password ) {
            return res.status(400).json({ error: "Fill all sections" });
        }

        const userExist = await userschema.findOne({ email });
        if (userExist) {
            return res.status(300).json({ error: "User already exists" });
        }
        const user = new userschema({ name, email, password,image});


        const token = await user.generateAuthToken();

 
        await user.save();

 
        res.status(201).json({ message: "Registration Successful", token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    console.log("yes i am hitted");
    
    if (!email || !password) {
        return res.status(405).json("Please fill in all details");
    }

    try {
   
        const user = await userschema.findOne({ email: email });


        if (!user) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }


        if (password !== user.password) {
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
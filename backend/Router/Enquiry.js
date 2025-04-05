const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const User = require('../Schema/Enquiry.js');
const Admin = require('../Schema/Admin.js');

dotenv.config();

const router = express.Router();

// Home Route
router.get('/', (req, res) => {
    res.send("Hello, world!");
});

// **Register Route**
router.post('/Regist', async (req, res) => {
    try {
        const { name, email, city, subject, message } = req.body;
        if (!name || !email || !city || !subject || !message) {
            return res.status(400).json({ error: "Fill all fields" });
        }

      
let City=city.toLowerCase();
        // **Create New Enquiry**
        const newUser = new User({ name, email, City, subject, message, status: "Pending" });
        await newUser.save();

        const admin = await Admin.findOne({ city });

        if (admin) {
            try {
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: { user: "gaur0423@gmail.com", pass: 'qmtjxpxwmxfvnhtl' }
                });

                const mailOptions = {
                    from: "gaur0423@gmail.com",
                    to: admin.email,
                    subject: "New Client Enquiry",
                    text: `Hello ${admin.name},\n\nYou have a new enquiry from ${name} in ${city}.\n\nIssue: ${subject}\n\nPlease take action.\n\nBest Regards, \nSupport Team`
                };

                await transporter.sendMail(mailOptions);
                res.status(201).json({ message: "Enquiry submitted successfully and admin notified!" });

            } catch (emailError) {
                res.status(500).json({ error: "Enquiry saved, but failed to notify admin.", emailError: emailError.message });
            }
        } else {
            res.status(201).json({ message: "Enquiry submitted successfully, but no admin found for this city." });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// **Get Pending Enquiries by City**
router.get("/queries/:city", async (req, res) => {
    try {
        const city = req.params.city;  
        const pendingQueries = await User.find({ city, status: "Pending" });
        const resolvedQueries = await User.find({ city, status: "Resolved" });

        res.status(200).json({ pendingQueries, resolvedQueries });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// **Resolve Enquiry**
router.post("/resolve-enquiry/:id", async (req, res) => {
    try {
        const enquiryId = req.params.id;
        const { resolutionMessage } = req.body;

        const enquiry = await User.findByIdAndUpdate(
            enquiryId,
            { status: "Resolved" },
            { new: true }
        );

        if (!enquiry) return res.status(404).json({ message: "Enquiry not found" });

        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: { user: "gaur0423@gmail.com", pass: 'qmtjxpxwmxfvnhtl'}
            });

            const mailOptions = {
                from: "gaur0423@gmail.com",
                to: enquiry.email,
                subject: "Issue Resolved",
                text: `Hello ${enquiry.name},\n\nYour issue "${enquiry.subject}" has been resolved.\nResolution: ${resolutionMessage}\n\nThank you for your patience.\n\nBest Regards, \nSupport Team`
            };

            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: "Issue resolved and client notified!" });

        } catch (emailError) {
            res.status(500).json({ error: "Enquiry resolved, but email notification failed.", emailError: emailError.message });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

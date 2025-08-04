const express = require('express');
const cors = require('cors');
const path = require('path');
const mongodb = require('./DB/mongo.js');
const User = require('./Schema/Superadmin.js');
const app = express();
app.use(express.json());
app.use(cors({

  origin: ["http://localhost:3000", "https://winkget-frontend.onrender.com/"]


}));
app.get('/', (req, res) => {
  res.status(200).send('OK');
});


const superadmin=require("./Router/SuperA.js");
app.use('/api',superadmin);
const superget=require("./Router/superget.js");
app.use('/api',superget);
const admin=require("./Router/Admin.js");
app.use("/api",admin);
const vender=require("./Router/Business.js");
app.use("/api",vender);
const adminget=require("./Router/Adminget.js");
app.use('/api',adminget);
const venderget=require("./Router/Venderget.js");
app.use('/api',venderget);
const admindelete=require("./Router/Admindelete.js");
app.use('/api',admindelete);
const adminupdate=require("./Router/Adminupdate.js");
app.use('/api',adminupdate);

const franchise=require("./Router/Franchise.js");
app.use('/api',franchise);
const dealership=require("./Router/Dealership.js");
app.use('/api',dealership);
const franchiseget=require("./Router/Franchiseget.js");
app.use('/api',franchiseget);
const dealershipget=require("./Router/Dealershipget.js");
app.use('/api',dealershipget);
const dealershipdelete=require("./Router/Dealershipdelete.js");
app.use('/api',dealershipdelete);
const venderdelete=require("./Router/Venderdelete.js");
app.use('/api',venderdelete);
const franchisedelete=require("./Router/Franchisedelete.js");
app.use('/api',franchisedelete);
const data=require("./Router/Data.js");
app.use('/api',data);
const city=require("./Router/City.js");
app.use('/api',city)
const user=require("./Router/Users.js");
app.use('/api',user);
const dealget=require("./Router/Fetch.js/Dealership.js");
app.use('/api',dealget);
const businessget=require("./Router/Fetch.js/Business.js");
app.use('/api',businessget);
const franchises=require("./Router/Fetch.js/Franchise.js");
app.use('/api',franchises);
const feedback=require("./Router/Feedback.js");
app.use('/api',feedback);
const enquiry=require("./Router/Enquiry.js");
app.use('/api',enquiry);
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//     console.log(`Connection successful on port ${PORT}`);
// });
module.exports = app;
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');


const Franchise = new mongoose.Schema({
   name: {
           type: String,
           required: true
       },
       mobile:{
           type:String,
           required:true,
       },
       location:{
           type:String,
           required:true
       },
       area:{
           type:String,
           required:true
       },
       email: {
           type: String,
           required: true,
           unique: true,
           validate(value) {
               if (!validator.isEmail(value)) {
                   throw new Error("Invalid Email");
               }
           }
       },
      password:{
        type:String,
        required:true
      },
         image:{
           type:String
         },
         businessname:{
            type:String,
            required:true
          },
          businessnumber:{
            type:String,
            required:true
          },
          businessemail:{
            type:String,
            required:true
          },
          city:{
            type:String,
            required:true
          },
          businessaddress:{
            type:String,
            required:true
          },
          category:{
            type:String,
            required:true
          },
          subcategory:{
            type:String,
            required:true
          },
          franchisename:{
            type:String,
            required:true
          },
          establishment:{
            type:String,
            required:true
          },
         businesscommenced:{
            type:String,
            required:true
          },
          franchisecommenced:{
            type:String,
            required:true
          },
          investmentrequired:{
            type:String,
            required:true
          },
          arearequired:{
            type:String,
            required:true
          },
          numberoutlets:{
            type:String,
            required:true
          },
          franchisefee:{
            type:String,
            required:true
          },
          royalty:{
            type:String,
            required:true
          },
          franchiseterm:{
            type:String,
            required:true
          },
          renewable:{
            type:String,
            required:true
          },
          typeproperty:{
            type:String,
            required:true
          },
          preferedarea:{
            type:String,
            required:true
          },
          deliverables:{
            type:String,
            required:true
          },
          about:{
            type:String,
            required:true
          },
          uploadbanner:{
            type:String,
          
          },
          uploadimage:{
            type:String,
           
          },
          website:{
            type:String,
            required:true
          },
          facebook:{
            type:String,
            required:true
          },
          instagram:{
            type:String,
            required:true
          }
});
Franchise.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, 'secretkey');

        // Ensure tokens array is initialized
        this.tokens = this.tokens || [];
        this.tokens = this.tokens.concat({ token });

        await this.save();
        return token;
    } catch (error) {
        throw new Error(error);
    }
};

const franch = mongoose.model('franch', Franchise);
module.exports = franch;

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');


const VenderSchema = new mongoose.Schema({
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
    profileimage:{
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
      numberofemployee:{
        type:String,
        required:true
      },
      businesstype:{
        type:String,
        required:true
      },
      establishment:{
        type:String,
        required:true
      },
      businessdocument:{
        type:String,
       
      },
      annualtumover:{
        type:String,
        required:true
      },
      editda:{
        type:String,
        required:true
      },
      ededitamargin:{
        type:String,
        required:true
      },
      inventoryvalue:{
        type:String,
        required:true
      },
      grossincome:{
        type:String,
        required:true
      },
      rental:{
        type:String,
        required:true
      },
      lookingfor:{
        type:String,
        required:true
      },
      amount:{
        type:String,
        required:true
      },
      about:{
        type:String,
        required:true
      },
      bannerimage:{
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
VenderSchema.methods.generateAuthToken = async function () {
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

const vender = mongoose.model('vender', VenderSchema);
module.exports = vender;

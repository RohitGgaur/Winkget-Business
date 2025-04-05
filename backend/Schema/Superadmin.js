const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');


const detailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
      }
});
detailSchema.methods.generateAuthToken = async function () {
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

const Superadmin = mongoose.model('Superadmin', detailSchema);
module.exports = Superadmin;

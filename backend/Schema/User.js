const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
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
    city: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

// **Hash Password Before Saving**
UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// **Generate Auth Token**
UserSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, 'secretkey', { expiresIn: "1h" });
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (error) {
        throw new Error(error);
    }
};

const User = mongoose.model('User', UserSchema);
module.exports = User;

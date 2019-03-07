const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        lowercase: true,
        index: {
            unique: true,
        }
    },
    password: String,
    confirmed: Boolean,
    confirmationHash: String,
    confirmationDate: Date,
    rights: Object,
    phone: String,
    address: {
        line1: String,
        line2: String,
        zip: String,
        city: String,
        region: String,
        country: String,
        additionnalInfos: String
    },
    wishlist: [mongoose.Schema.Types.ObjectId],
    cart: [mongoose.Schema.Types.ObjectId]
}, {timestamps: true});

userSchema.methods.generateJwt = function generateJwt() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 59);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        password: this.password,
        expireIn: '10s',
        exp: parseInt(expiry.getTime() / 100, 10)
    }, process.env.JWT_SECRET);
};

module.exports = mongoose.model('User', userSchema);

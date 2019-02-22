const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    model: mongoose.Schema.Types.ObjectId,
    size: Number,
    color: String,
    // availaibility: String,
    originalPrice: Number,
    rentPrice: Number,
    description: String,
    compositionExt: String,
    compositionOutSole: String,
    nbRent: Number,

    createdBy: mongoose.Schema.Types.ObjectId
}, {timestamps: true});

module.exports = mongoose.model('Sneaker', brandSchema);

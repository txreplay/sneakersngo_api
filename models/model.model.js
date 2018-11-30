const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    name: String,
    brand: mongoose.Schema.Types.ObjectId
}, {timestamps: true});

module.exports = mongoose.model('Model', modelSchema);
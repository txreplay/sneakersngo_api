const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    brand: String,
    model: String,
    size: Number,
    color: String,
    beginDate: Date,
    endDate: Date,

    createdBy: mongoose.Schema.Types.ObjectId
}, {timestamps: true});

module.exports = mongoose.model('Request', requestSchema);

const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        index: {
            unique: true,
        }
    },
    createdBy: mongoose.Schema.Types.ObjectId
}, {timestamps: true});

module.exports = mongoose.model('Brand', brandSchema);
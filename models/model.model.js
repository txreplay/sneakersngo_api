const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    name: {
        type: String,
        index: {
            unique: true,
        }
    },
    createdBy: mongoose.Schema.Types.ObjectId,
    brand: mongoose.Schema.Types.ObjectId
}, {timestamps: true});

module.exports = mongoose.model('Model', modelSchema);
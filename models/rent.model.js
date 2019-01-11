const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId,
    sneaker: mongoose.Schema.Types.ObjectId,
    duration: Number,
    status: String,
    sentDate: Date,
    receivedDate: Date,
    sentBackDate: Date,
    receivedBackDate: Date
}, {timestamps: true});

module.exports = mongoose.model('Rent', rentSchema);
// module.exports = {STATUS_INIT, STATUS_SENT, STATUS_RECEIVED, STATUS_SENT_BACK, STATUS_RECEIVED_BACK, STATUS_CLOSED, STATUS_ERROR};